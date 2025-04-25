import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LocomotiveScroll from 'locomotive-scroll';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Marquee from './components/Marquee';
import About from './components/About';
import Team from './components/Team';
import Footer from './components/Footer';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import GS from './components/GS';

import CTA2 from './components/Pages/CTA2';
import HIWPage from './components/Pages/HIWPage';
import AboutPage from './components/Pages/AboutPage';
import ContactPage from './components/Pages/ContactPage';
import TRPage from './components/Pages/TRPage';
import PTPage from './components/Pages/PTPage';
import CIPage from './components/Pages/CIPage';
import EPage from './components/Pages/Epage';
import AIPage from './components/Pages/AIPage';

function AnimatedRoutes() {
  const location = useLocation();
  const scrollRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    // Destroy existing Locomotive instance before creating a new one
    if (scrollRef.current) {
      scrollRef.current.destroy();
      scrollRef.current = null;
    }

    // Initialize Locomotive Scroll ONLY when on the Home page
    if (location.pathname === '/') {
      setTimeout(() => {
        scrollRef.current = new LocomotiveScroll({
          el: scrollContainerRef.current,
          smooth: true,
          lerp: 0.08,
        });
        scrollRef.current.update(); // Ensure it detects content properly
      }, 300); // Delay ensures content is fully loaded before initializing
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.destroy(); // Cleanup on unmount
        scrollRef.current = null;
      }
    };
  }, [location.pathname]); // Runs every time route changes

  return (
    <AnimatePresence mode="wait">
      <div ref={scrollContainerRef} data-scroll-container>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <MotionPage>
                <Landing />
                <Marquee />
                <About />
                <GS />
                <Team />
                <FAQ />
                <Contact />
                <Footer />
              </MotionPage>
            }
          />
          <Route path="/cta2" element={<MotionPage><CTA2 /></MotionPage>} />
          <Route path="/hiw" element={<MotionPage><HIWPage /></MotionPage>} />
          <Route path="/aboutpage" element={<MotionPage><AboutPage /></MotionPage>} />
          <Route path="/contactpage" element={<MotionPage><ContactPage /></MotionPage>} />
          <Route path="/trpage" element={<MotionPage><TRPage /></MotionPage>} />
          <Route path="/ptpage" element={<MotionPage><PTPage /></MotionPage>} />
          <Route path="/cipage" element={<MotionPage><CIPage /></MotionPage>} />
          <Route path="/epage" element={<MotionPage><EPage /></MotionPage>} />
          <Route path="/aipage" element={<MotionPage><AIPage/></MotionPage>} />
        </Routes>
      </div>
    </AnimatePresence>
  );
}

function MotionPage({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  return (
    <Router>
      <div className="w-full min-h-screen text-white bg-[#F1F1F1]">
        <Navbar />
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;
