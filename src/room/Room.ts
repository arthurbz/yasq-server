import { RoomState } from "../types/models/Room.js"
import { Song } from "../types/models/Song.js"
import { User } from "../types/models/User.js"
import { prisma } from "../database/PrismaInstance.js"
import dayjs from "dayjs"

class Room {
    public id: string
    private isPlaying: boolean
    private currentSong: Song | null
    private startedAt: number | null
    private pausedAt: number | null
    public songs: Map<string, Song>
    public users: Map<string, User>
    public usersReady: Set<string>

    constructor(id: string) {
        this.songs = new Map()
        this.users = new Map()
        this.usersReady = new Set()

        prisma.song.findMany({ where: { roomId: id } })
            .then(songs => songs.forEach(song => this.songs.set(song.id, song)))

        prisma.participation.findMany({
            include: { user: true },
            where: { roomId: id }
        }).then(participations => participations.map(p => this.users.set(p.user.id, p.user)))

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

        if (this.songs.size == 0) {
            this.currentSong = song
            this.isPlaying = true
        }

        this.songs.set(song.id, song)
        this.print()
    }

    removeSong(songId: string) {
        this.songs.delete(songId)

        if (this.songs.size == 0) {
            this.currentSong = null
            this.isPlaying = false
        }
        this.print()
    }

    addUser(user: User) {
        if (!user)
            return

        this.users.set(user.id, user)
        this.print()
    }

    removeUser(userId: string) {
        this.users.delete(userId)
        this.print()
    }

    addReadyUser(userId: string) {
        this.usersReady.add(userId)
    }

    readyForNextSong() {
        return this.usersReady.size > Math.floor(this.users.size / 2)
    }

    print() {
        console.clear()
        console.log("Date Time: ", dayjs().unix())
        console.log("Room Id:", this.id)

        console.log("Songs Length:", this.songs.size)
        console.log("Songs:", [...this.songs.keys()].map(k => k))

        console.log("Users Length:", this.users.size)
        console.log("Users:", [...this.users.keys()].map(k => k))
    }
}

export { Room }
