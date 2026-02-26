import mongoose, { Schema, Document } from 'mongoose';

export interface IEducation extends Document {
    institution: string;
    degree: string;
    fieldOfStudy?: string;
    startDate?: string;
    endDate?: string;
    description?: string[]; // Array of bullet points
}

const EducationSchema: Schema = new Schema({
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    fieldOfStudy: String,
    startDate: String,
    endDate: String,
    description: [{ type: String }],
}, { timestamps: true });

export default mongoose.model<IEducation>('Education', EducationSchema);