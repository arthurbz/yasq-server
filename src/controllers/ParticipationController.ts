import { Request, Response } from "express"
import { ParticipationService } from "../services/ParticipationService.js"
import { UserService } from "../services/UserService.js"
import { io } from "../app.js"
import { UnprocessableEntity } from "../types/exceptions/UnprocessableEntity.js"

class ParticipationController {
    private participationService = ParticipationService.getInstance()
    private userService = UserService.getInstance()

    join = async (req: Request, res: Response) => {
        const { roomId, userId } = req.body

        if (!roomId || !userId)
            throw new UnprocessableEntity("User and room are needed.")

        const participation = await this.participationService.joinRoom({ roomId, userId, isOwner: false })

        io.in(roomId).emit("refreshUsers")
        res.status(201).send({ id: participation.id })
    }

    joinWithRandomUser = async (req: Request, res: Response) => {
        const { roomId } = req.body

        if (!roomId)
            throw new UnprocessableEntity("Room is needed.")

        const user = await this.userService.createRandomUser()
        const participation = await this.participationService.joinRoom({ roomId, userId: user.id, isOwner: false })

        io.in(roomId).emit("refreshUsers")
        res.status(201).send({ participationId: participation.id, roomId: participation.roomId, userId: user.id })
    }

    leave = async (req: Request, res: Response) => {
        const { id } = req.params

        if (!id)
            throw new UnprocessableEntity("Missing participation to leave the room.")

        const participation = await this.participationService.findByIdOrThrow(id)
        await this.participationService.leaveRoom(id)

        io.in(participation.roomId).emit("refreshUsers")
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
