import type { Request, Response } from 'express';
import Config from '../models/Config.js';

export const getConfig = async (req: Request, res: Response) => {
    try {
        let config = await Config.findOne();
        if (!config) {
            config = await Config.create({}); // Create default if none exists
        }
        res.json(config);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

export const updateConfig = async (req: Request, res: Response) => {
    try {
        const config = await Config.findOneAndUpdate({}, req.body, { new: true, upsert: true });
        res.json(config);
    } catch (error) {
        res.status(400).json({ message: "Update Failed" });
    }
};