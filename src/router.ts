import { Router } from "express"
import { searchRouter } from "./routers/SearchRouter.js"
import { roomRouter } from "./routers/RoomRouter.js"
import { userRouter } from "./routers/UserRouter.js"

const router = Router()

router.use("/search", searchRouter)
router.use("/room", roomRouter)
router.use("/user", userRouter)

export { router }
