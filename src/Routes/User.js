import express from 'express'
import * as UserBL from '../BusinessLogic/UserBL.js'

const router = express.Router()

router.post("/register", async(req, res) => res.json(await UserBL.RegisterUser(req.body)))
router.post("/login", async(req, res) => res.json(await UserBL.RequestLogin(req.body)))
router.post("/checkMail", async(req, res) => res.json(await UserBL.CheckMail(req.body)))
router.post("/getFavouriteTeam", async(req, res) => res.json(await UserBL.GetFavouriteTeam(req.body)))
router.post("/getData", async(req, res) => res.json(await UserBL.GetData(req.body)))
router.post("/getFavouriteTeamID", async(req, res) => res.json(await UserBL.GetFavouriteTeamID(req.body)))
router.put("/updateUser", async(req, res) => res.json(await UserBL.UpdateUser(req.body)))

export default router