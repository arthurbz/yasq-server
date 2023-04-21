import { ResourceOrigin } from "./ResourceOrigin.js"

interface Song {
    originId: string
    source: ResourceOrigin
    artist: string
    name: string
    thumbnail: string
}

export { Song }
