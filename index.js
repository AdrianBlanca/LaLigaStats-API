import express from 'express'
import UserRouter from './src/Routes/User.js'
import ScrapperRouter from './src/Routes/Scrapper.js'
import MatchRouter from './src/Routes/Match.js'

const app = express()
app.use(express.json())

app.use('/api/user', UserRouter)
app.use('/api/scrapper', ScrapperRouter)
app.use('/api/match', MatchRouter)

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)

})