import { User } from "./models/User.js"

interface Message {
    user: User
    roomId: string
    message: string
    date: Date
}

export type { Message }
