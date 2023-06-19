import * as MatchRepository from '../Data/Repositories/MatchRepository.js'
import * as Context from '../Data/Context/Context.js'

export const GetGoals = async (hostTeam, awayTeam) => {
    var host = await MatchRepository.GetTeam(hostTeam)
    var away = await MatchRepository.GetTeam(awayTeam)
    var goals = await MatchRepository.GetGoals(host, away)

    return goals
}