import { Task } from "../models/taskModel.js";
import { User } from "../models/userMod.js";
import { Project } from "../models/projectMod.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const createTask = asyncHandler(async (req, res) => {
  const { title, description, project, assignedTo, deadline, priority } = req.body;

  if (!title || !project || !assignedTo || !deadline) {
    throw new ApiError(400, "Title, project, assignedTo, and deadline are required.");
  }

  const projectExists = await Project.findById(project);
  if (!projectExists) throw new ApiError(404, "Project not found.");

  const employee = await User.findById(assignedTo);
  if (!employee) throw new ApiError(404, "Assigned employee not found.");

  const task = await Task.create({
    title,
    description,
    project,
    assignedTo,
    assignedBy: req.user._id,
    deadline,
    priority
  });

  res.status(201).json(new ApiResponse(201, task, "Task created successfully."));
});


const getTasksByProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const tasks = await Task.find({ project: projectId }).populate("assignedTo", "name email").exec();
  res.status(200).json(new ApiResponse(200, tasks, "Tasks fetched for project."));
});


const getTasksByEmployee = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;

  const tasks = await Task.find({ assignedTo: employeeId }).populate("project", "name").exec();
  res.status(200).json(new ApiResponse(200, tasks, "Tasks fetched for employee."));
});


const updateTaskStatus = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;

  const validStatus = ['todo', 'in-progress', 'paused', 'ready-for-review', 'completed'];
  if (!validStatus.includes(status)) {
    throw new ApiError(400, "Invalid task status.");
  }

  const task = await Task.findByIdAndUpdate(taskId, { status }, { new: true });
  if (!task) throw new ApiError(404, "Task not found.");

  res.status(200).json(new ApiResponse(200, task, "Task status updated."));
});


const deleteTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;

  const task = await Task.findByIdAndDelete(taskId);
  if (!task) throw new ApiError(404, "Task not found.");

  res.status(200).json(new ApiResponse(200, {}, "Task deleted successfully."));
});

export {
  createTask,
  getTasksByProject,
  getTasksByEmployee,
  updateTaskStatus,
  deleteTask
};
