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
        <section id="skills" className="relative py-32 bg-slate-50 overflow-hidden">
            {/* Background Aesthetic: Grid Pattern & Blobs */}
            <div className="absolute inset-0 z-0 opacity-40" style={{ backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 animate-pulse"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header with Badge */}
                <div className="mb-20 text-center md:text-left">
                    <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-blue-700 uppercase bg-blue-100 rounded-full">
                        Technical Stack
                    </span>
                    <h3 className="text-4xl font-black text-slate-900 md:text-6xl tracking-tight">
                        Powering <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Innovation.</span>
                    </h3>
                    <p className="mt-4 text-slate-500 max-w-2xl text-lg">
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
                                    className={`p-8 rounded-[2rem] bg-white border border-slate-200 shadow-sm hover:shadow-2xl hover:border-blue-200 transition-all duration-500 group relative overflow-hidden`}
                                >
                                    {/* Subtle category number background */}
                                    <span className="absolute -right-4 -bottom-4 text-8xl font-black text-slate-50 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                                        0{idx + 1}
                                    </span>

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="p-2 rounded-lg bg-slate-900 text-white">
                                                <DynamicIcon name={cat === 'DevOps' ? 'Terminal' : cat === 'Backend' ? 'Server' : 'Code'} className="w-5 h-5" />
                                            </div>
                                            <h4 className="text-xl font-bold text-slate-800">{cat}</h4>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {catSkills.map((skill: any) => (
                                                <span
                                                    key={skill._id}
                                                    className="px-4 py-2 text-sm font-semibold bg-slate-50 text-slate-600 rounded-xl border border-slate-100 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300"
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
                        <div className="sticky top-28 p-8 rounded-[2rem] bg-slate-900 text-white shadow-2xl border border-slate-800">
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