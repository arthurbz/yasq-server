import { Action, TextMessage } from "./models/Action.js"
import { RoomState } from "./models/Room.js"
import { SongAdded, UserJoined, StateChanged, MusicHasEnded, ChangeSong } from "./models/RoomAction.js"

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
    songChanged: (action: Action<ChangeSong>) => void
}

export interface ClientToServerEvents {
    joinRoom: (action: Action<UserJoined>, callback: () => void) => void
    play: (action: Action<StateChanged>) => void
    pause: (action: Action<StateChanged>) => void
    currentState: (roomId: string) => void
    textMessage: (action: Action<TextMessage>) => void
    musicHasEnded: (action: Action<MusicHasEnded>) => void
    changeSong: (action: Action<ChangeSong>) => void
}
