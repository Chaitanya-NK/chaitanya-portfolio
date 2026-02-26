import { Briefcase, Calendar, MapPin, ChevronRight } from 'lucide-react';
import { usePortfolioData } from '../../hooks/usePortfolioData';

export const Experience = () => {
    const { experience, loading } = usePortfolioData();

    if (loading) {
        return (
            <div className="py-24 flex justify-center items-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <section id="experience" className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="mb-20 text-center">
                    <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-2">
                        Professional Journey
                    </h2>
                    <h3 className="text-4xl font-bold text-gray-900 md:text-5xl">
                        Work <span className="text-blue-600">Experience</span>
                    </h3>
                    <div className="h-1.5 w-20 bg-blue-600 mt-4 rounded-full mx-auto"></div>
                </div>

                {/* Timeline Container */}
                <div className="relative">
                    {/* The Vertical Line - Centered on MD+ */}
                    <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 h-full w-0.5 bg-gray-100"></div>

                    {experience.map((exp: any, index: number) => {
                        const isEven = index % 2 === 0;

                        return (
                            <div key={exp._id} className="relative mb-16 last:mb-0">
                                {/* Timeline Dot */}
                                <div className={`absolute left-[9px] md:left-1/2 md:-translate-x-1/2 top-2 z-10 w-5 h-5 rounded-full border-4 border-white transition-all duration-500 shadow-sm ${exp.isCurrent ? 'bg-blue-600 ring-4 ring-blue-100 animate-pulse' : 'bg-gray-300 group-hover:bg-blue-600'
                                    }`} />

                                <div className={`flex flex-col md:flex-row items-start ${isEven ? 'md:flex-row-reverse' : ''}`}>

                                    {/* Date Column (Hidden on Mobile, or shown differently) */}
                                    <div className="hidden md:flex md:w-1/2 justify-center px-8 pt-1">
                                        <span className={`text-sm font-bold uppercase tracking-wider ${exp.isCurrent ? 'text-blue-600' : 'text-gray-400'}`}>
                                            {exp.startDate} — {exp.isCurrent ? 'Present' : exp.endDate}
                                        </span>
                                    </div>

                                    {/* Content Card */}
                                    <div className="w-full md:w-1/2 pl-12 md:pl-0">
                                        <div className={`relative bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 ${isEven ? 'md:mr-8' : 'md:ml-8'
                                            }`}>
                                            {/* Mobile Date (Visible only on small screens) */}
                                            <div className="md:hidden flex items-center gap-2 text-xs font-bold text-blue-600 uppercase mb-2">
                                                <Calendar size={12} />
                                                {exp.startDate} — {exp.isCurrent ? 'Present' : exp.endDate}
                                            </div>

                                            {/* Role & Company */}
                                            <div className="flex flex-col mb-4">
                                                <h4 className="text-xl font-extrabold text-gray-900 group-hover:text-blue-600">
                                                    {exp.role}
                                                </h4>
                                                <div className="flex items-center gap-2 text-blue-600 font-medium mt-1">
                                                    <Briefcase size={16} />
                                                    <span className="text-lg">{exp.company}</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-gray-400 text-sm mt-1">
                                                    <MapPin size={14} />
                                                    <span>{exp.location}</span>
                                                </div>
                                            </div>

                                            {/* Description Bullets */}
                                            <ul className="space-y-3">
                                                {exp.description.map((bullet: string, i: number) => (
                                                    <li key={i} className="flex gap-3 text-gray-600 text-sm leading-relaxed">
                                                        <ChevronRight size={16} className="text-blue-500 mt-0.5 shrink-0" />
                                                        <span>{bullet}</span>
                                                    </li>
                                                ))}
                                            </ul>
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