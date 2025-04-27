import { Project } from "../models/projectMod.js";
import { ApiError } from "../utils/ApiErrors.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/userMod.js"
import { ApiResponse } from "../utils/ApiResponse.js";


const createProject = asyncHandler(async(req, res)=>{
    const {name, employees, description} = req.body;

    if(!name || !employees || employees.length===0){
        throw new ApiError(400, "Project name and at least one employee is required.")
    }

    if(!req.user.isAdmin){
        throw new ApiError(403, "Only Admins can create projects.")
    }

    const project = await Project.create({
        name,
        description,
        createdBy: req.user._id
    });

    for (let empId of employees) {
        const employee = await User.findById(empId);
    
        if (!employee) {
          throw new ApiError(404, `Employee with ID ${empId} not found`);
        }
        
        if (employee.assignProjects) {
            throw new ApiError(400, `Employee ${employee.name} is already assigned to a project.`);
        }
        employee.assignProjects = project._id;
        employee.status = "busy";
        await employee.save();
    }

    res.status(201).json({
        success: true,
        message: "Project created and employees assigned successfully",
        project
    });
})

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
export {
    createProject,
    projectCompleted,
    rmEmpFromColpltedProj
}