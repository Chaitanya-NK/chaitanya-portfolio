import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import AdminLayout from './components/layout/AdminLayout';
import ManageProjects from './pages/admin/ManageProjects';
import ManageSkills from './pages/admin/ManageSkills';
import ManageExperience from './pages/admin/ManageExperience';
import ManageEducation from './pages/admin/ManageEducation';
import Overview from './pages/admin/Overview';
import Settings from './pages/admin/Settings';
import ManageContacts from './pages/admin/ManageContacts';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <AdminLayout>{children}</AdminLayout> : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Overview />
            </ProtectedRoute>
          } />

          <Route path="/dashboard/projects" element={
            <ProtectedRoute>
              <ManageProjects />
            </ProtectedRoute>
          } />

          <Route path="/dashboard/skills" element={
            <ProtectedRoute>
              <ManageSkills />
            </ProtectedRoute>
          } />

          <Route path="/dashboard/experience" element={
            <ProtectedRoute>
              <ManageExperience />
            </ProtectedRoute>
          } />

          <Route path="/dashboard/education" element={
            <ProtectedRoute>
              <ManageEducation />
            </ProtectedRoute>
          } />

          <Route path="/dashboard/contacts" element={
            <ProtectedRoute>
              <ManageContacts />
            </ProtectedRoute>
          } />

          <Route path="/dashboard/settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;