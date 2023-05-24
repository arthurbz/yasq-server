import { RoomState } from "../types/models/Room.js"
import { Song } from "../types/models/Song.js"
import { prisma } from "../database/PrismaInstance.js"
import dayjs from "dayjs"

class Room {
    public id: string
    private isPlaying: boolean
    private currentSong: Song | null
    private startedAt: number | null
    private pausedAt: number | null
    public songList: Song[]

    constructor(id: string) {
        this.songList = []
        prisma.song.findMany({ where: { roomId: id } }).then(songs => this.songList = songs)

        this.id = id
        this.isPlaying = false
        this.currentSong = null
        this.startedAt = null
        this.pausedAt = null
    }

    getState(): RoomState {
        return {
            isPlaying: this.isPlaying,
            currentSong: this.currentSong,
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

    addSong(song: Song) {
        if (!song)
            return

        if (this.songList.length == 0) {
            this.currentSong = song
            this.isPlaying = true
        }

        this.songList.push(song)
    }

    removeSong(songId: string) {
        const index = this.songList.findIndex(song => song.id === songId)

        if (index != -1)
            this.songList.splice(index, 1)

        if (this.songList.length == 0) {
            this.currentSong = null
            this.isPlaying = false
        }
    }

    print() {
        console.clear()
        console.log("Room Id:", this.id)
        console.log("Songs Length:", this.songList.length)
        console.log(this.songList.map(s => s.id))
    }
}

export { Room }
