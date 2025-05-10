import { Router } from "express";
import { verifyJWT, verifyAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT, verifyAdmin);


router.get("/dashboard", (req, res) => {
    res.status(200).json({ message: "Admin dashboard route" });
});

export default router;
