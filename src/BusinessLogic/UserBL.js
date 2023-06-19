import * as UserRepository from '../Data/Repositories/UserRepository.js'
import * as Context from '../Data/Context/Context.js'

export const RegisterUser = async (data) => {
    var entity = Context.UserEntity.build({Name: data.Name, Password: data.Password, Email: data.Email})
    entity = await UserRepository.RegisterUser(entity)

    return entity
}

export const UpdateUser = async (data) => {
    var entity = await UserRepository.GetUser(data)
    if(data.Team != null)
        entity.Team = data.Team

    else
        entity.Team = null

    entity = await UserRepository.UpdateUser(entity)

    return entity
}

export const RequestLogin = async (data) => {
    var entity = Context.UserEntity.build(data)
    var login = await UserRepository.RequestLogin(entity)

    return login != null ? true:false
}

export const CheckMail = async (data) => {
    var entity = Context.UserEntity.build(data)
    var checkMail = await UserRepository.CheckMail(entity)

    return checkMail != null ? true:false
}

export const GetFavouriteTeam = async (data) => {
    var entity = Context.UserEntity.build(data)
    var getFavouriteTeam = await UserRepository.GetFavouriteTeam(entity)

    return getFavouriteTeam
}

export const GetData = async (data) => {
    var entity = Context.UserEntity.build(data)
    var data = await UserRepository.GetData(entity)

    return data
}

export const GetFavouriteTeamID = async (data) => {
    var entity = Context.UserEntity.build(data)
    var id = await UserRepository.GetFavouriteTeamID(entity)

    return id
}