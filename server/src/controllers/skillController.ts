import type { Request, Response } from 'express';
import Skill from '../models/Skill.js';

export const getSkills = async (req: Request, res: Response) => {
    const skills = await Skill.find();
    res.json(skills);
};

export const addSkill = async (req: Request, res: Response) => {
    const skill = await Skill.create(req.body);
    res.status(201).json(skill);
};

export const deleteSkill = async (req: Request, res: Response) => {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ message: "Skill removed" });
};