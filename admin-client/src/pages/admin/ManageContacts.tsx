import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MailOpen, Trash2, Clock, MessageSquare } from 'lucide-react';
import API from '../../api/axiosInstance';

const ManageContacts = () => {
    const [messages, setMessages] = useState([]);

    const fetchMessages = async () => {
        const res = await API.get('/contacts');
        setMessages(res.data);
    };

    useEffect(() => { fetchMessages(); }, []);

    const toggleStatus = async (id: string, currentStatus: string) => {
        const nextStatus = currentStatus === 'unread' ? 'read' : 'unread';
        await API.patch(`/contacts/${id}`, { status: nextStatus });
        fetchMessages();
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Delete this message?")) {
            await API.delete(`/contacts/${id}`);
            fetchMessages();
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <header className="mb-10">
                <h1 className="text-3xl font-bold text-white tracking-tight">Inbox</h1>
                <p className="text-slate-400 mt-2 text-sm font-mono uppercase tracking-widest">
                    &gt; incoming_transmissions
                </p>
            </header>

            <div className="space-y-4">
                <AnimatePresence>
                    {messages.map((msg: any) => (
                        <motion.div
                            layout
                            key={msg._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className={`border rounded-2xl p-6 transition-all ${msg.status === 'unread'
                                    ? 'bg-slate-900 border-emerald-500/30 shadow-lg shadow-emerald-500/5'
                                    : 'bg-slate-900/40 border-slate-800 opacity-80'
                                }`}
                        >
                            <div className="flex flex-wrap justify-between items-start gap-4">
                                <div className="flex gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${msg.status === 'unread' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-slate-800 border-slate-700 text-slate-500'
                                        }`}>
                                        {msg.status === 'unread' ? <Mail size={20} /> : <MailOpen size={20} />}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                            {msg.name}
                                            {msg.status === 'unread' && <span className="text-[10px] bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-full uppercase font-black">New</span>}
                                        </h3>
                                        <p className="text-slate-400 text-sm">{msg.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => toggleStatus(msg._id, msg.status)}
                                        className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
                                        title="Mark as Read/Unread"
                                    >
                                        <MessageSquare size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(msg._id)}
                                        className="p-2 hover:bg-red-500/10 text-slate-600 hover:text-red-400 transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className="mt-6">
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <Clock size={12} /> Received: {new Date(msg.createdAt).toLocaleString()}
                                </p>
                                <div className="bg-slate-950/50 border border-slate-800/50 rounded-xl p-4 text-slate-300 leading-relaxed italic">
                                    "{msg.message}"
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {messages.length === 0 && (
                    <div className="text-center py-20 bg-slate-900/20 border border-dashed border-slate-800 rounded-3xl">
                        <Mail className="mx-auto text-slate-700 mb-4" size={48} />
                        <p className="text-slate-500 font-medium">No messages in your inbox.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageContacts;