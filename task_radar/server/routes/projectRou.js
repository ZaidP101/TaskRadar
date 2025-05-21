import { Router } from "express";
import { 
    addEmployeesToProject,
    createProject, 
    projectCompleted,
    rmEmpFromColpltedProj,
    getProjectById 
} from "../controllers/projectCont.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create")
.post(verifyJWT, createProject);

router.route("/completed")
.post(verifyJWT, projectCompleted);

router.route("/remove-employees")
.post(verifyJWT, rmEmpFromColpltedProj)

router.route("/add-employees")
.post(verifyJWT, addEmployeesToProject)

router.route("/:id").get(verifyJWT, getProjectById);
export default router