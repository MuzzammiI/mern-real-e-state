import expres from 'express';
import { deleteUser, test, updateUser } from "../controllers/user.control.js";
import { verifyToken } from '../utils/verifyUser.js';

const router = expres.Router();

router.get('/test', test);
// router.get("/cookie",cookieFind)

router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);


export default router;
