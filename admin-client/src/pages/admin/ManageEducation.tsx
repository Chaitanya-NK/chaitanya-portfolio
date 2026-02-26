import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Trash2, Plus, School } from 'lucide-react';
import API from '../../api/axiosInstance';

const ManageEducation = () => {
    const [education, setEducation] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        institution: '',
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
        description: ''
    });

    const fetchEducation = async () => {
        try {
            const res = await API.get('/education');
            setEducation(res.data);
        } catch (err) {
            console.error("Error fetching education:", err);
        }
    };

    useEffect(() => { fetchEducation(); }, []);

    const formatDateString = (dateStr: string) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleString('default', { month: 'long', year: 'numeric' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const formattedData = {
            ...formData,
            startDate: formatDateString(formData.startDate),
            endDate: formatDateString(formData.endDate),
            description: formData.description.split('\n').filter(line => line.trim() !== '')
        };

        try {
            await API.post('/education', formattedData);
            setFormData({ institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', description: '' });
            fetchEducation();
        } catch (err) {
            console.error("Error adding education:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Remove this educational record?")) {
            await API.delete(`/education/${id}`);
            fetchEducation();
        }
    };

    return (
        <div className="max-w-5xl mx-auto">
            <header className="mb-10">
                <h1 className="text-3xl font-bold text-white tracking-tight">Academic Background</h1>
                <p className="text-slate-400 mt-2">Manage your degrees and certifications.</p>
            </header>

            {/* --- FORM SECTION --- */}
            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl shadow-xl mb-12"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Institution (e.g. University Name)"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 pl-11 text-white focus:border-emerald-500 outline-none transition-all"
                                value={formData.institution}
                                onChange={e => setFormData({ ...formData, institution: e.target.value })}
                                required
                            />
                            <School className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                        </div>

                        <input
                            type="text"
                            placeholder="Degree (e.g. Bachelor of Technology)"
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-emerald-500 outline-none"
                            value={formData.degree}
                            onChange={e => setFormData({ ...formData, degree: e.target.value })}
                            required
                        />

                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <label className="block text-slate-500 text-[10px] uppercase font-bold mb-1 ml-1 tracking-widest">Start</label>
                                <input
                                    type="month"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-emerald-500 outline-none [color-scheme:dark]"
                                    value={formData.startDate}
                                    onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="block text-slate-500 text-[10px] uppercase font-bold mb-1 ml-1 tracking-widest">End (Expected)</label>
                                <input
                                    type="month"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-emerald-500 outline-none [color-scheme:dark]"
                                    value={formData.endDate}
                                    onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <textarea
                            placeholder="Brief description or notable achievements (GPA, Honors...)"
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white h-[108px] focus:border-emerald-500 outline-none resize-none"
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg"
                        >
                            {loading ? "Processing..." : <><Plus size={20} /> Add Education</>}
                        </button>
                    </div>
                </div>
            </motion.form>

            {/* --- DISPLAY LIST --- */}
            <div className="grid grid-cols-1 gap-4">
                {education.map((edu: any) => (
                    <motion.div
                        layout
                        key={edu._id}
                        className="flex items-start justify-between bg-slate-900/30 border border-slate-800/60 p-6 rounded-2xl group"
                    >
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20 shrink-0">
                                <GraduationCap className="text-blue-400" size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">{edu.degree}</h3>
                                <p className="text-emerald-400 text-sm font-medium">{edu.institution}</p>
                                <div className="flex items-center gap-4 mt-2 text-xs text-slate-500 font-mono">
                                    <span className="flex items-center gap-1.5"><Calendar size={12} /> {edu.startDate} — {edu.endDate}</span>
                                </div>
                                <ul className="space-y-2 ml-4 border-l-2 border-slate-800 pl-6 py-2">
                                    {edu.description.map((bullet: string, idx: number) => (
                                        <li key={idx} className="text-slate-300 text-sm list-disc marker:text-emerald-500">
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <button
                            onClick={() => handleDelete(edu._id)}
                            className="text-slate-600 hover:text-red-400 transition-colors p-2"
                        >
                            <Trash2 size={18} />
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ManageEducation;