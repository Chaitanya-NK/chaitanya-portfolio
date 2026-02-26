import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  githubUrl: string;
  liveUrl?: string;
  category?: string;
}

const ProjectSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    techStack: [{ type: String }],
    imageUrl: { type: String, required: true },
    githubUrl: { type: String, required: true },
    liveUrl: { type: String },
    category: { type: String, default: 'Web' },
}, {
    timestamps: true,
});

const Project = mongoose.model<IProject>('Project', ProjectSchema);
export default Project;