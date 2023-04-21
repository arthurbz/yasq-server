import { Router } from "express"
import { SongController } from "../controllers/SongController.js"

const searchController = new SongController()
const songRouter = Router()

songRouter.post("/add", searchController.add)

export { songRouter }
