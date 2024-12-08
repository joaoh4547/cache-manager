import express from "express";
import cacheRoutes from "./cache";


const router = express.Router()
router.use("/cache", cacheRoutes)

export default router;