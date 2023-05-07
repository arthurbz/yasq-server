import { Router } from "express"
import { ParticipationController } from "../controllers/ParticipationController.js"

const participationController = new ParticipationController()
const participationRouter = Router()

participationRouter.post("/join", participationController.join)
participationRouter.get("/find/room/:roomId", participationController.findRoomParticipants)
participationRouter.delete("/leave/:id", participationController.leave)

export { participationRouter }
