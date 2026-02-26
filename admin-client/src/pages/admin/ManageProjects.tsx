import { useState } from 'react';
import ProjectForm from '../../components/forms/ProjectForm';
import ProjectTable from '../../components/tables/ProjectTable';

const ManageProjects = () => {
    const [refresh, setRefresh] = useState(0);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Project Management</h1>
            <ProjectForm onProjectAdded={() => setRefresh(prev => prev + 1)} />
            <ProjectTable refreshTrigger={refresh} />
        </div>
    );
};

export default ManageProjects;