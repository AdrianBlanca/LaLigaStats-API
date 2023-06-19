import * as Scrapper from '../Scrapper/Scrapper.js'

export const FillGames = async () => {
    let result = await Scrapper.FillGames()

    return result
}

export const GetStats = async (stat) => {
    let result = await Scrapper.GetStats(stat)

    return result
}

export const GetStandings = async () => {
    let result = await Scrapper.GetStandings()

    return result
}