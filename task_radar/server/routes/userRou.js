import { Router } from "express";
import { changeCurrentPassword, getCurrentUser, updateAccountDetails, updateAvatar, registerUser } from "../controllers/userCont.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.js";

const router = Router();

router.use(verifyJWT); 

router.get("/me", getCurrentUser);
router.put("/change-password", changeCurrentPassword);
router.put("/update-details", updateAccountDetails);
router.put("/update-avatar", upload.single("avatar"), updateAvatar);


router.route("/register").post(
    upload.single('avatar'),
    registerUser
)
export default router;
