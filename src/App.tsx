import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Hero, ProofStrip } from "@/components/prism/Hero";
import { Nav } from "@/components/prism/Nav";
import {
  ClaimSection,
  CrossBorderSection,
  PeopleSection,
  ReachabilitySection,
  RequestSection,
} from "@/components/prism/SectionsA";
import { AuthoritySection, FinalCta, Footer, MonadSection } from "@/components/prism/SectionsB";
import { DevelopersPage } from "@/components/prism/Developers";
import { DocsPage } from "@/components/prism/Docs";
import { WhitepaperPage } from "@/components/prism/Whitepaper";

function Home() {
  return (
    <main>
      <Hero />
      <ProofStrip />
      <PeopleSection />
      <ReachabilitySection />
      <CrossBorderSection />
      <ClaimSection />
      <RequestSection />
      <AuthoritySection />
      <MonadSection />
      <FinalCta />
    </main>
  );
}

// Scroll to a hash target when present, otherwise to the top on route change.
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView());
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/developers" element={<DevelopersPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/whitepaper" element={<WhitepaperPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}
