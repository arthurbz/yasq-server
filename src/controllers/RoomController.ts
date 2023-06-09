import { Request, Response } from "express"
import { RoomService } from "../services/RoomService.js"
import { UserService } from "../services/UserService.js"
import { ParticipationService } from "../services/ParticipationService.js"
import { UnprocessableEntity } from "../types/exceptions/UnprocessableEntity.js"

class RoomController {
    private roomService = RoomService.getInstance()
    private userService = UserService.getInstance()
    private participationService = ParticipationService.getInstance()

    create = async (req: Request, res: Response) => {
        const { name, userId } = req.body

        if (!name)
            throw new UnprocessableEntity("Missing name to create room.")

        if (!userId)
            throw new UnprocessableEntity("Missing user to create room.")

        const room = await this.roomService.create(name)
        const participation = await this.participationService.joinRoom({
            roomId: room.id,
            userId: userId,
            isOwner: true
        })

        res.status(201).send({
            roomId: room.id,
            userId: participation.userId,
            participationId: participation.id
        })
    }

    createWithRandomUser = async (req: Request, res: Response) => {
        const { name } = req.body

        if (!name)
            throw new UnprocessableEntity("Missing name to create room.")

        const user = await this.userService.createRandomUser()
        const room = await this.roomService.create(name)
        const participation = await this.participationService.joinRoom({
            roomId: room.id,
            userId: user.id,
            isOwner: true
        })

        res.status(201).send({
            roomId: room.id,
            userId: user.id,
            participationId: participation.id
        })
    }

    findById = async (req: Request, res: Response) => {
        const { id } = req.params

        if (!id)
            throw new UnprocessableEntity("Missing id to find room.")

        const room = await this.roomService.findByIdOrThrow(id)

        res.status(200).send(room)
    }

    update = async (req: Request, res: Response) => {
        const { id, name } = req.body

        if (!id || !name)
            throw new UnprocessableEntity("Need id and name to update room.")

        await this.roomService.update(id, name)

        res.status(204).send()
    }

    delete = async (req: Request, res: Response) => {
        const { id } = req.params

        if (!id)
            throw new UnprocessableEntity("Missing id to delete room.")

        await this.roomService.delete(id)

        res.status(204).send()
    }
}

export { RoomController }
