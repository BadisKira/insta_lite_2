import React, { useState } from "react"
import useUserErrorStates from "../../hooks/userUserErrorStates.hook"
import {
	Box,
	Button,
	CircularProgress,
	FormControl,
	FormHelperText,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	MenuItem,
	Modal,
	OutlinedInput,
	Select,
} from "@mui/material"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import Visibility from "@mui/icons-material/Visibility"
import { IDisplayedError } from "../../types/validation.type"
import validation from "../../utils/validation.util"
import { createUserSchema } from "../../validations/auth.validation"
import toast from "react-hot-toast"

interface IProps {
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
	handleCreate: (firstname: string, lastname: string, email: string, password: string, role: string) => void
	isLoading: boolean
}

const CreateUserModal = ({ isOpen, setIsOpen, handleCreate, isLoading }: IProps) => {
	const [firstname, setFirstname] = useState("")
	const [lastname, setLastname] = useState("")
	const [email, setEmail] = useState("")
	const [role, setRole] = useState("USER")
	const [password, setPassword] = useState("")
	const [showPassword, setShowPassword] = useState(false)

	const {
		errorFirstname,
		setErrorFirstname,
		errorLastname,
		setErrorLastname,
		errorEmail,
		setErrorEmail,
		errorPassword,
		setErrorPassword,
	} = useUserErrorStates()

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword)
	}

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
	}

	const handleValidateUserInfos = async () => {
		const displayedErrors = [
			{ path: "firstname", setError: setErrorFirstname },
			{ path: "lastname", setError: setErrorLastname },
			{ path: "email", setError: setErrorEmail },
			{ path: "password", setError: setErrorPassword },
		] as IDisplayedError[]

		if (await validation({ firstname, lastname, email }, createUserSchema, displayedErrors)) {
			setErrorFirstname({ isError: false, message: "" })
			setErrorLastname({ isError: false, message: "" })
			setErrorEmail({ isError: false, message: "" })
			setErrorPassword({ isError: false, message: "" })
			return true
		}

		toast.error("Un ou plusieurs champs ne sont pas valide !")
		return false
	}

	return (
		<Modal
			open={isOpen}
			onClose={() => setIsOpen(false)}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description">
			<Box
				sx={{
					position: "absolute",
					top: "50%",
					left: "50%",
					width: "fit-content",
					transform: "translate(-50%, -50%)",
					bgcolor: "white",
					boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
					p: 4,
				}}>
				<FormControl variant="outlined" style={{ width: "100%", marginBottom: 12 }}>
					<InputLabel htmlFor="outlined-adornment-firsname">Nom</InputLabel>
					<OutlinedInput
						id="outlined-adornment-firstname"
						type="firstname"
						value={firstname}
						onChange={(e) => setFirstname(e.target.value)}
						label="Nom"
						error={errorFirstname.isError}
					/>
					{errorFirstname.isError && (
						<FormHelperText style={{ color: "red", margin: "3px 0px 0px 0px" }}>
							{errorFirstname.message}
						</FormHelperText>
					)}
				</FormControl>
				<FormControl variant="outlined" style={{ width: "100%", marginBottom: 12 }}>
					<InputLabel htmlFor="outlined-adornment-lastname">Prénom</InputLabel>
					<OutlinedInput
						id="outlined-adornment-lastname"
						type="lastname"
						value={lastname}
						onChange={(e) => setLastname(e.target.value)}
						label="Prénom"
						error={errorLastname.isError}
					/>
					{errorLastname.isError && (
						<FormHelperText style={{ color: "red", margin: "3px 0px 0px 0px" }}>{errorLastname.message}</FormHelperText>
					)}
				</FormControl>
				<FormControl variant="outlined" style={{ width: "100%", marginBottom: 12 }}>
					<InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
					<OutlinedInput
						id="outlined-adornment-email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						label="Email"
						error={errorEmail.isError}
					/>
					{errorEmail.isError && (
						<FormHelperText style={{ color: "red", margin: "3px 0px 0px 0px" }}>{errorEmail.message}</FormHelperText>
					)}
				</FormControl>
				<FormControl variant="outlined" style={{ width: "100%", marginBottom: 12 }}>
					<InputLabel htmlFor="outlined-adornment-password">Mot de passe</InputLabel>
					<OutlinedInput
						id="outlined-adornment-password"
						type={showPassword ? "text" : "password"}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									edge="end">
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						}
						label="Password"
						error={errorPassword.isError}
					/>
					{errorPassword.isError && (
						<FormHelperText style={{ color: "red", margin: "3px 0px 0px 0px" }}>{errorPassword.message}</FormHelperText>
					)}
				</FormControl>
				<FormControl variant="outlined" style={{ width: "100%", marginBottom: 12 }}>
					<InputLabel htmlFor="outlined-adornment-role">Role</InputLabel>
					<Select
						labelId="utlined-adornment-role"
						id="outlined-adornment-role"
						value={role}
						label="Role"
						onChange={(e) => setRole(e.target.value)}>
						<MenuItem key="USER" value="USER">
							USER
						</MenuItem>
						<MenuItem key="SUPERUSER" value="SUPERUSER">
							SUPERUSER
						</MenuItem>
					</Select>
				</FormControl>
				{isLoading ? (
					<CircularProgress />
				) : (
					<Grid container justifyContent="space-around" alignItems="center">
						<Button
							onClick={async () =>
								(await handleValidateUserInfos()) && handleCreate(firstname, lastname, email, password, role)
							}>
							Créer
						</Button>
						<Button onClick={() => setIsOpen(false)}>Annuler</Button>
					</Grid>
				)}
			</Box>
		</Modal>
	)
}

export default CreateUserModal
