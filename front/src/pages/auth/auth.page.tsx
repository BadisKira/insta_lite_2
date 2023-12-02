import { useState } from "react"
import { Grid } from "@mui/material"
import { useNavigate } from "react-router-dom"
import validation from "../../utils/validation.util"
import { IDisplayedError } from "../../types/validation.type"
import toast from "react-hot-toast"
import { loginSchema, registerSchema } from "../../validations/auth.validation"
import instaliteApi from "../../utils/axios/axiosConnection"
import { useAuthContext } from "../../hooks/useAuthContext.hook"
import PageContainer from "../../components/PageContainer/PageContainer"
import AuthFormPageSection from "../../pageSections/auth/authForm.pageSection"
import PortfolioPageSection from "../../pageSections/auth/portfolio.pageSection"
import useUserStates from "../../hooks/useUserStates.hook"
import useUserErrorStates from "../../hooks/userUserErrorStates.hook"


const AuthPage = () => {
    const { isAuthenticated, login } = useAuthContext()
    const navigate = useNavigate()

    const {
        firstname, setFirstname,
        lastname, setLastname,
        email, setEmail,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        registerEmail, setRegisterEmail,
        registerPassword, setRegisterPassword,
    } = useUserStates()

    const {
        errorFirstname, setErrorFirstname,
        errorLastname, setErrorLastname,
        errorEmail, setErrorEmail,
        errorPassword, setErrorPassword,
        errorConfirmPassword, setErrorConfirmPassword,
        errorRegisterEmail, setErrorRegisterEmail,
        errorRegisterPassword, setErrorRegisterPassword,
    } = useUserErrorStates()

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
        <PageContainer withHeader={false}>
            <Grid flex={1} container>
                <Grid flex={1} container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
                    <AuthFormPageSection
                        firstname={firstname} setFirstname={setFirstname} errorFirstname={errorFirstname}
                        lastname={lastname} setLastname={setLastname} errorLastname={errorLastname}
                        registerEmail={registerEmail} setRegisterEmail={setRegisterEmail} errorRegisterEmail={errorRegisterEmail}
                        registerPassword={registerPassword} setRegisterPassword={setRegisterPassword} errorRegisterPassword={errorRegisterPassword}
                        confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} errorConfirmPassword={errorConfirmPassword}
                        email={email} setEmail={setEmail} errorEmail={errorEmail}
                        password={password} setPassword={setPassword} errorPassword={errorPassword}
                        handleRegister={handleRegister}
                        handleLogin={handleLogin}
                        changePageSection={changePageSection}
                        isOnLoginSection={isOnLoginSection}
                    />
                </Grid>
                <Grid flex={1} container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
                    <PortfolioPageSection />
                </Grid>
            </Grid>
        </PageContainer>
    )
}

export default AuthPage