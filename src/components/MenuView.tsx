import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Sparkles, AlertCircle, Printer } from 'lucide-react';
import { MenuItem } from '../types';
import PrintableMenuView from './PrintableMenuView';

interface MenuViewProps {
  menuItems: MenuItem[];
  setActiveTab: (tab: string) => void;
  onBookEvent?: (name: string) => void;
}

const MenuSkeleton = () => (
  <div className="group bg-[#242424]/10 border border-[#242424]/50 rounded-sm overflow-hidden flex flex-col justify-between animate-pulse">
    <div>
      {/* Product Image Stage Skeleton */}
      <div className="relative aspect-[4/3] bg-[#242424]/70 flex items-center justify-center">
        <div className="absolute top-4 left-4 bg-[#242424]/95 w-20 h-5 rounded-sm" />
        <div className="w-10 h-10 text-[#B0B0B0]/20">
          <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-1.96-2.36L6.5 17h11l-3.54-4.71z" />
          </svg>
        </div>
      </div>

      {/* Info Deck Skeleton */}
      <div className="p-8 space-y-4">
        {/* Tags */}
        <div className="flex gap-1.5">
          <div className="h-4 bg-[#242424]/80 w-12 rounded" />
          <div className="h-4 bg-[#242424]/80 w-16 rounded" />
        </div>

        {/* Title */}
        <div className="h-6 bg-[#242424]/80 w-3/4 rounded" />

        {/* Description */}
        <div className="space-y-2">
          <div className="h-3.5 bg-[#242424]/60 w-full rounded" />
          <div className="h-3.5 bg-[#242424]/60 w-5/6 rounded" />
        </div>
      </div>
    </div>

    {/* Bottom Transaction Drawer Skeleton */}
    <div className="p-8 pt-0 border-t border-[#242424]/20 mt-4 flex items-center justify-between">
      <div className="space-y-1.5">
        <div className="h-2.5 bg-[#242424]/50 w-10 rounded" />
        <div className="h-5 bg-[#242424]/80 w-24 rounded" />
      </div>

      <div className="h-9 bg-[#242424]/80 w-28 rounded-sm" />
    </div>
  </div>
);

const getCategoryLabel = (cat: string) => {
  const labels: Record<string, string> = {
    starters: 'Starters',
    steaks_beef: 'Steaks & Beef',
    pork: 'Pork',
    chicken: 'Chicken',
    pasta: 'Pasta',
    seafood: 'Seafood',
    lake_malawi: 'Lake Malawi Specialties',
    vegetarian: 'Vegetarian',
    kids: "Kids' Menu",
    desserts: 'Desserts',
    beverages: 'Beverages'
  };
  return labels[cat] || cat;
};

export default function MenuView({ menuItems, setActiveTab, onBookEvent }: MenuViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'starters' | 'steaks_beef' | 'pork' | 'chicken' | 'pasta' | 'seafood' | 'lake_malawi' | 'vegetarian' | 'kids' | 'desserts' | 'beverages'
  >('all');
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery]);

  const categories = [
    { id: 'all', label: 'All Curations' },
    { id: 'starters', label: 'Starters' },
    { id: 'steaks_beef', label: 'Steaks & Beef' },
    { id: 'pork', label: 'Pork' },
    { id: 'chicken', label: 'Chicken' },
    { id: 'pasta', label: 'Pasta' },
    { id: 'seafood', label: 'Seafood' },
    { id: 'lake_malawi', label: 'Lake Malawi' },
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'kids', label: "Kids' Menu" },
    { id: 'desserts', label: 'Desserts' },
    { id: 'beverages', label: 'Beverages' }
  ];

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCategory && matchesSearch;
    });
  }, [menuItems, selectedCategory, searchQuery]);

  return (
    <div id="culinary-menu-view" className="w-full bg-[#1A1A1A] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
          <span className="text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-semibold mb-3">
            &bull; THE CULINARY MANIFESTO &bull;
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-[#F5F5F5] font-medium leading-none">
            Interactive Menu
          </h1>
          <p className="text-xs md:text-sm text-[#B0B0B0] mt-4 font-light tracking-wide">
            Strictly no PDFs, unless requested for guest accessibility. Filter our provisions below or generate a custom printable version.
          </p>
          <button
            onClick={() => setIsPrintModalOpen(true)}
            className="mt-5 bg-transparent hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#1A1A1A] border border-[#D4AF37] text-[10px] uppercase tracking-[0.25em] px-5 py-2.5 transition-all duration-300 font-bold flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Printer className="w-3.5 h-3.5" /> Generate Printable Menu Card
          </button>
        </div>

        {/* Search and Filters Bar */}
        <div className="bg-[#242424]/40 border border-[#242424] p-6 rounded-sm mb-12 flex flex-col md:flex-row gap-6 items-center justify-between">
          {/* Dynamic Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4.5 h-4.5 text-[#B0B0B0] absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search dishes, ingredients, or tags..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1A1A1A] border border-[#242424] text-xs py-3.5 pl-12 pr-6 text-[#F5F5F5] rounded focus:outline-none focus:border-[#D4AF37] transition-all tracking-wide"
            />
          </div>

          {/* Interactive Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-4 py-2.5 rounded text-[11px] uppercase tracking-widest font-medium transition-all ${
                  selectedCategory === cat.id 
                    ? 'bg-[#D4AF37] text-[#1A1A1A] font-semibold' 
                    : 'bg-[#1A1A1A] text-[#B0B0B0] hover:text-[#F5F5F5] border border-[#242424]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <MenuSkeleton key={`menu-skeleton-${index}`} />
            ))
          ) : (
            <>
              {filteredItems.map((item) => (
                <div 
                  key={item.id} 
                  id={`menu-item-card-${item.id}`}
                  className="group bg-[#242424]/20 border border-[#242424] hover:border-[#D4AF37]/25 rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-300"
                >
                  <div>
                    {/* Product Image Stage */}
                    <div className="relative aspect-[4/3] bg-[#242424] overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover filter brightness-95 group-hover:scale-103 transition-transform duration-500"
                        loading="lazy"
                      />
                      
                      {/* Category Indicator Tag */}
                      <span className="absolute top-4 left-4 bg-[#1A1A1A]/95 text-xs text-[#B0B0B0] uppercase tracking-widest px-3 py-1.5 rounded-sm border border-neutral-700/50">
                        {getCategoryLabel(item.category)}
                      </span>

                      {/* Signature badge if marked */}
                      {item.isSignature && (
                        <div className="absolute top-4 right-4 bg-[#D4AF37] text-[#1A1A1A] gap-1 px-3 py-1.5 rounded-sm flex items-center font-semibold text-[10px] uppercase tracking-widest">
                          <Sparkles className="w-3.5 h-3.5" />
                          Signature
                        </div>
                      )}
                    </div>

                    {/* Info Deck */}
                    <div className="p-8">
                      <div className="flex flex-wrap items-center gap-1.5 mb-3">
                        {item.tags?.map((tag, idx) => (
                          <span key={idx} className="text-[9px] uppercase tracking-widest text-[#D4AF37] bg-[#D4AF37]/5 px-2 py-0.5 rounded border border-[#D4AF37]/15">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h3 className="font-serif text-xl text-[#F5F5F5] group-hover:text-[#D4AF37] transition-all duration-300">
                        {item.name}
                      </h3>

                      <p className="text-xs text-[#B0B0B0] leading-relaxed font-light mt-3">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Transaction Drawer */}
                  <div className="p-8 pt-0 border-t border-[#242424]/40 mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-[#B0B0B0] uppercase tracking-widest">Price</span>
                      <div className="font-serif text-xl text-[#D4AF37] font-semibold mt-0.5">
                        {item.isMarketPrice ? "Market Price" : `MWK ${Number(item.price).toLocaleString()}`}
                      </div>
                    </div>

                    <button 
                      onClick={() => onBookEvent ? onBookEvent(`Culinary Curation: ${item.name}`) : setActiveTab('reserve')}
                      className="bg-transparent hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#1A1A1A] border border-[#D4AF37] text-[10px] uppercase tracking-[0.2em] px-4.5 py-2.5 transition-all duration-300 font-semibold"
                    >
                      Book Session
                    </button>
                  </div>
                </div>
              ))}

              {/* Empty Grid Fallback */}
              {filteredItems.length === 0 && (
                <div className="col-span-full py-16 text-center flex flex-col items-center">
                  <AlertCircle className="w-12 h-12 text-[#D4AF37]/50 mb-4" />
                  <h3 className="font-serif text-xl text-[#F5F5F5]">No Culinary Curations Found</h3>
                  <p className="text-xs text-[#B0B0B0] mt-2 font-light">
                    Try adjusting your filters or typing different keywords into the search box.
                  </p>
                  <button
                    onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
                    className="mt-6 text-xs uppercase tracking-widest text-[#D4AF37] underline pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Wine Cave Promotion Board banner */}
        <section className="mt-20 p-8 md:p-12 rounded bg-gradient-to-r from-[#242424] to-[#151515] border border-[#D4AF37]/10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left">
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#D4AF37] font-mono">The Sherry Cellar Reserve</span>
            <h3 className="font-serif text-2xl md:text-3xl text-[#F5F5F5] mt-2 leading-tight">Vintage Wines & Rare Bourbons</h3>
            <p className="text-xs text-[#B0B0B0] mt-2 font-light max-w-xl">
              Our underground sommelier vaults contain exclusive Shiraz releases, vintage French Champagnes, and rare bourbon varieties hand-stocked by Max. Ask our inhouse experts for custom pairings.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('reserve')}
            className="shrink-0 bg-[#D4AF37] hover:bg-[#F5F5F5] text-[#1A1A1A] text-xs uppercase tracking-[0.2em] font-semibold px-8 py-4 pointer transition-all"
          >
            Inquire Wine Tasting
          </button>
        </section>

        {/* Choose Your Starch & Premium Touches Section */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Choose Your Starch Column */}
          <div className="bg-[#242424]/30 border border-[#242424] p-8 md:p-10 rounded-sm flex flex-col justify-between">
            <div>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#D4AF37] font-mono">Culinary Accompaniments</span>
              <h3 className="font-serif text-2xl text-[#F5F5F5] mt-2 mb-6">Choose Your Starch</h3>
              <p className="text-xs text-[#B0B0B0] font-light mb-8 leading-relaxed">
                Complement your selected mains, flame-grilled proteins, or pan-seared local catch with your choice of premium Malawian or continental starch side:
              </p>
              
              <div className="grid grid-cols-2 gap-4">
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
                  "Plantains"
                ].map((starch) => (
                  <div key={starch} className="flex items-center space-x-2.5 text-xs text-[#F5F5F5] font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                    <span>{starch}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-t border-[#242424] pt-6 mt-8">
              <p className="text-[10px] text-[#B0B0B0] font-light italic">
                * Starch accompaniment is included with all major steaks, ribs, and chicken curations unless specified.
              </p>
            </div>
          </div>

          {/* Premium Touches Column */}
          <div className="bg-[#242424]/30 border border-[#242424] p-8 md:p-10 rounded-sm flex flex-col justify-between">
            <div>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#D4AF37] font-mono">Recommended Premium Touches</span>
              <h3 className="font-serif text-2xl text-[#F5F5F5] mt-2 mb-6 font-medium">Polished Guest Policies</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-[#D4AF37] mb-1.5 font-semibold">Advance-Order Policy</h4>
                  <p className="text-xs text-[#B0B0B0] font-light leading-relaxed">
                    To deliver maximum precision and curation, we kindly ask our distinguished guests to preorder meals and book space in advance of arrival.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-[#D4AF37] mb-1.5 font-semibold">Group Booking Deposit</h4>
                  <p className="text-xs text-[#B0B0B0] font-light leading-relaxed">
                    Bookings of 4 or more individuals require an advance commitment payment of <span className="text-[#D4AF37] font-medium">MK25,000</span> (non-refundable after setup and ingredient prep expenditures).
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#242424]/80">
                  <div>
                    <h5 className="text-[9px] uppercase tracking-wider text-[#B0B0B0] mb-1 font-medium">Direct Hotline</h5>
                    <p className="text-xs text-[#F5F5F5] font-mono">+265 995 700 800</p>
                    <p className="text-xs text-[#F5F5F5] font-mono mt-0.5">+265 885 700 200</p>
                  </div>
                  <div>
                    <h5 className="text-[9px] uppercase tracking-wider text-[#B0B0B0] mb-1 font-medium">Our Location</h5>
                    <p className="text-xs text-[#F5F5F5] leading-snug font-light">
                      New Naperi, along Mpheta Close Street, behind Business Centre Building
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('reserve')}
              className="mt-8 w-full bg-[#D4AF37] hover:bg-[#F5F5F5] text-[#1A1A1A] text-xs uppercase tracking-[0.2em] font-bold py-4 transition-all"
            >
              Secure Reservation
            </button>
          </div>
        </div>

      </div>

      <PrintableMenuView 
        isOpen={isPrintModalOpen} 
        onClose={() => setIsPrintModalOpen(false)} 
        menuItems={menuItems} 
      />
    </div>
  );
}
