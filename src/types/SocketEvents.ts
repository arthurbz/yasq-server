import { Action, TextMessage } from "./models/Action.js"
import { RoomState } from "./models/Room.js"
import { SongAdded, UserJoined, StateChanged } from "./models/RoomAction.js"

export interface ServerToClientEvents {
    play: () => void
    pause: () => void
    currentState: (roomState: RoomState) => void
    refreshUsers: () => void
    refreshSongs: () => void
    textMessage: (action: Action<TextMessage>) => void
    songAdded: (action: Action<SongAdded>) => void
    userJoined: (action: Action<UserJoined>) => void
    stateChanged: (action: Action<StateChanged>) => void
}

export interface ClientToServerEvents {
    joinRoom: (roomId: string) => void
    play: (roomId: string) => void
    pause: (roomId: string) => void
    currentState: (roomId: string) => void
    sendMessage: (message: Action<TextMessage>) => void
}
