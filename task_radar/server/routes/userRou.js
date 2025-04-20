import { Router } from "express";
import { registerUser } from "../controllers/userCont.js";
import { upload } from "../middlewares/multer.js";

const router = Router()
router.route("/register").post(
    upload.single('avatar'),
    registerUser)

export default router