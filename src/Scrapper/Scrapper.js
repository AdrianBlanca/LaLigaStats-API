import rp from 'request-promise'
import $, { text } from 'cheerio'
const url = 'https://resultados.as.com/resultados/futbol/primera/jornada/?omnil=mpal'
//const url = 'https://resultados.as.com/resultados/futbol/primera/2022_2023/jornada/regular_a_27/'

export const FillGames = async() => {
    let html = await rp(url)

    const host = []
    const away = []
    const info = []
    const result = []
    let matchday

    matchday = $('.cont-paginador > .info > .form-control > .tit-jornada', html).text().replace("Jornada ", "")

    $('.equipo-local > a > .nombre-equipo', html).each((index, el) => {
        let team = {
            id : index,
            name : $(el).text()
        }

        host.push(team)
    })

    //console.log(host)

    $('.equipo-visitante > a > .nombre-equipo', html).each((index, el) => {
        let team = {
            id : index,
            name : $(el).text()
        }

        away.push(team)
    })

    //console.log(away)

    let n = 0

    $('.list-resultado > .finalizado', html).each((index, el) => {
        let matchInfo = {
            id : n,
            description : $(el).text().trim().replace(/\s+/g, ""),
            playing: false
        }

        n++
        info.push(matchInfo)

    }) 

    $('.list-resultado > .comenzado', html).each((index, el) => {
        let matchInfo = {
            id : n,
            description : $(el).text().trim().replace(/\s+/g, ""),
            playing: true
        }

        n++
        info.push(matchInfo)

    })

    $('.list-resultado > .no-comenzado', html).each((index, el) => {
        let date

        $('.info-evento-int > .bullet-list > .cont-fecha > a > .fecha', $(el).next().next()).each((index, el) => {
             date = $(el).text()

        })
        let matchInfo = {
            id : n,
            description : date,
            playing: false
        }

        n++
        info.push(matchInfo)

    })

    for(let i = 0; i < info.length; i++) {
        let summary = {
            id : i,
            matchday : matchday,
            host : host.find(el => el.id == i).name,
            away : away.find(el => el.id == i).name,
            info : info.find(el => el.id == i).description,
            playing : info.find(el => el.id == i).playing
        }

        result.push(summary)
    }

    return result   
}

export const GetGoals = async (host, away) => {
    let url2 = `https://www.resultados-futbol.com/partido/${host}/${away}`
    let html = await rp(url2)

    const goals = []

    $('.match-header-resume > table > tbody > tr', html).each((index, el) => {
        let td = $('td', el).toArray()

        let object = {
            id: index,
            goalscorerHost: $(td[2]).hasClass("gol-pp") ? $(td[0]).text() + " (PP)" : $(td[0]).text(),
            minuteHost: $(td[1]).text(),
            info: $(td[3]).text(),
            minuteAway: $(td[5]).text(),
            goalscorerAway: $(td[6]).text()
        }

        goals.push(object)

    })

    return goals
}

export const GetStats = async (stat) => {
    let url2 = `https://resultados.as.com/resultados/futbol/primera/2022_2023/ranking/jugadores/${stat}/`

    let html = await rp(url2)

    const positions = []
    const names = []
    const quantities = []
    const stats = []

    $('.rankings-table > table > tbody > tr > .position', html).each((index, el) => {
        let position = {
            id : index,
            position : $(el).text().trim()
        }

        positions.push(position)

    })

    $('.rankings-table > table > tbody > tr > .col-imp > a > div > .name', html).each((index, el) => {
        let name = {
            id: index,
            name: $(el).text()
        }

        names.push(name)

    })

    $('.rankings-table > table > tbody > tr > .cantidad', html).each((index, el) => {
        let statNumber = {
            id: index,
            statNumber: $(el).text().replace(/[a-zA-Z\s]/g, "")
        }

        quantities.push(statNumber)

    })

    for(let i = 0; i < positions.length; i++) {
        let summary = {
            id : i,
            position : positions.find(el => el.id == i).position,
            name : names.find(el => el.id == i).name,
            quantity : quantities.find(el => el.id == i).statNumber
        }

        stats.push(summary)
    }

    return stats
}

export const GetStandings = async () => {
    let url2 = 'https://resultados.as.com/resultados/futbol/primera/clasificacion/?omnil=mpal'
    let html = await rp(url2)

    const namePosition = []
    const numbers = []
    const standings = []

    $('.clasificacion-total > .cont-modulo > .cont-clasificacion > .tabla-datos > tbody > tr > th > a > .nombre-equipo', html).each((index, el) => {
        let team = {
            id : index,
            position : index + 1,
            name : $(el).text()
        }

        namePosition.push(team)
    })

    $('.clasificacion-total > .cont-modulo > .cont-clasificacion > .tabla-datos > tbody > tr', html).each((index, el) => {
        let td = $('td', el).toArray()

        let object = {
            id : index,
            pts : $(td[0]).text(),
            pj : $(td[1]).text(),
            pg : $(td[2]).text(),
            pe : $(td[3]).text(),
            pp : $(td[4]).text(),
            gf : $(td[5]).text(),
            gc : $(td[6]).text()
        }

        numbers.push(object)
    })

    for(let i = 0; i < namePosition.length; i++) {
        let object = {
            id : i,
            position : namePosition.find(el => el.id == i).position,
            name : namePosition.find(el => el.id == i).name,
            pts : numbers.find(el => el.id == i).pts,
            pj : numbers.find(el => el.id == i).pj,
            pg : numbers.find(el => el.id == i).pg,
            pe : numbers.find(el => el.id == i).pe,
            pp : numbers.find(el => el.id == i).pp,
            gf : numbers.find(el => el.id == i).gf,
            gc : numbers.find(el => el.id == i).gc
        }

        standings.push(object)
    }

    return standings
}