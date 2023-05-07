import { prisma } from "../database/PrismaInstance.js"
import { UserService } from "./UserService.js"
import { RoomService } from "./RoomService.js"
import { UnprocessableEntity } from "../types/exceptions/UnprocessableEntity.js"

interface UserAndRoom {
    userId: string
    roomId: string
}

interface JoinRoomParams extends UserAndRoom {
    isOwner: boolean
}

class ParticipationService {
    private static instance: ParticipationService | undefined
    private userService = UserService.getInstance()
    private roomService = RoomService.getInstance()

    private constructor() { }

    public static getInstance = () => {
        if (this.instance)
            return this.instance

        this.instance = new ParticipationService()
        return this.instance
    }

    joinRoom = async ({ userId, roomId, isOwner }: JoinRoomParams) => {
        const user = await this.userService.findByIdOrThrow(userId)
        const room = await this.roomService.findByIdOrThrow(roomId)

        const userAlreadyInRoom = await this.isUserInRoom({ userId, roomId })
        if (userAlreadyInRoom)
            throw new UnprocessableEntity("User already is in the room.")

        const participation = await prisma.participation.create({
            data: {
                isOwner,
                userId: user.id,
                roomId: room.id,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })

        return participation
    }

    leaveRoom = async (id: string) => {
        const participation = await this.findByIdOrThrow(id)
    }

    isUserInRoom = async ({ userId, roomId }: UserAndRoom) => {
        return !!await prisma.participation.findFirst({
            where: {
                userId,
                roomId
            }
        })
    }

    findByIdOrThrow = async (id: string) => {
        const room = await prisma.participation.findFirstOrThrow({
            where: { id }
        })

        return room
    }

    findOrThrow = async ({ userId, roomId }: UserAndRoom) => {
        const room = await prisma.participation.findFirstOrThrow({
            where: {
                userId,
                roomId
            }
        })

        return room
    }

    findRoomParticipants = async (roomId: string) => {
        const participants = await prisma.participation.findMany({
            include: { user: true },
            where: { roomId }
        })

        return participants
    }

    findRoomOwners = async (roomId: string) => {
        const owners = await prisma.participation.findMany({
            where: {
                roomId,
                isOwner: true,
            }
        })

        return owners
    }
}

export { ParticipationService }
