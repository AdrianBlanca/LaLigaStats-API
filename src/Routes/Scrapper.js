import express from 'express'
import * as ScrapperBL from '../BusinessLogic/ScrapperBL.js'

const router = express.Router()

router.get("/fillGames", async(req, res) => res.json(await ScrapperBL.FillGames()))
router.get("/getStats/:stat", async(req, res) => res.json(await ScrapperBL.GetStats(req.params.stat)))
router.get("/getStandings", async(req, res) => res.json(await ScrapperBL.GetStandings()))

export default router