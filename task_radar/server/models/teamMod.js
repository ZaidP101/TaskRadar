// Currently not in use

import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Team name is required"]
  },
  Admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  projects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Team = mongoose.model('Team', teamSchema);
