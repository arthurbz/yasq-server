import { Router } from "express"
import { SongController } from "../controllers/SongController.js"

const searchController = new SongController()
const songRouter = Router()

songRouter.post("/add", searchController.add)
songRouter.get("/find/room/:roomId", searchController.findSongsInRoom)
songRouter.delete("/remove/:id", searchController.remove)

export { songRouter }
