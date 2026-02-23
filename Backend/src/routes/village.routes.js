import express from 'express';
import { postVillageInfo } from '../controllers/village.controller.js';

const router = express.Router()

router.post("/village-info",postVillageInfo)

export default router