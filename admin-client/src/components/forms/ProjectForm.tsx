import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, CheckCircle, Loader2 } from 'lucide-react';
import API from '../../api/axiosInstance';
import axios from 'axios';

const ProjectForm: React.FC<{ onProjectAdded: () => void }> = ({ onProjectAdded }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        techStack: '',
        githubUrl: '',
        liveUrl: '',
        category: ''
    });

    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleUpload = async () => {
        if (!image) return '';
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'portfolio_unsigned'); // Create this in Cloudinary settings

        // Upload directly to Cloudinary
        const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`,
            data
        );
        return res.data.secure_url;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const imageUrl = await handleUpload();
            const projectData = {
                ...formData,
                techStack: formData.techStack.split(',').map(s => s.trim()),
                imageUrl
            };

            await API.post('/projects', projectData);
            setStatus('success');
            onProjectAdded();
            setFormData({ title: '', description: '', techStack: '', githubUrl: '', liveUrl: '', category: '' });
            setImage(null);
        } catch (err) {
            setStatus('error');
        } finally {
            setLoading(false);
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl mb-10"
        >
            <h2 className="text-xl font-bold mb-6 text-emerald-400">Add New Project</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Project Title"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-emerald-500 outline-none"
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                        required
                    />
                    <textarea
                        placeholder="Description"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white h-32 focus:border-emerald-500 outline-none"
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                        required
                    />
                    <div className='flex gap-4'>
                        <input
                            type="text"
                            placeholder="Tech Stack (comma separated: React, Node, Docker)"
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-emerald-500 outline-none"
                            value={formData.techStack}
                            onChange={e => setFormData({ ...formData, techStack: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Category"
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-emerald-500 outline-none"
                            value={formData.category}
                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder="GitHub URL"
                            className="w-1/2 bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-emerald-500 outline-none"
                            value={formData.githubUrl}
                            onChange={e => setFormData({ ...formData, githubUrl: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Live Demo URL"
                            className="w-1/2 bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:border-emerald-500 outline-none"
                            value={formData.liveUrl}
                            onChange={e => setFormData({ ...formData, liveUrl: e.target.value })}
                        />
                    </div>

                    <div className="border-2 border-dashed border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center bg-slate-950/50 hover:border-emerald-500/50 transition-colors relative">
                        {image ? (
                            <div className="flex items-center gap-3 text-emerald-400">
                                <CheckCircle size={20} />
                                <span>{image.name}</span>
                                <button type="button" onClick={() => setImage(null)}><X size={16} className="text-red-400" /></button>
                            </div>
                        ) : (
                            <>
                                <Upload className="text-slate-600 mb-2" />
                                <p className="text-slate-500 text-sm">Upload Screenshot</p>
                                <input
                                    type="file"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={e => setImage(e.target.files?.[0] || null)}
                                />
                            </>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : status === 'success' ? 'Deployed Successfully!' : 'Deploy Project'}
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default ProjectForm;