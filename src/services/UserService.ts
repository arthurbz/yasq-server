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
        await prisma.user.create({
            data: {
                name: name,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })
    }
}

export { UserService }
