import { Room } from "./Room.js"

class RoomMultiton {
    private static instances: Map<string, Room> = new Map()

    private constructor() { }

    public static getInstance(roomId: string): Room {
        if (!this.instances.has(roomId))
            this.instances.set(roomId, new Room(roomId))

        return this.instances.get(roomId)
    }

    public static removeInstance(roomId: string): void {
        this.instances.delete(roomId)
    }
}

export { RoomMultiton }
