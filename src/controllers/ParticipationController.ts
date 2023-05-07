import { Request, Response } from "express"
import { ParticipationService } from "../services/ParticipationService.js"
import { UnprocessableEntity } from "../types/exceptions/UnprocessableEntity.js"

class ParticipationController {
    private participationService = ParticipationService.getInstance()

    join = async (req: Request, res: Response) => {
        const { roomId, userId } = req.body

        if (!roomId || !userId)
            throw new UnprocessableEntity("User and room are needed.")

        const participation = await this.participationService.joinRoom({ roomId, userId, isOwner: false })

        res.status(201).send({ id: participation.id })
    }

    leave = async (req: Request, res: Response) => {
        const { id } = req.params

        if (!id)
            throw new UnprocessableEntity("Missing participation to leave the room.")

        await this.participationService.leaveRoom(id)

        res.status(204).send()
    }

    findRoomParticipants = async (req: Request, res: Response) => {
        const { roomId } = req.params

        if (!roomId)
            throw new UnprocessableEntity("Missing room to find participants.")

        const participants = await this.participationService.findRoomParticipants(roomId)

        res.status(200).send(participants)
    }
}

export { ParticipationController }
