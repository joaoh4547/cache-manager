import express from "express";
import {CacheController} from "../../CacheController";


const router = express.Router()

const controller = new CacheController()

router.get('/', async (req, res) => await controller.getCache(req, res))

export default router;