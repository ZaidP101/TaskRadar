import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Task title is required"]
  },
  description: String,
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  deadline: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['todo', 'in-progress', 'paused', 'resume', 'ready-for-review', 'completed'],
    default: 'todo'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  timeLogs: [{
    start: Date,
    end: Date,
    pauseReason: {
      type: String,
      enum: ['system error', 'break', 'shift ended', 'meeting', null], // null for active sessions
      default: null
    }
  }],
  totalTimeSpent: {
    type: Number,
    default: 0
  },
  startedAt: Date,
  completedAt: Date,
  
  createdAt: {
    type: Date,
    default: Date.now
  },
});

// time left until deadline (in hours)
taskSchema.virtual('timeLeftHours').get(function () {
  const now = new Date();
  const diff = this.deadline - now;
  return diff > 0 ? Math.floor(diff / (1000 * 60 * 60)) : 0;
});

// total time spent in hours
taskSchema.virtual('totalTimeHours').get(function () {
  return Math.floor(this.totalTimeSpent / (1000 * 60 * 60));
});

taskSchema.set('toJSON', { virtuals: true });
taskSchema.set('toObject', { virtuals: true });

// Indexes for quick querying
taskSchema.index({ assignedTo: 1 });
taskSchema.index({ status: 1 });
taskSchema.index({ priority: 1 });
taskSchema.index({ deadline: 1 });

export const Task= mongoose.model('Task', taskSchema);
