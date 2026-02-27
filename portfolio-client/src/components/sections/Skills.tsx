import * as LucideIcons from 'lucide-react';
import { usePortfolioData } from '../../hooks/usePortfolioData';

const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
    const IconComponent = (LucideIcons as any)[name];
    return IconComponent ? <IconComponent className={className} /> : <LucideIcons.Cpu className={className} />;
};

export const Skills = () => {
    const { skills, loading } = usePortfolioData();

    if (loading) return null;

    const categories = ['DevOps', 'Backend', 'Language', 'Frontend', 'Database'];
    const tools = skills.filter((s: any) => s.isTool);
    const coreSkills = skills.filter((s: any) => !s.isTool);

    return (
        <section id="skills" className="relative py-32 bg-white dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
            
            {/* Background Aesthetic: Grid Pattern & Blobs */}
            <div className="absolute inset-0 z-0 opacity-40 dark:opacity-20" 
                 style={{ backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
            </div>
            
            {/* Decorative Blobs - Adjusted for Dark Mode */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50 animate-pulse"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-100 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-50 animate-pulse delay-1000"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header with Badge */}
                <div className="mb-20 text-center md:text-left">
                    <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-blue-700 dark:text-blue-400 uppercase bg-blue-100 dark:bg-blue-900/30 rounded-full">
                        Technical Stack
                    </span>
                    <h3 className="text-4xl font-black text-slate-900 dark:text-white md:text-6xl tracking-tight">
                        Powering <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Innovation.</span>
                    </h3>
                    <p className="mt-4 text-slate-500 dark:text-slate-400 max-w-2xl text-lg">
                        A comprehensive toolkit curated through years of building automation pipelines and scalable architectures.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* Left: Skill Bento Grid */}
                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {categories.map((cat, idx) => {
                            const catSkills = coreSkills.filter((s: any) => s.category === cat);
                            if (catSkills.length === 0) return null;

                            return (
                                <div
                                    key={cat}
                                    className="p-8 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl dark:hover:shadow-blue-500/10 hover:border-blue-200 dark:hover:border-blue-900/50 transition-all duration-500 group relative overflow-hidden"
                                >
                                    {/* Subtle category number background */}
                                    <span className="absolute -right-4 -bottom-4 text-8xl font-black text-slate-100 dark:text-slate-800 opacity-[0.2] dark:opacity-[0.05] group-hover:opacity-[0.4] dark:group-hover:opacity-[0.1] transition-opacity select-none">
                                        0{idx + 1}
                                    </span>

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="p-2 rounded-lg bg-slate-900 dark:bg-blue-600 text-white">
                                                <DynamicIcon name={cat === 'DevOps' ? 'Terminal' : cat === 'Backend' ? 'Server' : 'Code'} className="w-5 h-5" />
                                            </div>
                                            <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100">{cat}</h4>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {catSkills.map((skill: any) => (
                                                <span
                                                    key={skill._id}
                                                    className="px-4 py-2 text-sm font-semibold bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl border border-slate-100 dark:border-slate-700 group-hover:bg-blue-600 dark:group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-600 transition-all duration-300"
                                                >
                                                    {skill.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right: The "Workflow Engine" (Tools) */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-28 p-8 rounded-[2rem] bg-slate-900 dark:bg-slate-900 text-white shadow-2xl border border-slate-800">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2 bg-blue-500 rounded-lg">
                                    <LucideIcons.Wrench className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold">Workflow</h4>
                                    <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Tools & Systems</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {tools.map((tool: any) => (
                                    <div
                                        key={tool._id}
                                        className="flex items-center justify-between p-4 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-blue-500/50 hover:bg-slate-800 transition-all group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 rounded-xl bg-slate-700 group-hover:text-blue-400 transition-colors">
                                                <DynamicIcon name={tool.icon} className="w-5 h-5" />
                                            </div>
                                            <span className="font-bold text-slate-200">{tool.name}</span>
                                        </div>
                                        <LucideIcons.ArrowUpRight size={18} className="text-slate-500 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-all" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};