import { Router } from "express";
import { 
    createProject, 
    projectCompleted,
    rmEmpFromColpltedProj 
} from "../controllers/projectCont.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create")
.post(verifyJWT, createProject);

router.route("/completed")
.post(verifyJWT, projectCompleted);

router.route("/remove-employees")
.post(verifyJWT, rmEmpFromColpltedProj)

export default router