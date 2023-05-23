import { prisma } from "../database/PrismaInstance.js"
import { UserService } from "./UserService.js"
import { RoomService } from "./RoomService.js"

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

        const existingParticipation = await prisma.participation.findFirst({
            include: { user: true },
            where: {
                userId: user.id,
                roomId: room.id
            }
        })

        return existingParticipation ||
            await prisma.participation.create({
                include: { user: true },
                data: {
                    isOwner,
                    userId: user.id,
                    roomId: room.id,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            })
    }

    leaveRoom = async (id: string) => {
        const participation = await this.findByIdOrThrow(id)
        const roomId = participation.roomId
        const roomParticipants = await this.findRoomParticipants(roomId)

        if (roomParticipants.length == 1) {
            await this.delete(participation.id)
            await this.roomService.delete(roomId)
            return
        }

        if (roomParticipants.length >= 2 && participation.isOwner) {
            const roomOwners = await this.findRoomOwners(roomId)

            if (roomOwners.length == 1)
                await this.addNewRandomOwner(roomId)
        }

        await this.delete(participation.id)

        return participation
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
        const room = await this.roomService.findByIdOrThrow(roomId)

        const participants = await prisma.participation.findMany({
            include: { user: true },
            where: { roomId: room.id }
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

    addOwnership = async (id: string) => {
        const participation = await this.findByIdOrThrow(id)

        if (participation.isOwner)
            return

        await prisma.participation.update({
            data: {
                isOwner: true,
                updatedAt: new Date()
            },
            where: { id: participation.id }
        })
    }

    removeOwnership = async (id: string) => {
        const participation = await this.findByIdOrThrow(id)

        if (!participation.isOwner)
            return

        await prisma.participation.update({
            data: {
                isOwner: false,
                updatedAt: new Date()
            },
            where: { id: participation.id }
        })
    }

    private addNewRandomOwner = async (roomId: string) => {
        const newOwnerParticipation = await prisma.participation.findFirst({
            where: {
                isOwner: false,
                roomId: roomId
            }
        })

        await prisma.participation.update({
            data: {
                isOwner: true,
                updatedAt: new Date()
            },
            where: { id: newOwnerParticipation.id }
        })
    }

    private delete = async (id: string) => {
        const participation = await this.findByIdOrThrow(id)

        await prisma.participation.delete({
            where: { id: participation.id }
        })
    }
}

export { ParticipationService }
