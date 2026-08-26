import React from "react";
import { HashRouter, Routes, Route, useLocation, useNavigationType } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header } from "./components/Header";
import { EditorialSidebar } from "./components/EditorialSidebar";
import { Home } from "./pages/Home";
import { MenuDrawer } from "./components/MenuDrawer";
import { PageIntro } from "./components/PageIntro";
import { CustomCursor } from "./components/CustomCursor";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { smoothScrollToId } from "./lib/scroll";

const PortfolioGalleryPage = React.lazy(() =>
  import("./pages/PortfolioGalleryPage").then((m) => ({ default: m.PortfolioGalleryPage }))
);
const AboutPage = React.lazy(() =>
  import("./pages/AboutPage").then((m) => ({ default: m.AboutPage }))
);
const PortfolioPage = React.lazy(() =>
  import("./pages/PortfolioPage").then((m) => ({ default: m.PortfolioPage }))
);
const ServicesPage = React.lazy(() =>
  import("./pages/ServicesPage").then((m) => ({ default: m.ServicesPage }))
);

const scrollPositions = new Map<string, number>();

const ScrollRestorationManager = () => {
  const location = useLocation();
  const navType = useNavigationType();

  // Continuously record scroll position for current route
  React.useEffect(() => {
    const handleScroll = () => {
      scrollPositions.set(location.pathname + location.search + location.hash, window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      scrollPositions.set(location.pathname + location.search + location.hash, window.scrollY);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);

  React.useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (navType === "POP") {
      const key = location.pathname + location.search + location.hash;
      const savedPos = scrollPositions.get(key);
      if (savedPos !== undefined && savedPos > 0) {
        requestAnimationFrame(() => {
          window.scrollTo({ top: savedPos, behavior: "instant" as ScrollBehavior });
          setTimeout(() => {
            window.scrollTo({ top: savedPos, behavior: "instant" as ScrollBehavior });
            ScrollTrigger.refresh();
          }, 80);
        });
        return;
      }
    }

    // For new page pushes, check if there's a hash or start from top
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }
  }, [location, navType]);

  return null;
};

const NotFoundPage = React.lazy(() =>
  import("./pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage }))
);

const AppLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const location = useLocation();
  const isPortfolio = location.pathname.startsWith("/portfolio/");

  return (
    <ErrorBoundary>
      <PageIntro />
      <CustomCursor />
      <ScrollRestorationManager />
      {!isPortfolio && <Header onMenuOpen={() => setIsMenuOpen(true)} />}
      {location.pathname === "/" && (
        <EditorialSidebar onMenuOpen={() => setIsMenuOpen(true)} />
      )}
      <React.Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio/:id" element={<PortfolioGalleryPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </React.Suspense>

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
    </ErrorBoundary>
  );
};

function App() {
  return (
    <HashRouter>
      <AppLayout />
    </HashRouter>
  );
}

export default App;
