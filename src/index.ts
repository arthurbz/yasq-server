import { server } from "./app.js"
import "./socket.js"
import dotenv from "dotenv"

dotenv.config()

server.listen(process.env.PORT, () => {
    console.log(`⚡⚡⚡Server listening at port ${process.env.PORT}`)
})
