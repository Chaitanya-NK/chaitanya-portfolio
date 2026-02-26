import type { Request, Response } from 'express';
import Education from '../models/Education.js';

export const getEducation = async (req: Request, res: Response) => {
    const edu = await Education.find();
    res.json(edu);
};

export const addEducation = async (req: Request, res: Response) => {
    const newEdu = await Education.create(req.body);
    res.status(201).json(newEdu);
};

export const deleteEducation = async (req: Request, res: Response) => {
    const { id } = req.params;
    await Education.findByIdAndDelete(id);
    res.status(204).send();
};