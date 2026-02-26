import type { Request, Response } from 'express';
import Contact from '../models/Contact.js';

export const getMessages = async (req: Request, res: Response) => {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
};

export const sendMessage = async (req: Request, res: Response) => {
    const { name, email, subject, message } = req.body;
    const newMessage = new Contact({ name, email, subject, message });
    await newMessage.save();
    res.json({ message: "Message sent successfully" });
};

export const updateMessageStatus = async (req: Request, res: Response) => {
    const message = await Contact.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(message);
};

export const deleteMessage = async (req: Request, res: Response) => {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Message deleted" });
};