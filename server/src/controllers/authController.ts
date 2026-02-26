import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response) => {
    const { password } = req.body;

    // Simple, secure check against environment variable for single-user admin
    if (password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign(
            { role: 'admin' },
            process.env.JWT_SECRET || 'secret_key',
            { expiresIn: '24h' }
        );
        return res.status(200).json({ token });
    }

    res.status(401).json({ message: 'Invalid Admin Credentials' });
};