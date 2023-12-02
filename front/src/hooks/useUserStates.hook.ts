import { useState } from "react"

const useUserStates = () => {
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [oldPassword, setOldPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [registerEmail, setRegisterEmail] = useState("")
    const [registerPassword, setRegisterPassword] = useState("")

    return {
        firstname, setFirstname,
        lastname, setLastname,
        email, setEmail,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        registerEmail, setRegisterEmail,
        registerPassword, setRegisterPassword,
        oldPassword, setOldPassword,
    }
}

export default useUserStates