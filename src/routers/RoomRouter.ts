import { Router } from "express"
import { RoomController } from "../controllers/RoomController.js"

const roomController = new RoomController()
const roomRouter = Router()

roomRouter.post("/create", roomController.create)

export { roomRouter }
