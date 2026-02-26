import type { Request, Response } from "express";
import Project from "../models/Project.js";

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req: Request, res: Response) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private (Admin)
export const createProject = async (req: Request, res: Response) => {
    try {
        const { title, description, techStack, imageUrl, githubUrl, liveUrl, category } = req.body;

        const project = Project.create({
            title,
            description,
            techStack,
            imageUrl,
            githubUrl,
            liveUrl,
            category
        });

        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ message: 'Invalid project data' });
    }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private (Admin)
export const deleteProject = async (req: Request, res: Response) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: "Project not found" });
    }
};