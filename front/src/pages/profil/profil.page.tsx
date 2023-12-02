
import toast from "react-hot-toast"
import PageContainer from "../../components/PageContainer/PageContainer"
import useUserStates from "../../hooks/useUserStates.hook"
import useUserErrorStates from "../../hooks/userUserErrorStates.hook"
import BodyPageSection from "../../pageSections/profil/body.pageSection"
import SubHeaderPageSection from "../../pageSections/profil/subheader.pageSection"
import { IDisplayedError } from "../../types/validation.type"
import validation from "../../utils/validation.util"
import { emailSchema, userNameSchema, userPasswordSchema } from "../../validations/account.validation"
import { useAuthContext } from "../../hooks/useAuthContext.hook"
import { useEffect } from "react"

const ProfilPage = () => {
    const { user, putUserInfos, putUserPassword } = useAuthContext()

    const { 
        firstname, setFirstname,
        lastname, setLastname,
        email, setEmail,
        oldPassword, setOldPassword,
        password, setPassword,
        confirmPassword, setConfirmPassword,
    } = useUserStates()

    const { 
        errorFirstname, setErrorFirstname,
        errorLastname, setErrorLastname,
        errorEmail, setErrorEmail,
        errorPassword, setErrorPassword,
        errorOldPassword, setErrorOldPassword,
        errorConfirmPassword,
    } = useUserErrorStates()

    useEffect(() => {
        setFirstname(user!.firstname)
        setLastname(user!.lastname)
        setEmail(user!.email)
    }, [setFirstname, setLastname, setEmail, user])

    const handleValidateUserInfos = async () => {
        if (firstname === user!.firstname && lastname === user!.lastname && email === user!.email) {
            setErrorFirstname({ isError: false, message: "" })
            setErrorLastname({ isError: false, message: "" })
            setErrorEmail({ isError: false, message: "" })
            return false
        }

        const displayedErrors = [
            { path: "firstname", setError: setErrorFirstname },
            { path: "lastname", setError: setErrorLastname },
            { path: "email", setError: setErrorEmail },
        ] as IDisplayedError[]

        if (await validation({ firstname, lastname, email }, userNameSchema.concat(emailSchema), displayedErrors)) {
            return true
        }
        
        toast.error("Un ou plusieurs champs ne sont pas valide !")
        return false 
    }

    const handlePasswordValidation = async () => {
        const displayedErrors = [
            { path: "oldPassword", setError: setErrorOldPassword },
            { path: "password", setError: setErrorPassword },
        ] as IDisplayedError[]

        if (await validation({ oldPassword, password }, userPasswordSchema, displayedErrors)) {
            return true
        }
        
        toast.error("Un ou plusieurs champs ne sont pas valide !")
        return false 
    }
    
    const handlePersonalInfosUpdate = async () => {
        if (!(await handleValidateUserInfos())) {
            return
        }

        try {
            console.log({firstname, lastname, email, password: confirmPassword})
            putUserInfos({ firstname, lastname, email, password: confirmPassword, })

            toast.success("Votre compte à été bien modifié !")
            setErrorFirstname({ isError: false, message: "" })
            setErrorLastname({ isError: false, message: "" })
            setErrorEmail({ isError: false, message: "" })
        } catch (error) {
            console.error(error)
            toast.error("Une erreur est survenu lors de la modification !")
        }
    }

    const handlePasswordUpdate = async () => {
        if (!(await handlePasswordValidation())) {
            return
        }

        try {
            putUserPassword(oldPassword, password)

            setErrorEmail({ isError: false, message: "" })
            toast.success("Votre mot de passe a été mis à jour !")
        } catch (error) {
            console.error(error)
            toast.error("Une erreur est survenu lors de la mise à jour !")
        }
    }

    return (
        <>
            <PageContainer withHeader={true}>
                <SubHeaderPageSection />
                <BodyPageSection 
                    firstname={firstname} setFirstname={setFirstname} errorFirstname={errorFirstname}
                    lastname={lastname} setLastname={setLastname} errorLastname={errorLastname}
                    email={email} setEmail={setEmail} errorEmail={errorEmail}
                    oldPassword={oldPassword} setOldPassword={setOldPassword} errorOldPassword={errorOldPassword}
                    password={password} setPassword={setPassword} errorPassword={errorPassword}
                    confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} errorConfirmPassword={errorConfirmPassword}
                    handlePersonalInfosUpdate={handlePersonalInfosUpdate}
                    handleEmailUpdate={handlePersonalInfosUpdate}
                    handlePasswordUpdate={handlePasswordUpdate}
                />
            </PageContainer>
        </>
    )
}

export default ProfilPage