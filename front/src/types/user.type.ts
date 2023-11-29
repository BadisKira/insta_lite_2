export type IRole = "SuperAdmin" | "Admin" | "User"

export interface IAuthUser extends IUser {}

export interface IUser {
    userId: number
    firstname: string
    lastname: string
    email: string
    role: IRole
    token: unknown
}