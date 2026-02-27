import { useState } from 'react';
import { Github, ExternalLink, FolderCode } from 'lucide-react';
import { usePortfolioData } from '../../hooks/usePortfolioData';

export const Projects = () => {
    const { projects, loading } = usePortfolioData();
    const [filter, setFilter] = useState('All');

    if (loading) return null;

    const categories = ['All', ...new Set(projects.map((p: any) => p.category))];

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter((p: any) => p.category === filter);

    return (
        <section id="projects" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header & Filter */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <h2 className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2">Portfolio</h2>
                        <h3 className="text-4xl font-bold text-gray-900 dark:text-white">Featured <span className="text-blue-600 dark:text-blue-400">Projects</span></h3>
                        <div className="h-1.5 w-20 bg-blue-600 dark:bg-blue-500 mt-4 rounded-full"></div>
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${filter === cat
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/20'
                                        : 'bg-gray-50 dark:bg-slate-900 text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 border border-gray-200 dark:border-slate-800'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project: any) => (
                        <div
                            key={project._id}
                            className="group relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-500"
                        >
                            {/* Image Container */}
                            <div className="relative h-52 overflow-hidden">
                                <img
                                    src={project.imageUrl}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {/* Overlay on Hover */}
                                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6">
                                    <div className="flex gap-4">
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="p-3 bg-white/20 hover:bg-white text-white hover:text-blue-600 rounded-full backdrop-blur-md transition-all duration-300"
                                            title="View Code"
                                        >
                                            <Github size={22} />
                                        </a>
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="p-3 bg-white/20 hover:bg-white text-white hover:text-blue-600 rounded-full backdrop-blur-md transition-all duration-300"
                                                title="Live Demo"
                                            >
                                                <ExternalLink size={22} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <FolderCode size={16} className="text-blue-500 dark:text-blue-400" />
                                    <span className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider">{project.category}</span>
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {project.title}
                                </h4>
                                <p className="text-gray-500 dark:text-slate-400 text-sm line-clamp-2 mb-4 leading-relaxed">
                                    {project.description}
                                </p>

                                {/* Tech Stack Tags */}
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map((tech: string) => (
                                        <span
                                            key={tech}
                                            className="px-2.5 py-1 bg-gray-50 dark:bg-slate-800/50 text-gray-500 dark:text-slate-400 text-[10px] font-bold uppercase rounded-md border border-gray-100 dark:border-slate-800 group-hover:border-blue-100 dark:group-hover:border-blue-900/50 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-400 dark:text-slate-600 text-lg">No projects found in this category.</p>
                    </div>
                )}
            </div>
        </section>
    );
};