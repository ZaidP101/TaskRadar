import { Project } from "../models/projectMod.js";
import { ApiError } from "../utils/ApiErrors.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/userMod.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { Task } from "../models/taskMod.js";


const createProject = asyncHandler(async (req, res) => {
    const { name, employees, description } = req.body;

    if (!name || !employees || employees.length === 0) {
        throw new ApiError(400, "Project name and at least one employee is required.");
    }

    if (!req.user.isAdmin) {
        throw new ApiError(403, "Only Admins can create projects.");
    }

    const project = await Project.create({
        name,
        description,
        createdBy: req.user._id,
        employees: employees
    });

    for (let empId of employees) {
        const employee = await User.findById(empId);

        if (!employee) {
            throw new ApiError(404, `Employee with ID ${empId} not found`);
        }

        // If employee is already assigned to another project
        if (employee.assignProjects !== null) {
            throw new ApiError(400, `Employee ${employee.name} is already assigned to a project.`);
        }

        // Assign project to employee
        employee.assignProjects = project._id;
        // employee.status = "busy";
        await employee.save();
    }

    project.employees = employees;
    await project.save();

    res.status(201).json({
        success: true,
        message: "Project created and employees assigned successfully",
        project
    });
});


const projectCompleted = asyncHandler(async(req, res)=>{
    const { projectId } = req.body;

    if(!projectId){
        throw new ApiError(400, "Project ID is required.");
    }

    if(!req.user.isAdmin){
        throw new ApiError(403, "Only Admin can Mark project as complted.");
    }

    const project = await Project.findById(projectId)
    if(!project){
        throw new ApiError(404, "Project not found.");
    }

    if(project.status === "completed"){
        throw new ApiError(400, "Project is already completed.")
    }

    project.status = "completed";
    await project.save();

    res.status(200)
    .json( new ApiResponse(200, {}, "Project marked as completed successfully"))
})

const addEmployeesToProject = asyncHandler(async (req, res) => {
    const { projectId, employees } = req.body;

    if (!projectId || !employees || employees.length === 0) {
        throw new ApiError(400, "Project ID and at least one employee ID are required.");
    }

    if (!req.user.isAdmin) {
        throw new ApiError(403, "Only Admins can add employees to a project.");
    }

    const project = await Project.findById(projectId);
    if (!project) {
        throw new ApiError(404, "Project not found.");
    }

    for (let empId of employees) {
        const employee = await User.findById(empId);
        if (!employee) {
            throw new ApiError(404, `Employee with ID ${empId} not found.`);
        }

        if (employee.assignProjects) {
            throw new ApiError(400, `Employee ${employee.name} is already assigned to a project.`);
        }
        

        employee.assignProjects = project._id;
        await employee.save();

        if (!project.employees.includes(empId)) {
            project.employees.push(empId);
        }

    }

    await project.save();

    res.status(200).json(new ApiResponse(200, project, "Employees added to project successfully."));
});

const removeEmployeesFromProject = asyncHandler(async (req, res) => {
    const { projectId, employees } = req.body;

    if (!projectId || !employees || employees.length === 0) {
        throw new ApiError(400, "Project ID and at least one employee ID are required.");
    }

    if (!req.user.isAdmin) {
        throw new ApiError(403, "Only Admins can remove employees from a project.");
    }

    const project = await Project.findById(projectId);
    if (!project) {
        throw new ApiError(404, "Project not found.");
    }

    for (let empId of employees) {
        const employee = await User.findById(empId);

        if (!employee) {
            throw new ApiError(404, `Employee with ID ${empId} not found.`);
        }

        if (!employee.assignProjects || employee.assignProjects.toString() !== projectId) {
            throw new ApiError(400, `Employee ${employee.name} is not assigned to this project.`);
        }

        // Remove employee from project
        employee.assignProjects = null;
        employee.status = "free";
        await employee.save();

        // Remove from project's employees array
        project.employees = project.employees.filter(id => id.toString() !== empId);
    }

    await project.save();

    res.status(200).json(new ApiResponse(200, project, "Employees removed from project successfully."));
});


const rmEmpFromColpltedProj = asyncHandler(async(req, res)=>{
    const {projectId} = req.body;

    if(!projectId){
        throw new ApiError(400, "Project ID is required.")
    }
    if(!req.user.isAdmin){
        throw new ApiError(403, "Only Admin can remove employees.")
    }
    const project = await Project.findById(projectId);
    if(!project){
        throw new ApiError(404, "Project not found.")
    }
    if(project.status !== "completed"){
        throw new ApiError(400, "Project is not completed yet. Complete the project first.");
    }
    const employee = await User.find({assignProjects : projectId}) // users/employees thart matches the projectID
    for (let emp of employee){
        emp.assignProjects = null;
        emp.status = "free";
        await emp.save();
    }

    res.status(200)
    .json(new ApiResponse(200, {}, "Employees removed from project successfully"))
}) 

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
    .populate("employees", "name email status");
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ project });
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const getAllEmployees = asyncHandler(async (req, res) => {
    if (!req.user.isAdmin) {
        throw new ApiError(403, "Only Admins can view all employees.");
    }

    const employees = await User.find({isAdmin:false}, "-password"); // exclude sensitive data
    res.status(200).json(new ApiResponse(200, employees, "All employees fetched successfully."));
});

const getAllProjects = asyncHandler(async (req, res) => {
    if (!req.user.isAdmin) {
        throw new ApiError(403, "Only Admins can view all projects.");
    }

    const projects = await Project.find()
    .populate("createdBy", "name email")
    .populate("employees", "name email status")
    .populate("tasks");

    const formattedProjects = projects.map((project) => ({
      ...project.toObject(),
      totalEmployees: project.employees?.length || 0,
      totalTasks: project.tasks?.length || 0,
    }));
    res.status(200).json(new ApiResponse(200, formattedProjects, "All projects fetched successfully."));
});


export {
    createProject,
    projectCompleted,
    rmEmpFromColpltedProj,
    addEmployeesToProject,
    getProjectById,
    getAllEmployees,
    getAllProjects,
    removeEmployeesFromProject
}