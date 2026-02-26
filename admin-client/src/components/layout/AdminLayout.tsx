import React from 'react';
import Sidebar from './Sidebar';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200">
            <Sidebar />
            {/* ml-0 for mobile (sidebar is hidden/overlay)
        lg:ml-64 for large screens (sidebar is fixed)
      */}
            <main className="lg:ml-64 p-4 md:p-8 pt-20 lg:pt-8 min-h-screen transition-all duration-300 bg-gradient-to-br from-slate-950 to-[#020617]">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;