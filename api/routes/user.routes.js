import expres from 'express';
import test from "../controllers/user.control.js";

const router = expres.Router();

router.get('/test', test);

export default router;
