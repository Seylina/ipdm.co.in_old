/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Cpu, Loader2 } from "lucide-react";
import { Footer } from "./components/ContentSections";
import { CustomCursor } from "./components/CustomCursor";
import { AmbientBackground } from "./components/AmbientBackground";
import { 
  CredibilityStrip, 
  CoreValueProp, 
  Deliverables, 
  IntelligencePlatform, 
  ProprietarySystems, 
  MarketReality, 
  OfferingsOverview, 
  WhyIPDM, 
  Outcomes, 
  ClosingSection, 
  FinalCTA 
} from "./components/HomeSections";
import { ScrollToTop } from "./components/ScrollToTop";
import { BrandIntro } from "./components/BrandIntro";
import { useEffect, useState, lazy, Suspense } from "react";
import { ContactModal } from "./components/ContactModal";
import { SYSTEMS_ECOSYSTEM } from "./lib/systemsData";

// Lazy-load non-critical components
const StrategicAdvisory = lazy(() => import("./components/StrategicAdvisory").then(m => ({ default: m.StrategicAdvisory })));
const AISystemsPage = lazy(() => import("./components/AISystemsPage").then(m => ({ default: m.AISystemsPage })));
const CompanyPage = lazy(() => import("./components/CompanyPage").then(m => ({ default: m.CompanyPage })));
const PricingPage = lazy(() => import("./components/PricingPage").then(m => ({ default: m.PricingPage })));
const PoliciesPage = lazy(() => import("./components/PoliciesPage").then(m => ({ default: m.PoliciesPage })));
const Dashboard = lazy(() => import("./components/Dashboard").then(m => ({ default: m.Dashboard })));
const IPDMEcosystem = lazy(() => import("./components/IPDMEcosystem").then(m => ({ default: m.IPDMEcosystem })));
const IPDMSupporta = lazy(() => import("./components/IPDMSupporta").then(m => ({ default: m.IPDMSupporta })));
const IPDMStrategos = lazy(() => import("./components/IPDMStrategos").then(m => ({ default: m.IPDMStrategos })));
const IPDMSimulate = lazy(() => import("./components/IPDMSimulate").then(m => ({ default: m.IPDMSimulate })));
const IPDMCore = lazy(() => import("./components/IPDMCore").then(m => ({ default: m.IPDMCore })));
const IPDMEngage = lazy(() => import("./components/IPDMEngage").then(m => ({ default: m.IPDMEngage })));
const MultiAgentAI = lazy(() => import("./components/MultiAgentAI").then(m => ({ default: m.MultiAgentAI })));
const LeadQualificationAI = lazy(() => import("./components/LeadQualificationAI").then(m => ({ default: m.LeadQualificationAI })));
const GuidedDecisionAI = lazy(() => import("./components/GuidedDecisionAI").then(m => ({ default: m.GuidedDecisionAI })));
const ContextAwareAI = lazy(() => import("./components/ContextAwareAI").then(m => ({ default: m.ContextAwareAI })));
const MultiLanguageAI = lazy(() => import("./components/MultiLanguageAI").then(m => ({ default: m.MultiLanguageAI })));
const ConversionAwareAI = lazy(() => import("./components/ConversionAwareAI").then(m => ({ default: m.ConversionAwareAI })));
const PersonalizedInteractionAI = lazy(() => import("./components/PersonalizedInteractionAI").then(m => ({ default: m.PersonalizedInteractionAI })));
const PredictiveIntelligenceAI = lazy(() => import("./components/PredictiveIntelligenceAI").then(m => ({ default: m.PredictiveIntelligenceAI })));
const OmnichannelEngagementAI = lazy(() => import("./components/OmnichannelEngagementAI").then(m => ({ default: m.OmnichannelEngagementAI })));
const BusinessIntelligenceAI = lazy(() => import("./components/BusinessIntelligenceAI").then(m => ({ default: m.BusinessIntelligenceAI })));
const AutomationEngagementAI = lazy(() => import("./components/AutomationEngagementAI").then(m => ({ default: m.AutomationEngagementAI })));
const TrustSecurityAI = lazy(() => import("./components/TrustSecurityAI").then(m => ({ default: m.TrustSecurityAI })));
const AdaptiveLearningAI = lazy(() => import("./components/AdaptiveLearningAI").then(m => ({ default: m.AdaptiveLearningAI })));
const CustomerJourneyAI = lazy(() => import("./components/CustomerJourneyAI").then(m => ({ default: m.CustomerJourneyAI })));
const EnterpriseCollaborationAI = lazy(() => import("./components/EnterpriseCollaborationAI").then(m => ({ default: m.EnterpriseCollaborationAI })));
const RevenueGrowthAI = lazy(() => import("./components/RevenueGrowthAI").then(m => ({ default: m.RevenueGrowthAI })));
const IPDMEvolve = lazy(() => import("./components/IPDMEvolve").then(m => ({ default: m.IPDMEvolve })));
const IPDMFlow = lazy(() => import("./components/IPDMFlow").then(m => ({ default: m.IPDMFlow })));
const Approach = lazy(() => import("./components/Approach").then(m => ({ default: m.Approach })));
const DiagnostixChat = lazy(() => import("./components/DiagnostixChat").then(m => ({ default: m.DiagnostixChat })));
const JarvisChat = lazy(() => import("./components/JarvisChat").then(m => ({ default: m.JarvisChat })));
const AISystemCategoryPage = lazy(() => import("./components/AISystemCategoryPage").then(m => ({ default: m.AISystemCategoryPage })));
const AIEngineDetails = lazy(() => import("./components/AIEngineDetails").then(m => ({ default: m.AIEngineDetails })));

// Loading Component
function PageLoader() {
  return (
    <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="text-primary"
      >
        <Loader2 className="w-10 h-10" />
      </motion.div>
      <span className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500 animate-pulse">Initializing Interface...</span>
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'advisory' | 'ai-systems' | 'about' | 'pricing' | 'policies' | 'dashboard' | 'ecosystem' | 'supporta' | 'strategos' | 'simulate' | 'core' | 'engage' | 'multi-agent' | 'lead-qualifier' | 'guided-decision' | 'context-response' | 'multi-language' | 'conversion-action' | 'personalized-interaction' | 'predictive-intelligence' | 'omnichannel-orchestration' | 'business-intelligence' | 'automation-engagement' | 'trust-security' | 'adaptive-learning' | 'customer-journey' | 'enterprise-collaboration' | 'evolve' | 'flow' | 'core-intel' | 'decision-modeling' | 'revenue-growth' | 'revenue-growth-ai' | 'brand-content' | 'knowledge-research' | 'ops-automation' | 'cust-experience' | 'adv-strategic' | 'queries-guiding' | 'engine-detail'>('home');
  const [selectedEngineId, setSelectedEngineId] = useState<string | null>(null);

  const navigateToEngine = (engineId: string) => {
    setSelectedEngineId(engineId);
    setCurrentPage('engine-detail');
  };
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    // Reveal animations on scroll handled by individual components via whileInView
  }, []);

  useEffect(() => {
    const handleOpenContact = () => setIsContactOpen(true);
    window.addEventListener('open-contact-modal', handleOpenContact);
    return () => window.removeEventListener('open-contact-modal', handleOpenContact);
  }, []);

  return (
    <div className="relative selection:bg-primary/30 selection:text-primary min-h-screen transition-colors duration-500">
      <AmbientBackground isAboutPage={currentPage === 'about'} />
      <CustomCursor />
      
      <Navbar onNavigate={setCurrentPage} activePage={currentPage} />
      <ScrollToTop />
      <main>
        <Suspense fallback={<PageLoader />}>
          {currentPage === 'home' ? (
            <>
              <BrandIntro />
              <Hero onNavigate={setCurrentPage} />
              
              <CredibilityStrip />
              
              <CoreValueProp />
              
              <Deliverables />

              <IntelligencePlatform onNavigate={setCurrentPage} />

              <ProprietarySystems />

              <MarketReality />

              <Approach />

              <OfferingsOverview />

              <WhyIPDM />

              <Outcomes />

              <ClosingSection />

              <FinalCTA onNavigate={setCurrentPage} />
              
              <DiagnostixChat />
            </>
          ) : (
            <div className={currentPage === 'ai-systems' ? '' : 'pt-20'}>
               {currentPage === 'advisory' ? <StrategicAdvisory onNavigate={setCurrentPage} /> : 
                currentPage === 'ai-systems' ? <AISystemsPage onNavigateEngine={navigateToEngine} /> : 
                currentPage === 'pricing' ? <PricingPage /> :
                currentPage === 'policies' ? <PoliciesPage onNavigate={setCurrentPage} /> :
                currentPage === 'dashboard' ? <Dashboard /> :
                currentPage === 'ecosystem' ? <IPDMEcosystem onNavigate={setCurrentPage} onNavigateEngine={navigateToEngine} /> :
                currentPage === 'supporta' ? <IPDMSupporta onNavigate={setCurrentPage} /> :
                currentPage === 'strategos' ? <IPDMStrategos onNavigate={setCurrentPage} /> :
                currentPage === 'simulate' ? <IPDMSimulate onNavigate={setCurrentPage} /> :
                currentPage === 'core' ? <IPDMCore onNavigate={setCurrentPage} /> :
                currentPage === 'engage' ? <IPDMEngage onNavigate={setCurrentPage} /> :
                currentPage === 'multi-agent' ? <MultiAgentAI onNavigate={setCurrentPage} /> :
                currentPage === 'lead-qualifier' ? <LeadQualificationAI onNavigate={setCurrentPage} /> :
                currentPage === 'guided-decision' ? <GuidedDecisionAI onNavigate={setCurrentPage} /> :
                currentPage === 'context-response' ? <ContextAwareAI onNavigate={setCurrentPage} /> :
                currentPage === 'multi-language' ? <MultiLanguageAI onNavigate={setCurrentPage} /> :
                currentPage === 'conversion-action' ? <ConversionAwareAI onNavigate={setCurrentPage} /> :
                currentPage === 'personalized-interaction' ? <PersonalizedInteractionAI onNavigate={setCurrentPage} /> :
                currentPage === 'predictive-intelligence' ? <PredictiveIntelligenceAI onNavigate={setCurrentPage} /> :
                currentPage === 'omnichannel-orchestration' ? <OmnichannelEngagementAI onNavigate={setCurrentPage} /> :
                currentPage === 'business-intelligence' ? <BusinessIntelligenceAI onNavigate={setCurrentPage} /> :
                currentPage === 'automation-engagement' ? <AutomationEngagementAI onNavigate={setCurrentPage} /> :
                currentPage === 'trust-security' ? <TrustSecurityAI onNavigate={setCurrentPage} /> :
                currentPage === 'adaptive-learning' ? <AdaptiveLearningAI onNavigate={setCurrentPage} /> :
                currentPage === 'customer-journey' ? <CustomerJourneyAI onNavigate={setCurrentPage} /> :
                currentPage === 'enterprise-collaboration' ? <EnterpriseCollaborationAI onNavigate={setCurrentPage} /> :
                currentPage === 'revenue-growth-ai' ? <RevenueGrowthAI onNavigate={setCurrentPage} /> :
                currentPage === 'evolve' ? <IPDMEvolve onNavigate={setCurrentPage} /> :
                currentPage === 'flow' ? <IPDMFlow onNavigate={setCurrentPage} /> :
                currentPage === 'core-intel' ? <AISystemCategoryPage category={SYSTEMS_ECOSYSTEM[0]} onNavigate={setCurrentPage} onNavigateEngine={navigateToEngine} /> :
                currentPage === 'decision-modeling' ? <AISystemCategoryPage category={SYSTEMS_ECOSYSTEM[1]} onNavigate={setCurrentPage} onNavigateEngine={navigateToEngine} /> :
                currentPage === 'revenue-growth' ? <AISystemCategoryPage category={SYSTEMS_ECOSYSTEM[2]} onNavigate={setCurrentPage} onNavigateEngine={navigateToEngine} /> :
                currentPage === 'brand-content' ? <AISystemCategoryPage category={SYSTEMS_ECOSYSTEM[3]} onNavigate={setCurrentPage} onNavigateEngine={navigateToEngine} /> :
                currentPage === 'knowledge-research' ? <AISystemCategoryPage category={SYSTEMS_ECOSYSTEM[4]} onNavigate={setCurrentPage} onNavigateEngine={navigateToEngine} /> :
                currentPage === 'ops-automation' ? <AISystemCategoryPage category={SYSTEMS_ECOSYSTEM[5]} onNavigate={setCurrentPage} onNavigateEngine={navigateToEngine} /> :
                currentPage === 'cust-experience' ? <AISystemCategoryPage category={SYSTEMS_ECOSYSTEM[6]} onNavigate={setCurrentPage} onNavigateEngine={navigateToEngine} /> :
                currentPage === 'adv-strategic' ? <AISystemCategoryPage category={SYSTEMS_ECOSYSTEM[7]} onNavigate={setCurrentPage} onNavigateEngine={navigateToEngine} /> :
                currentPage === 'queries-guiding' ? <AISystemCategoryPage category={SYSTEMS_ECOSYSTEM[8]} onNavigate={setCurrentPage} onNavigateEngine={navigateToEngine} /> :
                currentPage === 'engine-detail' ? <AIEngineDetails engineId={selectedEngineId || ""} onNavigate={setCurrentPage} /> :
                <CompanyPage onNavigate={setCurrentPage} />}
            </div>
          )}
        </Suspense>
      </main>

      {/* Floating Core Return Button - Visible on all sub-pages */}
      {currentPage !== 'home' && (
        <button 
          onClick={() => setCurrentPage('home')}
          className="fixed bottom-8 left-8 z-[100] flex items-center gap-3 px-6 py-4 glass rounded-full shadow-2xl hover:scale-110 hover:shadow-neon transition-all text-primary border-primary/20 group dark:bg-black/90 light:bg-white/90"
        >
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 8, ease: "linear" }}>
            <Cpu className="w-5 h-5" />
          </motion.div>
          <span className="text-xs font-mono font-black uppercase tracking-[0.2em] group-hover:text-primary dark:group-hover:text-white light:group-hover:text-blue-600 transition-colors">Return to Core</span>
        </button>
      )}

      <Footer onNavigate={setCurrentPage} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <Suspense fallback={null}>
        <JarvisChat />
      </Suspense>
    </div>
  );
}

