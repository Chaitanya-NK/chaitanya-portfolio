import { useState, useEffect } from "react";
import axios from "axios";
import type { IExperience } from "../types/portfolio";

export const usePortfolioData = () => {
    const [data, setData] = useState({
        projects: [],
        skills: [],
        experience: [] as IExperience[],
        education: [],
        config: {} as any,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const baseURL = "https://chaitanya-portfolio-t7vy.onrender.com/api";

                const [p, s, exp, edu, cfg] = await Promise.all([
                    axios.get(`${baseURL}/projects`),
                    axios.get(`${baseURL}/skills`),
                    axios.get(`${baseURL}/experience`),
                    axios.get(`${baseURL}/education`),
                    axios.get(`${baseURL}/config`),
                ]);

                setData({
                    projects: p.data,
                    skills: s.data,
                    experience: exp.data,
                    education: edu.data,
                    config: cfg.data,
                });
            } catch (err) {
                console.error("Data fetch failed:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAll();
    }, []);

    return { ...data, loading };
};