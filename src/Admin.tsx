import { useEffect, useState } from 'react';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { Button } from './components/ui/button';
import { LayoutDashboard, LogOut, FileText, Briefcase, Award, Code, Loader2 } from 'lucide-react';
import { AboutAdmin } from './admin/AboutAdmin';
import { ProjectsAdmin } from './admin/ProjectsAdmin';
import { SkillsAdmin } from './admin/SkillsAdmin';
import { CertificatesAdmin } from './admin/CertificatesAdmin';

export default function Admin() {
  const navigate = useNavigate();
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate('/login');
      else setSession(session);
    });
  }, [navigate]);

  if (!session) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin" /></div>;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const Sidebar = () => (
    <div className="w-full md:w-64 bg-card border-b md:border-r md:border-b-0 border-border md:h-full flex flex-col md:fixed top-0 left-0 z-50">
      <div className="p-4 md:p-6 border-b border-border flex justify-between items-center">
        <h2 className="text-xl font-bold flex items-center gap-2"><LayoutDashboard className="w-5 h-5" /> Admin</h2>
        <Button variant="ghost" size="sm" className="md:hidden text-destructive hover:bg-destructive/20" onClick={handleLogout}><LogOut className="w-5 h-5" /></Button>
      </div>
      <nav className="flex md:flex-col overflow-x-auto p-2 md:p-4 gap-2 whitespace-nowrap md:whitespace-normal no-scrollbar">
        <Button variant="ghost" className="justify-start shrink-0" asChild><Link to="/admin/about"><FileText className="w-4 h-4 mr-2" /> About</Link></Button>
        <Button variant="ghost" className="justify-start shrink-0" asChild><Link to="/admin/projects"><Briefcase className="w-4 h-4 mr-2" /> Projects</Link></Button>
        <Button variant="ghost" className="justify-start shrink-0" asChild><Link to="/admin/skills"><Code className="w-4 h-4 mr-2" /> Skills</Link></Button>
        <Button variant="ghost" className="justify-start shrink-0" asChild><Link to="/admin/certificates"><Award className="w-4 h-4 mr-2" /> Certificates</Link></Button>
      </nav>
      <div className="p-4 border-t border-border hidden md:block mt-auto">
        <Button variant="destructive" className="w-full" onClick={handleLogout}><LogOut className="w-4 h-4 mr-2" /> Logout</Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <Sidebar />
      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 p-4 md:p-8">
        <Routes>
          <Route path="/" element={<h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>} />
          <Route path="/about" element={<AboutAdmin session={session} />} />
          <Route path="/projects" element={<ProjectsAdmin session={session} />} />
          <Route path="/skills" element={<SkillsAdmin session={session} />} />
          <Route path="/certificates" element={<CertificatesAdmin session={session} />} />
        </Routes>
      </div>
    </div>
  );
}
