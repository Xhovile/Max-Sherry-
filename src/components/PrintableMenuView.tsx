import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Printer, X, ZoomIn, ZoomOut, Eye, ArrowLeft, Download, EyeOff } from 'lucide-react';
import { MenuItem } from '../types';

interface PrintableMenuViewProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
}

const getCategoryLabel = (cat: string) => {
  const labels: Record<string, string> = {
    starters: 'Starters & Appétissants',
    steaks_beef: 'Steaks & Aged Beef Specialties',
    pork: 'Pork Entrées',
    chicken: 'Premium Chicken Curations',
    pasta: 'Classic Pastas',
    seafood: 'Oceanic Delicacies',
    lake_malawi: 'Lake Malawi Local Catch',
    vegetarian: 'Botanical & Vegetarian',
    kids: "Young Connoisseurs' Selections",
    desserts: 'Confections & Desserts',
    beverages: 'Dramatic Liquid Botanicals & Beverages'
  };
  return labels[cat] || cat;
};

export default function PrintableMenuView({ isOpen, onClose, menuItems }: PrintableMenuViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [showDescriptions, setShowDescriptions] = useState(true);
  const [showStarchAccompaniments, setShowStarchAccompaniments] = useState(true);
  const printAreaRef = useRef<HTMLDivElement>(null);

  // Grouped and filtered items for printing
  const categories = useMemo(() => {
    const list = Array.from(new Set(menuItems.map(item => item.category)));
    return ['all', ...list];
  }, [menuItems]);

  const itemsByCategory = useMemo(() => {
    const grouped: Record<string, MenuItem[]> = {};
    
    menuItems.forEach(item => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return;
      }
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(item);
    });

    return grouped;
  }, [menuItems, selectedCategory]);

  const handlePrint = () => {
    // Open a clean printable tab if possible or directly trigger iframe print
    try {
      const printContent = printAreaRef.current?.innerHTML;
      if (!printContent) return;

      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>The Culinary Manifesto - Printable Menu</title>
              <style>
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
                body {
                  background-color: #ffffff;
                  color: #111111;
                  font-family: 'Inter', sans-serif;
                  margin: 0;
                  padding: 40px;
                }
                .print-container {
                  max-width: 800px;
                  margin: 0 auto;
                }
                .header {
                  text-align: center;
                  margin-bottom: 40px;
                  border-bottom: 2px solid #111111;
                  padding-bottom: 20px;
                }
                .brand-title {
                  font-family: 'Playfair Display', serif;
                  font-size: 32px;
                  font-weight: 700;
                  letter-spacing: 1px;
                  margin: 0;
                  text-transform: uppercase;
                }
                .brand-subtitle {
                  font-size: 11px;
                  text-transform: uppercase;
                  letter-spacing: 4px;
                  color: #555555;
                  margin-top: 8px;
                }
                .brand-policy {
                  font-size: 11px;
                  color: #666666;
                  margin-top: 10px;
                  font-style: italic;
                }
                .category-section {
                  margin-bottom: 30px;
                  page-break-inside: avoid;
                }
                .category-title {
                  font-family: 'Playfair Display', serif;
                  font-size: 18px;
                  font-weight: 700;
                  text-transform: uppercase;
                  letter-spacing: 1.5px;
                  border-bottom: 1px solid #cccccc;
                  padding-bottom: 6px;
                  margin-bottom: 15px;
                  color: #111111;
                }
                .menu-item {
                  margin-bottom: 18px;
                  page-break-inside: avoid;
                }
                .item-header {
                  display: flex;
                  justify-content: space-between;
                  align-items: baseline;
                }
                .item-name {
                  font-family: 'Playfair Display', serif;
                  font-size: 14px;
                  font-weight: 600;
                  color: #111111;
                }
                .item-leader {
                  flex-grow: 1;
                  border-bottom: 1px dotted #888888;
                  margin: 0 10px;
                }
                .item-price {
                  font-family: 'Playfair Display', serif;
                  font-size: 14px;
                  font-weight: 700;
                  white-space: nowrap;
                }
                .item-description {
                  font-size: 11.5px;
                  color: #444444;
                  margin-top: 4px;
                  line-height: 1.4;
                  max-width: 90%;
                }
                .item-tags {
                  font-size: 9px;
                  text-transform: uppercase;
                  letter-spacing: 1px;
                  color: #888888;
                  margin-top: 3px;
                }
                .starch-accompaniments {
                  margin-top: 35px;
                  padding: 20px;
                  border: 1px solid #dddddd;
                  background-color: #fafafa;
                  page-break-inside: avoid;
                }
                .starch-title {
                  font-family: 'Playfair Display', serif;
                  font-size: 14px;
                  font-weight: 700;
                  text-transform: uppercase;
                  letter-spacing: 1px;
                  margin-bottom: 10px;
                }
                .starch-grid {
                  display: grid;
                  grid-template-columns: repeat(2, 1fr);
                  gap: 8px;
                  font-size: 11px;
                }
                .footer-details {
                  margin-top: 50px;
                  border-top: 1px solid #111111;
                  padding-top: 20px;
                  text-align: center;
                  font-size: 10px;
                  color: #555555;
                  line-height: 1.6;
                  page-break-inside: avoid;
                }
                @media print {
                  body {
                    padding: 0;
                  }
                  button {
                    display: none;
                  }
                }
              </style>
            </head>
            <body>
              <div class="print-container">
                ${printContent}
              </div>
              <script>
                window.onload = function() {
                  window.print();
                }
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
      } else {
        // Fallback: If pop-up is blocked, let browser print the current page with helper layout
        window.print();
      }
    } catch (err) {
      console.error("Iframe print error fallback active:", err);
      window.print();
    }
  };

  const fontClass = {
    normal: {
      title: 'text-lg md:text-xl',
      body: 'text-xs md:text-sm',
      desc: 'text-[11px] md:text-xs',
      meta: 'text-[9px]'
    },
    large: {
      title: 'text-xl md:text-2xl',
      body: 'text-sm md:text-base',
      desc: 'text-xs md:text-sm',
      meta: 'text-[11px]'
    },
    xlarge: {
      title: 'text-2xl md:text-3xl',
      body: 'text-base md:text-lg',
      desc: 'text-sm md:text-base',
      meta: 'text-xs'
    }
  }[fontSize];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#111111] text-[#E0E0E0] overflow-hidden font-sans">
          {/* Top Admin Control Dock */}
          <div className="bg-[#1A1A1A] border-b border-[#242424] px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shrink-0 shadow-lg">
            <div className="flex items-center space-x-3">
              <button 
                onClick={onClose}
                className="p-2 hover:bg-[#242424] rounded-full transition-all text-[#B0B0B0] hover:text-white cursor-pointer"
                aria-label="Back to interactive menu"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h2 className="font-serif text-lg font-medium text-white tracking-wide">Printable Menu Generator</h2>
                <p className="text-[10px] text-[#B0B0B0] uppercase tracking-widest mt-0.5">High-Contrast Accessibility Layout</p>
              </div>
            </div>

            {/* Quick customization parameters */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Category Filter */}
              <div className="flex items-center space-x-1.5 bg-[#242424] rounded px-3 py-1.5 border border-neutral-800">
                <span className="text-[9px] uppercase tracking-wider text-neutral-400">Category:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-transparent border-none text-[10px] uppercase tracking-wider font-semibold focus:outline-none text-white cursor-pointer"
                >
                  <option value="all" className="bg-[#242424] text-white">All Divisions</option>
                  {categories.filter(c => c !== 'all').map(cat => (
                    <option key={cat} value={cat} className="bg-[#242424] text-white">
                      {getCategoryLabel(cat)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Adjust Text Size for Accessibility */}
              <div className="flex items-center space-x-1 bg-[#242424] rounded border border-neutral-800 p-1">
                <button
                  onClick={() => setFontSize('normal')}
                  className={`px-2.5 py-1 text-[9px] uppercase font-bold tracking-widest rounded transition-all ${
                    fontSize === 'normal' ? 'bg-[#D4AF37] text-[#1A1A1A]' : 'text-[#B0B0B0] hover:text-white'
                  }`}
                  title="Normal text size"
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize('large')}
                  className={`px-2.5 py-1 text-[11px] uppercase font-bold tracking-widest rounded transition-all ${
                    fontSize === 'large' ? 'bg-[#D4AF37] text-[#1A1A1A]' : 'text-[#B0B0B0] hover:text-white'
                  }`}
                  title="Large text size"
                >
                  A+
                </button>
                <button
                  onClick={() => setFontSize('xlarge')}
                  className={`px-2.5 py-1 text-[13px] uppercase font-bold tracking-widest rounded transition-all ${
                    fontSize === 'xlarge' ? 'bg-[#D4AF37] text-[#1A1A1A]' : 'text-[#B0B0B0] hover:text-white'
                  }`}
                  title="Extra large text size"
                >
                  A++
                </button>
              </div>

              {/* Toggle details to make layout more compact or highly comprehensive */}
              <button
                onClick={() => setShowDescriptions(!showDescriptions)}
                className={`p-2 rounded border border-neutral-800 flex items-center gap-1.5 text-[10px] uppercase tracking-wider transition-all ${
                  showDescriptions ? 'bg-[#D4AF37]/10 border-[#D4AF37]/30 text-[#D4AF37]' : 'bg-[#242424] text-neutral-400 hover:text-white'
                }`}
                title="Toggle item ingredients and descriptions"
              >
                {showDescriptions ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span className="hidden md:inline">Descriptions</span>
              </button>

              <button
                onClick={() => setShowStarchAccompaniments(!showStarchAccompaniments)}
                className={`p-2 rounded border border-neutral-800 flex items-center gap-1.5 text-[10px] uppercase tracking-wider transition-all ${
                  showStarchAccompaniments ? 'bg-[#D4AF37]/10 border-[#D4AF37]/30 text-[#D4AF37]' : 'bg-[#242424] text-neutral-400 hover:text-white'
                }`}
                title="Toggle starch options checklist"
              >
                <span>Sides Checklist</span>
              </button>

              {/* Print CTA */}
              <button
                onClick={handlePrint}
                className="bg-[#D4AF37] hover:bg-white text-[#1A1A1A] px-5 py-2.5 rounded text-[10px] uppercase tracking-widest font-bold inline-flex items-center gap-2 shadow-lg cursor-pointer transition-all shrink-0"
              >
                <Printer className="w-4 h-4" /> Print / Save PDF
              </button>
            </div>
          </div>

          {/* Paper View Container */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#151515] flex justify-center">
            {/* Elegant high-contrast physical menu print simulation sheet */}
            <div 
              ref={printAreaRef}
              className="w-full max-w-3xl bg-[#FAF9F6] text-[#1A1A1A] p-8 md:p-14 shadow-2xl rounded-sm font-sans border-t-[6px] border-[#D4AF37] min-h-[1056px] flex flex-col justify-between"
              style={{ contentVisibility: 'auto' }}
            >
              <div>
                {/* Visual Classical Restaurant Header */}
                <div className="text-center mb-10 pb-6 border-b-2 border-neutral-800">
                  <span className="text-[9px] tracking-[0.4em] text-neutral-500 uppercase block mb-1">
                    Malawi's Premier Culinary Experience
                  </span>
                  <h1 className="font-serif text-3xl md:text-4xl text-neutral-900 font-bold tracking-wider uppercase">
                    The Culinary Manifesto
                  </h1>
                  <p className="font-serif italic text-xs text-neutral-600 mt-1">
                    Hand-Aged Cuts, Fresh Local Provisions & Dramatic Liquid Botanicals
                  </p>
                  
                  <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-1 text-[10px] text-neutral-500 font-medium">
                    <span>📍 New Naperi, Mpheta Close Street, Blantyre</span>
                    <span>📞 +265 995 700 800 / +265 885 700 200</span>
                    <span>⌛ Preorders Recommended</span>
                  </div>
                </div>

                {/* Categories and listings */}
                {Object.keys(itemsByCategory).length === 0 ? (
                  <div className="text-center py-16 text-neutral-400">
                    No culinary curations match the selected printing parameters.
                  </div>
                ) : (
                  (Object.entries(itemsByCategory) as [string, MenuItem[]][]).map(([category, items]) => (
                    <div key={category} className="mb-10 page-break-inside-avoid">
                      {/* Category Header */}
                      <h3 className="font-serif text-base md:text-lg font-bold text-neutral-900 uppercase tracking-widest border-b border-neutral-300 pb-1.5 mb-5 flex items-center justify-between">
                        <span>{getCategoryLabel(category)}</span>
                        <span className="text-[9px] font-sans font-normal tracking-wider text-neutral-400 lowercase italic">
                          ({items.length} {items.length === 1 ? 'item' : 'items'})
                        </span>
                      </h3>

                      {/* Items Grid */}
                      <div className="space-y-6">
                        {items.map((item) => (
                          <div key={item.id} className="group page-break-inside-avoid">
                            {/* Header connecting item name to price with classic leader dots */}
                            <div className="flex items-baseline justify-between gap-2">
                              <span className={`font-serif font-bold text-neutral-900 ${fontClass.body} tracking-wide flex items-center gap-1.5`}>
                                {item.name}
                                {item.isSignature && (
                                  <span className="text-[7.5px] uppercase font-bold tracking-widest bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded border border-amber-200">
                                    ★ Signature
                                  </span>
                                )}
                              </span>
                              <div className="flex-1 border-b border-dotted border-neutral-400 mx-2 self-end mb-1"></div>
                              <span className={`font-serif font-bold text-neutral-900 ${fontClass.body} whitespace-nowrap`}>
                                {item.isMarketPrice ? "M.P." : `MWK ${Number(item.price).toLocaleString()}`}
                              </span>
                            </div>

                            {/* Tags list (e.g. Vegetarian, Chef Recommendation) */}
                            {item.tags && item.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mt-1">
                                {item.tags.map((tag, i) => (
                                  <span key={i} className="text-[8px] uppercase tracking-wider text-neutral-500 border border-neutral-200 bg-neutral-100/50 px-1.5 py-0.5 rounded">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* Optional Description block */}
                            {showDescriptions && item.description && (
                              <p className={`text-neutral-600 font-light mt-1.5 leading-relaxed max-w-[95%] ${fontClass.desc}`}>
                                {item.description}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}

                {/* Starch Accompaniments Checklist */}
                {showStarchAccompaniments && selectedCategory === 'all' && (
                  <div className="mt-12 p-6 border border-neutral-300 bg-neutral-50 rounded-sm page-break-inside-avoid">
                    <h4 className="font-serif text-sm font-bold text-neutral-900 uppercase tracking-widest mb-3 pb-1 border-b border-neutral-200 flex items-center justify-between">
                      <span>Complementary Starch Selection Checklist</span>
                      <span className="text-[8px] font-sans font-normal tracking-widest text-neutral-500 uppercase">
                        Choose One per Entrée
                      </span>
                    </h4>
                    <p className="text-[10.5px] text-neutral-600 mb-4 font-light">
                      Customize your flame-grilled proteins, savory steaks, and pan-seared local Malawian catch side orders:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {[
                        "French Fries",
                        "Potato Wedges",
                        "Mashed Potato",
                        "Steamed Rice",
                        "Fried Rice",
                        "White Nsima",
                        "Millet Nsima",
                        "Kondowole",
                        "Mgaiwa",
                        "Fried Plantains"
                      ].map((starch) => (
                        <div key={starch} className="flex items-center space-x-2 text-[10.5px] text-neutral-800 font-light">
                          <span className="inline-block w-3.5 h-3.5 border border-neutral-400 rounded-sm bg-white shrink-0" />
                          <span>{starch}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Important Ordering / Booking Details block */}
                <div className="mt-12 p-6 border-t border-neutral-800 grid grid-cols-1 md:grid-cols-2 gap-6 page-break-inside-avoid text-neutral-700">
                  <div>
                    <h5 className="font-serif text-[11px] font-bold text-neutral-900 uppercase tracking-wider mb-1.5">Polished Guest Guidelines</h5>
                    <p className="text-[10px] leading-relaxed font-light">
                      In order to maintain maximum precision in our presentation and flavor profiles, we kindly ask our distinguished guests to preorder meals prior to arrival. Group bookings of 4 or more individuals require an advance planning deposit of <strong className="font-semibold text-neutral-900">MK 25,000</strong>.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-serif text-[11px] font-bold text-neutral-900 uppercase tracking-wider mb-1.5">Establishment Address</h5>
                    <p className="text-[10px] leading-relaxed font-light">
                      New Naperi, along Mpheta Close Street, directly behind Business Centre Building, Blantyre, Malawi. For secure reservations and private events, please connect with us via our hotline or directly through our interactive app.
                    </p>
                  </div>
                </div>
              </div>

              {/* Minimalist fine print details */}
              <div className="text-center pt-8 mt-10 border-t border-neutral-200 text-[9px] text-neutral-400 font-mono tracking-wider flex justify-between items-center page-break-inside-avoid">
                <span>The Culinary Manifesto &bull; Blantyre</span>
                <span className="uppercase">Printed via Guest Accessibility Portal</span>
                <span>Est. 2026</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
