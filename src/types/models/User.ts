interface User {
    id: string
    name: string
    pfpPath: string
    createdAt: Date
    updatedAt: Date
}

interface CreateUser {
    name: string
    pfpPath?: string | undefined
}

interface UpdateUser {
    id: string
    name: string
    pfpPath?: string | undefined
}

export type { User, CreateUser, UpdateUser }
