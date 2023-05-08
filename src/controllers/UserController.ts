import { Request, Response } from "express"
import { UserService } from "../services/UserService.js"
import { UnprocessableEntity } from "../types/exceptions/UnprocessableEntity.js"

class UserController {
    userService = UserService.getInstance()

    create = async (req: Request, res: Response) => {
        const { name, pfpPath } = req.body

        if (!name)
            throw new UnprocessableEntity("Missing name to create user.")

        const user = await this.userService.create({ name, pfpPath })

        res.status(201).send({ id: user.id })
    }

    createRandomuser = async (req: Request, res: Response) => {
        const user = await this.userService.createRandomUser()

        res.status(201).send({ id: user.id })
    }

    findById = async (req: Request, res: Response) => {
        const { id } = req.params

        if (!id)
            throw new UnprocessableEntity("Missing id to find user.")

        const user = await this.userService.findByIdOrThrow(id)

        res.status(200).send(user)
    }

    update = async (req: Request, res: Response) => {
        const { id, name, pfpPath } = req.body

        if (!id)
            throw new UnprocessableEntity("Missing user to update.")

        await this.userService.update({ id, name, pfpPath })

        res.status(204).send()
    }

    delete = async (req: Request, res: Response) => {
        const { id } = req.params

        if (!id)
            throw new UnprocessableEntity("Missing id to delete user.")

        await this.userService.delete(id)

        res.status(204).send()
    }
}

export { UserController }
