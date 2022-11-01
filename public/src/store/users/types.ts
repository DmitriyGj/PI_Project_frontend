export type UserInfo = {
    id: number
    name: string
    email: string
    login: string
    organization: string
}

export type UserDetailInfo = UserInfo & {
    role: UserRole
}

export interface UsersState {
    users: UserInfo[]
    currentUser: UserDetailInfo | null
}

export enum UserRole {
    'ADMIN' = 'admin',
    'USER' = 'user',
    'none' = 'none'
}
