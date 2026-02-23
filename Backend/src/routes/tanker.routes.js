import express from 'express';
import { predictTankerRequirement } from '../controllers/tanker.controllers.js';

const router = express.Router()
router.post('/', predictTankerRequirement)

export default router