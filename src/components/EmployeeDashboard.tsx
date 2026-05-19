import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Lock, 
  LayoutDashboard, 
  PhoneCall, 
  CalendarCheck, 
  Upload, 
  FileText, 
  CheckCircle2, 
  Clock, 
  LogOut,
  ChevronRight,
  TrendingUp,
  Target,
  BarChart3
} from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface Task {
  id: string;
  employeeId: string;
  client: string;
  type: 'call' | 'appointment';
  status: 'pending' | 'completed';
  date: string;
}

interface UserFile {
  id: string;
  employeeId: string;
  name: string;
  size: string;
  date: string;
}

export const EmployeeDashboard: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [user, setUser] = useState<Employee | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Dashboard Data
  const [tasks, setTasks] = useState<Task[]>([]);
  const [files, setFiles] = useState<UserFile[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'files'>('overview');

  useEffect(() => {
    const savedUser = localStorage.getItem('ipdm_employee');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      loadUserData(JSON.parse(savedUser).id);
    }
  }, []);

  const loadUserData = (userId: string) => {
    const allTasksStr = localStorage.getItem('ipdm_tasks') || '[]';
    const allTasks: Task[] = JSON.parse(allTasksStr);
    setTasks(allTasks.filter(t => t.employeeId === userId));

    const allFilesStr = localStorage.getItem('ipdm_files') || '[]';
    const allFiles: UserFile[] = JSON.parse(allFilesStr);
    setFiles(allFiles.filter(f => f.employeeId === userId));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate Auth
    setTimeout(() => {
      if (email.includes('@ipdm.ai') && password.length >= 6) {
        const mockUser: Employee = {
          id: btoa(email),
          name: email.split('@')[0].toUpperCase(),
          email: email,
          role: 'Sales Representative'
        };
        setUser(mockUser);
        localStorage.setItem('ipdm_employee', JSON.stringify(mockUser));
        loadUserData(mockUser.id);
        setIsLoading(false);
      } else {
        setError('Invalid IPDM credentials. Use your @ipdm.ai email.');
        setIsLoading(false);
      }
    }, 1500);
  };

  const handleLogout = () => {
    localStorage.removeItem('ipdm_employee');
    setUser(null);
  };

  const addTask = (type: 'call' | 'appointment') => {
    if (!user) return;
    const name = prompt(`Enter ${type} target name:`);
    if (!name) return;

    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      employeeId: user.id,
      client: name,
      type: type,
      status: 'pending',
      date: new Date().toLocaleDateString()
    };

    const allTasks = JSON.parse(localStorage.getItem('ipdm_tasks') || '[]');
    const updatedTasks = [...allTasks, newTask];
    localStorage.setItem('ipdm_tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks.filter(t => t.employeeId === user.id));
  };

  const toggleTask = (taskId: string) => {
    const allTasks: Task[] = JSON.parse(localStorage.getItem('ipdm_tasks') || '[]');
    const updated = allTasks.map(t => t.id === taskId ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' } : t);
    localStorage.setItem('ipdm_tasks', JSON.stringify(updated));
    if (user) loadUserData(user.id);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !e.target.files?.[0]) return;
    const file = e.target.files[0];
    
    const newFile: UserFile = {
      id: Math.random().toString(36).substr(2, 9),
      employeeId: user.id,
      name: file.name,
      size: (file.size / 1024).toFixed(1) + ' KB',
      date: new Date().toLocaleDateString()
    };

    const allFiles = JSON.parse(localStorage.getItem('ipdm_files') || '[]');
    const updatedFiles = [...allFiles, newFile];
    localStorage.setItem('ipdm_files', JSON.stringify(updatedFiles));
    if (user) loadUserData(user.id);
  };

  if (!user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/10 glass shadow-2xl"
        >
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 border border-primary/30">
              <Lock className="text-primary" size={32} />
            </div>
            <h2 className="text-2xl font-display font-medium text-white mb-2">Employee Portal</h2>
            <p className="text-sm text-zinc-500 font-mono uppercase tracking-widest">Velocity AI Intra-Net</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest ml-1">IPDM Credentials</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="employee@ipdm.ai"
                  required
                  className="w-full h-14 bg-white/[0.03] border border-white/10 rounded-2xl pl-12 pr-6 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest ml-1">Secure Key</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full h-14 bg-white/[0.03] border border-white/10 rounded-2xl pl-12 pr-6 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[10px] text-red-400 font-mono text-center bg-red-500/10 p-3 rounded-xl border border-red-500/20"
              >
                {error}
              </motion.p>
            )}

            <button 
              disabled={isLoading}
              className="w-full h-14 bg-primary text-black font-black uppercase tracking-widest rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-neon disabled:opacity-50"
            >
              {isLoading ? "Validating Identity..." : "Authorize Access"}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  const callsDone = tasks.filter(t => t.type === 'call' && t.status === 'completed').length;
  const appointmentsDone = tasks.filter(t => t.type === 'appointment' && t.status === 'completed').length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((tasks.filter(t => t.status === 'completed').length / totalTasks) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10 space-y-10">
      {/* Header HUD */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-10 border-b border-white/5">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-3xl bg-primary/20 flex items-center justify-center border border-primary/30">
             <LayoutDashboard className="text-primary" size={28} />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-display font-medium text-white">Commander HUD</h1>
              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono rounded border border-emerald-500/20 uppercase">Active Session</span>
            </div>
            <p className="text-zinc-500 text-sm mt-1">Personnel: <span className="text-zinc-300 font-medium">{user.name}</span> <span className="mx-2 text-zinc-800">|</span> Role: {user.role}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleLogout}
            className="px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 transition-all flex items-center gap-2 group"
          >
            <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-mono uppercase tracking-widest">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4 border-b border-white/5 pb-6 overflow-x-auto no-scrollbar">
        {[
          { id: 'overview', label: 'Strategic Overview', icon: BarChart3 },
          { id: 'tasks', label: 'Pipeline Tasks', icon: Target },
          { id: 'files', label: 'Intelligence Assets', icon: FileText },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 rounded-2xl text-[10px] uppercase font-black tracking-widest flex items-center gap-3 transition-all whitespace-nowrap
              ${activeTab === tab.id 
                ? 'bg-primary text-black shadow-neon border-primary' 
                : 'bg-white/[0.02] text-zinc-500 border border-white/10 hover:border-white/20'}`}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div 
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {[
                 { label: 'Outbound Calls', value: callsDone, icon: PhoneCall, trend: '+12%', color: 'text-blue-400' },
                 { label: 'Appointments Fixed', value: appointmentsDone, icon: CalendarCheck, trend: '+5%', color: 'text-emerald-400' },
                 { label: 'Conversion Rate', value: `${completionRate}%`, icon: TrendingUp, trend: 'Optimal', color: 'text-primary' },
                 { label: 'Market Assets', value: files.length, icon: FileText, trend: 'Latest', color: 'text-purple-400' },
               ].map((stat, i) => (
                 <div key={i} className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 glass relative group">
                    <stat.icon className={`absolute top-8 right-8 ${stat.color} opacity-20 group-hover:opacity-40 transition-opacity`} size={48} />
                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] mb-4">{stat.label}</p>
                    <div className="flex items-end gap-3">
                      <h4 className="text-4xl font-display font-medium text-white">{stat.value}</h4>
                      <span className="text-[10px] text-zinc-600 mb-2 font-mono">{stat.trend}</span>
                    </div>
                 </div>
               ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-display font-medium text-white">Recent Pipeline Activity</h3>
                  <button onClick={() => setActiveTab('tasks')} className="text-[10px] font-mono text-primary uppercase tracking-widest hover:underline">View All Tasks</button>
                </div>
                <div className="space-y-4">
                  {tasks.slice(0, 5).map(task => (
                    <div key={task.id} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between group hover:bg-white/[0.04] transition-all">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${task.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-zinc-800 text-zinc-500'}`}>
                          {task.status === 'completed' ? <CheckCircle2 size={18} /> : <Clock size={18} />}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{task.client}</p>
                          <p className="text-[10px] font-mono text-zinc-500 uppercase">{task.type} • {task.date}</p>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-zinc-700 opacity-0 group-hover:opacity-100 transition-all mr-2" />
                    </div>
                  ))}
                  {tasks.length === 0 && (
                    <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl">
                      <p className="text-zinc-600 text-xs font-mono uppercase tracking-widest">No active reconnaissance</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-display font-medium text-white">Sales Intelligence Score</h3>
                <div className="p-8 rounded-[2.5rem] bg-primary/[0.05] border border-primary/20 glass text-center">
                  <div className="relative inline-block mb-6">
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                      <circle 
                        cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" 
                        strokeDasharray={364.4} 
                        strokeDashoffset={364.4 - (364.4 * completionRate) / 100}
                        className="text-primary" 
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-display font-bold text-white">{completionRate}%</span>
                    </div>
                  </div>
                  <h4 className="text-sm font-display text-zinc-300 mb-2">Efficiency Rating</h4>
                  <p className="text-[10px] font-mono text-zinc-500 leading-relaxed italic">
                    "Consistent engagement drives velocity. Keep your active calls above 10/day for peak performance."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'tasks' && (
          <motion.div 
            key="tasks"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-display font-medium text-white">Pipeline Execution</h2>
                <p className="text-zinc-500 text-sm">Manage your outbound activities and conversion targets.</p>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => addTask('call')}
                  className="px-6 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-white/5 transition-all"
                >
                  <PhoneCall size={14} /> Log Call
                </button>
                <button 
                  onClick={() => addTask('appointment')}
                  className="px-6 py-3 rounded-2xl bg-primary text-black text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all shadow-neon"
                >
                  <CalendarCheck size={14} /> New Appointment
                </button>
              </div>
            </div>

            <div className="grid gap-4">
              {tasks.map(task => (
                <div 
                  key={task.id} 
                  className={`p-6 rounded-3xl border transition-all flex items-center justify-between
                    ${task.status === 'completed' 
                      ? 'bg-white/[0.01] border-white/5 opacity-60' 
                      : 'bg-white/[0.03] border-white/10 shadow-lg'}`}
                >
                  <div className="flex items-center gap-6">
                    <button 
                      onClick={() => toggleTask(task.id)}
                      className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all
                        ${task.status === 'completed' 
                          ? 'bg-emerald-500 border-emerald-500 text-black' 
                          : 'border-white/20 text-transparent hover:border-primary/50'}`}
                    >
                      <CheckCircle2 size={16} />
                    </button>
                    <div>
                      <div className="flex items-center gap-3">
                        <h4 className={`font-medium ${task.status === 'completed' ? 'line-through text-zinc-600' : 'text-white'}`}>{task.client}</h4>
                        <span className={`px-2 py-0.5 text-[8px] font-mono rounded-md uppercase tracking-widest border
                          ${task.type === 'call' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-purple-500/10 border-purple-500/20 text-purple-400'}`}>
                          {task.type}
                        </span>
                      </div>
                      <p className="text-[10px] font-mono text-zinc-500 mt-1 uppercase">Added on {task.date}</p>
                    </div>
                  </div>
                </div>
              ))}
              {tasks.length === 0 && (
                <div className="text-center py-24 bg-white/[0.01] border border-dashed border-white/10 rounded-[2.5rem]">
                  <p className="text-zinc-600 font-mono uppercase tracking-[0.2em] text-xs">No active pipeline targets</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'files' && (
          <motion.div 
            key="files"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-display font-medium text-white">Intelligence Assets</h2>
                <p className="text-zinc-500 text-sm">Upload and manage case studies, proposals, and training data.</p>
              </div>
              <label className="px-8 py-4 bg-primary text-black text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:scale-105 transition-all shadow-neon cursor-pointer flex items-center gap-3">
                 <Upload size={16} />
                 Upload Intelligence
                 <input type="file" className="hidden" onChange={handleFileUpload} />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {files.map(file => (
                <div key={file.id} className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-primary/30 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
                    <FileText className="text-zinc-400 group-hover:text-primary transition-colors" size={24} />
                  </div>
                  <h4 className="font-medium text-white truncate mb-1">{file.name}</h4>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase flex items-center gap-2">
                    {file.size} <span className="text-zinc-800">|</span> {file.date}
                  </p>
                  <div className="mt-8 flex gap-3">
                    <button className="flex-1 py-3 text-[10px] font-mono uppercase font-black tracking-widest bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">Download</button>
                    <button className="px-4 py-3 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl hover:bg-red-500/20 transition-all">
                       <LogOut size={14} className="rotate-90" />
                    </button>
                  </div>
                </div>
              ))}
              {files.length === 0 && (
                <div className="col-span-full text-center py-24 bg-white/[0.01] border border-dashed border-white/10 rounded-[2.5rem]">
                   <Upload className="mx-auto text-zinc-800 mb-6" size={48} />
                   <p className="text-zinc-600 font-mono uppercase tracking-[0.2em] text-xs">Knowledge Base Empty</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
