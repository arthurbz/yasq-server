import { io } from "./app.js"

io.on("connection", socket => {
    console.log("Hello world! Someone has connected", socket.id)
})
