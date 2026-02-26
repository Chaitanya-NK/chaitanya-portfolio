import type { Request, Response } from 'express';
import Experience from '../models/Experience.js';

export const getExperiences = async (req: Request, res: Response) => {
    try {
        const experiences = await Experience.find().sort({ createdAt: -1 });
        res.status(200).json(experiences);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch experience log' });
    }
};

export const createExperience = async (req: Request, res: Response) => {
    try {
        const experience = await Experience.create(req.body);
        res.status(201).json(experience);
    } catch (error) {
        res.status(400).json({ message: 'Invalid experience data' });
    }
};

export const deleteExperience = async (req: Request, res: Response) => {
    try {
        await Experience.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Experience node removed' });
    } catch (error) {
        res.status(404).json({ message: 'Experience not found' });
    }
};