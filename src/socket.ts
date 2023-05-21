import { io } from "./app.js"
import { RoomMultiton } from "./room/RoomMultiton.js"

io.on("connection", socket => {
    socket.on("joinRoom", (action, callback) => {
        console.log(action)
        const roomId = action.roomId
        if (!roomId) return

        const room = RoomMultiton.getInstance(roomId)

        socket.join(roomId)
        io.in(roomId).emit("userJoined", action)
        callback()

        console.log("User is joining - Room:", room.id)
    })

    socket.on("play", action => {
        const roomId = action.roomId
        if (!roomId) return

        const room = RoomMultiton.getInstance(roomId)
        room.play()
        io.in(room.id).emit("play")
        io.in(roomId).emit("stateChanged", action)

        console.log("Play - Room:", room.id)
    })

    socket.on("pause", action => {
        const roomId = action.roomId
        if (!roomId) return

        const room = RoomMultiton.getInstance(roomId)
        room.pause()
        io.in(room.id).emit("pause")

        console.log("Pause - Room:", room.id)
    })

    socket.on("sendMessage", message => {
        io.in(message.roomId).emit("textMessage", message)
    })

    socket.on("currentState", roomId => {
        if (!roomId) return

        const room = RoomMultiton.getInstance(roomId)
        socket.emit("currentState", room.getState())
    })
})
