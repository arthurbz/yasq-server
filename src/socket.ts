import { io } from "./app.js"
import { RoomMultiton } from "./room/RoomMultiton.js"
import { Message } from "./types/models/Message.js"

io.on("connection", socket => {
    socket.on("joinRoom", (roomId: string) => {
        const room = RoomMultiton.getInstance(roomId)
        console.log("User is joining - Room:", room.id)
        socket.join(roomId)
    })

    socket.on("play", (roomId: string) => {
        const room = RoomMultiton.getInstance(roomId)
        room.play()
        io.in(room.id).emit("play")
        console.log("Play - Room:", room.id)
    })

    socket.on("pause", (roomId: string) => {
        const room = RoomMultiton.getInstance(roomId)
        room.pause()
        io.in(room.id).emit("pause")
        console.log("Pause - Room:", room.id)
    })

    socket.on("sendMessage", (message: Message) => {
        io.in(message.roomId).emit("receiveMessage", message)
    })

    socket.on("currentState", (roomId: string) => {
        const room = RoomMultiton.getInstance(roomId)
        socket.emit("currentState", room.getState())
    })
})
