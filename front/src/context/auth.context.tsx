import { useEffect, useState } from "react"
import { ILoginProps } from "../types/auth.type"
import { IUser, IUserInfos } from "../types/user.type"
import instaliteApi from "../utils/axios/axiosConnection"
import toast from "react-hot-toast"
import { AuthContext } from "../hooks/useAuthContext.hook"
import { getItem, removeItem, setItem } from "../utils/localStorage.util"
import { useNavigate } from "react-router-dom"

interface IProps {
	children: React.ReactNode
}

const AuthProvider = ({ children }: IProps) => {
	const navigate = useNavigate()

	const [isLoading, setIsLoading] = useState(true)
	const [user, setUser] = useState<IUser | undefined>()
	const [token, setToken] = useState<string | undefined>()
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

	useEffect(() => {
		setIsLoading(true)

		const stringUser = getItem("user")

		if (stringUser === undefined) {
			setIsAuthenticated(false)
			setIsLoading(false)
			removeItem("user")
			removeItem("token")
			return
		}

		const user: IUser = JSON.parse(stringUser)
		const token = getItem("token")

		if (!user || !token) {
			setIsAuthenticated(false)
			setIsLoading(false)
			removeItem("user")
			removeItem("token")
			return
		}

		setUser(user)
		setToken(token)
		setIsAuthenticated(true)

		setIsLoading(false)
	}, [setUser, setToken, setIsAuthenticated, setIsLoading])

	const login = async (loginData: ILoginProps) => {
		setIsLoading(true)

		try {
			instaliteApi.defaults.headers.common.Authorization = null
			const { data } = await instaliteApi.post("/login", loginData)
			setUser(data.user as IUser)
			setToken(data.token)
			setIsAuthenticated(true)
			setItem("user", JSON.stringify(data.user))
			setItem("token", data.token)
			navigate("/")
			toast.success("Connexion réussi !")
		} catch (error: unknown) {
			toast.error("Une erreur est survenu lors de la connexion !")

			removeItem("user")
			removeItem("token")
			setIsAuthenticated(false)
		}

		setIsLoading(false)
	}

	const putUserInfos = async (userInfos: IUserInfos) => {
		setIsLoading(true)

		try {
			instaliteApi.defaults.headers.common.Authorization = "Bearer " + token
			const { data } = await instaliteApi.put(`/users`, userInfos)
			setUser(data as IUser)
			setItem("user", JSON.stringify(user))
			toast.success("Votre compte à été bien modifié !")
		} catch (error) {
			toast.error("Une erreur est survenu lors de la modification !")
		}

		setIsLoading(false)
	}

	const putUserPassword = async (oldPassword: string, newPassword: string) => {
		setIsLoading(true)

		try {
			instaliteApi.defaults.headers.common.Authorization = "Bearer " + token
			await instaliteApi.put(`/users/reset-password`, { oldPassword, newPassword })
			toast.success("Votre mot de passe a été mis à jour !")
		} catch (error) {
			toast.error("Une erreur est survenu lors de la mise à jour !")
		}

		setIsLoading(false)
	}

	const logOut = async () => {
		setUser(undefined)
		setToken(undefined)
		setIsAuthenticated(false)

		removeItem("user")
		removeItem("token")

		navigate("/auth")
		toast.success("Vous etes déconnecté !")
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				token,
				isAuthenticated,
				isLoading,
				login,
				logOut,
				putUserInfos,
				putUserPassword,
			}}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider
