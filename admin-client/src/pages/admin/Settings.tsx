import React, { useState, useEffect } from 'react';
import { Globe, Mail, Instagram, Linkedin, Github, MessageCircle, Save, Loader2, CheckCircle2, MapPin } from 'lucide-react';
import API from '../../api/axiosInstance';

const Settings = () => {
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);
    const [publicInfo, setPublicInfo] = useState({
        email: '',
        phone: '',
        github: '',
        linkedin: '',
        instagram: '',
        whatsapp: '',
        location: ''
    });

    // Load existing data from Database
    const fetchConfig = async () => {
        try {
            const res = await API.get('/config');
            // If res.data is null (first time), keep the empty strings
            if (res.data) {
                setPublicInfo({
                    email: res.data.email || '',
                    phone: res.data.phone || '',
                    github: res.data.github || '',
                    linkedin: res.data.linkedin || '',
                    instagram: res.data.instagram || '',
                    whatsapp: res.data.whatsapp || '',
                    location: res.data.location || ''
                });
            }
        } catch (err) {
            console.error("Load failed. Is the backend route '/api/config' active?", err);
        }
    };

    useEffect(() => {
        fetchConfig();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await API.post('/config', publicInfo);

            // Update state with the returned data to ensure sync
            if (res.data) {
                setPublicInfo(res.data);
            }

            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (err) {
            console.error("Save failed", err);
            alert("Failed to commit changes. Check console.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto pb-20 px-4">
            <header className="mb-10">
                <h1 className="text-3xl font-bold text-white tracking-tight">System Settings</h1>
                <p className="text-slate-400 mt-2">Update your contact endpoints and social presence.</p>
            </header>

            <form onSubmit={handleSave} className="space-y-8">
                <section className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                    <div className="p-6 border-b border-slate-800 flex items-center gap-3">
                        <Globe className="text-emerald-500" size={20} />
                        <h2 className="font-bold text-white">Public Metadata</h2>
                    </div>

                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-4">Direct Channels</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] uppercase font-bold text-slate-500 mb-2 block ml-1">Email Address</label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-11 text-white focus:border-emerald-500 outline-none transition-all"
                                            value={publicInfo.email}
                                            onChange={e => setPublicInfo({ ...publicInfo, email: e.target.value })}
                                        />
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] uppercase font-bold text-slate-500 mb-2 block ml-1">WhatsApp Number</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="91XXXXXXXXXX"
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-11 text-white focus:border-emerald-500 outline-none"
                                            value={publicInfo.whatsapp}
                                            onChange={e => setPublicInfo({ ...publicInfo, whatsapp: e.target.value })}
                                        />
                                        <MessageCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] uppercase font-bold text-slate-500 mb-2 block ml-1">Location</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Hyderabad, India"
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-11 text-white focus:border-emerald-500 outline-none"
                                            value={publicInfo.location}
                                            onChange={e => setPublicInfo({ ...publicInfo, location: e.target.value })}
                                        />
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-4">Social Presence</h3>

                            <div className="grid grid-cols-1 gap-4">
                                <div className="relative">
                                    <input
                                        type="text" placeholder="GitHub Profile URL"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-11 text-white focus:border-emerald-500 outline-none"
                                        value={publicInfo.github}
                                        onChange={e => setPublicInfo({ ...publicInfo, github: e.target.value })}
                                    />
                                    <Github className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                                </div>

                                <div className="relative">
                                    <input
                                        type="text" placeholder="LinkedIn Profile URL"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-11 text-white focus:border-emerald-500 outline-none"
                                        value={publicInfo.linkedin}
                                        onChange={e => setPublicInfo({ ...publicInfo, linkedin: e.target.value })}
                                    />
                                    <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                                </div>

                                <div className="relative">
                                    <input
                                        type="text" placeholder="Instagram Profile URL"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-11 text-white focus:border-emerald-500 outline-none"
                                        value={publicInfo.instagram}
                                        onChange={e => setPublicInfo({ ...publicInfo, instagram: e.target.value })}
                                    />
                                    <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 bg-emerald-500 text-slate-950 px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" size={18} /> : saved ? <CheckCircle2 size={18} /> : <Save size={18} />}
                        {loading ? "Syncing..." : saved ? "Deployed" : "Commit Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Settings;