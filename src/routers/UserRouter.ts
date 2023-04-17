import { Router } from "express"
import { UserController } from "../controllers/UserController.js"

const userController = new UserController()
const userRouter = Router()

userRouter.post("/create", userController.create)
userRouter.get("/find/:id", userController.findById)
userRouter.put("/update", userController.update)
userRouter.delete("/delete/:id", userController.delete)

export { userRouter }
