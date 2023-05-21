import { ResourceOrigin } from "../ResourceOrigin.js"

interface Song {
    id?: string
    originId: string
    source: ResourceOrigin
    artist: string
    name: string
    thumbnail: string
}

export { Song }
