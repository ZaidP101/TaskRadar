import mongoose from "mongoose";

const invitationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  token: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'expired'],
    default: 'pending'
  },
  // team: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Team',
  //   required: true
  // },
  invitedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  expiresAt: {
    type: Date,
    required: true
  }
});

// Indexes
invitationSchema.index({ token: 1 });
invitationSchema.index({ email: 1 });

export const Invitation = mongoose.model('Invitation', invitationSchema);
