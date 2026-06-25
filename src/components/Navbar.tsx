import React, { useState } from 'react';
import { Menu, X, Shield, Calendar, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}

export default function Navbar({ activeTab, setActiveTab, isAdmin, setIsAdmin }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'story', label: 'Our Story' },
    { id: 'menu', label: 'Culinary Menu' },
    { id: 'events', label: 'Experiences & Events' },
    { id: 'gallery', label: 'Visual Gallery' },
    { id: 'corporate', label: 'Private & Corporate' }
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header id="main-header" className="fixed top-0 left-0 w-full z-50 bg-[#1A1A1A]/85 backdrop-blur-md border-b border-[#D4AF37]/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          
          {/* Brand Logo & Presentation */}
          <button 
            id="nav-logo" 
            onClick={() => handleNavClick('home')}
            className="flex flex-col text-left group"
          >
            <span className="font-serif text-2xl tracking-[0.25em] text-[#F5F5F5] group-hover:text-[#D4AF37] transition-colors duration-300">
              MAX & SHERRY
            </span>
            <span className="font-sans text-[9px] uppercase tracking-[0.6em] text-[#D4AF37] mt-0.5">
              Dine & Lounge
            </span>
          </button>

          {/* Desktop Navigation Link Menu */}
          <nav id="desktop-nav" className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`text-xs uppercase tracking-[0.2em] transition-colors duration-300 py-2 relative ${
                  activeTab === item.id 
                    ? 'text-[#D4AF37]' 
                    : 'text-[#B0B0B0] hover:text-[#F5F5F5]'
                }`}
              >
                {item.label}
                {activeTab === item.id && (
                  <motion.div 
                    layoutId="navbar-underline" 
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#D4AF37]" 
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Desktop CTA / Buttons */}
          <div className="hidden lg:flex items-center space-x-6">
            <button
              id="admin-portal-toggle"
              onClick={() => {
                setIsAdmin(!isAdmin);
                if (!isAdmin) setActiveTab('admin');
                else setActiveTab('home');
              }}
              title="Admin Portal"
              className={`p-2.5 rounded-full transition-colors ${
                isAdmin 
                  ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40' 
                  : 'bg-[#242424] text-[#B0B0B0] hover:text-[#D4AF37] border border-transparent'
              }`}
            >
              <Shield className="w-4.5 h-4.5" />
            </button>

            <button
              id="nav-book-button"
              onClick={() => handleNavClick('reserve')}
              className="bg-transparent text-xs hover:bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37] uppercase tracking-[0.2em] font-sans font-medium px-6 py-3 transition-all duration-300 pointer"
            >
              Reserve Table
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center space-x-4">
            <button
              id="mobile-admin-toggle"
              onClick={() => {
                setIsAdmin(!isAdmin);
                if (!isAdmin) setActiveTab('admin');
                else setActiveTab('home');
              }}
              className={`p-2 rounded-full transition-colors ${
                isAdmin ? 'text-[#D4AF37]' : 'text-[#B0B0B0]'
              }`}
            >
              <Shield className="w-5 h-5" />
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-3 text-[#F5F5F5] hover:text-[#D4AF37] transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#1A1A1A] pt-28 px-8 flex flex-col justify-between"
          >
            <div className="flex flex-col space-y-6 mt-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  id={`mobile-nav-link-${item.id}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left font-serif text-2xl tracking-wider py-2 border-b border-[#242424] ${
                    activeTab === item.id ? 'text-[#D4AF37]' : 'text-[#F5F5F5]'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}

              <motion.button
                id="mobile-reserve-button"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
                onClick={() => handleNavClick('reserve')}
                className="w-full text-center bg-[#D4AF37] font-semibold text-xs text-[#1A1A1A] uppercase tracking-[0.25em] py-4 mt-4 block"
              >
                Reserve Restaurant Table
              </motion.button>
            </div>

            <div className="border-t border-[#242424] py-8 text-center text-[10px] uppercase tracking-[0.3em] text-[#B0B0B0]">
              Max & Sherry • Blantyre
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
