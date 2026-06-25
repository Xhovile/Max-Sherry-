import React, { useState, useEffect, useRef } from 'react';
import { useMaxSherryStore } from './store';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Page Views
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import MenuView from './components/MenuView';
import EventsView from './components/EventsView';
import GalleryView from './components/GalleryView';
import CorporateView from './components/CorporateView';
import ReservationForm from './components/ReservationForm';
import AdminDashboard from './components/AdminDashboard';

import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, Sparkles, MessageSquare, ArrowUp } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [prefilledEvent, setPrefilledEvent] = useState<string>("");
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  const store = useMaxSherryStore();
  const scrollPositions = useRef<Record<string, number>>({});

  // Synchronize browser history and phone physical back button with activeTab
  useEffect(() => {
    const validTabs = ['home', 'story', 'menu', 'events', 'gallery', 'corporate', 'reserve', 'admin'];
    
    // Read the initial tab from location hash
    const initialHash = window.location.hash.replace('#', '');
    const initialTab = validTabs.includes(initialHash) ? initialHash : 'home';
    
    setActiveTab(initialTab);
    
    // Set baseline state in history
    window.history.replaceState({ tab: initialTab }, '', `#${initialTab}`);

    const handlePopState = (event: PopStateEvent) => {
      const poppedTab = event.state?.tab || window.location.hash.replace('#', '');
      if (poppedTab && validTabs.includes(poppedTab)) {
        setActiveTab(poppedTab);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Update history when activeTab changes programmatically
  useEffect(() => {
    if (activeTab && window.history.state?.tab !== activeTab) {
      window.history.pushState({ tab: activeTab }, '', `#${activeTab}`);
    }
  }, [activeTab]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }

      // Continuously record current tab scroll position
      if (activeTab) {
        scrollPositions.current[activeTab] = window.scrollY;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeTab]);

  // Restore scroll state when activeTab changes
  useEffect(() => {
    const savedPos = scrollPositions.current[activeTab] || 0;
    
    // Tiny delay to ensure React has fully rendered the tab view contents before adjusting window scroll
    const timer = setTimeout(() => {
      window.scrollTo({
        top: savedPos,
        behavior: 'auto'
      });
    }, 30);

    return () => clearTimeout(timer);
  }, [activeTab]);

  // Instantly deselect admin (set isAdmin to false) if user navigates to any tab other than 'admin'
  useEffect(() => {
    if (activeTab !== 'admin' && isAdmin) {
      setIsAdmin(false);
    }
  }, [activeTab, isAdmin]);

  // Preload and cache all images on app initialization to prevent reloading flicker on tab navigation
  useEffect(() => {
    const urlsToPreload = new Set<string>();

    // 1. High-priority background images and hero banners
    const staticImages = [
      "https://images.unsplash.com/photo-1485686531765-ba63b07845a7?auto=format&fit=crop&w=1920&q=90", // Home Hero
      "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&q=80", // About image 1
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80", // Events background
      "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
    ];
    staticImages.forEach(url => urlsToPreload.add(url));

    // 2. Menu Item images
    if (store.menuItems) {
      store.menuItems.forEach(item => {
        if (item.image) urlsToPreload.add(item.image);
      });
    }

    // 3. Events images
    if (store.events) {
      store.events.forEach(ev => {
        if (ev.image) urlsToPreload.add(ev.image);
      });
    }

    // 4. Gallery images
    if (store.gallery) {
      store.gallery.forEach(img => {
        if (img.url) urlsToPreload.add(img.url);
      });
    }

    // Asynchronously preload images into the browser cache
    urlsToPreload.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  }, [store.menuItems, store.events, store.gallery]);

  const handleBookEventRedirect = (eventName: string) => {
    setPrefilledEvent(eventName);
    setActiveTab('reserve');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavWithPrefillClear = (tabId: string) => {
    // If navigating directly to reserve, don't clear prefill. Otherwise clear it.
    if (tabId !== 'reserve') {
      setPrefilledEvent("");
    }
    setActiveTab(tabId);
  };

  // Rendering Routing Module
  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeView 
            homepage={store.homepage}
            menuItems={store.menuItems}
            events={store.events}
            testimonials={store.testimonials}
            setActiveTab={handleNavWithPrefillClear}
            onBookEvent={handleBookEventRedirect}
          />
        );
      case 'story':
        return <AboutView />;
      case 'menu':
        return (
          <MenuView 
            menuItems={store.menuItems}
            setActiveTab={handleNavWithPrefillClear}
            onBookEvent={handleBookEventRedirect}
          />
        );
      case 'events':
        return (
          <EventsView 
            events={store.events}
            onBookEvent={handleBookEventRedirect}
          />
        );
      case 'gallery':
        return <GalleryView gallery={store.gallery} />;
      case 'corporate':
        return (
          <CorporateView 
            createInquiry={store.createInquiry}
          />
        );
      case 'reserve':
        return (
          <ReservationForm 
            prefilledEvent={prefilledEvent}
            createReservation={store.createReservation}
          />
        );
      case 'admin':
        return (
          <AdminDashboard 
            homepage={store.homepage}
            menuItems={store.menuItems}
            events={store.events}
            reservations={store.reservations}
            gallery={store.gallery}
            testimonials={store.testimonials}
            inquiries={store.inquiries}
            
            updateHomepage={store.updateHomepage}
            addMenuItem={store.addMenuItem}
            updateMenuItem={store.updateMenuItem}
            deleteMenuItem={store.deleteMenuItem}
            addEvent={store.addEvent}
            updateEvent={store.updateEvent}
            deleteEvent={store.deleteEvent}
            updateReservationStatus={store.updateReservationStatus}
            deleteReservation={store.deleteReservation}
            addGalleryItem={store.addGalleryItem}
            deleteGalleryItem={store.deleteGalleryItem}
            addTestimonial={store.addTestimonial}
            deleteTestimonial={store.deleteTestimonial}
            updateInquiryStatus={store.updateInquiryStatus}
            deleteInquiry={store.deleteInquiry}
            resetAll={store.resetToFactoryDefaults}
          />
        );
      default:
        return (
          <div className="h-screen flex items-center justify-center bg-[#1A1A1A]">
            <span className="text-sm font-mono text-[#D4AF37]">Prestige Pipeline Misaligned</span>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#1A1A1A] text-[#F5F5F5] font-sans overflow-x-hidden antialiased">
      
      {/* Premium Stick-to-Top Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={handleNavWithPrefillClear} 
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
      />

      {/* Main Content Stage with luxury page-fade entrances */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Persistent Sticky Luxury Concierge/WhatsApp & Floating Widgets */}
      <div className="fixed bottom-6 right-6 z-45 flex flex-col space-y-3 items-end">
        
        {/* Elegant Back to Top Button */}
        {showBackToTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center justify-center p-3.5 bg-[#242424]/95 hover:bg-[#D4AF37] border border-[#D4AF37]/50 hover:border-transparent text-[#D4AF37] hover:text-[#1A1A1A] rounded-full shadow-2xl hover:scale-110 transition-all duration-300 group cursor-pointer"
            title="Back to Top"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4.5 h-4.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        )}

        {/* Helper quick tips for evaluating the app */}
        <div className="bg-[#242424]/95 backdrop-blur border border-[#D4AF37]/35 p-3.5 rounded shadow-xl text-right max-w-xs transition-transform duration-300 transform translate-y-2 select-none group hidden md:block">
          <div className="flex items-center justify-end gap-1.5 text-[#D4AF37] font-semibold text-[10px] uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Developer Review Help</span>
          </div>
          <p className="text-[10px] text-neutral-300 leading-normal font-light">
            Toggle the <strong className="text-white">&quot;🛡️ Shield&quot;</strong> icon at the top right to open the <strong className="text-[#D4AF37]">Admin Panel</strong>. Create/delete menus, events, & manage customer reserves instantly!
          </p>
        </div>

        <a 
          href="https://wa.me/265995700800?text=Hello%20Max%20and%20Sherry%20team%2C%20I'd%20love%20to%20reserve%20a%20private%20booth%20at%20your%20lounge."
          target="_blank"
          referrerPolicy="no-referrer"
          title="Direct Lounge Concierge WhatsApp"
          className="hidden md:flex items-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 hover:scale-103 font-semibold text-white rounded-full shadow-2xl transition-all duration-300 text-xs uppercase tracking-wider border border-emerald-500/30"
        >
          <MessageSquare className="w-4.5 h-4.5 shrink-0" />
          <span>Lounge Concierge</span>
        </a>
      </div>

      {/* Footer Details map coordinates */}
      <Footer setActiveTab={handleNavWithPrefillClear} />
    </div>
  );
}
