import React from "react"
import { IRole } from "./user.type"

export interface IRoute<T = unknown> {
    name: string
    path: string
    component: () => JSX.Element | React.FC<T>
    claimsRoles: IRole[]
    queries?: string[]
}