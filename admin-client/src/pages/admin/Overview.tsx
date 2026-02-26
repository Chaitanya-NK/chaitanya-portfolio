import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    FolderKanban,
    Briefcase,
    Code2,
    GraduationCap,
    Activity,
    ExternalLink,
    Plus,
    Globe
} from 'lucide-react';
import API from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const Overview = () => {
    const [stats, setStats] = useState({ projects: 0, experience: 0, skills: 0, education: 0 });
    const [dbStatus, setDbStatus] = useState<'checking' | 'connected' | 'error'>('checking');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [p, exp, s, edu] = await Promise.all([
                    API.get('/projects'),
                    API.get('/experience'),
                    API.get('/skills'),
                    API.get('/education')
                ]);
                setStats({
                    projects: p.data.length,
                    experience: exp.data.length,
                    skills: s.data.length,
                    education: edu.data.length
                });
                setDbStatus('connected');
            } catch (err) {
                setDbStatus('error');
            }
        };
        fetchStats();
    }, []);

    const statCards = [
        { label: 'Projects', value: stats.projects, icon: <FolderKanban />, color: 'text-emerald-400', path: '/dashboard/projects' },
        { label: 'Experience', value: stats.experience, icon: <Briefcase />, color: 'text-blue-400', path: '/dashboard/experience' },
        { label: 'Skills', value: stats.skills, icon: <Code2 />, color: 'text-purple-400', path: '/dashboard/skills' },
        { label: 'Education', value: stats.education, icon: <GraduationCap />, color: 'text-amber-400', path: '/dashboard/education' },
    ];

    return (
        <div className="max-w-6xl mx-auto">
            <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">System Overview</h1>
                    <p className="text-slate-400 mt-2 font-mono text-sm tracking-wide">
                        WELCOME_BACK // USER: CHAITANYA
                    </p>
                </div>
                <div className="flex items-center gap-3 bg-slate-900/50 border border-slate-800 px-4 py-2 rounded-xl">
                    <div className={`w-2 h-2 rounded-full ${dbStatus === 'connected' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                    <span className="text-xs font-mono text-slate-300 uppercase tracking-widest">
                        DB_STATUS: {dbStatus.toUpperCase()}
                    </span>
                </div>
            </header>

            {/* --- STATS GRID --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {statCards.map((card, idx) => (
                    <motion.div
                        key={card.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        onClick={() => navigate(card.path)}
                        className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl hover:border-slate-700 cursor-pointer transition-all group"
                    >
                        <div className={`w-12 h-12 rounded-xl bg-slate-950 flex items-center justify-center mb-4 border border-slate-800 group-hover:border-emerald-500/30 transition-all ${card.color}`}>
                            {React.cloneElement(card.icon as React.ReactElement)}
                        </div>
                        <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest">{card.label}</h3>
                        <p className="text-3xl font-bold text-white mt-1">{card.value}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* --- QUICK ACTIONS --- */}
                <div className="lg:col-span-1 space-y-6">
                    <h2 className="text-slate-400 text-sm font-bold uppercase tracking-widest px-1">Quick Actions</h2>
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => navigate('/dashboard/projects')}
                            className="flex items-center justify-between p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 hover:bg-emerald-500/20 transition-all group"
                        >
                            <span className="font-semibold flex items-center gap-2"><Plus size={18} /> New Project</span>
                            <Activity size={16} className="opacity-0 group-hover:opacity-100 transition-all" />
                        </button>
                        <a
                            href="http://localhost:5173"
                            target="_blank"
                            className="flex items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 hover:text-white hover:border-slate-600 transition-all"
                        >
                            <span className="font-semibold flex items-center gap-2"><Globe size={18} /> Preview Portfolio</span>
                            <ExternalLink size={16} />
                        </a>
                    </div>
                </div>

                {/* --- RECENT ACTIVITY LOG --- */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-slate-400 text-sm font-bold uppercase tracking-widest px-1">Infrastructure Status</h2>
                    <div className="bg-slate-900/20 border border-slate-800 rounded-2xl p-6 font-mono text-sm text-slate-400 space-y-3">
                        <p className="flex items-center gap-3">
                            <span className="text-emerald-500 tracking-tighter">[OK]</span>
                            <span>Vite Development Server Listening...</span>
                        </p>
                        <p className="flex items-center gap-3">
                            <span className="text-emerald-500 tracking-tighter">[OK]</span>
                            <span>Express Engine API Active (Port 5000)</span>
                        </p>
                        <p className="flex items-center gap-3">
                            <span className="text-blue-500 tracking-tighter">[INFO]</span>
                            <span>Cloudinary Pipeline Ready for Asset Upload</span>
                        </p>
                        <div className="pt-4 border-t border-slate-800/50">
                            <p className="text-slate-600 italic">// Portfolio is currently pulling data from local cluster.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;