import { Message, TextMessage } from "./models/Message.js"
import { RoomState } from "./models/Room.js"

export interface ServerToClientEvents {
    play: () => void
    pause: () => void
    textMessage: (message: Message<TextMessage>) => void
    currentState: (roomState: RoomState) => void
    refreshUsers: () => void
    refreshSongs: () => void
}

export interface ClientToServerEvents {
    joinRoom: (roomId: string) => void
    play: (roomId: string) => void
    pause: (roomId: string) => void
    sendMessage: (message: Message<TextMessage>) => void
    currentState: (roomId: string) => void
}
