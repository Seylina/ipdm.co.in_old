/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Cpu } from "lucide-react";
import { Approach } from "./components/Approach";
import { Footer } from "./components/ContentSections";
import { StrategicAdvisory } from "./components/StrategicAdvisory";
import { AISystemsPage } from "./components/AISystemsPage";
import { CompanyPage } from "./components/CompanyPage";
import { PricingPage } from "./components/PricingPage";
import { PoliciesPage } from "./components/PoliciesPage";
import { Dashboard } from "./components/Dashboard";
import { IPDMEcosystem } from "./components/IPDMEcosystem";
import { IPDMSupporta } from "./components/IPDMSupporta";
import { IPDMStrategos } from "./components/IPDMStrategos";
import { IPDMSimulate } from "./components/IPDMSimulate";
import { IPDMCore } from "./components/IPDMCore";
import { IPDMEngage } from "./components/IPDMEngage";
import { MultiAgentAI } from "./components/MultiAgentAI";
import { LeadQualificationAI } from "./components/LeadQualificationAI";
import { GuidedDecisionAI } from "./components/GuidedDecisionAI";
import { ContextAwareAI } from "./components/ContextAwareAI";
import { MultiLanguageAI } from "./components/MultiLanguageAI";
import { ConversionAwareAI } from "./components/ConversionAwareAI";
import { PersonalizedInteractionAI } from "./components/PersonalizedInteractionAI";
import { PredictiveIntelligenceAI } from "./components/PredictiveIntelligenceAI";
import { OmnichannelEngagementAI } from "./components/OmnichannelEngagementAI";
import { BusinessIntelligenceAI } from "./components/BusinessIntelligenceAI";
import { AutomationEngagementAI } from "./components/AutomationEngagementAI";
import { TrustSecurityAI } from "./components/TrustSecurityAI";
import { AdaptiveLearningAI } from "./components/AdaptiveLearningAI";
import { CustomerJourneyAI } from "./components/CustomerJourneyAI";
import { EnterpriseCollaborationAI } from "./components/EnterpriseCollaborationAI";
import { RevenueGrowthAI } from "./components/RevenueGrowthAI";
import { IPDMEvolve } from "./components/IPDMEvolve";
import { IPDMFlow } from "./components/IPDMFlow";
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
import { DiagnostixChat } from "./components/DiagnostixChat";
import { JarvisChat } from "./components/JarvisChat";
import { ScrollToTop } from "./components/ScrollToTop";
import { BrandIntro } from "./components/BrandIntro";
import { useEffect, useState } from "react";
import { ContactModal } from "./components/ContactModal";

import { AISystemCategoryPage } from "./components/AISystemCategoryPage";
import { AIEngineDetails } from "./components/AIEngineDetails";
import { SYSTEMS_ECOSYSTEM } from "./lib/systemsData";

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
      <JarvisChat />
    </div>
  );
}

