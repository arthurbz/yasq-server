import { google } from "googleapis"
import { BadRequest } from "../types/exceptions/BadRequest"

class SearchService {
    private static instance: SearchService | undefined

    private constructor() { }

    public static getInstance = () => {
        if (this.instance)
            return this.instance

        this.instance = new SearchService()
        return this.instance
    }

    youtubeSearch = async (query: string) => {
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
            throw new BadRequest("Server was not able to search for any videos")
        })

        if (response.status !== 200 || response.data.items?.length === 0)
            throw new BadRequest("No videos were found for this query")

        return response.data.items.map(item => {
            return {
                videoId: item.id.videoId,
                title: item.snippet.title,
                channelTitle: item.snippet.channelTitle,
                thumbnail: item.snippet.thumbnails.high
            }
        })
    }
}

export { SearchService }
