import { Router } from "express";
import { createProject } from "../controllers/projectCont";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create")
.post(verifyJWT, createProject);

export default router