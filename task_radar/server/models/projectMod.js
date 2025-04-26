import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Project name is required"]
  },
  description: String,
  employees:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  }],
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Project = mongoose.model('Project', projectSchema);
