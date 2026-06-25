import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, ArrowUp, Instagram, Facebook, MessageCircle } from 'lucide-react';

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
            <a 
              href="https://instagram.com" 
              target="_blank" 
              referrerPolicy="no-referrer"
              className="p-2.5 rounded-full bg-[#1A1A1A] text-[#B0B0B0] border border-[#242424] transition-all duration-300 hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:text-white hover:border-transparent hover:scale-110 shadow-lg hover:shadow-pink-500/20"
              title="Follow us on Instagram"
            >
              <Instagram className="w-4.5 h-4.5" />
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              referrerPolicy="no-referrer"
              className="p-2.5 rounded-full bg-[#1A1A1A] text-[#B0B0B0] border border-[#242424] transition-all duration-300 hover:bg-[#1877F2] hover:text-white hover:border-transparent hover:scale-110 shadow-lg hover:shadow-blue-500/20"
              title="Connect on Facebook"
            >
              <Facebook className="w-4.5 h-4.5" />
            </a>
            <a 
              href="https://wa.me/265995700800?text=Hello%20Max%20%26%20Sherry%2C%20I'd%20love%20to%20inquire%20about%20booking%20a%20private%20lounge%20event." 
              target="_blank" 
              referrerPolicy="no-referrer"
              className="p-2.5 rounded-full bg-[#1A1A1A] text-[#B0B0B0] border border-[#242424] transition-all duration-300 hover:bg-[#25D366] hover:text-white hover:border-transparent hover:scale-110 shadow-lg hover:shadow-emerald-500/20 flex items-center justify-center"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-4.5 h-4.5" />
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
              <a href="mailto:prestige@maxsherry.co.mw" className="hover:text-[#F5F5F5] transition-colors">prestige@maxsherry.co.mw</a>
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
