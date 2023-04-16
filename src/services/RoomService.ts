import { prisma } from "../database/PrismaInstance.js"

class RoomService {
    private static instance: RoomService | undefined

    private constructor() { }

    public static getInstance = () => {
        if (this.instance)
            return this.instance

        this.instance = new RoomService()
        return this.instance
    }

    create = async (name: string) => {
        await prisma.room.create({
            data: {
                name: name,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })
    }
}

export { RoomService }
