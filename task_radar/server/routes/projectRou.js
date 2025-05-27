import { Router } from "express";
import { 
    addEmployeesToProject,
    createProject, 
    projectCompleted,
    rmEmpFromColpltedProj,
    getProjectById,
    getAllEmployees,
    getAllProjects,
    removeEmployeesFromProject,
    deleteProject
} from "../controllers/projectCont.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create")
.post(verifyJWT, createProject);

router.route("/completed")
.post(verifyJWT, projectCompleted);

router.route("/removeIfComp-employees")
.post(verifyJWT, rmEmpFromColpltedProj)

router.route("/add-employees")
.post(verifyJWT, addEmployeesToProject)

router.route("/remove-employees")
.post(verifyJWT, removeEmployeesFromProject)

router.route("/all-projects")
.get(verifyJWT, getAllProjects)

router.route("/employees")
.get(verifyJWT, getAllEmployees)

router.route("/:id")
.get(verifyJWT, getProjectById)
.delete(verifyJWT, deleteProject);



export default router