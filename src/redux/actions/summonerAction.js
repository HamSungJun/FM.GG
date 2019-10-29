export const summonerSearch = "summonerSearch"

export const summonerSearchAction = (summonerName) => {
    return {
        type : "summonerSearch",
        summonerName : summonerName
    }
}