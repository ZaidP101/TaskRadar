import { Router } from "express";
import { verifyJWT, verifyAdmin } from "../middlewares/auth.middleware.js";
import { loginUser } from "../controllers/userCont.js"

const router = Router();

router.post("/", loginUser);
router.use(verifyJWT, verifyAdmin);


router.get("/dashboard", (req, res) => {
    res.status(200).json({ message: "Admin dashboard route" });
});

export default router;
