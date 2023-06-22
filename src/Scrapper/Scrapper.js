import rp from 'request-promise'
import $, { text } from 'cheerio'
//const url = 'https://resultados.as.com/resultados/futbol/primera/jornada/?omnil=mpal'
const url = 'https://resultados.as.com/resultados/futbol/primera/2022_2023/jornada/regular_a_27/'

export const FillGames = () => {
    const result = [
        {
            "id": 0,
            "matchday": 38,
            "host": "Mallorca",
            "away": "Rayo",
            "info": "3-0",
            "playing": false
        },
        {
            "id": 1,
            "matchday": 38,
            "host": "Osasuna",
            "away": "Girona",
            "info": "2-1",
            "playing": false
        },
        {
            "id": 2,
            "matchday": 38,
            "host": "Real Madrid",
            "away": "Athletic",
            "info": "1-1",
            "playing": false
        },
        {
            "id": 3,
            "matchday": 38,
            "host": "R. Sociedad",
            "away": "Sevilla",
            "info": "2-1",
            "playing": false
        },
        {
            "id": 4,
            "matchday": 38,
            "host": "Villarreal",
            "away": "Atlético",
            "info": "2-2",
            "playing": false
        },
        {
            "id": 5,
            "matchday": 38,
            "host": "Celta",
            "away": "Barcelona",
            "info": "2-1",
            "playing": false
        },
        {
            "id": 6,
            "matchday": 38,
            "host": "Elche",
            "away": "Cádiz",
            "info": "1-1",
            "playing": false
        },
        {
            "id": 7,
            "matchday": 38,
            "host": "Espanyol",
            "away": "Almería",
            "info": "3-3",
            "playing": false
        },
        {
            "id": 8,
            "matchday": 38,
            "host": "Betis",
            "away": "Valencia",
            "info": "1-1",
            "playing": false
        },
        {
            "id": 9,
            "matchday": 38,
            "host": "Real Valladolid",
            "away": "Getafe",
            "info": "0-0",
            "playing": false
        }
    ]

    return result
}

// export const FillGames = async() => {
//     let html = await rp(url)

//     const host = []
//     const away = []
//     const info = []
//     const result = []
//     let matchday

//     matchday = $('.cont-paginador > .info > .form-control > .tit-jornada', html).text().replace("Jornada ", "")

//     $('.equipo-local > a > .nombre-equipo', html).each((index, el) => {
//         let team = {
//             id : index,
//             name : $(el).text()
//         }

//         host.push(team)
//     })

//     //console.log(host)

//     $('.equipo-visitante > a > .nombre-equipo', html).each((index, el) => {
//         let team = {
//             id : index,
//             name : $(el).text()
//         }

//         away.push(team)
//     })

//     //console.log(away)

//     let n = 0

//     $('.list-resultado > .finalizado', html).each((index, el) => {
//         let matchInfo = {
//             id : n,
//             description : $(el).text().trim().replace(/\s+/g, ""),
//             playing: false
//         }

//         n++
//         info.push(matchInfo)

//     }) 

//     $('.list-resultado > .comenzado', html).each((index, el) => {
//         let matchInfo = {
//             id : n,
//             description : $(el).text().trim().replace(/\s+/g, ""),
//             playing: true
//         }

//         n++
//         info.push(matchInfo)

//     })

//     $('.list-resultado > .no-comenzado', html).each((index, el) => {
//         let date

//         $('.info-evento-int > .bullet-list > .cont-fecha > a > .fecha', $(el).next().next()).each((index, el) => {
//             date = $(el).text()

//         })
//         let matchInfo = {
//             id : n,
//             description : date,
//             playing: false
//         }

//         n++
//         info.push(matchInfo)

//     })

//     for(let i = 0; i < info.length; i++) {
//         let summary = {
//             id : i,
//             matchday : matchday,
//             host : host.find(el => el.id == i).name,
//             away : away.find(el => el.id == i).name,
//             info : info.find(el => el.id == i).description,
//             playing : info.find(el => el.id == i).playing
//         }

//         result.push(summary)
//     }

//     return result   
// }

// export const GetGoals = () => {
//     const result = [
//         {
//             "id": 0,
//             "goalscorerHost": "",
//             "minuteHost": "",
//             "info": "0 - 1",
//             "minuteAway": "49'",
//             "goalscorerAway": "Oihan Sancet"
//         },
//         {
//             "id": 1,
//             "goalscorerHost": "K. Benzema",
//             "minuteHost": "72'",
//             "info": "1 - 1",
//             "minuteAway": "",
//             "goalscorerAway": ""
//         }
//     ]

//     return result
// }

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

// export const GetStats = () => {
//     const result = [
//         {
//             "id": 0,
//             "position": "1",
//             "name": "Lewandowski",
//             "quantity": "23"
//         },
//         {
//             "id": 1,
//             "position": "2",
//             "name": "Benzema",
//             "quantity": "19"
//         },
//         {
//             "id": 2,
//             "position": "3",
//             "name": "Joselu",
//             "quantity": "16"
//         },
//         {
//             "id": 3,
//             "position": "4",
//             "name": "Muriqi",
//             "quantity": "15"
//         },
//         {
//             "id": 4,
//             "position": "",
//             "name": "Borja Iglesias",
//             "quantity": "15"
//         },
//         {
//             "id": 5,
//             "position": "",
//             "name": "Griezmann",
//             "quantity": "15"
//         },
//         {
//             "id": 6,
//             "position": "5",
//             "name": "Enes Ünal",
//             "quantity": "14"
//         },
//         {
//             "id": 7,
//             "position": "6",
//             "name": "Morata",
//             "quantity": "13"
//         },
//         {
//             "id": 8,
//             "position": "",
//             "name": "Valentín Castellanos",
//             "quantity": "13"
//         },
//         {
//             "id": 9,
//             "position": "7",
//             "name": "Aspas",
//             "quantity": "12"
//         },
//         {
//             "id": 10,
//             "position": "",
//             "name": "Sörloth",
//             "quantity": "12"
//         },
//         {
//             "id": 11,
//             "position": "",
//             "name": "Nicolas Jackson",
//             "quantity": "12"
//         },
//         {
//             "id": 12,
//             "position": "8",
//             "name": "Gabriel Veiga",
//             "quantity": "11"
//         },
//         {
//             "id": 13,
//             "position": "9",
//             "name": "O. Sancet",
//             "quantity": "10"
//         },
//         {
//             "id": 14,
//             "position": "",
//             "name": "Vinicius Junior",
//             "quantity": "10"
//         },
//         {
//             "id": 15,
//             "position": "",
//             "name": "Williams",
//             "quantity": "10"
//         },
//         {
//             "id": 16,
//             "position": "",
//             "name": "Braithwaite",
//             "quantity": "10"
//         },
//         {
//             "id": 17,
//             "position": "10",
//             "name": "Stuani",
//             "quantity": "9"
//         },
//         {
//             "id": 18,
//             "position": "",
//             "name": "Marco Asensio",
//             "quantity": "9"
//         },
//         {
//             "id": 19,
//             "position": "",
//             "name": "Correa",
//             "quantity": "9"
//         },
//         {
//             "id": 20,
//             "position": "",
//             "name": "Isi",
//             "quantity": "9"
//         },
//         {
//             "id": 21,
//             "position": "",
//             "name": "Rodrygo",
//             "quantity": "9"
//         },
//         {
//             "id": 22,
//             "position": "",
//             "name": "Take Kubo",
//             "quantity": "9"
//         },
//         {
//             "id": 23,
//             "position": "11",
//             "name": "Chimy Ávila",
//             "quantity": "8"
//         },
//         {
//             "id": 24,
//             "position": "",
//             "name": "Mayoral",
//             "quantity": "8"
//         },
//         {
//             "id": 25,
//             "position": "",
//             "name": "Ante Budimir",
//             "quantity": "8"
//         },
//         {
//             "id": 26,
//             "position": "",
//             "name": "En-Nesyri",
//             "quantity": "8"
//         },
//         {
//             "id": 27,
//             "position": "",
//             "name": "Brais",
//             "quantity": "8"
//         },
//         {
//             "id": 28,
//             "position": "",
//             "name": "Cyle Larin",
//             "quantity": "8"
//         },
//         {
//             "id": 29,
//             "position": "12",
//             "name": "Carrasco",
//             "quantity": "7"
//         },
//         {
//             "id": 30,
//             "position": "",
//             "name": "Ansu Fati",
//             "quantity": "7"
//         },
//         {
//             "id": 31,
//             "position": "",
//             "name": "Lucas Boyé",
//             "quantity": "7"
//         },
//         {
//             "id": 32,
//             "position": "",
//             "name": "Javi Puado",
//             "quantity": "7"
//         },
//         {
//             "id": 33,
//             "position": "",
//             "name": "Federico Valverde",
//             "quantity": "7"
//         },
//         {
//             "id": 34,
//             "position": "",
//             "name": "Gerard Moreno",
//             "quantity": "7"
//         },
//         {
//             "id": 35,
//             "position": "",
//             "name": "Morales",
//             "quantity": "7"
//         },
//         {
//             "id": 36,
//             "position": "",
//             "name": "Raphinha",
//             "quantity": "7"
//         },
//         {
//             "id": 37,
//             "position": "",
//             "name": "El Bilal Toure",
//             "quantity": "7"
//         },
//         {
//             "id": 38,
//             "position": "13",
//             "name": "Nico Williams",
//             "quantity": "6"
//         },
//         {
//             "id": 39,
//             "position": "",
//             "name": "Darder",
//             "quantity": "6"
//         },
//         {
//             "id": 40,
//             "position": "",
//             "name": "Pedri",
//             "quantity": "6"
//         },
//         {
//             "id": 41,
//             "position": "",
//             "name": "Pere Milla",
//             "quantity": "6"
//         },
//         {
//             "id": 42,
//             "position": "",
//             "name": "Lee Kang-In",
//             "quantity": "6"
//         },
//         {
//             "id": 43,
//             "position": "",
//             "name": "Chukwueze",
//             "quantity": "6"
//         },
//         {
//             "id": 44,
//             "position": "",
//             "name": "Sergio León",
//             "quantity": "6"
//         },
//         {
//             "id": 45,
//             "position": "",
//             "name": "Lamela",
//             "quantity": "6"
//         },
//         {
//             "id": 46,
//             "position": "",
//             "name": "Rafa Mir",
//             "quantity": "6"
//         },
//         {
//             "id": 47,
//             "position": "",
//             "name": "Álex Baena",
//             "quantity": "6"
//         },
//         {
//             "id": 48,
//             "position": "",
//             "name": "Guruzeta",
//             "quantity": "6"
//         },
//         {
//             "id": 49,
//             "position": "",
//             "name": "Samuel Lino",
//             "quantity": "6"
//         },
//         {
//             "id": 50,
//             "position": "",
//             "name": "Sergio Camello",
//             "quantity": "6"
//         },
//         {
//             "id": 51,
//             "position": "",
//             "name": "Justin Kluivert",
//             "quantity": "6"
//         },
//         {
//             "id": 52,
//             "position": "",
//             "name": "Lazaro",
//             "quantity": "6"
//         },
//         {
//             "id": 53,
//             "position": "14",
//             "name": "Ousmane Dembélé",
//             "quantity": "5"
//         },
//         {
//             "id": 54,
//             "position": "",
//             "name": "Álvaro García",
//             "quantity": "5"
//         },
//         {
//             "id": 55,
//             "position": "",
//             "name": "Eder Militao",
//             "quantity": "5"
//         },
//         {
//             "id": 56,
//             "position": "",
//             "name": "Leo Baptistao",
//             "quantity": "5"
//         },
//         {
//             "id": 57,
//             "position": "",
//             "name": "Cavani",
//             "quantity": "5"
//         },
//         {
//             "id": 58,
//             "position": "15",
//             "name": "João Félix",
//             "quantity": "4"
//         },
//         {
//             "id": 59,
//             "position": "",
//             "name": "Sergi Roberto",
//             "quantity": "4"
//         },
//         {
//             "id": 60,
//             "position": "",
//             "name": "Tete Morente",
//             "quantity": "4"
//         },
//         {
//             "id": 61,
//             "position": "",
//             "name": "Lucas Vázquez",
//             "quantity": "4"
//         },
//         {
//             "id": 62,
//             "position": "",
//             "name": "Oyarzabal",
//             "quantity": "4"
//         },
//         {
//             "id": 63,
//             "position": "",
//             "name": "Ferrán Torres",
//             "quantity": "4"
//         },
//         {
//             "id": 64,
//             "position": "",
//             "name": "Berenguer",
//             "quantity": "4"
//         },
//         {
//             "id": 65,
//             "position": "",
//             "name": "Ezequiel Ponce",
//             "quantity": "4"
//         },
//         {
//             "id": 66,
//             "position": "",
//             "name": "Canales",
//             "quantity": "4"
//         },
//         {
//             "id": 67,
//             "position": "",
//             "name": "Juanmi",
//             "quantity": "4"
//         },
//         {
//             "id": 68,
//             "position": "",
//             "name": "Modric",
//             "quantity": "4"
//         },
//         {
//             "id": 69,
//             "position": "",
//             "name": "Yeremy Pino",
//             "quantity": "4"
//         },
//         {
//             "id": 70,
//             "position": "",
//             "name": "Lucas Ocampos",
//             "quantity": "4"
//         },
//         {
//             "id": 71,
//             "position": "",
//             "name": "Samu Castillejo",
//             "quantity": "4"
//         },
//         {
//             "id": 72,
//             "position": "",
//             "name": "Nahuel Molina",
//             "quantity": "4"
//         },
//         {
//             "id": 73,
//             "position": "",
//             "name": "Lejeune",
//             "quantity": "4"
//         },
//         {
//             "id": 74,
//             "position": "",
//             "name": "Rodrigo Riquelme",
//             "quantity": "4"
//         },
//         {
//             "id": 75,
//             "position": "",
//             "name": "Embarba",
//             "quantity": "4"
//         },
//         {
//             "id": 76,
//             "position": "",
//             "name": "T. Bongonda",
//             "quantity": "4"
//         },
//         {
//             "id": 77,
//             "position": "",
//             "name": "Jorgen Strand Larsen",
//             "quantity": "4"
//         },
//         {
//             "id": 78,
//             "position": "",
//             "name": "Gonzalo Melero",
//             "quantity": "4"
//         },
//         {
//             "id": 79,
//             "position": "",
//             "name": "Abde",
//             "quantity": "4"
//         },
//         {
//             "id": 80,
//             "position": "",
//             "name": "De Tomás",
//             "quantity": "4"
//         },
//         {
//             "id": 81,
//             "position": "",
//             "name": "Luis Suárez ",
//             "quantity": "4"
//         },
//         {
//             "id": 82,
//             "position": "",
//             "name": "Depay",
//             "quantity": "4"
//         },
//         {
//             "id": 83,
//             "position": "",
//             "name": "Escalante",
//             "quantity": "4"
//         },
//         {
//             "id": 84,
//             "position": "16",
//             "name": "Rubén Alcaraz",
//             "quantity": "3"
//         },
//         {
//             "id": 85,
//             "position": "",
//             "name": "Álex Fernández",
//             "quantity": "3"
//         },
//         {
//             "id": 86,
//             "position": "",
//             "name": "Rubén Sobrino",
//             "quantity": "3"
//         },
//         {
//             "id": 87,
//             "position": "",
//             "name": "Juan Miranda",
//             "quantity": "3"
//         },
//         {
//             "id": 88,
//             "position": "",
//             "name": "William Carvalho",
//             "quantity": "3"
//         },
//         {
//             "id": 89,
//             "position": "",
//             "name": "Vesga",
//             "quantity": "3"
//         },
//         {
//             "id": 90,
//             "position": "",
//             "name": "Mario Hermoso",
//             "quantity": "3"
//         },
//         {
//             "id": 91,
//             "position": "",
//             "name": "Lucas Pérez",
//             "quantity": "3"
//         },
//         {
//             "id": 92,
//             "position": "",
//             "name": "Joseph Aidoo",
//             "quantity": "3"
//         },
//         {
//             "id": 93,
//             "position": "",
//             "name": "Arnau Martinez",
//             "quantity": "3"
//         },
//         {
//             "id": 94,
//             "position": "",
//             "name": "Trejo",
//             "quantity": "3"
//         },
//         {
//             "id": 95,
//             "position": "",
//             "name": "Ramazani",
//             "quantity": "3"
//         },
//         {
//             "id": 96,
//             "position": "",
//             "name": "Fidel",
//             "quantity": "3"
//         },
//         {
//             "id": 97,
//             "position": "",
//             "name": "Dani",
//             "quantity": "3"
//         },
//         {
//             "id": 98,
//             "position": "",
//             "name": "Barrenetxea",
//             "quantity": "3"
//         },
//         {
//             "id": 99,
//             "position": "",
//             "name": "Monchu",
//             "quantity": "3"
//         }
//     ]

//     return result

// }

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

export const GetStandings = () => {
    const result = [
        {
            "id": 0,
            "position": 1,
            "name": "Barcelona",
            "pts": "88",
            "pj": "38",
            "pg": "28",
            "pe": "4 ",
            "pp": "6",
            "gf": "70",
            "gc": "20"
        },
        {
            "id": 1,
            "position": 2,
            "name": "Real Madrid",
            "pts": "78",
            "pj": "38",
            "pg": "24",
            "pe": "6 ",
            "pp": "8",
            "gf": "75",
            "gc": "36"
        },
        {
            "id": 2,
            "position": 3,
            "name": "Atlético",
            "pts": "77",
            "pj": "38",
            "pg": "23",
            "pe": "8 ",
            "pp": "7",
            "gf": "70",
            "gc": "33"
        },
        {
            "id": 3,
            "position": 4,
            "name": "R. Sociedad",
            "pts": "71",
            "pj": "38",
            "pg": "21",
            "pe": "8 ",
            "pp": "9",
            "gf": "51",
            "gc": "35"
        },
        {
            "id": 4,
            "position": 5,
            "name": "Villarreal",
            "pts": "64",
            "pj": "38",
            "pg": "19",
            "pe": "7 ",
            "pp": "12",
            "gf": "59",
            "gc": "40"
        },
        {
            "id": 5,
            "position": 6,
            "name": "Betis",
            "pts": "60",
            "pj": "38",
            "pg": "17",
            "pe": "9 ",
            "pp": "12",
            "gf": "46",
            "gc": "41"
        },
        {
            "id": 6,
            "position": 7,
            "name": "Osasuna",
            "pts": "53",
            "pj": "38",
            "pg": "15",
            "pe": "8 ",
            "pp": "15",
            "gf": "37",
            "gc": "42"
        },
        {
            "id": 7,
            "position": 8,
            "name": "Athletic",
            "pts": "51",
            "pj": "38",
            "pg": "14",
            "pe": "9 ",
            "pp": "15",
            "gf": "47",
            "gc": "43"
        },
        {
            "id": 8,
            "position": 9,
            "name": "Mallorca",
            "pts": "50",
            "pj": "38",
            "pg": "14",
            "pe": "8 ",
            "pp": "16",
            "gf": "37",
            "gc": "43"
        },
        {
            "id": 9,
            "position": 10,
            "name": "Girona",
            "pts": "49",
            "pj": "38",
            "pg": "13",
            "pe": "10 ",
            "pp": "15",
            "gf": "58",
            "gc": "55"
        },
        {
            "id": 10,
            "position": 11,
            "name": "Rayo",
            "pts": "49",
            "pj": "38",
            "pg": "13",
            "pe": "10 ",
            "pp": "15",
            "gf": "45",
            "gc": "53"
        },
        {
            "id": 11,
            "position": 12,
            "name": "Sevilla",
            "pts": "49",
            "pj": "38",
            "pg": "13",
            "pe": "10 ",
            "pp": "15",
            "gf": "47",
            "gc": "54"
        },
        {
            "id": 12,
            "position": 13,
            "name": "Celta",
            "pts": "43",
            "pj": "38",
            "pg": "11",
            "pe": "10 ",
            "pp": "17",
            "gf": "43",
            "gc": "53"
        },
        {
            "id": 13,
            "position": 14,
            "name": "Cádiz",
            "pts": "42",
            "pj": "38",
            "pg": "10",
            "pe": "12 ",
            "pp": "16",
            "gf": "30",
            "gc": "53"
        },
        {
            "id": 14,
            "position": 15,
            "name": "Getafe",
            "pts": "42",
            "pj": "38",
            "pg": "10",
            "pe": "12 ",
            "pp": "16",
            "gf": "34",
            "gc": "45"
        },
        {
            "id": 15,
            "position": 16,
            "name": "Valencia",
            "pts": "42",
            "pj": "38",
            "pg": "11",
            "pe": "9 ",
            "pp": "18",
            "gf": "42",
            "gc": "45"
        },
        {
            "id": 16,
            "position": 17,
            "name": "Almería",
            "pts": "41",
            "pj": "38",
            "pg": "11",
            "pe": "8 ",
            "pp": "19",
            "gf": "49",
            "gc": "65"
        },
        {
            "id": 17,
            "position": 18,
            "name": "Real Valladolid",
            "pts": "40",
            "pj": "38",
            "pg": "11",
            "pe": "7 ",
            "pp": "20",
            "gf": "33",
            "gc": "63"
        },
        {
            "id": 18,
            "position": 19,
            "name": "Espanyol",
            "pts": "37",
            "pj": "38",
            "pg": "8",
            "pe": "13 ",
            "pp": "17",
            "gf": "52",
            "gc": "69"
        },
        {
            "id": 19,
            "position": 20,
            "name": "Elche",
            "pts": "25",
            "pj": "38",
            "pg": "5",
            "pe": "10 ",
            "pp": "23",
            "gf": "30",
            "gc": "67"
        }
    ]

    return result

}

// export const GetStandings = async () => {
//     let url2 = 'https://resultados.as.com/resultados/futbol/primera/clasificacion/?omnil=mpal'
//     let html = await rp(url2)

//     const namePosition = []
//     const numbers = []
//     const standings = []

//     $('.clasificacion-total > .cont-modulo > .cont-clasificacion > .tabla-datos > tbody > tr > th > a > .nombre-equipo', html).each((index, el) => {
//         let team = {
//             id : index,
//             position : index + 1,
//             name : $(el).text()
//         }

//         namePosition.push(team)
//     })

//     $('.clasificacion-total > .cont-modulo > .cont-clasificacion > .tabla-datos > tbody > tr', html).each((index, el) => {
//         let td = $('td', el).toArray()

//         let object = {
//             id : index,
//             pts : $(td[0]).text(),
//             pj : $(td[1]).text(),
//             pg : $(td[2]).text(),
//             pe : $(td[3]).text(),
//             pp : $(td[4]).text(),
//             gf : $(td[5]).text(),
//             gc : $(td[6]).text()
//         }

//         numbers.push(object)
//     })

//     for(let i = 0; i < namePosition.length; i++) {
//         let object = {
//             id : i,
//             position : namePosition.find(el => el.id == i).position,
//             name : namePosition.find(el => el.id == i).name,
//             pts : numbers.find(el => el.id == i).pts,
//             pj : numbers.find(el => el.id == i).pj,
//             pg : numbers.find(el => el.id == i).pg,
//             pe : numbers.find(el => el.id == i).pe,
//             pp : numbers.find(el => el.id == i).pp,
//             gf : numbers.find(el => el.id == i).gf,
//             gc : numbers.find(el => el.id == i).gc
//         }

//         standings.push(object)
//     }

//     return standings
// }