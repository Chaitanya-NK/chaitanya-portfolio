import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import API from '../../api/axiosInstance';

const ManageExperience = () => {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        company: '',
        role: '',
        location: '',
        startDate: '',
        endDate: '',
        isCurrent: false,
        description: '' // We will split this into an array by new lines
    });

    const formatDateString = (dateStr: string) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleString('default', { month: 'long', year: 'numeric' });
    };

    const fetchExperiences = async () => {
        const res = await API.get('/experience');
        setExperiences(res.data);
    };

    useEffect(() => { fetchExperiences(); }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const formattedData = {
            ...formData,
            // Convert date inputs (2025-07) to display strings (July 2025)
            startDate: formatDateString(formData.startDate),
            endDate: formData.isCurrent ? 'Present' : formatDateString(formData.endDate),
            description: formData.description.split('\n').filter(line => line.trim() !== '')
        };

        try {
            await API.post('/experience', formattedData);
            // Reset form
            setFormData({ company: '', role: '', location: '', startDate: '', endDate: '', isCurrent: false, description: '' });
            fetchExperiences();
        } catch (err) {
            console.error("Error adding experience:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Remove this experience node?")) {
            await API.delete(`/experience/${id}`);
            fetchExperiences();
        }
    };

    return (
        <div className="max-w-5xl mx-auto">
            <header className="mb-10">
                <h1 className="text-3xl font-bold text-white">Career Timeline</h1>
                <p className="text-slate-400 mt-2">Document your professional journey and key automations.</p>
            </header>

            {/* --- FORM SECTION --- */}
            <motion.form
                onSubmit={handleSubmit}
                className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl shadow-xl mb-12"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Company (e.g. Veeva Systems)"
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-emerald-500 outline-none"
                            value={formData.company}
                            onChange={e => setFormData({ ...formData, company: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Role (e.g. Release Engineer)"
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-emerald-500 outline-none"
                            value={formData.role}
                            onChange={e => setFormData({ ...formData, role: e.target.value })}
                            required
                        />
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <label className="block text-slate-500 text-[10px] uppercase font-bold mb-1 ml-1 tracking-widest">Start Date</label>
                                <input
                                    type="month"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-emerald-500 outline-none [color-scheme:dark]"
                                    value={formData.startDate}
                                    onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="w-1/2">
                                <label className="block text-slate-500 text-[10px] uppercase font-bold mb-1 ml-1 tracking-widest">End Date</label>
                                <input
                                    type="month"
                                    disabled={formData.isCurrent}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-emerald-500 outline-none disabled:opacity-20 [color-scheme:dark]"
                                    value={formData.isCurrent ? '' : formData.endDate}
                                    onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                                    required={!formData.isCurrent}
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-3 px-1">
                            <input
                                type="checkbox"
                                id="isCurrent"
                                className="w-4 h-4 accent-emerald-500"
                                checked={formData.isCurrent}
                                onChange={e => setFormData({ ...formData, isCurrent: e.target.checked })}
                            />
                            <label htmlFor="isCurrent" className="text-sm text-slate-400 cursor-pointer">Currently Working Here</label>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <textarea
                            placeholder="Key Accomplishments (One per line)..."
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white h-[162px] focus:border-emerald-500 outline-none font-mono text-sm"
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            required
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/10"
                        >
                            <Plus size={20} /> {loading ? 'Logging...' : 'Commit to Timeline'}
                        </button>
                    </div>
                </div>
            </motion.form>

            {/* --- DISPLAY LIST --- */}
            <div className="space-y-6">
                {experiences.map((exp: any) => (
                    <motion.div
                        layout
                        key={exp._id}
                        className="group relative bg-slate-900/30 border border-slate-800/60 p-6 rounded-2xl hover:bg-slate-900/50 transition-all"
                    >
                        <button
                            onClick={() => handleDelete(exp._id)}
                            className="absolute top-6 right-6 text-slate-600 hover:text-red-400 transition-colors"
                        >
                            <Trash2 size={18} />
                        </button>

                        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20">
                                <Briefcase className="text-emerald-400" size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                                <div className="flex flex-wrap gap-4 text-sm text-slate-400 mt-1">
                                    <span className="flex items-center gap-1.5 text-emerald-500/80 font-medium">
                                        <CheckCircle2 size={14} /> {exp.company}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Calendar size={14} /> {exp.startDate} — {exp.isCurrent ? 'Present' : exp.endDate}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <ul className="space-y-2 ml-4 border-l-2 border-slate-800 pl-6 py-2">
                            {exp.description.map((bullet: string, idx: number) => (
                                <li key={idx} className="text-slate-300 text-sm list-disc marker:text-emerald-500">
                                    {bullet}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ManageExperience;