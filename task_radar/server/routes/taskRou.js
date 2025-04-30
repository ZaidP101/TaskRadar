import { Router } from "express";
import {
  createTask,
  getTasksByProject,
  getEmployeesByProject,
  updateTaskStatus,
  deleteTask
} from "../controllers/taskCont.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/create-task", verifyJWT, createTask);
router.put("/status/:taskId", verifyJWT, updateTaskStatus);
router.get("/project/:projectId", verifyJWT, getTasksByProject);
router.get("/employee/:projectId", verifyJWT, getEmployeesByProject); // number of employees in project
router.delete("/:taskId", verifyJWT, deleteTask);

export default router;
