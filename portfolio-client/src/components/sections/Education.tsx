import { Calendar, BookOpen, Building2, ChevronRight } from 'lucide-react';
import { usePortfolioData } from '../../hooks/usePortfolioData';

export const Education = () => {
    const { education, loading } = usePortfolioData();

    if (loading) {
        return (
            <div className="py-24 flex justify-center items-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <section id="education" className="py-24 bg-gray-50/30">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="mb-20 text-center">
                    <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-2">
                        Academic Foundation
                    </h2>
                    <h3 className="text-4xl font-bold text-gray-900 md:text-5xl">
                        My <span className="text-blue-600">Education</span>
                    </h3>
                    <div className="h-1.5 w-20 bg-blue-600 mt-4 rounded-full mx-auto"></div>
                </div>

                {/* Timeline Container */}
                <div className="relative">
                    {/* The Vertical Line - Centered on MD+ */}
                    <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 h-full w-0.5 bg-gray-200"></div>

                    {education.map((edu: any, index: number) => {
                        const isEven = index % 2 === 0;

                        return (
                            <div key={edu._id} className="relative mb-16 last:mb-0 group">
                                {/* Timeline Dot */}
                                <div className="absolute left-[9px] md:left-1/2 md:-translate-x-1/2 top-2 z-10 w-5 h-5 rounded-full border-4 border-white bg-blue-500 shadow-sm transition-transform duration-300 group-hover:scale-125" />

                                <div className={`flex flex-col md:flex-row items-start ${isEven ? 'md:flex-row-reverse' : ''}`}>

                                    {/* Date Column (Desktop) */}
                                    <div className="hidden md:flex md:w-1/2 justify-center px-8 pt-1">
                                        <span className="text-sm font-bold uppercase tracking-wider text-gray-400">
                                            {edu.startDate} — {edu.endDate}
                                        </span>
                                    </div>

                                    {/* Content Card */}
                                    <div className="w-full md:w-1/2 pl-12 md:pl-0">
                                        <div className={`relative bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 ${isEven ? 'md:mr-8' : 'md:ml-8'
                                            }`}>
                                            {/* Mobile Date */}
                                            <div className="md:hidden flex items-center gap-2 text-xs font-bold text-blue-600 uppercase mb-2">
                                                <Calendar size={12} />
                                                {edu.startDate} — {edu.endDate}
                                            </div>

                                            {/* Degree & Institution */}
                                            <div className="flex flex-col mb-4">
                                                <h4 className="text-xl font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors">
                                                    {edu.degree}
                                                </h4>
                                                <div className="flex items-center gap-2 text-blue-600 font-medium mt-1">
                                                    <Building2 size={16} />
                                                    <span className="text-lg">{edu.institution}</span>
                                                </div>
                                                {edu.fieldOfStudy && (
                                                    <div className="flex items-center gap-1 text-gray-400 text-sm mt-1">
                                                        <BookOpen size={14} />
                                                        <span>{edu.fieldOfStudy}</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Description Logic: Handles both String and Array safely */}
                                            {edu.description && (
                                                <div className="mt-4 border-t border-gray-50 pt-4">
                                                    {Array.isArray(edu.description) ? (
                                                        <ul className="space-y-2">
                                                            {edu.description.map((point: string, i: number) => (
                                                                <li key={i} className="flex gap-2 text-gray-600 text-sm leading-relaxed">
                                                                    <ChevronRight size={14} className="text-blue-400 mt-1 shrink-0" />
                                                                    <span>{point}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ) : (
                                                        // Fallback if it's just a regular string
                                                        <p className="text-gray-600 text-sm leading-relaxed">
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