import { useEffect, useState } from 'react'
import { IAuthData, ILoginProps } from '../types/auth.type'
import { IUser } from '../types/user.type'
import { instaliteApi } from '../utils/axios/axiosConnection'
import toast from 'react-hot-toast'
import { AuthContext } from '../hooks/useAuthContext.hook'
import { getItem, removeItem, setItem } from '../utils/localStorage.util'
import { useNavigate } from 'react-router-dom'


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

        const stringAuthData = getItem("authData")

        if (stringAuthData === null) {
            setIsAuthenticated(false)
            setIsLoading(false)
            return
        }

        const authData: IAuthData = JSON.parse(stringAuthData)

        if (!authData || !authData.user) {
            setIsAuthenticated(false)
            setIsLoading(false)
            return
        }

        setUser(authData.user)
        setToken(authData.token)
        setIsAuthenticated(true)

        setIsLoading(false)
    }, [setUser, setToken, setIsAuthenticated, setIsLoading])
    

    const login = async (loginData: ILoginProps) => {
        setIsLoading(true)

        try {
            const { data } = await instaliteApi.post("/login", loginData)
            setUser(data.user as IUser)
            setToken(data.token)
            setIsAuthenticated(true)

            setItem("authData", JSON.stringify({ user: data.user, token: data.token }))
            
            navigate("/home")
            toast.success("Connexion réussi !")
        } catch (error: unknown) {
            toast.error("Une erreur est survenu lors de la connexion !")
            
            setUser(undefined)
            setToken(undefined)
            setIsAuthenticated(false)
        }

        
        setIsLoading(false)
    }

    const logOut = () => {
        setUser(undefined)
        setToken(undefined)
        setIsAuthenticated(false)

        removeItem("authData")

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
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider