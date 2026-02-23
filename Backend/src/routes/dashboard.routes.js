import express from 'express';
import { getDashboardData } from '../controllers/dashboard.controllers.js';

const router = express.Router()
router.get('/',getDashboardData)

export default router