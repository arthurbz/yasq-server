import { ResourceOrigin } from "./ResourceOrigin.js"

interface SearchItemOption {
    id: string
    source: ResourceOrigin
    author: string
    title: string
    thumbnail: string
}

export { SearchItemOption }
