import { Calendar, BookOpen, Building2, ChevronRight } from 'lucide-react';
import { usePortfolioData } from '../../hooks/usePortfolioData';

export const Education = () => {
    const { education, loading } = usePortfolioData();

    if (loading) {
        return (
            <div className="py-24 flex justify-center items-center bg-white dark:bg-slate-950">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <section id="education" className="py-24 bg-gray-50/50 dark:bg-slate-950 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="mb-20 text-center">
                    <h2 className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2">
                        Academic Foundation
                    </h2>
                    <h3 className="text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
                        My <span className="text-blue-600 dark:text-blue-400">Education</span>
                    </h3>
                    <div className="h-1.5 w-20 bg-blue-600 dark:bg-blue-500 mt-4 rounded-full mx-auto"></div>
                </div>

                {/* Timeline Container */}
                <div className="relative">
                    {/* The Vertical Line - Improved Visibility */}
                    <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 h-full w-0.5 bg-gray-200 dark:bg-slate-800"></div>

                    {education.map((edu: any, index: number) => {
                        const isEven = index % 2 === 0;

                        return (
                            <div key={edu._id} className="relative mb-16 last:mb-0 group">
                                
                                {/* Timeline Dot with Glow */}
                                <div className="absolute left-[9px] md:left-1/2 md:-translate-x-1/2 top-2 z-10 w-5 h-5 rounded-full border-4 border-white dark:border-slate-950 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-transform duration-300 group-hover:scale-150 group-hover:bg-blue-400" />

                                <div className={`flex flex-col md:flex-row items-start ${isEven ? 'md:flex-row-reverse' : ''}`}>

                                    {/* Date Column (Desktop) */}
                                    <div className={`hidden md:flex md:w-1/2 px-8 pt-1 ${isEven ? 'justify-start' : 'justify-end'}`}>
                                        <span className="text-sm font-bold uppercase tracking-wider text-gray-400 dark:text-slate-500 group-hover:text-blue-500 transition-colors">
                                            {edu.startDate} — {edu.endDate}
                                        </span>
                                    </div>

                                    {/* Content Card */}
                                    <div className="w-full md:w-1/2 pl-12 md:pl-0">
                                        <div className={`relative bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-200 dark:hover:border-blue-500/30 transition-all duration-500 ${isEven ? 'md:mr-8' : 'md:ml-8'}`}>
                                            
                                            {/* Mobile Date Overlay */}
                                            <div className="md:hidden flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase mb-3">
                                                <Calendar size={14} />
                                                {edu.startDate} — {edu.endDate}
                                            </div>

                                            {/* Degree & Institution */}
                                            <div className="space-y-2">
                                                <h4 className="text-xl font-extrabold text-gray-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                                                    {edu.degree}
                                                </h4>
                                                
                                                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
                                                    <Building2 size={18} className="shrink-0" />
                                                    <span className="text-lg">{edu.institution}</span>
                                                </div>

                                                {edu.fieldOfStudy && (
                                                    <div className="flex items-center gap-2 text-gray-500 dark:text-slate-400 text-sm">
                                                        <BookOpen size={16} className="shrink-0" />
                                                        <span className="italic">{edu.fieldOfStudy}</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Description List */}
                                            {edu.description && (
                                                <div className="mt-5 pt-5 border-t border-gray-100 dark:border-slate-800/50">
                                                    {Array.isArray(edu.description) ? (
                                                        <ul className="space-y-3">
                                                            {edu.description.map((point: string, i: number) => (
                                                                <li key={i} className="flex gap-3 text-gray-600 dark:text-slate-400 text-sm leading-relaxed">
                                                                    <ChevronRight size={16} className="text-blue-500 dark:text-blue-400 mt-0.5 shrink-0" />
                                                                    <span>{point}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ) : (
                                                        <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">
                                                            {edu.description}
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};