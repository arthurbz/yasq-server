import { Request, Response } from "express"
import { getFirstOnlyFromQueryParams } from "../utils/QueryParamsUtils"
import { SearchService } from "../services/SearchService"

class SearchController {
    searchService = SearchService.getInstance()

    youtubeSearch = async (req: Request, res: Response) => {
        const { query } = req.query
        const querySearch = getFirstOnlyFromQueryParams(query)

        const searchResults = await this.searchService.youtubeSearch(querySearch)

        res.status(200).send(searchResults)
    }
}

export { SearchController }
