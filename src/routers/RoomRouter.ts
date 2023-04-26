import { Router } from "express"
import { RoomController } from "../controllers/RoomController.js"

const roomController = new RoomController()
const roomRouter = Router()

roomRouter.post("/create", roomController.create)
roomRouter.post("/create/random", roomController.createWithRandomUser)
roomRouter.get("/find/:id", roomController.findById)
roomRouter.put("/update", roomController.update)
roomRouter.delete("/delete/:id", roomController.delete)

export { roomRouter }
