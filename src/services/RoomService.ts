import { prisma } from "../database/PrismaInstance.js"
import { UserService } from "./UserService.js"

class RoomService {
    private static instance: RoomService | undefined
    private userService = UserService.getInstance()

    private constructor() { }

    public static getInstance = () => {
        if (this.instance)
            return this.instance

        this.instance = new RoomService()
        return this.instance
    }

    create = async (name: string, userId: string) => {
        const user = await this.userService.findByIdOrThrow(userId)

        const room = await prisma.room.create({
            data: {
                name,
                userId: user.id,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })

        return room
    }

    findByIdOrThrow = async (id: string) => {
        const room = await prisma.room.findFirstOrThrow({
            include: { user: true },
            where: { id }
        })

        return room
    }

    update = async (id: string, name: string) => {
        const room = await prisma.room.update({
            data: {
                name,
                updatedAt: new Date()
            },
            where: { id }
        })

        return room
    }

    delete = async (id: string) => {
        await this.findByIdOrThrow(id)

        await prisma.room.delete({
            where: { id }
        })
    }
}

export { RoomService }
