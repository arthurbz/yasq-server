import { Request, Response } from "express"
import { RoomService } from "../services/RoomService.js"
import { UnprocessableEntity } from "../types/exceptions/UnprocessableEntity.js"

class RoomController {
    roomService = RoomService.getInstance()

    create = async (req: Request, res: Response) => {
        const { name } = req.body

        if (!name)
            throw new UnprocessableEntity("Missing name to create room.")

        const searchResults = await this.roomService.create(name)

        res.status(200).send(searchResults)
    }
}

export { RoomController }
