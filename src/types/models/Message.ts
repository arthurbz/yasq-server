import { User } from "./User.js"

interface Message {
    user: User
    roomId: string
    content: string
    date: number
}

export type { Message }
