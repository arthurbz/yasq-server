import { Song } from "./Song.js"

interface RoomState {
    isPlaying: boolean
    currentSong: Song
    songElapsedTime: number
}

export type { RoomState }
