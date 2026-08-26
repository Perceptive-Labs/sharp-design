import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header } from "./components/Header";
import { EditorialSidebar } from "./components/EditorialSidebar";
import { Home } from "./pages/Home";
import { PortfolioGalleryPage } from "./pages/PortfolioGalleryPage";
import { AboutPage } from "./pages/AboutPage";
import { PortfolioPage } from "./pages/PortfolioPage";
import { ServicesPage } from "./pages/ServicesPage";
import { MenuDrawer } from "./components/MenuDrawer";
import { PageIntro } from "./components/PageIntro";
import { CustomCursor } from "./components/CustomCursor";
import { smoothScrollToId } from "./lib/scroll";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    // Disable browser's automatic scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    // Force scroll to top immediately
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    // Also force after a tick in case layout shifts
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    });
  }, [pathname]);
  return null;
};

const AppLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const location = useLocation();
  const isPortfolio = location.pathname.startsWith("/portfolio/");

  return (
    <>
      <PageIntro />
      <CustomCursor />
      <ScrollToTop />
      {!isPortfolio && <Header onMenuOpen={() => setIsMenuOpen(true)} />}
      {location.pathname === "/" && (
        <EditorialSidebar onMenuOpen={() => setIsMenuOpen(true)} />
      )}
      <Routes>
        <Route path="/portfolio/:id" element={<PortfolioGalleryPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<Home />} />
      </Routes>

      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onBookCall={() => {
          setIsMenuOpen(false);
          smoothScrollToId("contact");
        }}
        onNavigateToHero={() => smoothScrollToId("hero")}
        onNavigateToAbout={() => smoothScrollToId("about")}
        onNavigateToServices={() => smoothScrollToId("services")}
        onNavigateToWorks={() => smoothScrollToId("works")}
      />
    </>
  );
};

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
