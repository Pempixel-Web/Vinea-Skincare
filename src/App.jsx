import { SpeedInsights } from "@vercel/speed-insights/next";
// Vercel Analytics
import { Analytics } from "@vercel/analytics/react";
// Vercel Analytics
import Hero from "./components/Hero";
import PainPoint from "./components/PainPoint";
import Solution from "./components/Solution";
// import Ingredients from './components/Ingredients';
// import Benefits from './components/Benefits';
import HowToUse from "./components/HowToUse";
import UGCSection from "./components/UGCSection";
// import ObjectionHandling from './components/ObjectionHandling';
import WhyJoinWaitlist from "./components/WhyJoinWaitlist";
import InstagramCTA from "./components/InstagramCTA";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

// Psychological flow: hook -> desired outcome -> problem -> solution ->
// formula -> benefits -> how it works -> visual proof -> objections ->
// waitlist value -> Instagram -> FAQ -> final CTA.
export default function App() {
  return (
    <>
      <Hero />
      <main>
        <PainPoint />
        <Solution />
        {/* <Ingredients /> */}
        {/* <Benefits /> */}
        <HowToUse />
        <UGCSection />
        {/* <ObjectionHandling /> */}
        <WhyJoinWaitlist />
        <InstagramCTA />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
