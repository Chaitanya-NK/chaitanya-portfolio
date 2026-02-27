import { useState, useContext } from 'react';
import { Menu, X, Code2, Sun, Moon } from 'lucide-react';
import { ThemeContext } from '../context/ThemeProvider'; // Ensure this points to the Context, not the Provider component

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, toggleTheme } = useContext(ThemeContext);

    const navItems = [
        { name: 'Projects', href: '#projects' },
        { name: 'Skills', href: '#skills' },
        { name: 'Experience', href: '#experience' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav className="fixed w-full z-50 top-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo Section */}
                    <div className="flex-shrink-0 flex items-center gap-2 group cursor-pointer">
                        <div className="bg-blue-600 p-1.5 rounded-lg group-hover:rotate-12 transition-all duration-300">
                            <Code2 className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
                            Chaitanya
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <ul className="flex space-x-4 items-center">
                            {navItems.map((item) => (
                                <li key={item.name}>
                                    <a
                                        href={item.href}
                                        className="relative group px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                                    >
                                        {item.name}
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 origin-right transition-transform duration-300 group-hover:scale-x-100 group-hover:origin-left"></span>
                                    </a>
                                </li>
                            ))}
                        </ul>

                        {/* Theme Toggle Button */}
                        <button
                            onClick={toggleTheme}
                            className="p-2.5 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-yellow-400 hover:ring-2 hover:ring-blue-400/50 transition-all duration-300 flex items-center justify-center overflow-hidden active:scale-90"
                            aria-label="Toggle Theme"
                        >
                            {/* Icons with simple entry animation */}
                            <div className="relative w-5 h-5">
                                {theme === 'dark' ? (
                                    <Sun size={20} className="animate-in zoom-in duration-300" />
                                ) : (
                                    <Moon size={20} className="animate-in zoom-in duration-300 text-slate-700" />
                                )}
                            </div>
                        </button>
                    </div>

                    {/* Mobile Menu & Toggle */}
                    <div className="md:hidden flex items-center gap-2">
                        <button 
                            onClick={toggleTheme} 
                            className="p-2 text-gray-600 dark:text-yellow-400 transition-transform active:scale-90"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} className="text-slate-700" />}
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-md text-gray-600 dark:text-gray-300 focus:outline-none"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div className={`md:hidden absolute w-full bg-white dark:bg-slate-900 border-b dark:border-slate-800 shadow-xl transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 pointer-events-none'}`}>
                <ul className="px-4 pt-2 pb-6 space-y-1">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <a
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="block px-3 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-all"
                            >
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};