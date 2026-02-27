import React, { useState } from 'react';
import { Mail, MapPin, Send, Github, Linkedin, Instagram, Phone } from 'lucide-react';
import axios from 'axios';
import { usePortfolioData } from '../../hooks/usePortfolioData';

export const Contact = () => {
    const { config } = usePortfolioData();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // Adjust this URL to match your backend route
            await axios.post('http://localhost:5000/api/contacts', formData);
            setSubmitted(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setSubmitted(false), 5000);
        } catch (err) {
            console.error("Failed to send message:", err);
            alert("Something went wrong. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section id="contact" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="mb-16 text-center md:text-left">
                    <h2 className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2">Connect</h2>
                    <h3 className="text-4xl font-bold text-gray-900 dark:text-white">Get In <span className="text-blue-600 dark:text-blue-400">Touch</span></h3>
                    <div className="h-1.5 w-20 bg-blue-600 mt-4 rounded-full mx-auto md:mx-0"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Side: Contact Info */}
                    <div className="lg:col-span-5 space-y-8">
                        <div>
                            <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Let's discuss a project</h4>
                            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {/* Email */}
                            <div className="flex items-center gap-4 group">
                                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Email Me</p>
                                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{config?.email}</p>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex items-center gap-4 group">
                                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Location</p>
                                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{config?.location}</p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-center gap-4 group">
                                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Phone</p>
                                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{config?.whatsapp}</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="pt-8 border-t border-gray-100 dark:border-slate-800">
                            <p className="text-sm font-bold text-gray-900 dark:text-white uppercase mb-4">Follow My Work</p>
                            <div className="flex gap-4">
                                {[
                                    { id: 'github', icon: <Github size={20} />, url: config?.github },
                                    { id: 'linkedin', icon: <Linkedin size={20} />, url: config?.linkedin },
                                    { id: 'instagram', icon: <Instagram size={20} />, url: config?.instagram }
                                ].map((social) => social.url && (
                                    <a key={social.id} href={social.url} target="_blank" rel="noreferrer"
                                        className="p-3 bg-gray-100 dark:bg-slate-800 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all">
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Contact Form */}
                    <div className="lg:col-span-7">
                        <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-slate-900/50 p-8 md:p-10 rounded-[2rem] border border-gray-100 dark:border-slate-800 shadow-sm">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Your Name</label>
                                    <input
                                        type="text" required name="name" value={formData.name} onChange={handleChange}
                                        placeholder="John Doe"
                                        className="w-full px-5 py-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/30 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
                                    <input
                                        type="email" required name="email" value={formData.email} onChange={handleChange}
                                        placeholder="john@example.com"
                                        className="w-full px-5 py-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/30 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 mb-6">
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Subject</label>
                                <input
                                    type="text" name="subject" value={formData.subject} onChange={handleChange}
                                    placeholder="Portfolio Inquiry"
                                    className="w-full px-5 py-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/30 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                />
                            </div>

                            <div className="space-y-2 mb-8">
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Message</label>
                                <textarea
                                    required name="message" rows={5} value={formData.message} onChange={handleChange}
                                    placeholder="Tell me about your project..."
                                    className="w-full px-5 py-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/30 outline-none transition-all resize-none placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${submitted
                                    ? 'bg-emerald-500 text-white'
                                    : 'bg-blue-600 text-white hover:bg-blue-700 dark:hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-200 dark:hover:shadow-blue-900/20'
                                    }`}
                            >
                                {isSubmitting ? (
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : submitted ? (
                                    <>Success! <Send size={18} /></>
                                ) : (
                                    <>Send Message <Send size={18} /></>
                                )}
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
};