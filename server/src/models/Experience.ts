import mongoose, { Schema, Document } from 'mongoose';

export interface IExperience extends Document {
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string[]; // Array of bullet points
}

const ExperienceSchema: Schema = new Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  location: { type: String },
  startDate: { type: String, required: true }, // Format: "July 2025"
  endDate: { type: String },
  isCurrent: { type: Boolean, default: false },
  description: [{ type: String }],
}, { timestamps: true });

export default mongoose.model<IExperience>('Experience', ExperienceSchema);