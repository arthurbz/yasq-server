interface CreateUser {
    name: string
    pfpPath?: string | undefined
}

interface UpdateUser {
    id: string
    name: string
    pfpPath?: string | undefined
}

export type { CreateUser, UpdateUser }
