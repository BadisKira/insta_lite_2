import { createContext, useContext } from "react"
import { IAuthContext } from "../types/auth.type"


export const AuthContext = createContext<IAuthContext>(null!)

export const useAuthContext = () => {
    return useContext(AuthContext)
}