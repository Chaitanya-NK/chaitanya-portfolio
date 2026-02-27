import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { usePortfolioData } from '../../hooks/usePortfolioData';

export const Footer = () => {
    const { config } = usePortfolioData();
    
    const socialLinks = [
        { icon: <Github size={20} />, href: config?.github || '#', label: 'GitHub' },
        { icon: <Linkedin size={20} />, href: config?.linkedin || '#', label: 'LinkedIn' },
        { icon: <Twitter size={20} />, href: config?.twitter || '#', label: 'Twitter' },
        { icon: <Mail size={20} />, href: `mailto:${config?.email}`, label: 'Email' },
    ];

    return (
        <footer className="bg-white dark:bg-slate-950 border-t border-gray-100 dark:border-slate-900 pt-16 pb-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center">
                    
                    {/* Branding & Socials */}
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Chaitanya N K
                        </h2>
                        <p className="text-gray-500 dark:text-slate-400 mt-2 max-w-md mx-auto">
                            Building digital experiences with precision and passion. 
                            Let's connect and create something amazing.
                        </p>
                    </div>

                    {/* Social Icons */}
                    <div className="flex space-x-6 mb-10">
                        {socialLinks.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 transform hover:-translate-y-1"
                                aria-label={social.label}
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-gray-100 dark:bg-slate-900 mb-8" />

                    {/* Copyright & Info */}
                    <div className="flex flex-col md:flex-row justify-between items-center w-full text-sm text-gray-400 dark:text-slate-500">
                        <p>
                            &copy; {new Date().getFullYear()} Chaitanya's Portfolio.
                        </p>
                        <p className="mt-4 md:mt-0 flex items-center gap-1">
                            Designed & Built with 
                            <span className="text-red-500 dark:text-red-600 inline-block animate-pulse mx-1">❤️</span> 
                            using React & Tailwind
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};