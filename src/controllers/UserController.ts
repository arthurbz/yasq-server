import { Request, Response } from "express"
import { UserService } from "../services/UserService.js"
import { UnprocessableEntity } from "../types/exceptions/UnprocessableEntity.js"

class UserController {
    userService = UserService.getInstance()

    create = async (req: Request, res: Response) => {
        const { name } = req.body

        if (!name)
            throw new UnprocessableEntity("Missing name to create user.")

        const user = await this.userService.create(name)

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
        const { id, name } = req.body

        if (!id || !name)
            throw new UnprocessableEntity("Need id and name to update user.")

        await this.userService.update(id, name)

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
