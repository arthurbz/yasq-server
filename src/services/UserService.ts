import { prisma } from "../database/PrismaInstance.js"

class UserService {
    private static instance: UserService | undefined

    private constructor() { }

    public static getInstance = () => {
        if (this.instance)
            return this.instance

        this.instance = new UserService()
        return this.instance
    }

    create = async (name: string) => {
        const user = await prisma.user.create({
            data: {
                name: name,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })

        return user
    }

    findByIdOrThrow = async (id: string) => {
        const user = await prisma.user.findFirstOrThrow({
            where: { id }
        })

        return user
    }

    update = async (id: string, name: string) => {
        const user = await prisma.user.update({
            data: {
                name,
                updatedAt: new Date()
            },
            where: { id }
        })

        return user
    }

    delete = async (id: string) => {
        await this.findByIdOrThrow(id)

        await prisma.user.delete({
            where: { id }
        })
    }
}

export { UserService }
