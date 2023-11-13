import { useState } from "react"
import { Grid } from "@mui/material"
import LoginPageSection from "../../pageSections/auth/login.pageSection"
import SignInPageSection from "../../pageSections/auth/signin.pageSection"
import { useNavigate } from "react-router-dom"
import validation from "../../utils/validation.util"
import { IDisplayedError } from "../../types/validation.type"
import toast from "react-hot-toast"
import { IError } from "../../types/error.type"
import { loginSchema, registerSchema } from "../../validations/auth.validation"
import { instaliteApi } from "../../utils/axios/axiosConnection"
import { useAuthContext } from "../../hooks/useAuthContext.hook"
import EntryHeader from "../../components/EntryHeader/EntryHeader"
import PageContainer from "../../components/PageContainer/PageContainer"


const AuthPage = () => {
    const { isAuthenticated, login } = useAuthContext()
    const navigate = useNavigate()
    
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [registerEmail, setRegisterEmail] = useState("")
    const [registerPassword, setRegisterPassword] = useState("")

    const [errorFirstname, setErrorFirstname] = useState<IError>({ isError: false, message: "" })
    const [errorLastname, setErrorLastname] = useState<IError>({ isError: false, message: "" })
    const [errorEmail, setErrorEmail] = useState<IError>({ isError: false, message: "" })
    const [errorPassword, setErrorPassword] = useState<IError>({ isError: false, message: "" })
    const [errorConfirmPassword, setErrorConfirmPassword] = useState<IError>({ isError: false, message: "" })
    const [errorRegisterEmail, setErrorRegisterEmail] = useState<IError>({ isError: false, message: "" })
    const [errorRegisterPassword, setErrorRegisterPassword] = useState<IError>({ isError: false, message: "" })

    const [isOnLoginSection, setIsOnLoginSection] = useState(true)
    
    const clearLoginStates = () => {
        setEmail("")
        setPassword("")
    }

    const clearRegistrationStates = () => {
        setFirstname("")
        setLastname("")
        setRegisterEmail("")
        setRegisterPassword("")
        setConfirmPassword("")
    }

    const clearLoginErrors = () => {
        setErrorEmail({ isError: false, message: "" })
        setErrorPassword({ isError: false, message: "" })
    }

    const clearRegistrationErrors = () => {
        setErrorFirstname({ isError: false, message: "" })
        setErrorLastname({ isError: false, message: "" })
        setErrorRegisterEmail({ isError: false, message: "" })
        setErrorRegisterPassword({ isError: false, message: "" })
        setErrorConfirmPassword({ isError: false, message: "" })
    }

    const handleLoginValidation = async () => {
        const displayedErrors = [
            { path: "email", setError: setErrorEmail },
            { path: "password", setError: setErrorPassword }
        ] as IDisplayedError[]

        if (await validation({ email, password }, loginSchema, displayedErrors)) {
            clearLoginErrors()
            return true
        }
        
        toast.error("Un ou plusieurs champs ne sont pas valide !")
        return false  
    }

    const handleLogin = async () => {
        if (!(await handleLoginValidation())) {
            return
        }
        
        await login({ email, password, })

        if (isAuthenticated) {
            clearLoginStates()
            navigate("/home")
        }
    }

    const handleRegistrationValidation = async () => {
        const displayedErrors = [
            { path: "firstname", setError: setErrorFirstname },
            { path: "lastname", setError: setErrorLastname },
            { path: "registerEmail", setError: setErrorRegisterEmail },
            { path: "registerPassword", setError: setErrorRegisterPassword },
            { path: "confirmPassword", setError: setErrorConfirmPassword },
        ] as IDisplayedError[]

        if (await validation({ firstname, lastname, registerEmail, registerPassword, confirmPassword }, registerSchema, displayedErrors)) {
            clearRegistrationErrors()
            return true
        }
        
        toast.error("Un ou plusieurs champs ne sont pas valide !")
        return false  
    }

    const handleRegister = async () => {
        if (!(await handleRegistrationValidation())) {
            return
        }

        try {
            await instaliteApi.post("/register", {
                firstname, 
                lastname, 
                email: registerEmail, 
                password: registerPassword,
            })

            toast.success("Votre compte est créé avec succès !")
            clearRegistrationStates()
            setIsOnLoginSection(true)
        } catch (error) {
            console.error(error)
            toast.error("Une erreur est survenu lors de la création de votre compte !")
        }
    }

    const changePageSection = () => setIsOnLoginSection(!isOnLoginSection)

    return (
        <PageContainer>
            <EntryHeader linkPath="/" />
            <Grid flex={1} container sx={{ py:4}}justifyContent="center" alignItems="center">
                <Grid
                    item
                    sm={10}
                    md={8}
                    lg={6} 
                    style={{
                        padding:'70px 0px',
                        borderRadius: 12,
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        backgroundColor: "#FFFFFF"
                    }}>
                        {isOnLoginSection ?
                            <LoginPageSection
                                email={email}
                                setEmail={setEmail}
                                errorEmail={errorEmail}
                                password={password}
                                setPassword={setPassword}
                                errorPassword={errorPassword}
                                login={handleLogin}
                                changePageSection={changePageSection}
                            />
                            :
                            <SignInPageSection 
                                firstname={firstname} setFirstname={setFirstname} errorFirstname={errorFirstname}
                                lastname={lastname} setLastname={setLastname} errorLastname={errorLastname}
                                email={registerEmail} setEmail={setRegisterEmail} errorEmail={errorRegisterEmail}
                                password={registerPassword} setPassword={setRegisterPassword} errorPassword={errorRegisterPassword}
                                confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} errorConfirmPassword={errorConfirmPassword}
                                register={handleRegister}
                                changePageSection={changePageSection} 
                            />
                        }
                </Grid>
            </Grid>
        </PageContainer>
    )
}

export default AuthPage