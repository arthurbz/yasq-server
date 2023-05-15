import { Request, Response } from "express"
import { SongService } from "../services/SongService.js"
import { UnprocessableEntity } from "../types/exceptions/UnprocessableEntity.js"
import { io } from "../app.js"

class SongController {
    songService = SongService.getInstance()

    add = async (req: Request, res: Response) => {
        /* Info can be a YouTube videoId or some YouTube video link */
        const { info, roomId } = req.body

        if (!info)
            throw new UnprocessableEntity("Missing info to add song.")
        if (!roomId)
            throw new UnprocessableEntity("Missing room to add song.")

        const song = await this.songService.add(info, roomId)

        io.in(roomId).emit("refreshSongs")
        res.status(201).send({ id: song.id })
    }

    remove = async (req: Request, res: Response) => {
        const { id } = req.params

        if (!id)
            throw new UnprocessableEntity("Missing song to remove.")

        const song = await this.songService.findByIdOrThrow(id)
        await this.songService.remove(id)

        io.in(song.roomId).emit("refreshSongs")
        res.status(204).send()
    }

    findSongsInRoom = async (req: Request, res: Response) => {
        const { roomId } = req.params

        if (!roomId)
            throw new UnprocessableEntity("Missing room to find songs.")

        const songs = await this.songService.findSongsInRoom(roomId)

        res.status(200).send(songs)
    }
}

export { SongController }
