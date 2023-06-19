import * as Context from '../Context/Context.js'


export const RegisterUser = async (entity) => {
    await entity.save()

    return entity
} 

export const UpdateUser = async (entity) => {
    await entity.save()

    return entity
}

export const RequestLogin = async (entity) => {
    var login = await Context.UserEntity.findOne({where : {Email : entity.Email, Password : entity.Password}})

    return login
}

export const CheckMail = async (entity) => {
    var checkMail = await Context.UserEntity.findOne({where : {Email : entity.Email}})

    return checkMail
}

export const GetFavouriteTeam = async (entity) => {
    var user = await Context.UserEntity.findOne({where : {Email : entity.Email}})
    var team = await user.Team

    return team
}

export const GetData = async (entity) => {
    var user = await Context.UserEntity.findOne({where : {Email : entity.Email}})

    let data = {
        Name : await user.Name,
        Email : await user.Email,
        Team : await user.Team
    }

    return data
}

export const GetUser = async (entity) => {
    var user = await Context.UserEntity.findOne({where : {Email : entity.Email}})

    return user
}

export const GetFavouriteTeamID = async (entity) => {
    var user = await Context.UserEntity.findOne({where : {Email : entity.Email}})
    var team = await user.Team
    let teamObject = {
        Team : team
    }
    var teamEntity = Context.TeamEntity.build(teamObject)
    var favouriteTeam = await Context.TeamEntity.findOne({where : {Team : teamEntity.Team}})
    var id = favouriteTeam != null ? await favouriteTeam.ID:-1

    return id
}