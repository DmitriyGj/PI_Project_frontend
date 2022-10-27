export type UserInfo = {
    id : number
    name : string
    email : string
    login : string
    organization : string
}

export type UserDetailInfo = UserInfo & {
    role: string
}

export interface UsersState {
    users: UserInfo[],
    currentUser: UserDetailInfo | null
}