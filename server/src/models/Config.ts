import mongoose, { Schema } from 'mongoose';

const ConfigSchema: Schema = new Schema({
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    location: { type: String, default: '' },
    github: String,
    linkedin: String,
    instagram: String, // Added
    whatsapp: String,  // Added (Format: 91XXXXXXXXXX)
}, { timestamps: true });

export default mongoose.model('Config', ConfigSchema);