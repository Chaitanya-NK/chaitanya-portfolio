import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

export const Footer = () => {
    const socialLinks = [
        { icon: <Github size={20} />, href: 'https://github.com', label: 'GitHub' },
        { icon: <Linkedin size={20} />, href: 'https://linkedin.com', label: 'LinkedIn' },
        { icon: <Twitter size={20} />, href: 'https://twitter.com', label: 'Twitter' },
        { icon: <Mail size={20} />, href: 'mailto:your@email.com', label: 'Email' },
    ];

    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center">
                    {/* Branding & Socials */}
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Chaitanya N K
                        </h2>
                        <p className="text-gray-500 mt-2 max-w-md">
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
                                className="text-gray-400 hover:text-blue-600 transition-colors duration-300"
                                aria-label={social.label}
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-gray-100 mb-8" />

                    {/* Copyright & Info */}
                    <div className="flex flex-col md:flex-row justify-between items-center w-full text-sm text-gray-400">
                        <p>
                            &copy; {new Date().getFullYear()} Chaitanya's Portfolio.
                        </p>
                        <p className="mt-2 md:mt-0 flex items-center gap-1">
                            Designed & Built with
                            <span className="text-red-500 inline-block animate-pulse">❤️</span>
                            using React & Tailwind
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};