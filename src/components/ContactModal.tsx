import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Phone, Mail, User, MessageSquare, CheckCircle2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    reason: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call or mailto launch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Construct mailto link
      const subject = `Contact Request from ${formData.name}`;
      const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0AMobile: ${formData.mobile}%0D%0AReason: ${formData.reason}`;
      const mailtoUrl = `mailto:info@ipdm.co.in?subject=${encodeURIComponent(subject)}&body=${body}`;
      
      // In a real app, you might send this to an API
      // window.location.href = mailtoUrl;

      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: '', email: '', mobile: '', reason: '' });
        onClose();
      }, 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-xl glass bg-[var(--color-bg)] border border-[var(--color-text)]/10 rounded-[3rem] overflow-hidden relative z-10 transition-colors duration-1000"
          >
            <div className="absolute inset-0 blueprint-grid opacity-[0.05] pointer-events-none" />
            
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-[var(--color-text)]/5 transition-all text-zinc-500 hover:text-[var(--color-text)] z-50 transition-colors duration-1000"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-8 sm:p-12 relative z-10">
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6 border border-emerald-500/20">
                     <CheckCircle2 className="w-10 h-10 shadow-[0_0_20px_rgba(16,185,129,0.3)]" />
                  </div>
                  <h3 className="text-3xl font-display font-bold text-[var(--color-text)] mb-4 transition-colors duration-1000">Message Initiated</h3>
                  <p className="text-zinc-500 max-w-xs mx-auto transition-colors duration-1000">
                    Thank you, {formData.name}. We've received your inquiry and will connect with you via info@ipdm.co.in.
                  </p>
                </motion.div>
              ) : (
                <>
                  <div className="mb-10">
                    <h3 className="text-3xl font-bold font-display text-[var(--color-text)] mb-2 uppercase tracking-tighter transition-colors duration-1000">Initialize Contact</h3>
                    <p className="text-zinc-500 text-sm font-medium transition-colors duration-1000">Identify your objective and reach the IPDM core.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest flex items-center gap-2 px-1 transition-colors duration-1000">
                          <User className="w-3 h-3 text-primary" /> Full Name
                        </label>
                        <input 
                          required
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full bg-[var(--color-text)]/[0.03] border border-[var(--color-text)]/10 rounded-2xl p-4 text-[var(--color-text)] focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all placeholder:text-zinc-700 transition-colors duration-1000"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest flex items-center gap-2 px-1 transition-colors duration-1000">
                          <Mail className="w-3 h-3 text-primary" /> Email Address
                        </label>
                        <input 
                          required
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className="w-full bg-[var(--color-text)]/[0.03] border border-[var(--color-text)]/10 rounded-2xl p-4 text-[var(--color-text)] focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all placeholder:text-zinc-700 transition-colors duration-1000"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest flex items-center gap-2 px-1">
                        <Phone className="w-3 h-3 text-primary" /> Mobile Number
                      </label>
                      <input 
                        required
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="+91 00000 00000"
                        className="w-full bg-[var(--color-text)]/[0.03] border border-[var(--color-text)]/10 rounded-2xl p-4 text-[var(--color-text)] focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all placeholder:text-zinc-700 transition-colors duration-1000"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest flex items-center gap-2 px-1 transition-colors duration-1000">
                        <MessageSquare className="w-3 h-3 text-primary" /> Reason for Contact
                      </label>
                      <textarea 
                        required
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        placeholder="State your business objective or inquiry..."
                        rows={4}
                        className="w-full bg-[var(--color-text)]/[0.03] border border-[var(--color-text)]/10 rounded-3xl p-4 text-[var(--color-text)] focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all placeholder:text-zinc-700 resize-none transition-colors duration-1000"
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-5 bg-primary text-black font-black uppercase text-sm tracking-[0.2em] rounded-[2rem] hover:bg-white hover:shadow-neon transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group active:scale-95"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                          />
                          Processing Core...
                        </>
                      ) : (
                        <>
                          Establish Connection <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </button>
                    
                    <p className="text-[11px] font-mono text-zinc-600 text-center uppercase tracking-wider">
                      Data strictly transmitted to info@ipdm.co.in | encrypted logic
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
