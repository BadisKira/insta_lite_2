import { IUser } from "./user.type"

export interface ILoginProps {
    email: string
    password: string
}

export interface IAuthContext extends IAuthData {
    login: (loginData: ILoginProps) => Promise<void>
    logOut: () => void
    isAuthenticated: boolean
    isLoading: boolean
}

export interface IAuthData {
    user: IUser | undefined
    token: string | undefined
}