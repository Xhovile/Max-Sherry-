import React, { useState } from 'react';
import { 
  Plus, Edit2, Trash2, Check, X, ShieldAlert, Sparkles, 
  UtensilsCrossed, CalendarDays, BookOpen, Image as ImageIcon, 
  UserSquare2, LayoutTemplate, RotateCw, CheckCheck, RefreshCw 
} from 'lucide-react';
import { MenuItem, Event, Reservation, GalleryItem, Testimonial, CorporateInquiry, HomepageContent } from '../types';

interface AdminDashboardProps {
  homepage: HomepageContent;
  menuItems: MenuItem[];
  events: Event[];
  reservations: Reservation[];
  gallery: GalleryItem[];
  testimonials: Testimonial[];
  inquiries: CorporateInquiry[];
  
  updateHomepage: (newContent: HomepageContent) => void;
  addMenuItem: (item: Omit<MenuItem, "id">) => void;
  updateMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (id: string) => void;
  addEvent: (ev: Omit<Event, "id">) => void;
  updateEvent: (ev: Event) => void;
  deleteEvent: (id: string) => void;
  updateReservationStatus: (id: string, status: 'pending' | 'confirmed' | 'cancelled') => void;
  deleteReservation: (id: string) => void;
  addGalleryItem: (item: Omit<GalleryItem, "id">) => void;
  deleteGalleryItem: (id: string) => void;
  addTestimonial: (item: Omit<Testimonial, "id" | "date">) => void;
  deleteTestimonial: (id: string) => void;
  updateInquiryStatus: (id: string, status: 'pending' | 'reviewed' | 'completed') => void;
  deleteInquiry: (id: string) => void;
  resetAll: () => void;
}

export default function AdminDashboard({
  homepage, menuItems, events, reservations, gallery, testimonials, inquiries,
  updateHomepage, addMenuItem, updateMenuItem, deleteMenuItem,
  addEvent, updateEvent, deleteEvent, updateReservationStatus, deleteReservation,
  addGalleryItem, deleteGalleryItem, addTestimonial, deleteTestimonial,
  updateInquiryStatus, deleteInquiry, resetAll
}: AdminDashboardProps) {
  
  const [activeAdminTab, setActiveAdminTab] = useState<'content' | 'menu' | 'events' | 'bookings' | 'gallery' | 'reviews'>('content');

  // Homepage content state
  const [homeHeroTitle, setHomeHeroTitle] = useState(homepage.heroTitle);
  const [homeHeroHeadline, setHomeHeroHeadline] = useState(homepage.heroHeadline);
  const [homeStoryHeading, setHomeStoryHeading] = useState(homepage.storyHeading);
  const [homeStory1, setHomeStory1] = useState(homepage.storyText1);
  const [homeStory2, setHomeStory2] = useState(homepage.storyText2);
  const [homeStoryImage, setHomeStoryImage] = useState(homepage.storyImage);

  // MenuItem forms state
  const [showMenuForm, setShowMenuForm] = useState(false);
  const [editMenuItemId, setEditMenuItemId] = useState<string | null>(null);
  const [menuName, setMenuName] = useState("");
  const [menuDesc, setMenuDesc] = useState("");
  const [menuPrice, setMenuPrice] = useState(250);
  const [menuCat, setMenuCat] = useState<'starters' | 'mains' | 'desserts' | 'beverages' | 'specials'>('mains');
  const [menuImg, setMenuImg] = useState("");
  const [menuTags, setMenuTags] = useState("");
  const [menuSig, setMenuSig] = useState(false);

  // Event forms state
  const [showEventForm, setShowEventForm] = useState(false);
  const [editEventId, setEditEventId] = useState<string | null>(null);
  const [evName, setEvName] = useState("");
  const [evDesc, setEvDesc] = useState("");
  const [evDate, setEvDate] = useState("");
  const [evTime, setEvTime] = useState("");
  const [evPrice, setEvPrice] = useState(500);
  const [evImg, setEvImg] = useState("");
  const [evVenue, setEvVenue] = useState("");
  const [evSlots, setEvSlots] = useState(20);
  const [evStatus, setEvStatus] = useState<'upcoming' | 'soldout' | 'past'>('upcoming');

  // Gallery forms state
  const [galleryTitle, setGalleryTitle] = useState("");
  const [galleryDesc, setGalleryDesc] = useState("");
  const [galleryUrl, setGalleryUrl] = useState("");
  const [galleryCat, setGalleryCat] = useState<'ambience' | 'dishes' | 'events' | 'lounge'>('ambience');

  // Testimonial forms state
  const [testName, setTestName] = useState("");
  const [testRole, setTestRole] = useState("");
  const [testReview, setTestReview] = useState("");
  const [testRating, setTestRating] = useState(5);

  const resetMenuForm = () => {
    setEditMenuItemId(null);
    setMenuName("");
    setMenuDesc("");
    setMenuPrice(250);
    setMenuCat('mains');
    setMenuImg("");
    setMenuTags("");
    setMenuSig(false);
    setShowMenuForm(false);
  };

  const resetEventForm = () => {
    setEditEventId(null);
    setEvName("");
    setEvDesc("");
    setEvDate("");
    setEvTime("");
    setEvPrice(500);
    setEvImg("");
    setEvVenue("");
    setEvSlots(20);
    setEvStatus('upcoming');
    setShowEventForm(false);
  };

  // Submit operations
  const handleHomeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateHomepage({
      heroTitle: homeHeroTitle,
      heroHeadline: homeHeroHeadline,
      storyHeading: homeStoryHeading,
      storyText1: homeStory1,
      storyText2: homeStory2,
      storyImage: homeStoryImage
    });
    alert("Homepage content securely published.");
  };

  const handleMenuSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!menuName || !menuImg) {
      alert("Name and image URL are mandatory.");
      return;
    }

    const tagsArray = menuTags ? menuTags.split(',').map(t => t.trim()) : [];
    
    if (editMenuItemId) {
      updateMenuItem({
        id: editMenuItemId,
        name: menuName,
        description: menuDesc,
        price: Number(menuPrice),
        category: menuCat,
        image: menuImg,
        tags: tagsArray,
        isSignature: menuSig
      });
      alert("Menu item updated.");
    } else {
      addMenuItem({
        name: menuName,
        description: menuDesc,
        price: Number(menuPrice),
        category: menuCat,
        image: menuImg,
        tags: tagsArray,
        isSignature: menuSig
      });
      alert("New menu item created successfully.");
    }
    resetMenuForm();
  };

  const handleEditMenuClick = (item: MenuItem) => {
    setEditMenuItemId(item.id);
    setMenuName(item.name);
    setMenuDesc(item.description);
    setMenuPrice(item.price);
    setMenuCat(item.category);
    setMenuImg(item.image);
    setMenuTags(item.tags ? item.tags.join(', ') : "");
    setMenuSig(!!item.isSignature);
    setShowMenuForm(true);
  };

  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evName || !evDate || !evTime || !evImg) {
      alert("Please fill necessary details to post event.");
      return;
    }

    if (editEventId) {
      updateEvent({
        id: editEventId,
        name: evName,
        description: evDesc,
        date: evDate,
        time: evTime,
        price: Number(evPrice),
        image: evImg,
        venue: evVenue,
        slotsLeft: Number(evSlots),
        status: evStatus
      });
      alert("Event updated.");
    } else {
      addEvent({
        name: evName,
        description: evDesc,
        date: evDate,
        time: evTime,
        price: Number(evPrice),
        image: evImg,
        venue: evVenue,
        slotsLeft: Number(evSlots),
        status: evStatus
      });
      alert("New social happening posted.");
    }
    resetEventForm();
  };

  const handleEditEventClick = (ev: Event) => {
    setEditEventId(ev.id);
    setEvName(ev.name);
    setEvDesc(ev.description);
    setEvDate(ev.date);
    setEvTime(ev.time);
    setEvPrice(ev.price);
    setEvImg(ev.image);
    setEvVenue(ev.venue);
    setEvSlots(ev.slotsLeft || 20);
    setEvStatus(ev.status);
    setShowEventForm(true);
  };

  const handleGallerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryTitle || !galleryUrl) {
      alert("Provide asset title and URL link.");
      return;
    }
    addGalleryItem({
      title: galleryTitle,
      description: galleryDesc,
      url: galleryUrl,
      category: galleryCat
    });
    alert("New visual asset synchronized.");
    setGalleryTitle("");
    setGalleryDesc("");
    setGalleryUrl("");
  };

  const handleTestimonialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testName || !testReview || !testRole) {
      alert("Please enter host reviewer, role title, and review draft.");
      return;
    }
    addTestimonial({
      name: testName,
      role: testRole,
      review: testReview,
      rating: testRating
    });
    alert("Client audit feedback recorded.");
    setTestName("");
    setTestRole("");
    setTestReview("");
    setTestRating(5);
  };

  return (
    <div id="admin-dashboard-view" className="w-full bg-[#1A1A1A] pt-32 pb-24 text-[#B0B0B0]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Core Administrative Header */}
        <div className="bg-[#242424]/60 border border-[#D4AF37]/20 p-8 rounded flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="text-center md:text-left flex items-center space-x-4">
            <div className="w-12 h-12 bg-[#D4AF37]/10 flex items-center justify-center rounded-full text-[#D4AF37] border border-[#D4AF37]/30">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">SECURED MANAGEMENT SHELL</span>
              <h1 className="font-serif text-3xl text-[#F5F5F5] font-semibold mt-0.5">Admin Management Board</h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              id="admin-factory-reset"
              onClick={() => {
                if(confirm("Confirm database factory reset? This overrides all edits with premium sample content.")) {
                  resetAll();
                  alert("Presets restored.");
                  window.location.reload();
                }
              }}
              className="bg-transparent hover:bg-red-500/10 text-red-400 hover:text-red-300 border border-red-500/20 hover:border-red-500/40 text-[10px] uppercase tracking-widest font-semibold px-4.5 py-3 transition-all inline-flex items-center gap-1.5"
            >
              <RotateCw className="w-3.5 h-3.5" />
              Reset To Presets
            </button>
          </div>
        </div>

        {/* Multi-Section Admin Tabs Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-12">
          
          <button 
            onClick={() => setActiveAdminTab('content')}
            className={`py-3.5 px-2 text-center rounded text-[10px] uppercase tracking-widest font-medium transition-all inline-flex flex-col items-center gap-1.5 ${
              activeAdminTab === 'content' ? 'bg-[#D4AF37] text-[#1A1A1A] font-semibold' : 'bg-[#242424] text-[#B0B0B0] hover:text-[#F5F5F5]'
            }`}
          >
            <LayoutTemplate className="w-4 h-4" />
            <span>Homepage content</span>
          </button>

          <button 
            onClick={() => setActiveAdminTab('menu')}
            className={`py-3.5 px-2 text-center rounded text-[10px] uppercase tracking-widest font-medium transition-all inline-flex flex-col items-center gap-1.5 ${
              activeAdminTab === 'menu' ? 'bg-[#D4AF37] text-[#1A1A1A] font-semibold' : 'bg-[#242424] text-[#B0B0B0] hover:text-[#F5F5F5]'
            }`}
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>Culinary items</span>
          </button>

          <button 
            onClick={() => setActiveAdminTab('events')}
            className={`py-3.5 px-2 text-center rounded text-[10px] uppercase tracking-widest font-medium transition-all inline-flex flex-col items-center gap-1.5 ${
              activeAdminTab === 'events' ? 'bg-[#D4AF37] text-[#1A1A1A] font-semibold' : 'bg-[#242424] text-[#B0B0B0] hover:text-[#F5F5F5]'
            }`}
          >
            <CalendarDays className="w-4 h-4" />
            <span>Events Registry</span>
          </button>

          <button 
            onClick={() => setActiveAdminTab('bookings')}
            className={`py-3.5 px-2 text-center rounded text-[10px] uppercase tracking-widest font-medium transition-all inline-flex flex-col items-center gap-1.5 ${
              activeAdminTab === 'bookings' ? 'bg-[#D4AF37] text-[#1A1A1A] font-semibold' : 'bg-[#242424] text-[#B0B0B0] hover:text-[#F5F5F5]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Bookings & inquiries</span>
          </button>

          <button 
            onClick={() => setActiveAdminTab('gallery')}
            className={`py-3.5 px-2 text-center rounded text-[10px] uppercase tracking-widest font-medium transition-all inline-flex flex-col items-center gap-1.5 ${
              activeAdminTab === 'gallery' ? 'bg-[#D4AF37] text-[#1A1A1A] font-semibold' : 'bg-[#242424] text-[#B0B0B0] hover:text-[#F5F5F5]'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Visual Gallery</span>
          </button>

          <button 
            onClick={() => setActiveAdminTab('reviews')}
            className={`py-3.5 px-2 text-center rounded text-[10px] uppercase tracking-widest font-medium transition-all inline-flex flex-col items-center gap-1.5 ${
              activeAdminTab === 'reviews' ? 'bg-[#D4AF37] text-[#1A1A1A] font-semibold' : 'bg-[#242424] text-[#B0B0B0] hover:text-[#F5F5F5]'
            }`}
          >
            <UserSquare2 className="w-4 h-4" />
            <span>Reviews board</span>
          </button>

        </div>

        {/* -------------------- SUB TAB: HOMEPAGE CONTENT -------------------- */}
        {activeAdminTab === 'content' && (
          <form id="admin-homepage-form" onSubmit={handleHomeSubmit} className="bg-[#242424]/30 border border-[#242424] p-8 rounded-sm space-y-6">
            <h3 className="font-serif text-xl text-[#F5F5F5] border-b border-[#242424] pb-4">Configure Core Brand Imagery</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-2">
                <label className="text-[10px] uppercase tracking-wider font-semibold">Hero Title Header</label>
                <input 
                  type="text" 
                  value={homeHeroTitle} 
                  onChange={(e) => setHomeHeroTitle(e.target.value)}
                  className="bg-[#1A1A1A] border border-[#242424] py-3 px-4 text-xs text-white rounded focus:border-[#D4AF37]"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-[10px] uppercase tracking-wider font-semibold">Our Story Title Header</label>
                <input 
                  type="text" 
                  value={homeStoryHeading} 
                  onChange={(e) => setHomeStoryHeading(e.target.value)}
                  className="bg-[#1A1A1A] border border-[#242424] py-3 px-4 text-xs text-white rounded focus:border-[#D4AF37]"
                />
              </div>

              <div className="flex flex-col space-y-2 md:col-span-2">
                <label className="text-[10px] uppercase tracking-wider font-semibold">Hero Secondary Headline</label>
                <textarea 
                  rows={2}
                  value={homeHeroHeadline} 
                  onChange={(e) => setHomeHeroHeadline(e.target.value)}
                  className="bg-[#1A1A1A] border border-[#242424] p-4 text-xs text-white rounded focus:border-[#D4AF37] font-sans"
                />
              </div>

              <div className="flex flex-col space-y-2 md:col-span-2">
                <label className="text-[10px] uppercase tracking-wider font-semibold">Story Narrative (Paragraph 1)</label>
                <textarea 
                  rows={3}
                  value={homeStory1} 
                  onChange={(e) => setHomeStory1(e.target.value)}
                  className="bg-[#1A1A1A] border border-[#242424] p-4 text-xs text-white rounded focus:border-[#D4AF37] font-sans"
                />
              </div>

              <div className="flex flex-col space-y-2 md:col-span-2">
                <label className="text-[10px] uppercase tracking-wider font-semibold">Story Narrative (Paragraph 2)</label>
                <textarea 
                  rows={3}
                  value={homeStory2} 
                  onChange={(e) => setHomeStory2(e.target.value)}
                  className="bg-[#1A1A1A] border border-[#242424] p-4 text-xs text-white rounded focus:border-[#D4AF37] font-sans"
                />
              </div>

              <div className="flex flex-col space-y-2 md:col-span-2">
                <label className="text-[10px] uppercase tracking-wider font-semibold">Our Story Side Image URL</label>
                <input 
                  type="text" 
                  value={homeStoryImage} 
                  onChange={(e) => setHomeStoryImage(e.target.value)}
                  className="bg-[#1A1A1A] border border-[#242424] py-3 px-4 text-xs text-white rounded focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                className="px-8 py-3.5 bg-[#D4AF37] hover:bg-[#F5F5F5] text-[#1A1A1A] font-bold text-xs uppercase tracking-widest pointer"
              >
                Publish Front Content changes
              </button>
            </div>
          </form>
        )}

        {/* -------------------- SUB TAB: CULINARY ITEMS -------------------- */}
        {activeAdminTab === 'menu' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl text-[#F5F5F5]">Kitchen Provisions Catalog ({menuItems.length} items)</h3>
              <button
                onClick={() => { resetMenuForm(); setShowMenuForm(true); }}
                className="bg-[#D4AF37] text-[#1A1A1A] px-4 py-2 text-xs uppercase tracking-widest font-bold inline-flex items-center gap-1 hover:bg-[#F5F5F5] transition-all"
              >
                <Plus className="w-4 h-4" /> Add Culinary Item
              </button>
            </div>

            {/* Menu Item Form overlay */}
            {showMenuForm && (
              <form onSubmit={handleMenuSubmit} className="bg-[#242424] border border-[#D4AF37]/35 p-6 rounded space-y-4">
                <h4 className="font-serif text-lg text-[#F5F5F5]">{editMenuItemId ? 'Update Culinary Curation' : 'Post New Culinary Curation'}</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[9px] uppercase tracking-widest">Dish Name</label>
                    <input 
                      type="text" 
                      required
                      value={menuName} 
                      onChange={(e) => setMenuName(e.target.value)}
                      className="bg-[#1A1A1A] border border-[#242424] py-2.5 px-3 text-xs text-white rounded"
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[9px] uppercase tracking-widest">Price (MWK)</label>
                    <input 
                      type="number" 
                      required
                      value={menuPrice} 
                      onChange={(e) => setMenuPrice(Number(e.target.value))}
                      className="bg-[#1A1A1A] border border-[#242424] py-2.5 px-3 text-xs text-white rounded"
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[9px] uppercase tracking-widest">Category class</label>
                    <select
                      value={menuCat}
                      onChange={(e) => setMenuCat(e.target.value as any)}
                      className="bg-[#1A1A1A] border border-[#242424] py-2.5 px-3 text-xs text-white rounded cursor-pointer"
                    >
                      <option value="starters">Starters & Soups</option>
                      <option value="mains">Main Courses</option>
                      <option value="desserts">Dessert Room</option>
                      <option value="beverages">Liquids & Cellar</option>
                      <option value="specials">Lounge Specials</option>
                    </select>
                  </div>

                  <div className="flex flex-col space-y-1.5 md:col-span-2">
                    <label className="text-[9px] uppercase tracking-widest">Image URL Link</label>
                    <input 
                      type="text" 
                      required
                      placeholder="https://images.unsplash.com/photo-..."
                      value={menuImg} 
                      onChange={(e) => setMenuImg(e.target.value)}
                      className="bg-[#1A1A1A] border border-[#242424] py-2.5 px-3 text-xs text-white rounded"
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[9px] uppercase tracking-widest">Direct Tags (comma separated)</label>
                    <input 
                      type="text" 
                      placeholder="Signature, Gluten-free, Best-seller"
                      value={menuTags} 
                      onChange={(e) => setMenuTags(e.target.value)}
                      className="bg-[#1A1A1A] border border-[#242424] py-2.5 px-3 text-xs text-white rounded"
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5 md:col-span-3">
                    <label className="text-[9px] uppercase tracking-widest">Gourmet Recipe Narrative Description</label>
                    <input 
                      type="text" 
                      value={menuDesc}
                      onChange={(e) => setMenuDesc(e.target.value)}
                      className="bg-[#1A1A1A] border border-[#242424] py-2.5 px-3 text-xs text-white rounded"
                    />
                  </div>

                  <div className="flex items-center space-x-2 pt-2 md:col-span-3">
                    <input 
                      type="checkbox" 
                      id="menu-sig-chk"
                      checked={menuSig} 
                      onChange={(e) => setMenuSig(e.target.checked)}
                      className="w-4 h-4 rounded bg-neutral-900 accent-[#D4AF37]"
                    />
                    <label className="text-[10px] uppercase tracking-widest" htmlFor="menu-sig-chk">Promote as Homepage Signature Curation</label>
                  </div>
                </div>

                <div className="flex items-center space-x-3 pt-2">
                  <button type="submit" className="bg-[#D4AF37] text-[#1A1A1A] px-5 py-2.5 text-xs font-bold uppercase tracking-widest">
                    {editMenuItemId ? 'Update Item' : 'Publish Item'}
                  </button>
                  <button type="button" onClick={resetMenuForm} className="bg-neutral-800 text-white px-5 py-2.5 text-xs uppercase tracking-widest">
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Menu catalog list */}
            <div className="bg-[#242424]/30 border border-[#242424] rounded overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#242424] text-[9px] uppercase tracking-wider text-neutral-400 border-b border-[#242424]">
                  <tr>
                    <th className="p-4">Dish details</th>
                    <th className="p-4">Category</th>
                    <th className="p-4 text-left">Price (MWK)</th>
                    <th className="p-4">Tags</th>
                    <th className="p-4 text-center">Controls</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#242424]/40">
                  {menuItems.map((item) => (
                    <tr key={item.id} className="hover:bg-[#242424]/10">
                      <td className="p-4 flex items-center space-x-3 min-w-[250px]">
                        <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded" />
                        <div>
                          <p className="font-serif text-sm text-[#F5F5F5] font-semibold flex items-center gap-1">
                            {item.name}
                            {item.isSignature && (
                              <span className="bg-[#D4AF37]/15 text-[#D4AF37] text-[7px] uppercase tracking-widest font-mono px-1 rounded">SIG</span>
                            )}
                          </p>
                          <p className="text-[10px] text-neutral-500 line-clamp-1">{item.description}</p>
                        </div>
                      </td>
                      <td className="p-4 uppercase text-[10px] tracking-widest">{item.category}</td>
                      <td className="p-4 font-serif text-sm font-semibold text-[#D4AF37]">MWK {Number(item.price).toLocaleString()}</td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {item.tags?.map((t, idx) => (
                            <span key={idx} className="bg-neutral-900 text-neutral-400 text-[8px] px-1.5 uppercase rounded">{t}</span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center space-x-2">
                          <button 
                            onClick={() => handleEditMenuClick(item)}
                            className="p-1.5 rounded bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-white transition-all"
                            title="Edit Item Header"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => { if(confirm(`Confirm deletion of ${item.name}?`)) deleteMenuItem(item.id); }}
                            className="p-1.5 rounded bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                            title="Delete Item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* -------------------- SUB TAB: EVENTS REGISTRY -------------------- */}
        {activeAdminTab === 'events' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl text-[#F5F5F5]">Experiences and Happenings Program ({events.length} events)</h3>
              <button
                onClick={() => { resetEventForm(); setShowEventForm(true); }}
                className="bg-[#D4AF37] text-[#1A1A1A] px-4 py-2 text-xs uppercase tracking-widest font-bold inline-flex items-center gap-1 hover:bg-[#F5F5F5] transition-all"
              >
                <Plus className="w-4 h-4" /> Post Social Happening
              </button>
            </div>

            {/* Event Form overlay */}
            {showEventForm && (
              <form onSubmit={handleEventSubmit} className="bg-[#242424] border border-[#D4AF37]/35 p-6 rounded space-y-4">
                <h4 className="font-serif text-lg text-[#F5F5F5]">{editEventId ? 'Update Social Event details' : 'Post New Social Event'}</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[9px] uppercase tracking-widest">Event Title</label>
                    <input 
                      type="text" 
                      required
                      value={evName} 
                      onChange={(e) => setEvName(e.target.value)}
                      className="bg-[#1A1A1A] border border-[#242424] py-2.5 px-3 text-xs text-white rounded"
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[9px] uppercase tracking-widest">Scheduled Date</label>
                    <input 
                      type="date" 
                      required
                      value={evDate} 
                      onChange={(e) => setEvDate(e.target.value)}
                      className="bg-[#1A1A1A] border border-[#242424] py-2.5 px-3 text-xs text-white rounded font-sans"
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[9px] uppercase tracking-widest">Scheduled Time</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. 19:00"
                      value={evTime} 
                      onChange={(e) => setEvTime(e.target.value)}
                      className="bg-[#1A1A1A] border border-[#242424] py-2.5 px-3 text-xs text-white rounded"
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[9px] uppercase tracking-widest">Ticket Price (MWK)</label>
                    <input 
                      type="number" 
                      required
                      value={evPrice} 
                      onChange={(e) => setEvPrice(Number(e.target.value))}
                      className="bg-[#1A1A1A] border border-[#242424] py-2.5 px-3 text-xs text-white rounded"
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[9px] uppercase tracking-widest">Private Venue Room</label>
                    <input 
                      type="text" 
                      value={evVenue} 
                      onChange={(e) => setEvVenue(e.target.value)}
                      className="bg-[#1A1A1A] border border-[#242424] py-2.5 px-3 text-xs text-white rounded"
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[9px] uppercase tracking-widest">Available Entry Slots</label>
                    <input 
                      type="number" 
                      value={evSlots} 
                      onChange={(e) => setEvSlots(Number(e.target.value))}
                      className="bg-[#1A1A1A] border border-[#242424] py-2.5 px-3 text-xs text-white rounded"
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5 md:col-span-2">
                    <label className="text-[9px] uppercase tracking-widest">Image URL Link</label>
                    <input 
                      type="text" 
                      required
                      value={evImg} 
                      onChange={(e) => setEvImg(e.target.value)}
                      className="bg-[#1A1A1A] border border-[#242424] py-2.5 px-3 text-xs text-white rounded"
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[9px] uppercase tracking-widest">Registry Status</label>
                    <select
                      value={evStatus}
                      onChange={(e) => setEvStatus(e.target.value as any)}
                      className="bg-[#1A1A1A] border border-[#242424] py-2.5 px-3 text-xs text-white rounded cursor-pointer"
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="soldout">Sold Out / Fully Reserved</option>
                      <option value="past">Past / Archival</option>
                    </select>
                  </div>

                  <div className="flex flex-col space-y-1.5 md:col-span-3 font-sans">
                    <label className="text-[9px] uppercase tracking-widest">Chronicle/Description paragraph</label>
                    <textarea 
                      rows={3}
                      value={evDesc} 
                      onChange={(e) => setEvDesc(e.target.value)}
                      className="bg-[#1A1A1A] border border-[#242424] p-3 text-xs text-white rounded font-sans resize-none"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-3 pt-2">
                  <button type="submit" className="bg-[#D4AF37] text-[#1A1A1A] px-5 py-2.5 text-xs font-bold uppercase tracking-widest">
                    {editEventId ? 'Update Event' : 'Publish Event'}
                  </button>
                  <button type="button" onClick={resetEventForm} className="bg-neutral-800 text-white px-5 py-2.5 text-xs uppercase tracking-widest">
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Events registry table */}
            <div className="bg-[#242424]/30 border border-[#242424] rounded overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#242424] text-[9px] uppercase tracking-wider text-neutral-400 border-b border-[#242424]">
                  <tr>
                    <th className="p-4">Event title & Details</th>
                    <th className="p-4">Schedule</th>
                    <th className="p-4">Ticket cost</th>
                    <th className="p-4">Admission Status</th>
                    <th className="p-4 text-center">Controls</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#242424]/40">
                  {events.map((ev) => (
                    <tr key={ev.id} className="hover:bg-[#242424]/10">
                      <td className="p-4 flex items-center space-x-3 min-w-[280px]">
                        <img src={ev.image} alt={ev.name} className="w-12 h-10 object-cover rounded" />
                        <div>
                          <p className="font-serif text-sm text-[#F5F5F5] font-semibold">{ev.name}</p>
                          <p className="text-[10px] text-[#D4AF37]">{ev.venue}</p>
                        </div>
                      </td>
                      <td className="p-4 col-span-1">
                        <p>{ev.date}</p>
                        <p className="text-[10px] text-neutral-500 mt-0.5">{ev.time}</p>
                      </td>
                      <td className="p-4 font-serif text-sm font-semibold text-[#D4AF37]">MWK {Number(ev.price).toLocaleString()}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-[8px] uppercase tracking-widest font-semibold ${
                          ev.status === 'upcoming' 
                            ? 'bg-emerald-500/10 text-emerald-400' 
                            : ev.status === 'soldout' 
                              ? 'bg-red-500/10 text-red-500' 
                              : 'bg-neutral-800 text-neutral-500'
                        }`}>
                          {ev.status} • {ev.slotsLeft !== undefined ? `${ev.slotsLeft} seats` : 'No limits'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center space-x-2">
                          <button 
                            onClick={() => handleEditEventClick(ev)}
                            className="p-1.5 rounded bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-white transition-all"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => { if(confirm(`Confirm deletion of ${ev.name}?`)) deleteEvent(ev.id); }}
                            className="p-1.5 rounded bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* -------------------- SUB TAB: BOOKINGS & INQUIRIES -------------------- */}
        {activeAdminTab === 'bookings' && (
          <div className="space-y-12">
            
            {/* Table Reservations Queue */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl text-[#F5F5F5] border-b border-[#242424] pb-2">Active Table Reservations ({reservations.length} total)</h3>
              <div className="bg-[#242424]/30 border border-[#242424] rounded overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#242424] text-[9px] uppercase tracking-wider text-neutral-400 border-b border-[#242424]">
                    <tr>
                      <th className="p-4">Guest Host</th>
                      <th className="p-4">Date & Time</th>
                      <th className="p-4">Guests</th>
                      <th className="p-4">Unique Directives / Remarks</th>
                      <th className="p-4 text-center">Status Action</th>
                      <th className="p-4 text-center">Delete</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#242424]/40 text-[#F5F5F5]">
                    {reservations.map((res) => (
                      <tr key={res.id} className="hover:bg-[#242424]/10">
                        <td className="p-4">
                          <p className="font-semibold">{res.name}</p>
                          <p className="text-[10px] text-neutral-500 text-neutral-400 mt-0.5">{res.phone} &bull; {res.email}</p>
                        </td>
                        <td className="p-4">
                          <p className="font-medium">{res.date}</p>
                          <p className="text-[10px] text-neutral-500 mt-0.5 font-mono">{res.time}</p>
                        </td>
                        <td className="p-4 text-center font-serif text-sm font-semibold text-[#D4AF37]">{res.guests}</td>
                        <td className="p-4 max-w-xs">
                          {res.specialRequests ? (
                            <p className="text-[11px] text-neutral-400 italic">“{res.specialRequests}”</p>
                          ) : (
                            <span className="text-[10px] text-neutral-600 italic">No instructions declared</span>
                          )}
                        </td>
                        <td className="p-4 text-center min-w-[150px]">
                          <div className="flex flex-col space-y-1.5 items-center">
                            <span className={`px-2 py-0.5 text-[8px] uppercase tracking-widest font-bold rounded ${
                              res.status === 'confirmed' 
                                ? 'bg-emerald-500/10 text-emerald-400' 
                                : res.status === 'cancelled' 
                                  ? 'bg-red-500/15 text-red-500' 
                                  : 'bg-amber-500/10 text-amber-400 animate-pulse'
                            }`}>
                              {res.status}
                            </span>
                            
                            <div className="flex items-center space-x-1">
                              <button 
                                onClick={() => updateReservationStatus(res.id, 'confirmed')}
                                className="p-1 rounded bg-[#242424] hover:bg-emerald-500 hover:text-[#1A1A1A] border border-neutral-800 text-emerald-500 transition-all"
                                title="Approve Table"
                              >
                                <CheckCheck className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                onClick={() => updateReservationStatus(res.id, 'cancelled')}
                                className="p-1 rounded bg-[#242424] hover:bg-red-500 hover:text-[#1A1A1A] border border-neutral-800 text-red-500 transition-all"
                                title="Decline Table"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <button 
                            onClick={() => { if(confirm("Permanently archive this reservation data?")) deleteReservation(res.id); }}
                            className="p-1 text-red-400 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20 rounded"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}

                    {reservations.length === 0 && (
                      <tr>
                        <td className="p-8 text-center text-neutral-500 italic col-span-full" colSpan={6}>
                          No active table reserves currently.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Corporate Inquiries Queue */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl text-[#F5F5F5] border-b border-[#242424] pb-2">Corporate private Hire briefings ({inquiries.length} total)</h3>
              <div className="bg-[#242424]/30 border border-[#242424] rounded overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#242424] text-[9px] uppercase tracking-wider text-neutral-400 border-b border-[#242424]">
                    <tr>
                      <th className="p-4">Contact Host</th>
                      <th className="p-4">Company Designation</th>
                      <th className="p-4">Date & Category</th>
                      <th className="p-4">Guests</th>
                      <th className="p-4">Brief Demands Message</th>
                      <th className="p-4 text-center">Resolve status</th>
                      <th className="p-4 text-center">Delete</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#242424]/40 text-[#F5F5F5]">
                    {inquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-[#242424]/10">
                        <td className="p-4">
                          <p className="font-semibold">{inq.contactName}</p>
                          <p className="text-[10px] text-neutral-500 mt-0.5 font-mono">{inq.phone} &bull; {inq.email}</p>
                        </td>
                        <td className="p-4 font-semibold text-neutral-400">{inq.companyName || 'Private House'}</td>
                        <td className="p-4">
                          <p className="font-serif text-xs text-[#D4AF37] font-semibold">{inq.eventType}</p>
                          <p className="text-[10px] text-neutral-500 mt-0.5">{inq.date}</p>
                        </td>
                        <td className="p-4 font-serif text-sm text-center font-semibold text-[#D4AF37]">{inq.guests}</td>
                        <td className="p-4 max-w-xs text-[11px] text-neutral-400">
                          {inq.message ? (
                            <p className="italic font-light">“{inq.message}”</p>
                          ) : (
                            <span className="text-neutral-600 italic">No message drafted</span>
                          )}
                        </td>
                        <td className="p-4 text-center min-w-[130px]">
                          <select
                            value={inq.status}
                            onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                            className="bg-[#1A1A1A] border border-[#242424] text-[10px] uppercase font-semibold text-[#D4AF37] tracking-widest px-2 py-1.5 rounded cursor-pointer ring-0 outline-none"
                          >
                            <option value="pending">Pending</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="completed">Completed</option>
                          </select>
                        </td>
                        <td className="p-4 text-center">
                          <button 
                            onClick={() => { if(confirm("Delete corporate inquiry brief?")) deleteInquiry(inq.id); }}
                            className="p-1 text-red-500 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20 rounded"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}

                    {inquiries.length === 0 && (
                      <tr>
                        <td className="p-8 text-center text-neutral-500 col-span-full" colSpan={7}>
                          No corporate inquiries listed currently.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* -------------------- SUB TAB: VISUAL GALLERY -------------------- */}
        {activeAdminTab === 'gallery' && (
          <div className="space-y-8">
            {/* Gallery Addition Form Inline */}
            <form onSubmit={handleGallerySubmit} className="bg-[#242424]/30 border border-[#242424] p-8 rounded-sm space-y-4">
              <h3 className="font-serif text-xl text-[#F5F5F5] border-b border-[#242424] pb-2 inline-flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-[#D4AF37]" /> Synchronize Gallery Image Asset
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex flex-col space-y-1.5 md:col-span-2">
                  <label className="text-[9px] uppercase tracking-widest">Image Title</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. VIP Skylounge sunset atmosphere"
                    value={galleryTitle} 
                    onChange={(e) => setGalleryTitle(e.target.value)}
                    className="bg-[#1A1A1A] border border-[#242424] py-2.5 px-3 text-xs text-white rounded"
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <label className="text-[9px] uppercase tracking-widest">Category Filter</label>
                  <select
                    value={galleryCat}
                    onChange={(e) => setGalleryCat(e.target.value as any)}
                    className="bg-[#1A1A1A] border border-[#242424] py-2.5 px-3 text-xs text-white rounded cursor-pointer"
                  >
                    <option value="ambience">Lounge Ambience</option>
                    <option value="dishes">Signature Dishes</option>
                    <option value="events">Social & Jazz</option>
                    <option value="lounge">Cellar & Liquids</option>
                  </select>
                </div>

                <div className="flex flex-col space-y-1.5 md:col-span-3">
                  <label className="text-[9px] uppercase tracking-widest">Image URL link</label>
                  <input 
                    type="text" 
                    required
                    placeholder="https://images.unsplash.com/photo-..."
                    value={galleryUrl} 
                    onChange={(e) => setGalleryUrl(e.target.value)}
                    className="bg-[#1A1A1A] border border-[#242424] py-2.5 px-3 text-xs text-white rounded"
                  />
                </div>

                <div className="flex flex-col space-y-1.5 md:col-span-4 font-sans">
                  <label className="text-[9px] uppercase tracking-widest">Asset description (optional Overlay)</label>
                  <input 
                    type="text" 
                    placeholder="Briefly summarize what visual scene this photo conveys..."
                    value={galleryDesc} 
                    onChange={(e) => setGalleryDesc(e.target.value)}
                    className="bg-[#1A1A1A] border border-[#242424] py-2.5 px-3 text-xs text-white rounded"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button type="submit" className="bg-[#D4AF37] text-[#1A1A1A] px-5 py-2.5 text-xs font-bold uppercase tracking-widest">
                  Synchronize image asset
                </button>
              </div>
            </form>

            {/* Gallery deletion list cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {gallery.map((item) => (
                <div key={item.id} className="relative aspect-[3/2] bg-[#242424] rounded border border-[#242424] group overflow-hidden">
                  <img src={item.url} alt={item.title} className="w-full h-full object-cover rounded-sm group-hover:scale-102 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between">
                    <div>
                      <span className="text-[8px] uppercase tracking-widest text-[#D4AF37]">{item.category}</span>
                      <h4 className="font-serif text-sm text-[#F5F5F5] font-semibold mt-1 truncate">{item.title}</h4>
                    </div>

                    <button
                      type="button"
                      onClick={() => { if(confirm(`Archive this imagery?`)) deleteGalleryItem(item.id); }}
                      className="w-full py-2 bg-red-600 hover:bg-red-500 text-white text-[9px] uppercase font-bold tracking-widest rounded-sm transition-colors text-center inline-flex items-center justify-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> De-Authorize
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* -------------------- SUB TAB: TESTIMONIAL BOARD -------------------- */}
        {activeAdminTab === 'reviews' && (
          <div className="space-y-8">
            
            {/* Review add form */}
            <form onSubmit={handleTestimonialSubmit} className="bg-[#242424]/30 border border-[#242424] p-8 rounded-sm space-y-4">
              <h3 className="font-serif text-xl text-[#F5F5F5] border-b border-[#242424] pb-2 inline-flex items-center gap-2">
                <UserSquare2 className="w-5 h-5 text-[#D4AF37]" /> Append Audit Client Review
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans">
                <div className="flex flex-col space-y-1.5 col-span-1">
                  <label className="text-[9px] uppercase tracking-widest">Client Reviewer Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Mandla Dhlamini"
                    value={testName} 
                    onChange={(e) => setTestName(e.target.value)}
                    className="bg-[#1A1A1A] border border-[#242424] py-2.5 px-3 text-xs text-white rounded"
                  />
                </div>

                <div className="flex flex-col space-y-1.5 col-span-1">
                  <label className="text-[9px] uppercase tracking-widest">Client Role / Profession</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Forbes Lifestyle Editor"
                    value={testRole} 
                    onChange={(e) => setTestRole(e.target.value)}
                    className="bg-[#1A1A1A] border border-[#242424] py-2.5 px-3 text-xs text-white rounded"
                  />
                </div>

                <div className="flex flex-col space-y-1.5 col-span-1">
                  <label className="text-[9px] uppercase tracking-widest">Assigned Rating</label>
                  <select
                    value={testRating}
                    onChange={(e) => setTestRating(Number(e.target.value))}
                    className="bg-[#1A1A1A] border border-[#242424] py-2.5 px-3 text-xs text-white rounded cursor-pointer"
                  >
                    <option value="5">5 Stars Perfect Excellence</option>
                    <option value="4">4 Stars High Quality</option>
                    <option value="3">3 Stars Standard</option>
                  </select>
                </div>

                <div className="flex flex-col space-y-1.5 md:col-span-3">
                  <label className="text-[9px] uppercase tracking-widest">Full Review paragraph</label>
                  <textarea 
                    rows={3} 
                    value={testReview}
                    onChange={(e) => setTestReview(e.target.value)}
                    className="bg-[#1A1A1A] border border-[#242424] p-3 text-xs text-white rounded font-sans resize-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button type="submit" className="bg-[#D4AF37] text-[#1A1A1A] px-5 py-2.5 text-xs font-bold uppercase tracking-widest">
                  Record testimonial
                </button>
              </div>
            </form>

            {/* Testimonials management table */}
            <div className="bg-[#242424]/30 border border-[#242424] rounded overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#242424] text-[9px] uppercase tracking-wider text-neutral-400 border-b border-[#242424]">
                  <tr>
                    <th className="p-4">Reviewer details</th>
                    <th className="p-4">Role Designation</th>
                    <th className="p-4">Date Recorded</th>
                    <th className="p-4">Rating</th>
                    <th className="p-4">Snippet Review draft</th>
                    <th className="p-4 text-center">Controls</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#242424]/40 text-[#F5F5F5]">
                  {testimonials.map((test) => (
                    <tr key={test.id} className="hover:bg-[#242424]/10">
                      <td className="p-4 font-serif text-sm font-semibold">{test.name}</td>
                      <td className="p-4 font-semibold text-neutral-400">{test.role}</td>
                      <td className="p-4 text-neutral-500">{test.date}</td>
                      <td className="p-4 font-mono text-[#D4AF37]">{test.rating} ★</td>
                      <td className="p-4 max-w-xs text-[11px] text-neutral-400 font-light truncate">
                        “{test.review}”
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => { if(confirm(`Delete response by ${test.name}?`)) deleteTestimonial(test.id); }}
                          className="p-1.5 rounded bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all inline-block"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
