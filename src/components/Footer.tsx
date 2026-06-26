import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, ArrowUp, Instagram, Facebook, MessageCircle } from 'lucide-react';

const InstagramIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.7A4.05 4.05 0 0 0 3.7 7.75v8.5a4.05 4.05 0 0 0 4.05 4.05h8.5a4.05 4.05 0 0 0 4.05-4.05v-8.5A4.05 4.05 0 0 0 16.25 3.7h-8.5Zm9.15 1.35a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1ZM12 6.2a5.8 5.8 0 1 1 0 11.6 5.8 5.8 0 0 1 0-11.6Zm0 1.7a4.1 4.1 0 1 0 0 8.2 4.1 4.1 0 0 0 0-8.2Z" />
  </svg>
);

const FacebookIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M13.5 22v-7h2.4l.4-3h-2.8V10c0-.9.3-1.5 1.6-1.5h1.3V5.8c-.6-.1-1.5-.2-2.6-.2-2.6 0-4.4 1.6-4.4 4.6V12H7v3h2.4v7h4.1Z" />
  </svg>
);

const WhatsAppIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19.05 4.95A10 10 0 0 0 3.98 17.48L3 21l3.6-.94A10 10 0 1 0 19.05 4.95Zm-6.99 14.6a8.3 8.3 0 0 1-4.23-1.16l-.3-.17-2.68.7.72-2.61-.2-.28a8.3 8.3 0 1 1 6.7 3.52Zm4.8-6.07c-.26-.13-1.54-.76-1.78-.84-.24-.09-.42-.13-.6.13-.18.26-.69.84-.85 1.02-.16.18-.31.2-.58.07-.26-.13-1.1-.4-2.1-1.29-.78-.7-1.31-1.56-1.47-1.83-.15-.26-.02-.4.11-.53.11-.11.26-.31.39-.46.13-.15.17-.26.26-.43.09-.18.04-.33-.02-.46-.07-.13-.6-1.45-.82-1.98-.21-.51-.42-.44-.6-.45-.15-.01-.33-.01-.5-.01-.18 0-.46.07-.7.33-.24.26-.93.91-.93 2.22 0 1.31.96 2.57 1.09 2.75.13.18 1.87 2.86 4.53 4.01.63.27 1.12.43 1.5.55.63.2 1.2.17 1.65.1.5-.07 1.54-.63 1.76-1.24.22-.62.22-1.15.15-1.24-.07-.09-.24-.15-.5-.28Z" />
  </svg>
);

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const handleLogoClick = () => {
    setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer id="global-footer" className="bg-[#151515] border-t border-[#D4AF37]/10 pt-20 pb-8 text-[#B0B0B0] relative">
      
      {/* Decorative Golden Accent Linework */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Brand Information Column */}
        <div className="flex flex-col space-y-6">
          <button onClick={handleLogoClick} className="text-left flex flex-col group">
            <span className="font-serif text-xl tracking-[0.2em] text-[#F5F5F5] group-hover:text-[#D4AF37] transition-colors duration-300">
              MAX & SHERRY
            </span>
            <span className="font-sans text-[8px] uppercase tracking-[0.4em] text-[#D4AF37] mt-0.5">
              Dine & Lounge
            </span>
          </button>
          
          <p className="text-xs leading-relaxed">
            Blantyre’s pre-eminent culinary sanctuary. Melding modern luxury dining with supreme social lounge culture. Centered in New Naperi, Malawi.
          </p>

          {/* Social Icons */}
          <div className="flex items-center space-x-4 pt-2">
            <a href="https://www.instagram.com/maxandsherrydineandlounge/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2.5 rounded-full bg-[#1A1A1A] text-[#B0B0B0] border border-[#242424] transition-all duration-300 hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:text-white hover:border-transparent hover:scale-110 shadow-lg hover:shadow-pink-500/20">
              <InstagramIcon className="w-4.5 h-4.5" />
            </a>

            <a href="https://www.facebook.com/maxandsherrydineandlounge/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="p-2.5 rounded-full bg-[#1A1A1A] text-[#B0B0B0] border border-[#242424] transition-all duration-300 hover:bg-[#1877F2] hover:text-white hover:border-transparent hover:scale-110 shadow-lg hover:shadow-blue-500/20">
              <FacebookIcon className="w-4.5 h-4.5" />
            </a>

            <a href="https://wa.me/265995700800?text=Hello%20Max%20%26%20Sherry%2C%20I'd%20love%20to%20inquire%20about%20booking%20a%20private%20lounge%20event." target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="p-2.5 rounded-full bg-[#1A1A1A] text-[#B0B0B0] border border-[#242424] transition-all duration-300 hover:bg-[#25D366] hover:text-white hover:border-transparent hover:scale-110 shadow-lg hover:shadow-emerald-500/20 flex items-center justify-center">
              <WhatsAppIcon className="w-4.5 h-4.5" />
            </a>
          </div>
        </div>

        {/* Hours of Operation Column */}
        <div className="flex flex-col space-y-6">
          <h4 className="font-serif text-[#F5F5F5] uppercase tracking-[0.2em] text-sm font-medium">
            Opening Hours
          </h4>
          <ul className="space-y-3.5 text-xs">
            <li className="flex justify-between items-center border-b border-[#242424] pb-2">
              <span>Tuesday - Sunday</span>
              <span className="text-[#D4AF37]">09:00 AM - 09:00 PM</span>
            </li>
            <li className="flex justify-between items-center border-b border-[#242424] pb-2">
              <span>Monday</span>
              <span className="text-[#B0B0B0] italic">Closed</span>
            </li>
          </ul>
        </div>

        {/* Contact and Reservations Column */}
        <div className="flex flex-col space-y-6">
          <h4 className="font-serif text-[#F5F5F5] uppercase tracking-[0.2em] text-sm font-medium">
            Contact & Location
          </h4>
          <ul className="space-y-4 text-xs">
            <li className="flex items-start space-x-3">
              <MapPin className="w-4.5 h-4.5 text-[#D4AF37] shrink-0 mt-0.5" />
              <span>New Naperi, Blantyre, Malawi</span>
            </li>
            <li className="flex items-start space-x-3">
              <Phone className="w-4.5 h-4.5 text-[#D4AF37] shrink-0 mt-0.5" />
              <div className="flex flex-col space-y-1">
                <a href="tel:+265995700800" className="hover:text-[#F5F5F5] transition-colors">+265 (0) 995 70 08 00</a>
                <a href="tel:+265885700200" className="hover:text-[#F5F5F5] transition-colors">+265 (0) 885 70 02 00</a>
              </div>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="w-4.5 h-4.5 text-[#D4AF37]" />
              <a href="mailto:maxandsherrylounge@gmail.com" className="hover:text-[#F5F5F5] transition-colors">maxandsherrylounge@gmail.com</a>
            </li>
          </ul>
        </div>

        {/* Location Map Column */}
        <div className="flex flex-col space-y-4">
          <h4 className="font-serif text-[#F5F5F5] uppercase tracking-[0.2em] text-sm font-medium">
            Locate Us
          </h4>
          <div className="relative rounded-lg overflow-hidden border border-[#D4AF37]/10 h-32 w-full bg-[#1e1e1e]">
            {/* Elegant Map Backdrop Visualization */}
            <div className="absolute inset-0 bg-[#1A1A1A] flex flex-col items-center justify-center p-3 text-center">
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold mb-1">
                New Naperi
              </span>
              <span className="text-[9px] text-[#B0B0B0] mb-2 leading-tight">
                Blantyre, Malawi
              </span>
              <a 
                href="https://maps.google.com/?q=New+Naperi,+Blantyre,+Malawi"
                target="_blank"
                referrerPolicy="no-referrer"
                className="text-[9px] uppercase tracking-widest text-[#1A1A1A] bg-[#D4AF37] font-medium px-3 py-1 hover:bg-[#F5F5F5] transition-all"
              >
                Open Google Maps
              </a>
            </div>
          </div>
          <button
            onClick={() => {
              setActiveTab('reserve');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-left text-xs text-[#D4AF37] hover:text-[#F5F5F5] transition-colors uppercase tracking-widest font-semibold flex items-center space-x-1"
          >
            <span>&bull; Book Your Lounge Session</span>
          </button>
        </div>

      </div>

      {/* Underneath Copyright Footer Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-[#242424] flex flex-col md:flex-row items-center justify-between text-[11px] uppercase tracking-widest">
        <div>
          &copy; {currentYear} Max & Sherry Dine & Lounge. All Rights Reserved.
        </div>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <button onClick={() => { setActiveTab('story'); window.scrollTo(0, 0); }} className="hover:text-[#F5F5F5] transition-colors">Prestige Story</button>
          <button onClick={() => { setActiveTab('menu'); window.scrollTo(0, 0); }} className="hover:text-[#F5F5F5] transition-colors">Curated Dishes</button>
          <button onClick={() => { setActiveTab('reserve'); window.scrollTo(0, 0); }} className="text-[#D4AF37] hover:text-[#F5F5F5] transition-colors underline decoration-dotted decoration-[#D4AF37]">Secure Reservations</button>
        </div>
      </div>
    </footer>
  );
}
