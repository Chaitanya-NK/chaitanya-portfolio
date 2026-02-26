import { useState } from 'react';
import { Github, ExternalLink, FolderCode } from 'lucide-react';
import { usePortfolioData } from '../../hooks/usePortfolioData';

export const Projects = () => {
    const { projects, loading } = usePortfolioData();
    const [filter, setFilter] = useState('All');

    if (loading) return null;

    // Get unique categories from your data
    const categories = ['All', ...new Set(projects.map((p: any) => p.category))];

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter((p: any) => p.category === filter);

    return (
        <section id="projects" className="py-24 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header & Filter */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-2">Portfolio</h2>
                        <h3 className="text-4xl font-bold text-gray-900">Featured <span className="text-blue-600">Projects</span></h3>
                        <div className="h-1.5 w-20 bg-blue-600 mt-4 rounded-full"></div>
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${filter === cat
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
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
                            className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                        >
                            {/* Image Container */}
                            <div className="relative h-52 overflow-hidden">
                                <img
                                    src={project.imageUrl}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <div className="flex gap-3">
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-blue-600 transition-all"
                                            title="View Code"
                                        >
                                            <Github size={20} />
                                        </a>
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-blue-600 transition-all"
                                                title="Live Demo"
                                            >
                                                <ExternalLink size={20} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <FolderCode size={16} className="text-blue-500" />
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{project.category}</span>
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                    {project.title}
                                </h4>
                                <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed">
                                    {project.description}
                                </p>

                                {/* Tech Stack Tags */}
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map((tech: string) => (
                                        <span
                                            key={tech}
                                            className="px-2.5 py-1 bg-gray-50 text-gray-500 text-[10px] font-bold uppercase rounded-md border border-gray-100 group-hover:border-blue-100 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors"
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
                        <p className="text-gray-400">No projects found in this category.</p>
                    </div>
                )}
            </div>
        </section>
    );
};