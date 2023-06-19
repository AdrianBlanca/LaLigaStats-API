import * as Context from '../Context/Context.js'
import * as Scrapper from '../../Scrapper/Scrapper.js'

export const GetTeam = async (name) => {
    var team = await Context.TeamEntity.findOne({where : {Team : name}})
    var result = await team.ResultsName

    return result
}

export const GetGoals = async (host, away) => {
    let result = await Scrapper.GetGoals(host, away)

    return result
}