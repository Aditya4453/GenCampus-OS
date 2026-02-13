import mongoose, { Schema, models } from 'mongoose';

const ProjectSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  eventName: {
    type: String,
    required: true,
  },
  theme: {
    type: String,
    required: true,
  },
  audience: String,
  tone: String,
  generatedAssets: {
    posterUrl: String,
    posterPrompt: String,
    caption: String,
    emailInvite: String,
    whatsappMessage: String,
    landingPageHTML: String,
  },
  status: {
    type: String,
    enum: ['pending', 'generating', 'completed', 'failed'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Project = models.Project || mongoose.model('Project', ProjectSchema);

export default Project;
