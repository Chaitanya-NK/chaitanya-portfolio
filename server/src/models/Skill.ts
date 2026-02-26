import mongoose, { Schema, Document } from 'mongoose';

const SkillSchema: Schema = new Schema({
    name: { type: String, required: true },
    icon: { type: String }, // Can store a Lucide icon name or image URL
    category: {
        type: String,
        enum: ['Frontend', 'Backend', 'DevOps', 'Language', 'Database', 'Other'],
        required: true
    },
    isTool: { type: Boolean, default: false } // true = Tool, false = Skill
}, { timestamps: true });

export default mongoose.model('Skill', SkillSchema);