import { Song } from "../types/models/Song.js"
import dayjs from "dayjs"

class Room {
    public id: string
    private isPlaying: boolean
    private currentSong: Song | null
    private startedAt: number | null
    private pausedAt: number | null

    private readonly placeholderSong: Song = {
        id: "6442e0d686696084024069e1",
        originId: "c0-hvjV2A5Y",
        name: "Fred again.. | Boiler Room: London",
        source: "youtube",
        artist: "Boiler Room",
        thumbnail: "https://i.ytimg.com/vi/c0-hvjV2A5Y/maxresdefault.jpg"
    }

    constructor(id: string) {
        this.id = id
        this.isPlaying = false
        this.currentSong = null
        this.startedAt = null
        this.pausedAt = null
    }

    getState() {
        return {
            isPlaying: this.isPlaying,
            currentSong: this.placeholderSong,
            songElapsedTime: this.getSongElapsedTime()
        }
    }

    getSongElapsedTime() {
        const songElapsedTime = this.isPlaying ? dayjs().unix() : this.pausedAt
        return songElapsedTime - this.startedAt
    }

    play() {
        if (this.isPlaying)
            return

        this.isPlaying = true
        const songElapsedTime = this.pausedAt - this.startedAt
        this.startedAt = dayjs().unix() - songElapsedTime
    }

    pause() {
        if (!this.isPlaying)
            return

        this.isPlaying = false
        this.pausedAt = dayjs().unix()
    }
}

export { Room }
