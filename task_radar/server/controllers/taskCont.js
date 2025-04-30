import { Task } from "../models/taskMod.js";
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


const getEmployeesByProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const project = await Project.findById(projectId).populate("employees", "name email");
  if (!project) {
    throw new ApiError(404, "Project not found.");
  }

  res.status(200).json(new ApiResponse(200, project.employees, "Employees fetched for this project."));
});



const updateTaskStatus = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const { status, pauseReason } = req.body;

  const validStatus = ['todo', 'in-progress', 'paused', 'resume', 'ready-for-review', 'completed'];
  if (!validStatus.includes(status)) {
    throw new ApiError(400, "Invalid task status.");
  }

  const task = await Task.findById(taskId);
  if (!task) {
    throw new ApiError(404, "Task not found.");
  }

  const now = new Date();

  // Start timer if 
  if (status === 'in-progress' || status === 'resume') {
    task.timeLogs.push({ start: now });
  }

  // Stop timer 
  else if (['paused', 'ready-for-review', 'completed'].includes(status)) {
    const lastLog = task.timeLogs[task.timeLogs.length - 1];
    if (lastLog && !lastLog.end) {
      lastLog.end = now;

      const sessionTime = now - new Date(lastLog.start);
      task.totalTimeSpent += sessionTime;

      if (status === 'paused') {
        if (!pauseReason) {
          throw new ApiError(400, "Pause reason is required when pausing a task.");
        }

        lastLog.pauseReason = pauseReason;
      }
    }
  }

  task.status = status;
  await task.save();

  res.status(200).json(new ApiResponse(200, task, `Task status updated to ${status}.`));
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
  getEmployeesByProject,
  updateTaskStatus,
  deleteTask
};
