import { useState } from "react"
import { IError } from "../types/error.type"

const useUserErrorStates = () => {
    const [errorFirstname, setErrorFirstname] = useState<IError>({ isError: false, message: "" })
    const [errorLastname, setErrorLastname] = useState<IError>({ isError: false, message: "" })
    const [errorEmail, setErrorEmail] = useState<IError>({ isError: false, message: "" })
    const [errorPassword, setErrorPassword] = useState<IError>({ isError: false, message: "" })
    const [errorConfirmPassword, setErrorConfirmPassword] = useState<IError>({ isError: false, message: "" })
    const [errorRegisterEmail, setErrorRegisterEmail] = useState<IError>({ isError: false, message: "" })
    const [errorRegisterPassword, setErrorRegisterPassword] = useState<IError>({ isError: false, message: "" })
    const [errorOldPassword, setErrorOldPassword] = useState<IError>({ isError: false, message: "" })
    
    return {
        errorFirstname, setErrorFirstname,
        errorLastname, setErrorLastname,
        errorEmail, setErrorEmail,
        errorPassword, setErrorPassword,
        errorConfirmPassword, setErrorConfirmPassword,
        errorRegisterEmail, setErrorRegisterEmail,
        errorRegisterPassword, setErrorRegisterPassword,
        errorOldPassword, setErrorOldPassword,
    }
}

export default useUserErrorStates