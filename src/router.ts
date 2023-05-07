import { Router } from "express"
import { searchRouter } from "./routers/SearchRouter.js"
import { roomRouter } from "./routers/RoomRouter.js"
import { userRouter } from "./routers/UserRouter.js"
import { songRouter } from "./routers/SongRouter.js"
import { participationRouter } from "./routers/ParticipationRouter.js"

const router = Router()

router.use("/search", searchRouter)
router.use("/room", roomRouter)
router.use("/user", userRouter)
router.use("/song", songRouter)
router.use("/participation", participationRouter)

export { router }
