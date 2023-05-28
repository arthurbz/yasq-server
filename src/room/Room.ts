import { RoomState } from "../types/models/Room.js"
import { Song } from "../types/models/Song.js"
import { User } from "../types/models/User.js"
import { prisma } from "../database/PrismaInstance.js"
import dayjs from "dayjs"

class Room {
    public id: string
    private isPlaying: boolean
    private currentSongIndex: number
    private startedAt: number | null
    private pausedAt: number | null
    public songs: Song[]
    public users: Map<string, User>
    public usersReady: Set<string>

    constructor(id: string) {
        this.songs = []
        this.users = new Map()
        this.usersReady = new Set()

        prisma.song.findMany({ where: { roomId: id } })
            .then(songs => this.songs = songs)

        prisma.participation.findMany({
            include: { user: true },
            where: { roomId: id },
            orderBy: { createdAt: "desc" }
        }).then(participations => participations.map(p => this.users.set(p.user.id, p.user)))

        this.id = id
        this.isPlaying = false
        this.currentSongIndex = 0
        this.startedAt = null
        this.pausedAt = null
    }

    getState(): RoomState {
        return {
            isPlaying: this.isPlaying,
            currentSong: this.currentSongIndex != null ? this.songs[this.currentSongIndex] : null,
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

        if (this.songs.length == 0) {
            this.currentSongIndex = 0
            this.resetRoomToPlayingState()
        }

        this.songs.push(song)
    }

    removeSong(songId: string) {
        const index = this.songs.findIndex(song => song.id === songId)

        if (index != -1)
            this.songs.splice(index, 1)

        if (this.songs.length == 0) {
            this.currentSongIndex = 0
            this.resetRoomToPausedState()
        }
    }

    addUser(user: User) {
        if (!user)
            return

        this.users.set(user.id, user)
    }

    removeUser(userId: string) {
        this.users.delete(userId)
        this.print()
    }

    addReadyUser(userId: string) {
        this.usersReady.add(userId)
    }

    readyForNextSong() {
        /*
            If more than 50% of the users are ready
            Ready meaning their browser has finished listening to the music
        */
        return this.usersReady.size > Math.floor(this.users.size / 2)
    }

    previousSong() {
        if (this.songs.length == 0 || this.songs.length == 1)
            return

        if (this.currentSongIndex == 0)
            this.currentSongIndex = this.songs.length - 1
        else
            this.currentSongIndex -= 1

        this.resetRoomToPlayingState()
    }

    nextSong() {
        if (this.songs.length == 0 || this.songs.length == 1)
            return

        if (this.currentSongIndex == this.songs.length - 1)
            this.currentSongIndex = 0
        else
            this.currentSongIndex += 1

        this.resetRoomToPlayingState()
    }

    private resetRoomToPlayingState() {
        this.usersReady.clear()
        this.isPlaying = true
        this.pausedAt = null
        this.startedAt = dayjs().unix()
    }

    private resetRoomToPausedState() {
        this.usersReady.clear()
        this.isPlaying = false
        this.pausedAt = null
        this.startedAt = null
    }

    print() {
        console.clear()
        console.log("Date Time: ", dayjs().unix())
        console.log("Room Id:", this.id)
        console.log("Playing:", this.isPlaying)
        console.log("Current Song Index:", this.currentSongIndex)

        console.log("Songs Length:", this.songs.length)
        console.log("Songs:", this.songs)

        console.log("Users Length:", this.users.size)
        console.log("Users:", [...this.users.keys()].map(k => k))
    }
}

export { Room }
