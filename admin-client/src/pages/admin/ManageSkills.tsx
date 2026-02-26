import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trash2, 
  Code2, 
  Wrench, 
  ChevronDown, 
  Globe, 
  Terminal, 
  Cpu, 
  Database,
  PlusCircle,
  AlertCircle
} from 'lucide-react';
import API from '../../api/axiosInstance';

const categories = [
  { id: 'DevOps', icon: <Terminal size={16} />, color: 'text-blue-400' },
  { id: 'Frontend', icon: <Globe size={16} />, color: 'text-emerald-400' },
  { id: 'Backend', icon: <Database size={16} />, color: 'text-purple-400' },
  { id: 'Language', icon: <Cpu size={16} />, color: 'text-amber-400' }
];

const ManageSkills = () => {
  const [skills, setSkills] = useState([]);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', 
    category: 'DevOps', 
    isTool: false 
  });

  const fetchSkills = async () => {
    try {
      const res = await API.get('/skills');
      setSkills(res.data);
    } catch (err) {
      console.error("Error fetching skills:", err);
    }
  };

  useEffect(() => { fetchSkills(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/skills', formData);
      setFormData({ name: '', category: 'DevOps', isTool: false });
      fetchSkills();
    } catch (err) {
      console.error("Error adding skill:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Remove this skill from the engine?")) {
      await API.delete(`/skills/${id}`);
      fetchSkills();
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-white tracking-tight">Skills & Tech Stack</h1>
        <p className="text-slate-400 mt-2">Manage the technologies and tools displayed on your portfolio grid.</p>
      </header>

      {/* --- ADD SKILL FORM --- */}
      <motion.form 
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-800 flex flex-wrap lg:flex-nowrap gap-4 items-end mb-12 shadow-xl"
      >
        <div className="flex-1 min-w-[200px]">
          <label className="block text-slate-500 text-[10px] uppercase font-bold mb-2 ml-1 tracking-widest">Skill Name</label>
          <input 
            type="text" 
            placeholder="e.g. Jenkins, Python..." 
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-emerald-500/50 outline-none transition-all"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>

        {/* --- CUSTOM DROPDOWN --- */}
        <div className="w-full lg:w-56 relative">
          <label className="block text-slate-500 text-[10px] uppercase font-bold mb-2 ml-1 tracking-widest">Category</label>
          <button
            type="button"
            onClick={() => setIsSelectOpen(!isSelectOpen)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white flex items-center justify-between hover:border-slate-700 transition-all focus:outline-none"
          >
            <div className="flex items-center gap-3">
              {categories.find(c => c.id === formData.category)?.icon}
              <span className="text-sm">{formData.category}</span>
            </div>
            <ChevronDown size={16} className={`text-slate-500 transition-transform duration-300 ${isSelectOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isSelectOpen && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 5 }}
                className="absolute top-[105%] left-0 w-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden z-50 shadow-2xl"
              >
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, category: cat.id });
                      setIsSelectOpen(false);
                    }}
                    className="w-full px-4 py-3 hover:bg-emerald-500/10 hover:text-emerald-400 cursor-pointer flex items-center gap-3 text-sm text-slate-400 transition-colors border-b border-slate-800/50 last:border-0"
                  >
                    <span className={cat.color}>{cat.icon}</span>
                    {cat.id}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-3 h-[46px] px-4 bg-slate-950 border border-slate-800 rounded-xl">
          <input 
            type="checkbox" 
            id="isTool"
            className="w-4 h-4 accent-emerald-500 cursor-pointer"
            checked={formData.isTool} 
            onChange={e => setFormData({...formData, isTool: e.target.checked})} 
          />
          <label htmlFor="isTool" className="text-sm text-slate-400 cursor-pointer select-none">Mark as Tool</label>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="bg-emerald-500 text-slate-950 h-[46px] px-8 rounded-xl font-bold hover:bg-emerald-400 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? "Adding..." : <><PlusCircle size={18} /> Add Skill</>}
        </button>
      </motion.form>

      {/* --- SKILLS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map(cat => {
          const categorySkills = skills.filter((s: any) => s.category === cat.id);
          
          return (
            <div key={cat.id} className="flex flex-col">
              <div className="flex items-center gap-2 mb-4 px-1">
                <span className={cat.color}>{cat.icon}</span>
                <h3 className="text-slate-300 font-bold text-sm uppercase tracking-widest">{cat.id}</h3>
                <span className="ml-auto text-slate-600 text-xs font-mono">{categorySkills.length}</span>
              </div>
              
              <div className="space-y-3">
                {categorySkills.length > 0 ? (
                  categorySkills.map((skill: any) => (
                    <motion.div 
                      layout
                      key={skill._id} 
                      className="flex items-center justify-between bg-slate-900/30 border border-slate-800/50 p-3 rounded-xl group hover:border-emerald-500/30 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        {skill.isTool ? <Wrench size={14} className="text-slate-500" /> : <Code2 size={14} className="text-emerald-500/60" />}
                        <span className="text-slate-200 text-sm font-medium">{skill.name}</span>
                      </div>
                      <button 
                        onClick={() => handleDelete(skill._id)} 
                        className="opacity-0 group-hover:opacity-100 text-slate-600 hover:text-red-400 transition-all p-1"
                      >
                        <Trash2 size={14} />
                      </button>
                    </motion.div>
                  ))
                ) : (
                  <div className="flex items-center gap-2 text-slate-600 text-xs italic p-3 border border-dashed border-slate-800 rounded-xl">
                    <AlertCircle size={12} /> No items added
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ManageSkills;