import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createlist } from '../controllers/listing.control.js';

const router = express.Router();

router.post("/create",verifyToken,createlist);

export default router;