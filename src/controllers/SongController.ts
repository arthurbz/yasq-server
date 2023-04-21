import { Request, Response } from "express"
import { SongService } from "../services/SongService.js"
import { UnprocessableEntity } from "../types/exceptions/UnprocessableEntity.js"

class SongController {
    songService = SongService.getInstance()

    add = async (req: Request, res: Response) => {
        /* Info can be a YouTube videoId or some YouTube video link */
        const { info, roomId } = req.body

        if (!info)
            throw new UnprocessableEntity("Missing info to add song.")
        if (!roomId)
            throw new UnprocessableEntity("Missing roomId to add song.")

        const song = await this.songService.add(info, roomId)

        res.status(200).send({ id: song.id })
    }
}

export { SongController }
