import { Router } from "express"
import { searchRouter } from "./routers/SearchRouter.js"
import { roomRouter } from "./routers/RoomRouter.js"

const router = Router()

router.use("/search", searchRouter)
router.use("/room", roomRouter)

export { router }
