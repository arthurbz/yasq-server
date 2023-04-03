export function getFirstOnlyFromQueryParams(entry: unknown): string | undefined {
    // Returns only the first match from a Query Param
    if (typeof entry === "string")
        return entry

    if (Array.isArray(entry) && entry[0] === "string")
        return entry[0]

    return undefined
}
