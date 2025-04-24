import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/userCont.js";
import { upload } from "../middlewares/multer.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()
router.route("/register").post(
    upload.single('avatar'),
    registerUser
)

router.route("/login").post(loginUser)


router.route("/logout").post(verifyJWT, logoutUser)

export default router