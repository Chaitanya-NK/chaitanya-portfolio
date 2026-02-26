import { Award, Briefcase, Code } from 'lucide-react';
import { usePortfolioData } from '../../hooks/usePortfolioData';
import myPhoto from '../../assets/Me.png';

export const About = () => {
    const { projects, experience, skills, loading } = usePortfolioData();

    const projectCount = projects.length;

    const calculateExperience = () => {
        if (!experience || experience.length === 0) return '0';

        // Parse dates safely
        const startDates = (experience)
            .map(exp => new Date(exp.startDate))
            .filter(date => !isNaN(date.getTime()));

        if (startDates.length === 0) return '0';

        const earliestDate = new Date(Math.min(...startDates.map(d => d.getTime())));
        const today = new Date();
        
        let diffYears = today.getFullYear() - earliestDate.getFullYear();
        const monthDiff = today.getMonth() - earliestDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < earliestDate.getDate())) {
            diffYears--;
        }

        return diffYears <= 0 ? "1+" : `${diffYears}+`;
    };

    if (loading) {
        return (
            <div className="py-24 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    const stats = [
        { label: 'Years Experience', value: `${calculateExperience()} Years`, icon: <Briefcase className="text-blue-600" size={24} /> },
        { label: 'Projects Built', value: `${projectCount}+ Done`, icon: <Code className="text-indigo-600" size={24} /> },
        { label: 'Primary Role', value: 'RE', icon: <Award className="text-blue-600" size={24} /> },
    ];

    return (
        <section id="about" className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="mb-16">
                    <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-2 text-center md:text-left">
                        Introduction
                    </h2>
                    <h3 className="text-4xl font-bold text-gray-900 md:text-5xl text-center md:text-left">
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Me</span>
                    </h3>
                    <div className="h-1.5 w-20 bg-blue-600 mt-4 rounded-full mx-auto md:mx-0"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* Left Side: Visuals */}
                    <div className="lg:col-span-5 relative group">
                        <div className="relative z-10 overflow-hidden rounded-2xl bg-gray-100 shadow-xl">
                            <img
                                src={myPhoto}
                                alt="Developer Workspace"
                                className="w-full h-fit object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                            />
                            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-sm border border-white/20">
                                <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">Release Engineer</p>
                            </div>
                        </div>
                        {/* Decorative Blobs */}
                        <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-200/50 rounded-full blur-3xl -z-10 animate-pulse"></div>
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-indigo-200/50 rounded-full blur-3xl -z-10 animate-pulse delay-700"></div>
                    </div>

                    {/* Right Side: Narrative */}
                    <div className="lg:col-span-7 space-y-6">
                        <h4 className="text-2xl font-semibold text-gray-800 leading-tight text-center md:text-left">
                            I'm Chaitanya N K, <span className="text-blue-600">Release Engineer.</span>
                        </h4>

                        <p className="text-lg text-gray-600 leading-relaxed text-center md:text-left">
                            As a Release Engineer at Veeva Systems, I focus on building high-efficiency deployment pipelines. 
                            I thrive on optimizing the intersection of development and production, ensuring that software 
                            is delivered reliably, securely, and at lightning speed.
                        </p>

                        {/* Dynamic Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="p-5 rounded-2xl border border-gray-100 bg-white hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300 group text-center md:text-left"
                                >
                                    <div className="p-2 w-fit rounded-lg bg-blue-50 text-blue-600 mb-3 mx-auto md:mx-0">
                                        {stat.icon}
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                                    <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Dynamic Experience Highlights from Skills API */}
                        <div className="pt-6">
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 text-center md:text-left">Technical Expertise</p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                {skills && skills.length > 0 ? (
                                    skills.map((skill: any) => (
                                        <span 
                                            key={skill._id} 
                                            className="px-4 py-1.5 bg-gray-50 text-gray-700 text-sm font-medium rounded-full border border-gray-100 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 transition-all cursor-default"
                                        >
                                            {skill.name}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-gray-400 italic">Loading technical stack...</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};