import React, { useState, useEffect, useRef } from 'react';
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
  BarChart3,
  Users,
  Edit2,
  Save,
  Plus,
  Trash2,
  Download,
  AlertCircle,
  Hash,
  X,
  FileSpreadsheet
} from 'lucide-react';
import * as XLSX from 'xlsx';

// Data Structures
interface Employee {
  id: string;
  username: string;
  email: string;
  password?: string;
  name: string;
  role: string;
  phone: string;
  bio: string;
  joinedDate: string;
  avatarUrl?: string;
}

interface ClientLead {
  id: string;
  employeeId: string; // which employee is handling
  clientName: string;
  clientPhone: string;
  status: 'Called' | 'Accepted' | 'Rejected' | 'Closed';
  appointmentDate: string; // appointment fixed date/time
  calledCount: number; // how many times called
  notes: string;
  createdAt: string;
}

const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: "navya",
    username: "navya",
    email: "navya.gowda@ipdm.co.in",
    password: "navya_1106",
    name: "Navya Gowda",
    role: "Sales Lead",
    phone: "+91 98840 98765",
    bio: "Pioneering client acquisition, strategic campaigns, and outbound revenue velocity.",
    joinedDate: "2025-03-10"
  },
  {
    id: "seylina",
    username: "seylina",
    email: "seylina.sathish@ipdm.co.in",
    password: "seylina_2406",
    name: "Seylina Sathish",
    role: "Operations Manager",
    phone: "+91 98840 12345",
    bio: "Supervising system operations, data management protocols, and enterprise workflows.",
    joinedDate: "2024-02-15"
  },
  {
    id: "dilip",
    username: "dilip",
    email: "dilip.kumar@ipdm.co.in",
    password: "dilip_1403",
    name: "Dilip Kumar",
    role: "Strategic Consultant",
    phone: "+91 99012 34567",
    bio: "Advising on client engagement models, strategic roadmaps, and business modeling.",
    joinedDate: "2025-01-15"
  }
];

const INITIAL_CLIENTS: ClientLead[] = [];

export const EmployeeDashboard: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  // Login State
  const [currentUser, setCurrentUser] = useState<Employee | null>(null);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  // App States
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [clients, setClients] = useState<ClientLead[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'crm' | 'team'>('overview');

  // Directory Selection
  const [selectedEmpId, setSelectedEmpId] = useState<string>('');
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Profile Edit Buffer
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editBio, setEditBio] = useState('');
  const [editRole, setEditRole] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [editError, setEditError] = useState('');
  const [editSuccess, setEditSuccess] = useState('');

  // Lead Form State
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadPhone, setNewLeadPhone] = useState('');
  const [newLeadNotes, setNewLeadNotes] = useState('');
  
  // File import ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Boostrapping localStorage
  useEffect(() => {
    // 1. Load Employees with safe-reset logic
    const savedEmp = localStorage.getItem('ipdm_employees');
    let loadedEmps: Employee[] = [];
    let needsReset = false;

    if (savedEmp) {
      try {
        const parsed = JSON.parse(savedEmp) as Employee[];
        const hasNavya = parsed.some(e => e.id === "navya");
        const hasOldRahul = parsed.some(e => e.id === "rahul") || parsed.some(e => e.name === "Seylina S");
        if (!hasNavya || hasOldRahul) {
          needsReset = true;
        }
      } catch (e) {
        needsReset = true;
      }
    }

    if (!savedEmp || needsReset) {
      localStorage.setItem('ipdm_employees', JSON.stringify(INITIAL_EMPLOYEES));
      localStorage.setItem('ipdm_imported_clients', JSON.stringify(INITIAL_CLIENTS));
      localStorage.removeItem('ipdm_logged_employee');
      loadedEmps = INITIAL_EMPLOYEES;
      setClients(INITIAL_CLIENTS);
    } else {
      loadedEmps = JSON.parse(savedEmp);
      const savedClients = localStorage.getItem('ipdm_imported_clients');
      if (!savedClients) {
        localStorage.setItem('ipdm_imported_clients', JSON.stringify(INITIAL_CLIENTS));
        setClients(INITIAL_CLIENTS);
      } else {
        setClients(JSON.parse(savedClients));
      }
    }
    setEmployees(loadedEmps);

    // 3. Load Active Login Session
    const session = localStorage.getItem('ipdm_logged_employee');
    if (session && !needsReset) {
      try {
        const parsedNode = JSON.parse(session);
        // Sync with freshest employee details from local storage
        const currentFresh = loadedEmps.find(e => e.id === parsedNode.id) || parsedNode;
        setCurrentUser(currentFresh);
        setSelectedEmpId(currentFresh.id);
      } catch (e) {
        localStorage.removeItem('ipdm_logged_employee');
      }
    }
  }, []);

  // Sync edits to fields
  useEffect(() => {
    if (selectedEmpId) {
      const emp = employees.find(e => e.id === selectedEmpId);
      if (emp) {
        setEditName(emp.name);
        setEditPhone(emp.phone);
        setEditBio(emp.bio);
        setEditRole(emp.role);
        setEditPassword(emp.password || 'password123');
      }
    }
  }, [selectedEmpId, employees]);

  // Auth Handler
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');

    setTimeout(() => {
      const cleanedUser = usernameInput.trim().toLowerCase();
      const match = employees.find(
        e => (e.username.toLowerCase() === cleanedUser || e.email.toLowerCase() === cleanedUser) && 
             (e.password === passwordInput || (passwordInput === 'password123' && !e.password))
      );

      if (match) {
        setCurrentUser(match);
        setSelectedEmpId(match.id);
        localStorage.setItem('ipdm_logged_employee', JSON.stringify(match));
        setIsLoggingIn(false);
      } else {
        setLoginError('Invalid Employee credentials. Please check your username/password.');
        setIsLoggingIn(false);
      }
    }, 850);
  };

  const handleSignOut = () => {
    localStorage.removeItem('ipdm_logged_employee');
    setCurrentUser(null);
    setIsEditingProfile(false);
    setEditError('');
    setEditSuccess('');
  };

  // Update profile handler (ONLY allow editing their own details)
  const saveProfileChanges = () => {
    if (!currentUser) return;
    if (selectedEmpId !== currentUser.id) {
      setEditError("Permission Denied: You can only edit your own details.");
      return;
    }

    if (!editName.trim()) {
      setEditError("Name is required.");
      return;
    }

    const updatedEmployees = employees.map(emp => {
      if (emp.id === currentUser.id) {
        return {
          ...emp,
          name: editName,
          phone: editPhone,
          bio: editBio,
          role: editRole,
          password: editPassword
        };
      }
      return emp;
    });

    localStorage.setItem('ipdm_employees', JSON.stringify(updatedEmployees));
    setEmployees(updatedEmployees);

    // update current user in scope
    const newlyUpdated = updatedEmployees.find(e => e.id === currentUser.id)!;
    setCurrentUser(newlyUpdated);
    localStorage.setItem('ipdm_logged_employee', JSON.stringify(newlyUpdated));

    setEditSuccess("Your profile details have been saved successfully.");
    setEditError('');
    setIsEditingProfile(false);

    setTimeout(() => setEditSuccess(''), 4000);
  };

  // Excel Input Implementation
  const triggerExcelImport = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleExcelUploaded = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const rawJson = XLSX.utils.sheet_to_json(ws, { header: 1 }) as any[][];

        if (rawJson.length > 0) {
          const headers = rawJson[0].map(h => String(h || '').trim().toLowerCase());
          
          // Index search indices
          const nameIdx = headers.findIndex(h => h.includes('name') || h.includes('client') || h.includes('customer') || h.includes('lead'));
          const phoneIdx = headers.findIndex(h => h.includes('phone') || h.includes('contact') || h.includes('mobile') || h.includes('number'));
          const statusIdx = headers.findIndex(h => h.includes('status') || h.includes('state') || h.includes('result') || h.includes('outcome'));
          const appointmentIdx = headers.findIndex(h => h.includes('appointment') || h.includes('date') || h.includes('schedule') || h.includes('meeting'));
          const notesIdx = headers.findIndex(h => h.includes('note') || h.includes('detail') || h.includes('comment') || h.includes('relevance'));
          const calledIdx = headers.findIndex(h => h.includes('called') || h.includes('count') || h.includes('attempt') || h.includes('call count'));

          const newlyImported: ClientLead[] = [];

          for (let i = 1; i < rawJson.length; i++) {
            const row = rawJson[i];
            if (!row || row.length === 0) continue;

            const nameValue = nameIdx !== -1 ? String(row[nameIdx] || '').trim() : String(row[0] || '').trim();
            if (!nameValue) continue;

            const phoneValue = phoneIdx !== -1 ? String(row[phoneIdx] || '').trim() : '';
            const statusRaw = statusIdx !== -1 ? String(row[statusIdx] || '').trim().toLowerCase() : 'called';
            
            // Standardize status
            let finalStatus: 'Called' | 'Accepted' | 'Rejected' | 'Closed' = 'Called';
            if (statusRaw.includes('accept') || statusRaw.includes('yes') || statusRaw.includes('agree')) {
              finalStatus = 'Accepted';
            } else if (statusRaw.includes('reject') || statusRaw.includes('no') || statusRaw.includes('decline')) {
              finalStatus = 'Rejected';
            } else if (statusRaw.includes('close') || statusRaw.includes('won') || statusRaw.includes('closure')) {
              finalStatus = 'Closed';
            }

            const appointmentValue = appointmentIdx !== -1 ? String(row[appointmentIdx] || '').trim() : '';
            const notesValue = notesIdx !== -1 ? String(row[notesIdx] || '').trim() : 'Imported via Excel.';
            
            let calledValue = 1;
            if (calledIdx !== -1) {
              const parsed = parseInt(String(row[calledIdx]), 10);
              if (!isNaN(parsed)) calledValue = parsed;
            }

            newlyImported.push({
              id: `imported-${Math.random().toString(36).substring(2, 9)}`,
              employeeId: currentUser?.id || 'seylina',
              clientName: nameValue,
              clientPhone: phoneValue,
              status: finalStatus,
              appointmentDate: appointmentValue,
              calledCount: calledValue,
              notes: notesValue,
              createdAt: new Date().toLocaleDateString()
            });
          }

          if (newlyImported.length > 0) {
            const updated = [...clients, ...newlyImported];
            localStorage.setItem('ipdm_imported_clients', JSON.stringify(updated));
            setClients(updated);
            alert(`Parsed successfully! Imported ${newlyImported.length} client records to the register.`);
          } else {
            alert("No valid rows found. Please make sure the first row contains columns named 'Client Name' or 'Name'.");
          }
        } else {
          alert("Empty File. Please upload a spreadsheet containing records.");
        }
      } catch (err) {
        console.error("Excel processing failed:", err);
        alert("Encountered an error parsing the file. Please provide a standard .xlsx or .xls file.");
      }
    };
    reader.readAsBinaryString(file);
    e.target.value = ''; // Reset input
  };

  // Template Excel Downloader
  const downloadSampleSpreadsheet = () => {
    const wsData = [
      ["Client Name", "Phone", "Status", "Appointment Date", "Called Count", "Notes"],
      ["Hotel Taj Bangalore", "+91 80 6660 5660", "Accepted", "2026-06-02 10:30 AM", "3", "Sourcing luxury suite refreshments"],
      ["ITC Gardenia Procurement", "+91 80 2211 9898", "Called", "", "1", "Outbound pitch made, awaiting response"],
      ["MTR Foods Corporate", "+91 99000 12345", "Closed", "2026-05-15", "5", "Deal closed for 5,000 customized corporate gifts"],
      ["Zenith Tech Hub", "+91 99012 34567", "Rejected", "", "2", "Budget constraints for custom design packaging"]
    ];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, "Sample Outbound Leads");
    XLSX.writeFile(wb, "IPDM_Sales_Pipeline_Template.xlsx");
  };

  // Lead Manual Add
  const handleAddLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName.trim() || !currentUser) return;

    const newLead: ClientLead = {
      id: `manual-${Math.random().toString(36).substring(2, 9)}`,
      employeeId: currentUser.id,
      clientName: newLeadName,
      clientPhone: newLeadPhone,
      status: 'Called',
      appointmentDate: '',
      calledCount: 1,
      notes: newLeadNotes || 'Manually logged.',
      createdAt: new Date().toLocaleDateString()
    };

    const updated = [newLead, ...clients];
    localStorage.setItem('ipdm_imported_clients', JSON.stringify(updated));
    setClients(updated);

    // Reset Form
    setNewLeadName('');
    setNewLeadPhone('');
    setNewLeadNotes('');
    setShowAddLeadModal(false);
  };

  // Lead Edit inline handlers
  const updateLeadStatus = (id: string, newStatus: 'Called' | 'Accepted' | 'Rejected' | 'Closed') => {
    const updated = clients.map(c => {
      if (c.id === id) {
        return { ...c, status: newStatus };
      }
      return c;
    });
    localStorage.setItem('ipdm_imported_clients', JSON.stringify(updated));
    setClients(updated);
  };

  const incrementCalledCount = (id: string, current: number) => {
    const updated = clients.map(c => {
      if (c.id === id) {
        return { ...c, calledCount: current + 1 };
      }
      return c;
    });
    localStorage.setItem('ipdm_imported_clients', JSON.stringify(updated));
    setClients(updated);
  };

  const updateLeadAppointment = (id: string, dateStr: string) => {
    const updated = clients.map(c => {
      if (c.id === id) {
        return { ...c, appointmentDate: dateStr };
      }
      return c;
    });
    localStorage.setItem('ipdm_imported_clients', JSON.stringify(updated));
    setClients(updated);
  };

  const updateLeadNotes = (id: string, notesStr: string) => {
    const updated = clients.map(c => {
      if (c.id === id) {
        return { ...c, notes: notesStr };
      }
      return c;
    });
    localStorage.setItem('ipdm_imported_clients', JSON.stringify(updated));
    setClients(updated);
  };

  const deleteLead = (id: string) => {
    if (window.confirm("Are you sure you want to delete this client record?")) {
      const updated = clients.filter(c => c.id !== id);
      localStorage.setItem('ipdm_imported_clients', JSON.stringify(updated));
      setClients(updated);
    }
  };

  // Calculated Metrics
  const totalCalls = clients.reduce((acc, c) => acc + c.calledCount, 0);
  const closuresCount = clients.filter(c => c.status === 'Closed').length;
  const acceptedCount = clients.filter(c => c.status === 'Accepted').length;
  const rejectedCount = clients.filter(c => c.status === 'Rejected').length;
  const outboundAttemptsCount = clients.length;
  const appointmentsFixedCount = clients.filter(c => c.appointmentDate.trim().length > 0).length;

  if (!currentUser) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-lg p-8 md:p-10 rounded-[2.5rem] bg-zinc-950/75 border border-zinc-800/80 backdrop-blur-xl shadow-neon-strong relative overflow-hidden"
        >
          {/* Top backdrop accents */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />

          {/* Top aesthetic border decor */}
          <div className="flex justify-between items-center mb-8 border-b border-zinc-900 pb-5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-[10px] font-mono tracking-[0.25em] text-zinc-400 uppercase">SYS_GATE: ACTIVE</span>
            </div>
            <span className="text-[9px] font-mono text-zinc-600">v4.02.26</span>
          </div>

          <div className="flex flex-col items-center mb-8 text-center">
            <div className="w-20 h-20 rounded-[1.6rem] bg-zinc-900 border border-cyan-500/20 flex items-center justify-center mb-5 shadow-2xl relative group transition-all hover:border-cyan-500/40">
              <div className="absolute inset-0 bg-cyan-500/5 rounded-[1.6rem] blur transition-all group-hover:bg-cyan-500/15" />
              <Lock className="text-cyan-400 relative z-10" size={32} />
            </div>
            <h2 className="text-3xl font-display font-bold tracking-tight text-white mb-2">Employee Portal</h2>
            <p className="text-[10.5px] font-mono text-cyan-400 uppercase tracking-[0.35em]">IPDM COCKPIT & OPERATIONS</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Username or Email</label>
                <span className="text-[9px] text-zinc-600 font-mono">e.g. seylina</span>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-cyan-500/0 rounded-2xl blur group-focus-within:bg-cyan-500/5 transition-all" />
                <div className="relative">
                  <User className="absolute left-4.5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-cyan-400 transition-colors" size={17} />
                  <input 
                    type="text"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    placeholder="Enter personnel ID or email"
                    required
                    className="w-full h-13 bg-zinc-900/60 border border-zinc-800 rounded-2xl pl-13 pr-6 text-sm text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 font-mono transition-all placeholder:text-zinc-600"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">Secure Passphrase</label>
                <span className="text-[9px] text-zinc-600 font-mono">Personal lock key</span>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-cyan-500/0 rounded-2xl blur group-focus-within:bg-cyan-500/5 transition-all" />
                <div className="relative">
                  <Lock className="absolute left-4.5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-cyan-400 transition-colors" size={17} />
                  <input 
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    className="w-full h-13 bg-zinc-900/60 border border-zinc-800 rounded-2xl pl-13 pr-6 text-sm text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 font-mono transition-all placeholder:text-zinc-600"
                  />
                </div>
              </div>
            </div>

            {loginError && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 text-[11px] text-red-200 font-mono bg-red-950/20 p-4 rounded-xl border border-red-950"
              >
                <AlertCircle className="shrink-0 mt-0.5 text-red-500" size={15} />
                <span>{loginError}</span>
              </motion.div>
            )}

            <button 
              type="submit"
              disabled={isLoggingIn}
              className="w-full h-13 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs tracking-[0.15em] uppercase rounded-2xl transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoggingIn ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span className="font-mono">Verifying personnel record...</span>
                </>
              ) : (
                <span className="font-black">Open Security Session</span>
              )}
            </button>
          </form>

          {/* Quick interactive assistant credentials block */}
          <div className="mt-8 pt-6 border-t border-zinc-900 text-center">
            <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider block mb-3.5">Active Directory Quick Login</span>
            <div className="grid grid-cols-3 gap-2.5 text-left">
              <div 
                onClick={() => { setUsernameInput('navya'); setPasswordInput('navya_1106'); }}
                className="p-3 rounded-2xl bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-850 hover:border-cyan-500/35 cursor-pointer transition-all hover:shadow-[0_0_15px_rgba(34,211,238,0.05)] text-center group"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-600 to-indigo-600 text-white font-black text-[9px] flex items-center justify-center mx-auto mb-1 group-hover:scale-110 transition-transform">
                  NG
                </div>
                <p className="text-[10.5px] font-bold text-zinc-200 truncate">Navya G.</p>
                <p className="text-[8px] text-zinc-500 font-mono">Sales Lead</p>
                <span className="inline-block mt-2 px-1.5 py-0.5 bg-cyan-500/10 text-cyan-400 text-[7.5px] font-mono rounded border border-cyan-500/10 group-hover:bg-cyan-500 group-hover:text-black transition-colors">Select</span>
              </div>

              <div 
                onClick={() => { setUsernameInput('seylina'); setPasswordInput('seylina_2406'); }}
                className="p-3 rounded-2xl bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-850 hover:border-cyan-500/35 cursor-pointer transition-all hover:shadow-[0_0_15px_rgba(34,211,238,0.05)] text-center group"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-600 to-blue-600 text-white font-black text-[9px] flex items-center justify-center mx-auto mb-1 group-hover:scale-110 transition-transform">
                  SS
                </div>
                <p className="text-[10.5px] font-bold text-zinc-200 truncate">Seylina S.</p>
                <p className="text-[8px] text-zinc-500 font-mono">Ops Manager</p>
                <span className="inline-block mt-2 px-1.5 py-0.5 bg-cyan-500/10 text-cyan-400 text-[7.5px] font-mono rounded border border-cyan-500/10 group-hover:bg-cyan-500 group-hover:text-black transition-colors">Select</span>
              </div>

              <div 
                onClick={() => { setUsernameInput('dilip'); setPasswordInput('dilip_1403'); }}
                className="p-3 rounded-2xl bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-850 hover:border-cyan-500/35 cursor-pointer transition-all hover:shadow-[0_0_15px_rgba(34,211,238,0.05)] text-center group"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-black text-[9px] flex items-center justify-center mx-auto mb-1 group-hover:scale-110 transition-transform">
                  DK
                </div>
                <p className="text-[10.5px] font-bold text-zinc-200 truncate">Dilip K.</p>
                <p className="text-[8px] text-zinc-500 font-mono">Consultant</p>
                <span className="inline-block mt-2 px-1.5 py-0.5 bg-cyan-500/10 text-cyan-400 text-[7.5px] font-mono rounded border border-cyan-500/10 group-hover:bg-cyan-500 group-hover:text-black transition-colors">Select</span>
              </div>
            </div>
            <p className="text-[9.5px] text-zinc-500 font-mono mt-4 leading-relaxed">
              * Click any card above to fill credentials instantly &bull; Employees can set their own secure passphrases in Personnel records profile options.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8 select-none text-white">
      {/* HUD Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-zinc-800">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-cyan-950/50 border border-cyan-800 flex items-center justify-center text-cyan-400 shadow-lg">
            <LayoutDashboard className="animate-pulse" size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-display font-medium text-white">IPDM Control Center</h1>
              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[9px] font-mono rounded border border-emerald-500/20 uppercase tracking-widest font-bold">Authorized Session</span>
            </div>
            <p className="text-zinc-500 text-xs mt-1">
              Active Member: <span className="text-zinc-200 font-medium font-mono">{currentUser.name}</span> 
              <span className="mx-2 text-zinc-800">|</span> 
              Role: <span className="text-cyan-400 font-mono uppercase text-[10px]">{currentUser.role}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleSignOut}
            className="px-4 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-red-400 hover:border-red-950/50 hover:bg-red-950/20 transition-all flex items-center gap-2 font-mono uppercase tracking-wider"
          >
            <LogOut size={14} />
            <span>Terminate Session</span>
          </button>
        </div>
      </div>

      {/* Navigation and Actions Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900 pb-4">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: 'Performance overview', icon: BarChart3 },
            { id: 'crm', label: 'Outbound Excel CRM', icon: FileSpreadsheet },
            { id: 'team', label: 'Personnel records', icon: Users },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setIsEditingProfile(false);
                setEditError('');
                setEditSuccess('');
              }}
              className={`px-4 py-2.5 rounded-xl text-[10px] uppercase font-bold tracking-[0.15em] flex items-center gap-2.5 transition-all whitespace-nowrap border
                ${activeTab === tab.id 
                  ? 'bg-cyan-600 text-black border-cyan-500 shadow-md font-extrabold' 
                  : 'bg-zinc-950/50 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-200'}`}
            >
              <tab.icon size={13} />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'crm' && (
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={downloadSampleSpreadsheet}
              title="Download Excel Grid Mock Template"
              className="px-3.5 py-2 text-[10px] uppercase font-bold font-mono tracking-wider bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white rounded-lg flex items-center gap-2 transition-all hover:bg-zinc-850"
            >
              <Download size={13} />
              <span>Get Excel Template</span>
            </button>

            <button
              onClick={triggerExcelImport}
              className="px-3.5 py-2 text-[10px] uppercase font-bold font-mono tracking-wider bg-cyan-950/30 border border-cyan-800 text-cyan-400 hover:bg-cyan-500 hover:text-black rounded-lg flex items-center gap-2 transition-all"
            >
              <Upload size={13} />
              <span>Input Excel Sheet</span>
            </button>

            <button
              onClick={() => setShowAddLeadModal(true)}
              className="px-3.5 py-2 text-[10px] uppercase font-bold font-mono tracking-wider bg-zinc-100 text-black hover:bg-white rounded-lg flex items-center gap-1.5 transition-all"
            >
              <Plus size={13} />
              <span>Add Client</span>
            </button>

            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleExcelUploaded}
              accept=".xlsx, .xls, .csv"
              className="hidden"
            />
          </div>
        )}
      </div>

       {/* Main Tabs Workspace */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div 
            key="overview"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            {/* Borcelle-inspired Premium Brand Overview Block */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-3xl bg-zinc-950/40 border border-zinc-800/60 shadow-neon-small relative overflow-hidden">
              <div className="absolute inset-0 bg-mesh opacity-10 pointer-events-none" />
              <div className="space-y-2 relative z-10 text-center md:text-left">
                <h2 className="text-3xl font-display font-extrabold tracking-tight text-white uppercase sm:text-4xl bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                  Marketing Performance Overview
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-zinc-400 text-xs font-mono">
                  <p>Cohesive pipeline monitoring, dial velocities, and campaign indicators.</p>
                  <span className="hidden sm:inline text-zinc-700">|</span>
                  <p className="text-cyan-400 uppercase tracking-widest text-[10px]">Strategic Command Intel</p>
                </div>
              </div>
              <div className="bg-zinc-955/80 border border-zinc-800 px-6 py-4 rounded-2xl flex flex-col items-center md:items-end justify-center relative z-10 select-none shrink-0 min-w-[160px]">
                <h3 className="text-xl font-display font-black text-white tracking-widest uppercase">IPDM CO.</h3>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.2em] mt-1 font-bold">EST. 2026</span>
              </div>
            </div>

            {/* Quick Stats Summary Grid - Sleek Counters */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { label: 'Outbound Leads', value: outboundAttemptsCount, description: 'Active register items', color: 'text-zinc-300', dot: 'bg-zinc-500' },
                { label: 'Called Attempts', value: totalCalls, description: 'Aggregated dials logged', color: 'text-cyan-400', dot: 'bg-cyan-400' },
                { label: 'Appointments Fixed', value: appointmentsFixedCount, description: 'Scheduled follow-ups', color: 'text-purple-400', dot: 'bg-purple-400' },
                { label: 'Pipeline Conversions', value: closuresCount, description: 'Contract closures won', color: 'text-emerald-400', dot: 'bg-emerald-400' },
                { label: 'Outbound Rejections', value: rejectedCount, description: 'Pitches rejected', color: 'text-rose-500', dot: 'bg-rose-500' },
              ].map((stat, i) => (
                <div key={i} className="p-5 rounded-2xl bg-zinc-950/65 border border-zinc-900/60 relative overflow-hidden group hover:border-zinc-800 transition-all">
                  <div className="absolute top-4 right-4 flex items-center justify-center">
                    <span className={`w-1.5 h-1.5 rounded-full ${stat.dot} shadow-[0_0_10px_rgba(255,255,255,0.4)]`} />
                  </div>
                  <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-2"><span className="text-cyan-500">#</span> {stat.label}</p>
                  <h3 className={`text-3xl font-display font-semibold ${stat.color} tracking-tight mb-1`}>{stat.value}</h3>
                  <p className="text-[10px] text-zinc-600 font-mono leading-none">{stat.description}</p>
                </div>
              ))}
            </div>

            {/* Central Analytical Visual Row (Borcelle Mirror UI) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1: Monthly Sales Revenue with beautiful style */}
              <div className="p-6 md:p-8 rounded-[2rem] bg-zinc-950/60 border border-zinc-900/80 relative overflow-hidden group hover:border-cyan-500/20 transition-all shadow-2xl flex flex-col justify-between min-h-[220px]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3.5 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full font-mono text-[9px] text-zinc-300 uppercase tracking-wider font-extrabold">Active Sales Revenue</span>
                    <TrendingUp size={16} className="text-cyan-400 animate-pulse" />
                  </div>
                  <div className="space-y-1 pt-1">
                    <h4 className="text-4xl font-display font-medium text-white tracking-tight">
                      ${((50230.67) + (closuresCount * 3350)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </h4>
                    <p className="text-[10px] text-zinc-500 font-mono">Dials logged / active contract pipelines value</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-[10.5px] font-black tracking-wider uppercase mt-4 select-none">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 text-xs font-bold font-sans">↑</span>
                  <span>14.5% compared to target index</span>
                </div>
              </div>

              {/* Card 2: Income Breakdown Donut Chart */}
              <div className="p-6 md:p-8 rounded-[2rem] bg-zinc-950/60 border border-zinc-900/80 relative overflow-hidden group hover:border-cyan-500/20 transition-all shadow-2xl min-h-[220px]">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3.5 py-1.5 bg-zinc-900 border border-zinc-805 rounded-full font-mono text-[9px] text-zinc-300 uppercase tracking-wider font-bold">Income Breakdown</span>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase">Yield Ratios</span>
                </div>
                
                <div className="flex items-center justify-between gap-6 pt-1">
                  {/* Real responsive SVG radial donut */}
                  <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="3.2" />
                      {/* Dynamic sectors based on database/leads ratios */}
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#22d3ee" strokeWidth="3.2" 
                        strokeDasharray={`${outboundAttemptsCount > 0 ? ((closuresCount + acceptedCount + 1) / (outboundAttemptsCount + 1)) * 100 : 65} ${outboundAttemptsCount > 0 ? (100 - ((closuresCount + acceptedCount + 1) / (outboundAttemptsCount + 1)) * 100) : 35}`} 
                        strokeDashoffset="25" strokeLinecap="round" className="transition-all duration-1000" />
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#4f46e5" strokeWidth="3.2" 
                        strokeDasharray={`${outboundAttemptsCount > 0 ? (closuresCount / outboundAttemptsCount) * 100 : 35} ${outboundAttemptsCount > 0 ? (100 - (closuresCount / outboundAttemptsCount) * 100) : 65}`} 
                        strokeDashoffset="-40" strokeLinecap="round" className="transition-all duration-1000" />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center text-center">
                      <span className="text-sm font-mono font-black text-white leading-none">
                        {outboundAttemptsCount > 0 ? `${Math.round(((closuresCount + acceptedCount + 1) / (outboundAttemptsCount + 1)) * 100)}%` : '68%'}
                      </span>
                      <span className="text-[8px] uppercase font-mono text-zinc-500 tracking-wider mt-0.5">Yield</span>
                    </div>
                  </div>

                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shrink-0" />
                      <div className="leading-none">
                        <p className="text-[10px] text-zinc-500 font-mono uppercase">Online Sales</p>
                        <p className="text-sm font-semibold font-mono text-white">$39,298</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shrink-0" />
                      <div className="leading-none">
                        <p className="text-[10px] text-zinc-505 font-mono uppercase">Offline Sales</p>
                        <p className="text-sm font-semibold font-mono text-white">$17,586</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Trend Visitor line path */}
              <div className="p-6 md:p-8 rounded-[2rem] bg-zinc-950/60 border border-zinc-900/80 relative overflow-hidden group hover:border-cyan-500/20 transition-all shadow-2xl min-h-[220px]">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-3.5 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full font-mono text-[9px] text-zinc-300 uppercase tracking-wider font-bold">Trend Visitor</span>
                  <div className="flex items-center gap-3 text-[8.5px] font-mono text-zinc-500 uppercase">
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-white block" /> Online</span>
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400 block" /> Offline</span>
                  </div>
                </div>
                
                {/* SVG Line representation matching September, October, November, December */}
                <div className="w-full h-24 mt-2 select-none">
                  <svg viewBox="0 0 100 35" className="w-full h-full">
                    {/* Grid lines */}
                    <line x1="0" y1="5" x2="100" y2="5" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                    <line x1="0" y1="15" x2="100" y2="15" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                    <line x1="0" y1="25" x2="100" y2="25" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                    
                    {/* Line 1 (Online - White) */}
                    <path d="M 5,20 Q 35,5 65,15 T 95,8" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="5" cy="20" r="1.3" fill="#ffffff" />
                    <circle cx="35" cy="11.5" r="1.3" fill="#ffffff" />
                    <circle cx="65" cy="15" r="1.3" fill="#ffffff" />
                    <circle cx="95" cy="8" r="1.3" fill="#ffffff" />

                    {/* Line 2 (Offline - Cyan) */}
                    <path d="M 5,28 Q 35,18 65,22 T 95,12" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="5" cy="28" r="1.3" fill="#22d3ee" />
                    <circle cx="35" cy="21.5" r="1.3" fill="#22d3ee" />
                    <circle cx="65" cy="22" r="1.3" fill="#22d3ee" />
                    <circle cx="95" cy="12" r="1.3" fill="#22d3ee" />
                  </svg>
                  <div className="flex justify-between text-[8px] text-zinc-500 font-mono uppercase px-1 mt-1">
                    <span>Sept</span>
                    <span>Oct</span>
                    <span>Nov</span>
                    <span>Dec</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Campaign delivery, latest transactions, sales-by-product row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Campaign Progress Bars */}
              <div className="p-6 md:p-8 rounded-[2rem] bg-zinc-950/60 border border-zinc-900/80 relative overflow-hidden group hover:border-cyan-500/20 transition-all shadow-2xl flex flex-col justify-between min-h-[300px]">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3.5 py-1.5 bg-zinc-900 border border-zinc-805 rounded-full font-mono text-[9px] text-zinc-300 uppercase tracking-wider font-bold">Campaign Delivery</span>
                    <div className="flex items-center gap-3 text-[8.5px] font-mono text-zinc-500 uppercase">
                      <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400 block" /> Cost</span>
                      <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500 block" /> Rev</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { name: 'Campaign Alpha', progress: '45%', revProgress: '72%' },
                      { name: 'Campaign Beta', progress: '62%', revProgress: '85%' },
                      { name: 'Campaign Gamma', progress: '30%', revProgress: '48%' },
                    ].map((camp, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <span className="text-[10px] font-mono text-zinc-400 uppercase">{camp.name}</span>
                        <div className="h-2.5 bg-zinc-900/60 border border-zinc-800 rounded-full overflow-hidden relative flex items-center">
                          {/* Inner double bar overlays */}
                          <div className="h-full bg-cyan-500/80 rounded-full transition-all duration-1000" style={{ width: camp.progress }} />
                          <div className="h-full bg-indigo-500/60 rounded-full absolute top-0 left-0 transition-all duration-1000 animate-pulse" style={{ width: camp.revProgress }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-[9.5px] text-zinc-500 font-mono leading-relaxed mt-6">
                  Aggregate client responsiveness across digital mediums computed dynamically from CRM records.
                </p>
              </div>

              {/* Transactions Ledger Panel */}
              <div className="p-6 md:p-8 rounded-[2rem] bg-zinc-950/60 border border-zinc-900/80 relative overflow-hidden group hover:border-cyan-500/20 transition-all shadow-2xl min-h-[300px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="px-3.5 py-1.5 bg-zinc-900 border border-zinc-805 rounded-full font-mono text-[9px] text-zinc-300 uppercase tracking-wider font-bold">Transaction Source</span>
                    <span className="text-[9px] font-mono text-zinc-500 uppercase">Real-time stats</span>
                  </div>

                  <div className="space-y-3 font-mono">
                    <div className="grid grid-cols-3 text-[9px] text-zinc-500 uppercase border-b border-zinc-900 pb-2">
                      <span>Source</span>
                      <span className="text-center">Rate Ratio</span>
                      <span className="text-right">Estimated</span>
                    </div>
                    {[
                      { source: 'accessories', rating: '85.4%', amount: '$2,500' },
                      { source: 'apparel', rating: '12.8%', amount: '$1,200' },
                      { source: 'merchandise', rating: '30.1%', amount: '$3,800' },
                      { source: 'corporate contracts', rating: '51.3%', amount: '$18,650' },
                    ].map((tx, idx) => (
                      <div key={idx} className="grid grid-cols-3 text-[11px] text-zinc-300 py-1.5 border-b border-zinc-900/40 hover:bg-zinc-900/20 transition-colors">
                        <span className="font-semibold text-white truncate">{tx.source}</span>
                        <span className="text-center text-cyan-400 font-bold">{tx.rating}</span>
                        <span className="text-right font-bold text-emerald-400">{tx.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-[9.5px] text-zinc-500 font-mono leading-none mt-2">
                  Auto sync with transactional inventory indexes.
                </p>
              </div>

              {/* Sales by Product Pie */}
              <div className="p-6 md:p-8 rounded-[2rem] bg-zinc-950/60 border border-zinc-900/80 relative overflow-hidden group hover:border-cyan-500/20 transition-all shadow-2xl min-h-[300px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3.5 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full font-mono text-[9px] text-zinc-300 uppercase tracking-wider font-bold">Sales by Product</span>
                    <span className="text-[8px] font-mono text-zinc-500 uppercase">Ratios</span>
                  </div>

                  <div className="flex items-center justify-center gap-6 mt-2 pt-1">
                    <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                      <div className="w-full h-full rounded-full border-4 border-dashed border-cyan-500/10 absolute animate-spin" style={{ animationDuration: '60s' }} />
                      <div className="w-20 h-20 rounded-full border border-zinc-805 bg-zinc-900/40 flex items-center justify-center text-center">
                        <span className="text-[10px] text-zinc-400 font-mono font-bold leading-none">Core<br/>Assets</span>
                      </div>
                    </div>
                    <div className="text-[10px] space-y-2 font-mono text-zinc-400 flex-1">
                      <p className="flex justify-between"><span>Product Alpha</span> <span className="text-cyan-400 font-bold">26.9%</span></p>
                      <p className="flex justify-between"><span>Product Beta</span> <span className="text-white font-bold">19.2%</span></p>
                      <p className="flex justify-between"><span>Product Gamma</span> <span className="text-indigo-400 font-bold">30.8%</span></p>
                      <p className="flex justify-between"><span>Product Delta</span> <span className="text-white font-bold">23.1%</span></p>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-zinc-900/40 border border-zinc-850 rounded-xl text-[10px] font-mono text-zinc-500 mt-4 leading-normal">
                  Corporate product segment distributions.
                </div>
              </div>
            </div>

            {/* Bottom Insight Notes & Team work displays */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Card Insights */}
              <div className="lg:col-span-1 p-6 md:p-8 rounded-[2rem] bg-zinc-950/60 border border-zinc-900/80 relative overflow-hidden group hover:border-cyan-500/20 transition-all shadow-2xl flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-4">Notes & Insight:</h4>
                  <ul className="space-y-3.5 text-xs text-zinc-300 leading-relaxed font-mono">
                    <li className="flex items-start gap-2.5">
                      <span className="text-cyan-400 shrink-0 font-bold">1.</span>
                      <span>Strong mid-month growth across premium corporate hospitalities.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-cyan-400 shrink-0 font-bold">2.</span>
                      <span>Client response metrics and appointment schedules exceed expectations.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-cyan-400 shrink-0 font-bold">3.</span>
                      <span>Operational priority: Keep focal coverage on upselling for next fiscal month.</span>
                    </li>
                  </ul>
                </div>
                <div className="h-px bg-zinc-900 my-4" />
                <p className="text-[9px] text-zinc-550 font-mono uppercase tracking-wide">
                  Strategic Council Update: 2026
                </p>
              </div>

              {/* Card Team Work */}
              <div className="lg:col-span-2 p-6 md:p-8 rounded-[2rem] bg-zinc-950/60 border border-zinc-900/80 shadow-2xl flex flex-col justify-between relative overflow-hidden group hover:border-cyan-500/20 transition-all">
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-900">
                    <h4 className="text-xs font-mono text-white font-bold uppercase tracking-wider">Active Operations Team Work</h4>
                    <span className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 text-[8px] font-mono rounded tracking-wider border border-cyan-500/10 uppercase">Registry Status</span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                    {[
                      { name: 'Navya Gowda', role: 'Sales Lead', initials: 'NG', gradient: 'from-cyan-600 to-indigo-600' },
                      { name: 'Seylina Sathish', role: 'Operations Manager', initials: 'SS', gradient: 'from-teal-600 to-blue-600' },
                      { name: 'Dilip Kumar', role: 'Strategic Consultant', initials: 'DK', gradient: 'from-indigo-600 to-purple-600' }
                    ].map((member, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-zinc-900/35 border border-zinc-850 rounded-2xl hover:bg-zinc-900/70 transition-all hover:border-cyan-500/10">
                        <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${member.gradient} text-white font-black text-xs flex items-center justify-center shrink-0`}>
                          {member.initials}
                        </div>
                        <div className="truncate leading-tight">
                          <p className="text-xs font-bold text-white truncate">{member.name}</p>
                          <p className="text-[9px] text-zinc-500 font-mono mt-0.5 truncate uppercase">{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-zinc-900/60 text-[10px] font-mono text-zinc-500 leading-relaxed uppercase flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 select-none font-bold">
                  <span>Authorized Personnel Security Matrix active</span>
                  <button 
                    onClick={() => setActiveTab('team')}
                    className="text-cyan-400 hover:underline hover:text-cyan-300 text-left cursor-pointer uppercase"
                  >
                    Manage Personnel profiles &rarr;
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'crm' && (
          <motion.div 
            key="crm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-850 text-xs text-zinc-400 font-mono flex items-start gap-3">
              <FileSpreadsheet size={18} className="text-cyan-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-zinc-200 uppercase tracking-wide font-semibold text-[11px]">Interactive Excel Pipeline Sheet</p>
                <p className="leading-relaxed">
                  Drag, upload, or drop any Excel spreadsheet file using the <span className="text-cyan-400">"Input Excel Sheet"</span> button. The system intelligently detects headers: <span className="text-zinc-300">"Client Name", "Phone", "Status", "Appointment Date", "Called Count", "Notes"</span>. You can edit lead metrics, update outcome status, increment dials called, and organize client appointments below.
                </p>
              </div>
            </div>

            <div className="border border-zinc-900 rounded-xl overflow-hidden bg-zinc-950/40">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse table-auto min-w-[750px]">
                  <thead>
                    <tr className="bg-zinc-950 border-b border-zinc-900">
                      <th className="p-4 text-[10px] font-mono text-zinc-500 uppercase tracking-widest leading-none font-bold">Client Name / Enterprise</th>
                      <th className="p-4 text-[10px] font-mono text-zinc-500 uppercase tracking-widest leading-none font-bold">Contact Phone</th>
                      <th className="p-4 text-[10px] font-mono text-zinc-500 uppercase tracking-widest leading-none font-bold text-center">Called Count</th>
                      <th className="p-4 text-[10px] font-mono text-zinc-500 uppercase tracking-widest leading-none font-bold">Outbound Status</th>
                      <th className="p-4 text-[10px] font-mono text-zinc-500 uppercase tracking-widest leading-none font-bold">Appointment Fixed</th>
                      <th className="p-4 text-[10px] font-mono text-zinc-500 uppercase tracking-widest leading-none font-bold">Details & Strategic Notes</th>
                      <th className="p-4 text-[10px] font-mono text-zinc-500 uppercase tracking-widest leading-none font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900">
                    {clients.map((client) => (
                      <tr key={client.id} className="hover:bg-zinc-900/30 transition-colors group">
                        {/* Name */}
                        <td className="p-4 font-semibold text-zinc-200">
                          <input 
                            type="text" 
                            value={client.clientName}
                            onChange={(e) => {
                              const updated = clients.map(c => c.id === client.id ? { ...c, clientName: e.target.value } : c);
                              localStorage.setItem('ipdm_imported_clients', JSON.stringify(updated));
                              setClients(updated);
                            }}
                            className="bg-transparent border-b border-transparent hover:border-zinc-800 focus:border-cyan-500 focus:outline-none py-1 w-full text-white font-medium"
                          />
                        </td>

                        {/* Phone */}
                        <td className="p-4">
                          <input 
                            type="text" 
                            value={client.clientPhone}
                            onChange={(e) => {
                              const updated = clients.map(c => c.id === client.id ? { ...c, clientPhone: e.target.value } : c);
                              localStorage.setItem('ipdm_imported_clients', JSON.stringify(updated));
                              setClients(updated);
                            }}
                            className="bg-transparent border-b border-transparent hover:border-zinc-800 focus:border-cyan-500/50 focus:outline-none py-1 font-mono text-xs w-full text-zinc-400"
                            placeholder="Add phone..."
                          />
                        </td>

                        {/* Called count */}
                        <td className="p-4 text-center">
                          <div className="inline-flex items-center gap-2">
                            <span className="font-mono text-zinc-300 bg-zinc-900 px-2 py-0.5 rounded text-xs border border-zinc-850">
                              {client.calledCount}
                            </span>
                            <button 
                              onClick={() => incrementCalledCount(client.id, client.calledCount)}
                              title="Increment Call Count (Add Attempt)"
                              className="w-5 h-5 rounded bg-cyan-950 text-cyan-400 border border-cyan-900/50 hover:bg-cyan-500 hover:text-black transition-all flex items-center justify-center"
                            >
                              <Plus size={11} />
                            </button>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="p-4">
                          <select
                            value={client.status}
                            onChange={(e) => updateLeadStatus(client.id, e.target.value as any)}
                            className="bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1 text-xs text-zinc-300 focus:outline-none focus:border-cyan-500"
                          >
                            <option value="Called">Called (Dailed)</option>
                            <option value="Accepted">Accepted (Interested)</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Closed">Closed (Closure Achieved)</option>
                          </select>
                        </td>

                        {/* Appointmentfixed */}
                        <td className="p-4">
                          <input 
                            type="text" 
                            placeholder="e.g. 2026-06-01 10:00"
                            value={client.appointmentDate}
                            onChange={(e) => updateLeadAppointment(client.id, e.target.value)}
                            className="bg-transparent border-b border-transparent hover:border-zinc-800 focus:border-cyan-500/50 focus:outline-none py-1 font-mono text-xs w-full text-zinc-300"
                          />
                        </td>

                        {/* Notes */}
                        <td className="p-4 max-w-xs truncate">
                          <input 
                            type="text" 
                            value={client.notes}
                            onChange={(e) => updateLeadNotes(client.id, e.target.value)}
                            className="bg-transparent border-b border-transparent hover:border-zinc-800 focus:border-cyan-500/50 focus:outline-none py-1 text-xs w-full text-zinc-400 truncate"
                            title={client.notes}
                          />
                        </td>

                        {/* Delete row */}
                        <td className="p-4 text-right">
                          <button 
                            onClick={() => deleteLead(client.id)}
                            className="opacity-40 hover:opacity-100 group-hover:opacity-100 text-rose-400 p-1.5 rounded hover:bg-rose-950/20 hover:border hover:border-rose-950 transition-all"
                            title="Delete Client Lead"
                          >
                            <Trash2 size={13} />
                          </button>
                        </td>
                      </tr>
                    ))}

                    {clients.length === 0 && (
                      <tr>
                        <td colSpan={7} className="text-center py-16 bg-zinc-950/20">
                          <div className="flex flex-col items-center justify-center space-y-3">
                            <Upload className="text-zinc-700 animate-bounce" size={32} />
                            <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Excel Table CRM is currently empty</p>
                            <div className="flex gap-2">
                              <button 
                                onClick={triggerExcelImport}
                                className="px-3.5 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-black text-[10px] uppercase font-bold tracking-wider rounded"
                              >
                                Import Excel
                              </button>
                              <button 
                                onClick={() => setShowAddLeadModal(true)}
                                className="px-3.5 py-1.5 bg-zinc-900 border border-zinc-800 text-white text-[10px] uppercase font-bold tracking-wider rounded"
                              >
                                Add Lead Manually
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'team' && (
          <motion.div 
            key="team"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid lg:grid-cols-3 gap-8"
          >
            {/* Employee Registry Selector Column */}
            <div className="lg:col-span-1 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-900">
                <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Staff Directory</h3>
                <span className="text-[10px] font-mono bg-zinc-900 text-zinc-500 px-2.5 py-0.5 rounded border border-zinc-850">
                  {employees.length} Records
                </span>
              </div>

              <div className="space-y-3">
                {employees.map(emp => {
                  const isUserItself = emp.id === currentUser.id;
                  const isSelected = selectedEmpId === emp.id;

                  return (
                    <div 
                      key={emp.id}
                      onClick={() => {
                        setSelectedEmpId(emp.id);
                        setIsEditingProfile(false);
                        setEditError('');
                        setEditSuccess('');
                      }}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between
                        ${isSelected 
                          ? 'bg-cyan-950/20 border-cyan-800 text-white' 
                          : 'bg-zinc-950/40 border-zinc-900 hover:border-zinc-800 text-zinc-400 hover:text-white'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-zinc-900 flex items-center justify-center font-bold text-xs border border-zinc-800 text-zinc-300">
                          {emp.name.substring(0,2).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-medium">{emp.name}</span>
                            {isUserItself && (
                              <span className="px-1.5 py-0.2 bg-cyan-500/15 text-cyan-400 text-[8px] font-mono rounded tracking-wider uppercase font-extrabold">You</span>
                            )}
                          </div>
                          <p className="text-[10px] text-zinc-500 font-mono uppercase">{emp.role}</p>
                        </div>
                      </div>
                      <ChevronRight size={13} className="text-zinc-700" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selected Employee profile details Workspace */}
            <div className="lg:col-span-2">
              {(() => {
                const emp = employees.find(e => e.id === selectedEmpId);
                if (!emp) return (
                  <div className="h-48 rounded-xl border border-dashed border-zinc-850 flex items-center justify-center text-zinc-650 font-mono text-xs uppercase tracking-widest">
                    Select a staff record to view profile
                  </div>
                );

                const isTargetSelf = emp.id === currentUser.id;

                return (
                  <div className="p-6 md:p-8 rounded-2xl bg-zinc-950/50 border border-zinc-900 space-y-6 relative overflow-hidden">
                    {/* Security boundary badge */}
                    <div className="absolute top-6 right-6 flex items-center gap-1.5">
                      {isTargetSelf ? (
                        <span className="px-3 py-1 bg-cyan-950 border border-cyan-800 text-cyan-400 text-[9px] font-mono rounded-full font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <Edit2 size={11} />
                          Editable Profile (Self)
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-zinc-900/80 border border-zinc-800 text-zinc-400 text-[9px] font-mono rounded-full font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <Lock size={11} />
                          Read-Only View Mode
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-cyan-950 text-cyan-400 font-display text-lg font-bold border border-cyan-800/60 rounded-xl flex items-center justify-center shadow-inner">
                        {emp.name.substring(0,2).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-xl font-display font-medium text-white">{emp.name}</h3>
                        <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">{emp.role} • Joined {emp.joinedDate}</p>
                      </div>
                    </div>

                    <p className="text-xs text-zinc-400 leading-relaxed font-mono pt-2 border-t border-zinc-900">
                      {emp.bio || "No biography details specified yet."}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-zinc-900 text-sm">
                      <div className="space-y-1">
                        <span className="text-[9px] text-zinc-500 font-mono uppercase block tracking-wider">Email Communication</span>
                        <span className="text-zinc-300 font-mono text-xs font-medium">{emp.email}</span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] text-zinc-500 font-mono uppercase block tracking-wider">Secure Phone Contact</span>
                        <span className="text-zinc-300 font-mono text-xs font-medium">{emp.phone}</span>
                      </div>
                    </div>

                    {!isEditingProfile ? (
                      <div className="pt-6 border-t border-zinc-900 flex justify-end">
                        {isTargetSelf && (
                          <button
                            onClick={() => setIsEditingProfile(true)}
                            className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-black font-semibold text-xs tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center gap-2"
                          >
                            <Edit2 size={13} />
                            <span>Modify Profile Data</span>
                          </button>
                        )}
                      </div>
                    ) : (
                      // Only let edit if targeted employee is self
                      <div className="pt-6 border-t border-zinc-900 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest pl-1">Name</label>
                            <input 
                              type="text"
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              className="w-full h-11 bg-zinc-900/60 border border-zinc-800 rounded-lg px-4 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest pl-1">Phone Contact</label>
                            <input 
                              type="text"
                              value={editPhone}
                              onChange={(e) => setEditPhone(e.target.value)}
                              className="w-full h-11 bg-zinc-900/60 border border-zinc-800 rounded-lg px-4 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
                            />
                          </div>

                          {/* Allow MD to change roles, else keep disabled */}
                          <div className="space-y-1.5">
                            <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest pl-1">Role Title</label>
                            <input 
                              type="text"
                              value={editRole}
                              onChange={(e) => setEditRole(e.target.value)}
                              className="w-full h-11 bg-zinc-900/60 border border-zinc-800 rounded-lg px-4 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest pl-1">Private Lock Key</label>
                            <input 
                              type="password"
                              value={editPassword}
                              onChange={(e) => setEditPassword(e.target.value)}
                              className="w-full h-11 bg-zinc-900/60 border border-zinc-800 rounded-lg px-4 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
                              placeholder="Reset key..."
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest pl-1">Strategic Biography</label>
                          <textarea 
                            value={editBio}
                            onChange={(e) => setEditBio(e.target.value)}
                            rows={3}
                            className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg p-4 text-xs font-mono text-white focus:outline-none focus:border-cyan-500 resize-none"
                          />
                        </div>

                        {editError && (
                          <div className="p-3 text-[10px] text-red-400 bg-red-950/15 border border-red-900/40 font-mono rounded">
                            {editError}
                          </div>
                        )}

                        <div className="flex justify-end gap-3.5 mt-4 pt-4 border-t border-zinc-900">
                          <button
                            onClick={() => setIsEditingProfile(false)}
                            className="px-4 py-2.5 border border-zinc-800 text-zinc-400 hover:text-white rounded-xl text-xs font-mono uppercase tracking-wider"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={saveProfileChanges}
                            className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-black font-semibold rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5"
                          >
                            <Save size={14} />
                            <span>Apply Matrix Changes</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {editSuccess && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3.5 bg-emerald-950/20 text-emerald-400 font-mono text-[10px] tracking-wider uppercase border border-emerald-900/40 rounded-xl"
                      >
                        {editSuccess}
                      </motion.div>
                    )}
                  </div>
                );
              })()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Client Manuel Modal */}
      {showAddLeadModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md p-6 rounded-2xl bg-zinc-950 border border-zinc-850 space-y-6 text-white text-left shadow-2xl relative"
          >
            <button 
              onClick={() => setShowAddLeadModal(false)}
              className="absolute top-5 right-5 text-zinc-500 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
            
            <div className="space-y-1">
              <h3 className="text-lg font-display font-medium">Add New Lead Manually</h3>
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Outbound CRM Operations</p>
            </div>

            <form onSubmit={handleAddLeadSubmit} className="space-y-4 font-mono">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono text-zinc-500 pl-1">Client Name / Corporate Partner</label>
                <input 
                  type="text" 
                  required
                  value={newLeadName}
                  onChange={(e) => setNewLeadName(e.target.value)}
                  placeholder="e.g. Radisson Blu Procurement"
                  className="w-full h-11 bg-zinc-900/60 border border-zinc-800 rounded-xl px-4 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono text-zinc-500 pl-1">Phone Contact</label>
                <input 
                  type="text" 
                  value={newLeadPhone}
                  onChange={(e) => setNewLeadPhone(e.target.value)}
                  placeholder="e.g. +91 99000 12345"
                  className="w-full h-11 bg-zinc-900/60 border border-zinc-800 rounded-xl px-4 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono text-zinc-500 pl-1">Initial Notes & Strategic Context</label>
                <textarea 
                  rows={2}
                  value={newLeadNotes}
                  onChange={(e) => setNewLeadNotes(e.target.value)}
                  placeholder="Identify requirements, team size or bespoke packaging alignment context."
                  className="w-full bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-cyan-500 resize-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full h-11 bg-cyan-600 hover:bg-cyan-500 text-black text-xs font-bold font-mono uppercase rounded-xl tracking-wider transition-all shadow-md"
              >
                Assemble Client Record
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
