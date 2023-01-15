export type UserInfo = {
    id: number
    name: string
    lastName: string
    patronymic: string
    email: string
    login: string
    organization: {
        id: number
        name: string
    }
}

export type UserDetailInfo = UserInfo & {
    role: UserRole
    jwt?: string
}

export interface UsersState {
    users: UserInfo[]
    currentUser: UserDetailInfo | null
}

export enum UserRole {
    'ADMIN' = 'ADMIN',
    'USER' = 'USER',
    'NONE' = 'NONE'
}
