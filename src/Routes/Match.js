import express from 'express'
import * as MatchBL from '../BusinessLogic/MatchBL.js'

const router = express.Router()

router.get("/getGoals/:host/:away", async(req, res) => res.json(await MatchBL.GetGoals(req.params.host, req.params.away)))

export default router