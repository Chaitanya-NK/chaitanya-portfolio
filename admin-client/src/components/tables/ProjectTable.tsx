import React, { useEffect, useState } from 'react';
import API from '../../api/axiosInstance';
import { Trash2, ExternalLink, Github } from 'lucide-react';

const ProjectTable: React.FC<{ refreshTrigger: number }> = ({ refreshTrigger }) => {
    const [projects, setProjects] = useState([]);

    const fetchProjects = async () => {
        const res = await API.get('/projects');
        setProjects(res.data);
    };

    useEffect(() => {
        fetchProjects();
    }, [refreshTrigger]);

    const handleDelete = async (id: string) => {
        if (window.confirm('Delete this project node?')) {
            await API.delete(`/projects/${id}`); // Make sure to add this route in Backend
            fetchProjects();
        }
    };

    return (
        <div className="w-full overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
            <table className="w-full text-left min-w-[600px]">
                <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
                    <tr>
                        <th className="p-4">Project</th>
                        <th className="p-4">Tech Stack</th>
                        <th className="p-4">Links</th>
                        <th className="p-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                    {projects.map((project: any) => (
                        <tr key={project._id} className="hover:bg-slate-800/30 transition-colors">
                            <td className="p-4">
                                <div className="flex items-center gap-3">
                                    <img src={project.imageUrl} className="w-10 h-10 rounded object-cover border border-slate-700" alt="" />
                                    <span className="font-medium text-white">{project.title}</span>
                                </div>
                            </td>
                            <td className="p-4">
                                <div className="flex gap-1">
                                    {project.techStack.slice(0, 3).map((tag: string) => (
                                        <span key={tag} className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">{tag}</span>
                                    ))}
                                </div>
                            </td>
                            <td className="p-4">
                                <div className="flex gap-3 text-slate-500">
                                    {project.githubUrl && <Github size={16} />}
                                    {project.liveUrl && <ExternalLink size={16} />}
                                </div>
                            </td>
                            <td className="p-4 text-right">
                                <button
                                    onClick={() => handleDelete(project._id)}
                                    className="text-red-400 hover:text-red-300 transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProjectTable;