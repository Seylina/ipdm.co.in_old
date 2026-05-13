import { motion } from "motion/react";
import { Shield, FileText, Mail, Phone, ArrowLeft } from "lucide-react";
import React from "react";

export function PoliciesPage({ onNavigate }: { onNavigate: (page: any) => void }) {
  return (
    <div className="bg-[var(--color-bg)] text-[var(--color-text)] min-h-screen pt-20 transition-colors duration-1000">
      {/* Meta Strip */}
      <div className="border-b border-[var(--color-text)]/5 bg-[var(--color-bg)]/50 py-3 px-6 transition-colors duration-1000">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => onNavigate('home')}
            className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2 hover:text-[var(--color-text)] transition-colors"
          >
            <ArrowLeft className="w-3 h-3" /> Back_to_Interface
          </button>
          <div className="text-xs font-mono font-bold text-zinc-600 uppercase tracking-[0.3em] hidden sm:block">
            Legal_Framework_v1.0 // IPDM_Digital_Services
          </div>
        </div>
      </div>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border-primary/20 text-primary text-xs font-black uppercase tracking-widest mb-6">
              <Shield className="w-3 h-3" /> Compliance Architecture
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-8 italic">
              Shipping & <br />
              <span className="text-gradient">Exchange Policy</span>
            </h1>
            <p className="text-zinc-500 max-w-2xl text-lg leading-relaxed border-l-2 border-primary/30 pl-6 italic">
              At Infinite Potential Digital Marketing Pvt Ltd, we offer digital services only. 
              The following terms apply to all products and services purchased through our platform.
            </p>
          </motion.div>

          <div className="space-y-16">
            <PolicySection 
              number="01" 
              title="No Physical Shipping" 
              content="All our services, including but not limited to website design, SEO and marketing campaigns, digital consulting, software subscriptions, and content creation, are delivered electronically. Delivery methods include:"
              items={[
                "Email attachments or secure download links",
                "Cloud platforms or shared drives",
                "Access through our client portal or designated platforms"
              ]}
              footer="Since no physical product is involved, there is no shipping fee, and all delivery timelines are digital."
            />

            <PolicySection 
              number="02" 
              title="No Exchanges" 
              content="Due to the nature of digital services, we do not offer exchanges. Once a service is delivered or a project milestone is completed, it cannot be exchanged for another service. However, we provide:"
              items={[
                "Revisions or updates as per the agreed project terms",
                "Support for correcting errors or addressing issues related to service delivery"
              ]}
            />

            <PolicySection 
              number="03" 
              title="Cancellations" 
              content="Cancellations are allowed only before the service is delivered or work has commenced. For ongoing projects:"
              items={[
                "Partial refunds may be issued depending on the work completed",
                "All cancellations must be requested in writing via email"
              ]}
            />

            <PolicySection 
              number="04" 
              title="Refunds" 
              content="Refunds for digital services are generally not available once the service has been delivered. Exceptions include:"
              items={[
                "Non-delivery due to our error or system malfunction",
                "Services not meeting agreed specifications despite multiple revisions"
              ]}
              footer="All refund requests will be reviewed on a case-by-case basis, and the decision of Infinite Potential Digital Marketing Pvt Ltd will be final."
            />

            <PolicySection 
              number="05" 
              title="Client Responsibilities" 
              content="To ensure timely delivery, clients are responsible for providing accurate and complete information. Delays in providing content, credentials, or approvals may affect delivery timelines."
            />

            <PolicySection 
              number="06" 
              title="Support & Communication" 
              content="All clients have access to support through email, chat, or our client portal. Queries regarding delivered services, revisions, or issues should be communicated promptly to facilitate resolution."
            />

            <PolicySection 
              number="07" 
              title="Changes to Policy" 
              content="We may update this Shipping & Exchange Policy periodically. The latest version will always be posted on this page. Clients are encouraged to review it regularly to stay informed about our digital service terms."
            />

            <div className="pt-16 border-t border-white/10">
              <div className="glass p-12 rounded-[3.5rem] border-primary/20 bg-primary/5">
                <div className="flex flex-col md:flex-row justify-between gap-12">
                  <div>
                    <h3 className="text-xs font-mono font-black text-primary uppercase tracking-[0.4em] mb-6">Contact_Protocol</h3>
                    <h2 className="text-3xl font-display font-bold text-[var(--color-text)] mb-4 italic transition-colors duration-1000">Get in Touch</h2>
                    <p className="text-zinc-500 text-sm italic max-w-xs">If you have questions about this policy or need assistance, please contact us at:</p>
                  </div>
                  <div className="space-y-6">
                    <a href="mailto:support@ipdm.co.in" className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-2xl glass border-white/10 flex items-center justify-center group-hover:border-primary transition-colors">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Email_Endpoint</p>
                        <p className="text-[var(--color-text)] font-bold group-hover:text-primary transition-colors transition-colors duration-1000">support@ipdm.co.in</p>
                      </div>
                    </a>
                    <a href="tel:+919902659208" className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-2xl glass border-white/10 flex items-center justify-center group-hover:border-primary transition-colors">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Phone_Endpoint</p>
                        <p className="text-[var(--color-text)] font-bold group-hover:text-primary transition-colors transition-colors duration-1000">+91-9902659208</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Meta */}
      <footer className="py-12 px-6 border-t border-[var(--color-text)]/5 bg-[var(--color-bg)]/20 mt-20 transition-colors duration-1000">
         <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs font-mono text-zinc-600">© 2024 Infinite Potential Digital Marketing Pvt Ltd.</p>
            <div className="flex gap-8">
               <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-xs font-mono text-zinc-600 hover:text-[var(--color-text)] uppercase tracking-widest transition-colors duration-1000">Scroll_Top</button>
               <button onClick={() => onNavigate('home')} className="text-xs font-mono text-zinc-600 hover:text-[var(--color-text)] uppercase tracking-widest transition-colors duration-1000">Exit_Legal</button>
            </div>
         </div>
      </footer>
    </div>
  );
}

function PolicySection({ number, title, content, items, footer }: { 
  number: string, 
  title: string, 
  content: string, 
  items?: string[],
  footer?: string
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="flex gap-8 md:gap-12">
        <div className="text-xs font-mono font-black text-primary/30 group-hover:text-primary transition-colors pt-1">
          {number}
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-display font-bold text-[var(--color-text)] mb-6 group-hover:translate-x-1 transition-transform transition-colors duration-1000">{title}</h2>
          <p className="text-zinc-400 leading-relaxed mb-6 italic">{content}</p>
          
          {items && (
            <ul className="space-y-4 mb-6">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-4 italic text-zinc-500">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2 shrink-0 shadow-[0_0_8px_#22d3ee55]" />
                  {item}
                </li>
              ))}
            </ul>
          )}

          {footer && (
            <p className="text-zinc-600 text-sm font-medium border-l-2 border-zinc-800 pl-4 py-1 italic">
              {footer}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
