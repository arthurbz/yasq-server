import { Request, Response } from "express"
import { getFirstOnlyFromQueryParams } from "../utils/QueryParamsUtils.js"
import { SearchService } from "../services/SearchService.js"

class SearchController {
    searchService = SearchService.getInstance()

    youtubeSearch = async (req: Request, res: Response) => {
        const { query } = req.query
        const querySearch = getFirstOnlyFromQueryParams(query)

        const searchResults = await this.searchService.youtubeSearch(querySearch)
        // const searchResults = [{"originId":"c0-hvjV2A5Y","source":"youtube","name":"Fred again.. | Boiler Room: London","artist":"Boiler Room","thumbnail":"https://i.ytimg.com/vi/c0-hvjV2A5Y/hqdefault.jpg"},{"originId":"4iQmPv_dTI0","source":"youtube","name":"Fred again..: Tiny Desk Concert","artist":"NPR Music","thumbnail":"https://i.ytimg.com/vi/4iQmPv_dTI0/hqdefault.jpg"},{"originId":"O3OrcOr67sM","source":"youtube","name":"Fred again.. - Studio Live 3 (London, 9 November 2022)","artist":"Fred again . .","thumbnail":"https://i.ytimg.com/vi/O3OrcOr67sM/hqdefault.jpg"},{"originId":"H2I6V0NlaHg","source":"youtube","name":"Fred again.. - Studio Live (London, April 2021)","artist":"Fred again . .","thumbnail":"https://i.ytimg.com/vi/H2I6V0NlaHg/hqdefault.jpg"},{"originId":"l4UkYBr1NnA","source":"youtube","name":"Fred again.. feat. The Blessed Madonna - Marea (We’ve Lost Dancing) (Official Audio)","artist":"Fred again . .","thumbnail":"https://i.ytimg.com/vi/l4UkYBr1NnA/hqdefault.jpg"},{"originId":"ahe9baHOWIg","source":"youtube","name":"Four Tet, Fred Again.. &amp; Skrillex live from Times Square for @TheLotRadio","artist":"The Lot Radio","thumbnail":"https://i.ytimg.com/vi/ahe9baHOWIg/hqdefault.jpg"},{"originId":"XpBRuwK5aN4","source":"youtube","name":"Fred again.. - Actual Life 2 Piano Live (20 March 2022)","artist":"Fred again . .","thumbnail":"https://i.ytimg.com/vi/XpBRuwK5aN4/hqdefault.jpg"},{"originId":"ARYM9ebZ6r8","source":"youtube","name":"Fred again.. - Bleu (better with time) [Official Video]","artist":"Fred again . .","thumbnail":"https://i.ytimg.com/vi/ARYM9ebZ6r8/hqdefault.jpg"},{"originId":"zeD0g5xXo7E","source":"youtube","name":"Fred again..: &#39;Actual Life 3&#39;, Boiler Room, and Creative Process | Apple Music","artist":"Apple Music","thumbnail":"https://i.ytimg.com/vi/zeD0g5xXo7E/hqdefault.jpg"},{"originId":"DjmKjINRVwo","source":"youtube","name":"Fred again.. - Marea (We’ve Lost Dancing)","artist":"SubSoul","thumbnail":"https://i.ytimg.com/vi/DjmKjINRVwo/hqdefault.jpg"}]

        res.status(200).send(searchResults)
    }
}

export { SearchController }
