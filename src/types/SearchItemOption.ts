import { ResourceOrigin } from "./ResourceOrigin.js"

interface SearchItemOption {
    id: string
    source: ResourceOrigin
    artist: string
    name: string
    thumbnail: string
}

export { SearchItemOption }
