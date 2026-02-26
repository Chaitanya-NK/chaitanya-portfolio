import mongoose, { Schema, Document } from 'mongoose';

const ContactSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, default: 'Portfolio Inquiry' },
    message: { type: String, required: true },
    status: { type: String, enum: ['unread', 'read', 'replied'], default: 'unread' },
}, { timestamps: true });

export default mongoose.model('Contact', ContactSchema);