import { Router } from "express"
import { SearchController } from "../controllers/SearchController.js"

const searchController = new SearchController()
const searchRouter = Router()

searchRouter.get("/youtube", searchController.youtubeSearch)

export { searchRouter }
