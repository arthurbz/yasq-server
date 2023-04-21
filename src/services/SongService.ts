import ytdl from "ytdl-core"
import { prisma } from "../database/PrismaInstance.js"
import { Song } from "../types/Song.js"
import { RoomService } from "./RoomService.js"
import { UnprocessableEntity } from "../types/exceptions/UnprocessableEntity.js"

class SongService {
    private static instance: SongService | undefined
    roomService = RoomService.getInstance()

    private constructor() { }

    public static getInstance = () => {
        if (this.instance)
            return this.instance

        this.instance = new SongService()
        return this.instance
    }

    add = async (info: string, roomId: string) => {
        const youtubeSong = await this.getSongFromYoutube(info)

        if (!youtubeSong)
            throw new UnprocessableEntity("No songs were found!")

        const room = await this.roomService.findByIdOrThrow(roomId)

        const { originId, artist, name, source, thumbnail } = youtubeSong

        const song = await prisma.song.create({
            data: {
                originId,
                artist,
                name,
                source,
                thumbnail,
                roomId: room.id
            }
        })

        return song
    }

    private getSongFromYoutube = async (info: string): Promise<Song | undefined> => {
        try {
            const validVideoId = ytdl.getVideoID(info)
            const basicInfo = await ytdl.getBasicInfo(validVideoId)
            const { title, ownerChannelName, videoId, thumbnails } = basicInfo.videoDetails

            return {
                originId: videoId,
                source: "youtube",
                name: title,
                artist: ownerChannelName,
                thumbnail: thumbnails.pop()?.url
            }
        } catch {
            return undefined
        }
    }
}

export { SongService }
