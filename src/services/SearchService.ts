import { google } from "googleapis"
import { BadRequest } from "../types/exceptions/BadRequest.js"
import { SearchItemOption } from "../types/SearchItemOption.js"

class SearchService {
    private static instance: SearchService | undefined

    private constructor() { }

    public static getInstance = () => {
        if (this.instance)
            return this.instance

        this.instance = new SearchService()
        return this.instance
    }

    youtubeSearch = async (query: string): Promise<SearchItemOption[]> => {
        /*
            Help: https://developers.google.com/youtube/v3/docs/search/list
            videoCategoryId: 10 = Music
            videoSyndicated: true = Only videos that can be played outside YouTube
        */
        const response = await google.youtube("v3").search.list({
            auth: process.env.YOUTUBE_DATA_V3_API_KEY,
            q: query,
            part: ["id", "snippet"],
            maxResults: 10,
            type: ["video"],
            order: "relevance",
            safeSearch: "moderate",
            videoSyndicated: "true",
            videoCategoryId: "10"
        }).catch(() => {
            throw new BadRequest("Server was not able to search for any songs.")
        })

        if (response.status !== 200 || response.data.items?.length === 0)
            throw new BadRequest("No songs were found for this query.")

        return response.data.items.map(item => {
            return {
                id: item.id.videoId,
                source: "youtube",
                name: item.snippet.title,
                artist: item.snippet.channelTitle,
                thumbnail: item.snippet.thumbnails.high.url
            }
        })
    }
}

export { SearchService }
