import { prisma } from "../database/PrismaInstance.js"
import { pictureExists, generateRandomNickname, getRandomProfilePicture } from "../utils/UserUtils.js"
import { CreateUser, UpdateUser } from "../types/models/User.js"

class UserService {
    private static instance: UserService | undefined

    private constructor() { }

    public static getInstance = () => {
        if (this.instance)
            return this.instance

        this.instance = new UserService()
        return this.instance
    }

    create = async ({ name, pfpPath }: CreateUser) => {
        if (!pfpPath || (pfpPath && !pictureExists(pfpPath)))
            pfpPath = await getRandomProfilePicture()

        const user = await prisma.user.create({
            data: {
                name,
                pfpPath,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })

        return user
    }

    createRandomUser = async () => {
        const nickname = generateRandomNickname()
        const pfpPath = await getRandomProfilePicture()

        const user = await prisma.user.create({
            data: {
                name: nickname,
                pfpPath: pfpPath,
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

    update = async ({ id, name, pfpPath }: UpdateUser) => {
        await this.findByIdOrThrow(id)

        if (!pfpPath || (pfpPath && !pictureExists(pfpPath)))
            pfpPath = undefined
        else
            pfpPath = pfpPath.charAt(0) == "/" ? pfpPath : `/${pfpPath}`
        // Check to make sure path has the / at the beginning

        const user = await prisma.user.update({
            data: {
                name,
                pfpPath,
                updatedAt: new Date()
            },
            where: { id }
        })

        return user
    }

    delete = async (id: string) => {
        const user = await this.findByIdOrThrow(id)

        await prisma.user.delete({
            where: { id }
        })

        return user
    }
}

export { UserService }
