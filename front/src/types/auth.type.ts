import { IUser, IUserInfos } from "./user.type"

export interface ILoginProps {
    email: string
    password: string
}

export interface IAuthContext {
    login: (loginData: ILoginProps) => Promise<void>
    logOut: () => void
    putUserInfos: (userInfos: IUserInfos) => void
    putUserPassword: (oldPassword: string, newPassword: string) => void
    isAuthenticated: boolean
    isLoading: boolean
    user: IUser | undefined
    token: string | undefined
}