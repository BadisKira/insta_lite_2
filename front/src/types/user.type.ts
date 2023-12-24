export type IRole = "USER" | "SUPERUSER" | "ADMIN"

export interface IAuthUser extends IUser {}

export interface IUser {
    id: number
    firstname: string
    lastname: string
    email: string
    role: IRole
}

export interface IUserInfos {
    firstname: string
    lastname: string
    email: string
    password: string
}