import "express-async-errors"
import express from "express"
import cors from "cors"
import { router } from "./router.js"
import { errorHandler } from "./middlewares/ErrorHandler.js"
import { Server } from "socket.io"
import { createServer } from "http"
import { ClientToServerEvents, ServerToClientEvents } from "./types/SocketEvents.js"

const app = express()

app.use(express.static("public"))
app.use(cors({ origin: "*" }))
app.use(express.json())
app.use(router)
app.use(errorHandler)

const server = createServer(app)
const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, { cors: { origin: "*" } })

export { server, io }
