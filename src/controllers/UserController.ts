import { Request, Response } from "express"
import { UserService } from "../services/UserService.js"
import { UnprocessableEntity } from "../types/exceptions/UnprocessableEntity.js"

class UserController {
    userService = UserService.getInstance()

    create = async (req: Request, res: Response) => {
        const { name } = req.body

        if (!name)
            throw new UnprocessableEntity("Missing name to create user.")

        const searchResults = await this.userService.create(name)

        res.status(200).send(searchResults)
    }
}

export { UserController }
