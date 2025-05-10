import { Router } from "express";
import { loginUser, logoutUser, refreshAccesssToken, registerUser } from "../controllers/userCont.js";
import { upload } from "../middlewares/multer.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", upload.single("avatar"), registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyJWT, logoutUser);
router.post("/refresh-token", refreshAccesssToken);

export default router;
