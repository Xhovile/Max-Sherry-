import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit2, Trash2, Check, X, ShieldAlert, Sparkles, 
  UtensilsCrossed, CalendarDays, BookOpen, Image as ImageIcon, 
  UserSquare2, LayoutTemplate, RotateCw, CheckCheck, RefreshCw,
  QrCode, Mail, Smartphone, MessageSquare, Send, Bell, Clock,
  ChevronDown, ChevronUp
} from 'lucide-react';
import { MenuItem, Event, Reservation, GalleryItem, Testimonial, CorporateInquiry, HomepageContent } from '../types';
import ConfirmationDialog from './ConfirmationDialog';
import AdminQRCodeGenerator from './AdminQRCodeGenerator';
import ExpanderText from './ExpanderText';

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
  updateReservationReminderStatus: (id: string, reminderStatus: 'none' | 'email_sent' | 'sms_sent' | 'both_sent') => void;
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
  addEvent, updateEvent, deleteEvent, updateReservationStatus, updateReservationReminderStatus, deleteReservation,
  addGalleryItem, deleteGalleryItem, addTestimonial, deleteTestimonial,
  updateInquiryStatus, deleteInquiry, resetAll
}: AdminDashboardProps) {
  
  const [activeAdminTab, setActiveAdminTab] = useState<'content' | 'menu' | 'events' | 'bookings' | 'gallery' | 'reviews' | 'qrcode'>('content');

  // Homepage edit mode state
  const [isEditingHome, setIsEditingHome] = useState(false);

  // Homepage content state
  const [homeHeroTitle, setHomeHeroTitle] = useState(homepage.heroTitle);
  const [homeHeroHeadline, setHomeHeroHeadline] = useState(homepage.heroHeadline);
  const [homeStoryHeading, setHomeStoryHeading] = useState(homepage.storyHeading);
  const [homeStory1, setHomeStory1] = useState(homepage.storyText1);
  const [homeStory2, setHomeStory2] = useState(homepage.storyText2);
  const [homeStoryImage, setHomeStoryImage] = useState(homepage.storyImage);

  // Synchronize inputs when the homepage content prop changes
  useEffect(() => {
    setHomeHeroTitle(homepage.heroTitle);
    setHomeHeroHeadline(homepage.heroHeadline);
    setHomeStoryHeading(homepage.storyHeading);
    setHomeStory1(homepage.storyText1);
    setHomeStory2(homepage.storyText2);
    setHomeStoryImage(homepage.storyImage);
  }, [homepage]);

  const cancelHomeEdit = () => {
    setHomeHeroTitle(homepage.heroTitle);
    setHomeHeroHeadline(homepage.heroHeadline);
    setHomeStoryHeading(homepage.storyHeading);
    setHomeStory1(homepage.storyText1);
    setHomeStory2(homepage.storyText2);
    setHomeStoryImage(homepage.storyImage);
    setIsEditingHome(false);
  };

  // Confirmation Modal State
  const [confirmState, setConfirmState] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmText: string;
    isDestructive: boolean;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: "",
    message: "",
    confirmText: "Confirm",
    isDestructive: false,
    onConfirm: () => {}
  });

  const triggerConfirm = (
    title: string,
    message: string,
    onConfirm: () => void,
    confirmText = "Delete",
    isDestructive = true
  ) => {
    setConfirmState({
      isOpen: true,
      title,
      message,
      confirmText,
      isDestructive,
      onConfirm: () => {
        onConfirm();
        setConfirmState(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  // MenuItem forms state
  const [showMenuForm, setShowMenuForm] = useState(false);
  const [editMenuItemId, setEditMenuItemId] = useState<string | null>(null);
  const [menuName, setMenuName] = useState("");
  const [menuDesc, setMenuDesc] = useState("");
  const [menuPrice, setMenuPrice] = useState(250);
  const [menuCat, setMenuCat] = useState<'starters' | 'steaks_beef' | 'pork' | 'chicken' | 'pasta' | 'seafood' | 'lake_malawi' | 'vegetarian' | 'kids' | 'desserts' | 'beverages'>('steaks_beef');
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

  // Mock notification system state
  const [selectedResForReminder, setSelectedResForReminder] = useState<Reservation | null>(null);
  const [customSmsText, setCustomSmsText] = useState("");
  const [customEmailSubject, setCustomEmailSubject] = useState("");
  const [customEmailBody, setCustomEmailBody] = useState("");
  const [isSendingSms, setIsSendingSms] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [smsSentSuccess, setSmsSentSuccess] = useState(false);
  const [emailSentSuccess, setEmailSentSuccess] = useState(false);

  // Notification alert toast
  const [notificationToast, setNotificationToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'info' | 'sms' | 'email';
  } | null>(null);

  // Auto-dismiss toast
  useEffect(() => {
    if (notificationToast?.show) {
      const timer = setTimeout(() => {
        setNotificationToast(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notificationToast]);

  const openReminderHub = (res: Reservation) => {
    setSelectedResForReminder(res);
    setSmsSentSuccess(res.reminderStatus === 'sms_sent' || res.reminderStatus === 'both_sent');
    setEmailSentSuccess(res.reminderStatus === 'email_sent' || res.reminderStatus === 'both_sent');
    
    // Set up default elegant message drafts
    setCustomSmsText(`Hi ${res.name}, this is a reminder of your upcoming fine dining experience at The Culinary Manifesto on ${res.date} at ${res.time}. We look forward to hosting your party of ${res.guests}! Reply to cancel or modify.`);
    
    setCustomEmailSubject(`Reservation Reminder: The Culinary Manifesto - ${res.date}`);
    setCustomEmailBody(`Dear ${res.name},

This is an elegant reminder from the stewards at The Culinary Manifesto.
Your curated table reservation is confirmed for ${res.date} at ${res.time} for ${res.guests} guests.

Location: Max & Sherry Dine & Lounge Estate, New Naperi, Blantyre

If you have any last-minute dietary requests or would like to preview today's catch, please access your online menu link at any time.

We look forward to rendering pristine culinary craftsmanship for you.

Warm regards,
The Stewards of the Manifesto`);
  };

  const handleApproveAndPrompt = (res: Reservation) => {
    updateReservationStatus(res.id, 'confirmed');
    
    // Show toast
    setNotificationToast({
      show: true,
      message: `Table reservation for ${res.name} confirmed! Dispatch hub activated.`,
      type: 'success'
    });
    
    // Auto open the dispatch hub for reminders
    openReminderHub({ ...res, status: 'confirmed' });
  };

  const triggerMockSmsSend = async () => {
    if (!selectedResForReminder) return;
    setIsSendingSms(true);
    
    // Simulate API network lag
    await new Promise((resolve) => setTimeout(resolve, 1200));
    
    // Calculate new reminderStatus
    let nextStatus: 'none' | 'email_sent' | 'sms_sent' | 'both_sent' = 'sms_sent';
    if (emailSentSuccess || selectedResForReminder.reminderStatus === 'email_sent' || selectedResForReminder.reminderStatus === 'both_sent') {
      nextStatus = 'both_sent';
    }
    
    updateReservationReminderStatus(selectedResForReminder.id, nextStatus);
    setSmsSentSuccess(true);
    setIsSendingSms(false);
    
    setNotificationToast({
      show: true,
      message: `Mock SMS Reminder successfully dispatched to ${selectedResForReminder.phone}!`,
      type: 'sms'
    });
  };

  const triggerMockEmailSend = async () => {
    if (!selectedResForReminder) return;
    setIsSendingEmail(true);
    
    // Simulate API network lag
    await new Promise((resolve) => setTimeout(resolve, 1400));
    
    // Calculate new reminderStatus
    let nextStatus: 'none' | 'email_sent' | 'sms_sent' | 'both_sent' = 'email_sent';
    if (smsSentSuccess || selectedResForReminder.reminderStatus === 'sms_sent' || selectedResForReminder.reminderStatus === 'both_sent') {
      nextStatus = 'both_sent';
    }
    
    updateReservationReminderStatus(selectedResForReminder.id, nextStatus);
    setEmailSentSuccess(true);
    setIsSendingEmail(false);
    
    setNotificationToast({
      show: true,
      message: `Mock Email Reminder successfully dispatched to ${selectedResForReminder.email}!`,
      type: 'email'
    });
  };

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
    setIsEditingHome(false);
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
                triggerConfirm(
                  "Factory Reset Database",
                  "Are you sure you want to perform a factory reset? This will override all your custom items, reservations, and edits with the premium preset sample data.",
                  () => {
                    resetAll();
                    alert("Presets restored.");
                    window.location.reload();
                  },
                  "Reset Data",
                  true
                );
              }}
              className="bg-transparent hover:bg-red-500/10 text-red-400 hover:text-red-300 border border-red-500/20 hover:border-red-500/40 text-[10px] uppercase tracking-widest font-semibold px-4.5 py-3 transition-all inline-flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5" />
              Reset To Presets
            </button>
          </div>
        </div>

        {/* Multi-Section Admin Tabs Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-12">
          
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

          <button 
            onClick={() => setActiveAdminTab('qrcode')}
            className={`py-3.5 px-2 text-center rounded text-[10px] uppercase tracking-widest font-medium transition-all inline-flex flex-col items-center gap-1.5 ${
              activeAdminTab === 'qrcode' ? 'bg-[#D4AF37] text-[#1A1A1A] font-semibold' : 'bg-[#242424] text-[#B0B0B0] hover:text-[#F5F5F5]'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>Tabletop QR codes</span>
          </button>

        </div>

        {/* -------------------- SUB TAB: HOMEPAGE CONTENT -------------------- */}
        {activeAdminTab === 'content' && (
          <form id="admin-homepage-form" onSubmit={handleHomeSubmit} className="bg-[#242424]/30 border border-[#242424] p-8 rounded-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#242424] pb-4 gap-4">
              <div>
                <h3 className="font-serif text-xl text-[#F5F5F5]">Configure Core Brand Imagery</h3>
                <p className="text-[10px] text-neutral-500 mt-0.5">Manage copy and headers displayed on the landing page</p>
              </div>
              {!isEditingHome ? (
                <button
                  type="button"
                  onClick={() => setIsEditingHome(true)}
                  className="bg-[#D4AF37] text-[#1A1A1A] px-4 py-2.5 text-xs uppercase tracking-widest font-bold inline-flex items-center gap-1.5 hover:bg-[#F5F5F5] transition-all cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Edit Homepage Content
                </button>
              ) : (
                <div className="flex items-center space-x-2 bg-[#D4AF37]/10 px-3 py-1.5 rounded border border-[#D4AF37]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                  <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-semibold">Editing Live Draft</span>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-2">
                <label className="text-[10px] uppercase tracking-wider font-semibold">Hero Title Header</label>
                <input 
                  type="text" 
                  disabled={!isEditingHome}
                  value={homeHeroTitle} 
                  onChange={(e) => setHomeHeroTitle(e.target.value)}
                  className={`bg-[#1A1A1A] border py-3 px-4 text-xs rounded transition-all ${
                    !isEditingHome 
                      ? 'border-transparent text-neutral-400 cursor-not-allowed select-none bg-[#1A1A1A]/50' 
                      : 'border-[#242424] text-white focus:border-[#D4AF37]'
                  }`}
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-[10px] uppercase tracking-wider font-semibold">Our Story Title Header</label>
                <input 
                  type="text" 
                  disabled={!isEditingHome}
                  value={homeStoryHeading} 
                  onChange={(e) => setHomeStoryHeading(e.target.value)}
                  className={`bg-[#1A1A1A] border py-3 px-4 text-xs rounded transition-all ${
                    !isEditingHome 
                      ? 'border-transparent text-neutral-400 cursor-not-allowed select-none bg-[#1A1A1A]/50' 
                      : 'border-[#242424] text-white focus:border-[#D4AF37]'
                  }`}
                />
              </div>

              <div className="flex flex-col space-y-2 md:col-span-2">
                <label className="text-[10px] uppercase tracking-wider font-semibold">Hero Secondary Headline</label>
                <textarea 
                  rows={2}
                  disabled={!isEditingHome}
                  value={homeHeroHeadline} 
                  onChange={(e) => setHomeHeroHeadline(e.target.value)}
                  className={`bg-[#1A1A1A] border p-4 text-xs rounded font-sans transition-all ${
                    !isEditingHome 
                      ? 'border-transparent text-neutral-400 cursor-not-allowed select-none bg-[#1A1A1A]/50 resize-none' 
                      : 'border-[#242424] text-white focus:border-[#D4AF37]'
                  }`}
                />
              </div>

              <div className="flex flex-col space-y-2 md:col-span-2">
                <label className="text-[10px] uppercase tracking-wider font-semibold">Story Narrative (Paragraph 1)</label>
                <textarea 
                  rows={3}
                  disabled={!isEditingHome}
                  value={homeStory1} 
                  onChange={(e) => setHomeStory1(e.target.value)}
                  className={`bg-[#1A1A1A] border p-4 text-xs rounded font-sans transition-all ${
                    !isEditingHome 
                      ? 'border-transparent text-neutral-400 cursor-not-allowed select-none bg-[#1A1A1A]/50 resize-none' 
                      : 'border-[#242424] text-white focus:border-[#D4AF37]'
                  }`}
                />
              </div>

              <div className="flex flex-col space-y-2 md:col-span-2">
                <label className="text-[10px] uppercase tracking-wider font-semibold">Story Narrative (Paragraph 2)</label>
                <textarea 
                  rows={3}
                  disabled={!isEditingHome}
                  value={homeStory2} 
                  onChange={(e) => setHomeStory2(e.target.value)}
                  className={`bg-[#1A1A1A] border p-4 text-xs rounded font-sans transition-all ${
                    !isEditingHome 
                      ? 'border-transparent text-neutral-400 cursor-not-allowed select-none bg-[#1A1A1A]/50 resize-none' 
                      : 'border-[#242424] text-white focus:border-[#D4AF37]'
                  }`}
                />
              </div>

              <div className="flex flex-col space-y-2 md:col-span-2">
                <label className="text-[10px] uppercase tracking-wider font-semibold">Our Story Side Image URL</label>
                <input 
                  type="text" 
                  disabled={!isEditingHome}
                  value={homeStoryImage} 
                  onChange={(e) => setHomeStoryImage(e.target.value)}
                  className={`bg-[#1A1A1A] border py-3 px-4 text-xs rounded transition-all ${
                    !isEditingHome 
                      ? 'border-transparent text-neutral-400 cursor-not-allowed select-none bg-[#1A1A1A]/50' 
                      : 'border-[#242424] text-white focus:border-[#D4AF37]'
                  }`}
                />
              </div>
            </div>

            <div className="pt-4 flex items-center gap-3">
              {isEditingHome ? (
                <>
                  <button 
                    type="submit" 
                    className="px-8 py-3.5 bg-[#D4AF37] hover:bg-[#F5F5F5] text-[#1A1A1A] font-bold text-xs uppercase tracking-widest cursor-pointer transition-colors"
                  >
                    Publish Front Content changes
                  </button>
                  <button 
                    type="button" 
                    onClick={cancelHomeEdit}
                    className="px-6 py-3.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold text-xs uppercase tracking-widest cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <p className="text-[10px] text-neutral-500 italic">
                  * Homepage content is currently in read-only mode. Click the &quot;Edit Homepage Content&quot; button above to modify.
                </p>
              )}
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
                      <option value="starters">Starters</option>
                      <option value="steaks_beef">Steaks & Beef</option>
                      <option value="pork">Pork</option>
                      <option value="chicken">Chicken</option>
                      <option value="pasta">Pasta</option>
                      <option value="seafood">Seafood</option>
                      <option value="lake_malawi">Lake Malawi Specialties</option>
                      <option value="vegetarian">Vegetarian</option>
                      <option value="kids">Kids' Menu</option>
                      <option value="desserts">Dessert</option>
                      <option value="beverages">Beverages</option>
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
                      <td className="p-4 font-serif text-sm font-semibold text-[#D4AF37]">
                        {item.isMarketPrice ? "Market Price" : `MWK ${Number(item.price).toLocaleString()}`}
                      </td>
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
                            onClick={() => {
                              triggerConfirm(
                                "Delete Culinary Item",
                                `Are you sure you want to permanently remove "${item.name}" from the kitchen catalog?`,
                                () => deleteMenuItem(item.id),
                                "Delete",
                                true
                              );
                            }}
                            className="p-1.5 rounded bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
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
                            onClick={() => {
                              triggerConfirm(
                                "Delete Social Event",
                                `Are you sure you want to permanently delete the event "${ev.name}"? This action cannot be undone.`,
                                () => deleteEvent(ev.id),
                                "Delete",
                                true
                              );
                            }}
                            className="p-1.5 rounded bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
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

              {/* Statistics Strip */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-[#1a1a1a]/80 border border-[#242424] p-4 rounded text-center">
                  <div className="text-[9px] uppercase tracking-wider text-neutral-500 font-semibold mb-1">Pending Reservations</div>
                  <div className="font-serif text-2xl font-bold text-amber-400">
                    {reservations.filter(r => r.status === 'pending').length}
                  </div>
                </div>
                <div className="bg-[#1a1a1a]/80 border border-[#242424] p-4 rounded text-center">
                  <div className="text-[9px] uppercase tracking-wider text-neutral-500 font-semibold mb-1">Confirmed Tables</div>
                  <div className="font-serif text-2xl font-bold text-emerald-400">
                    {reservations.filter(r => r.status === 'confirmed').length}
                  </div>
                </div>
                <div className="bg-[#1a1a1a]/80 border border-[#242424] p-4 rounded text-center">
                  <div className="text-[9px] uppercase tracking-wider text-neutral-500 font-semibold mb-1">Email Reminders Sent</div>
                  <div className="font-serif text-2xl font-bold text-[#D4AF37]">
                    {reservations.filter(r => r.reminderStatus === 'email_sent' || r.reminderStatus === 'both_sent').length}
                  </div>
                </div>
                <div className="bg-[#1a1a1a]/80 border border-[#242424] p-4 rounded text-center">
                  <div className="text-[9px] uppercase tracking-wider text-neutral-500 font-semibold mb-1">SMS Reminders Sent</div>
                  <div className="font-serif text-2xl font-bold text-[#D4AF37]">
                    {reservations.filter(r => r.reminderStatus === 'sms_sent' || r.reminderStatus === 'both_sent').length}
                  </div>
                </div>
              </div>

              <div className="bg-[#242424]/30 border border-[#242424] rounded overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#242424] text-[9px] uppercase tracking-wider text-neutral-400 border-b border-[#242424]">
                    <tr>
                      <th className="p-4">Guest Host</th>
                      <th className="p-4">Date & Time</th>
                      <th className="p-4">Guests</th>
                      <th className="p-4">Unique Directives / Remarks</th>
                      <th className="p-4 text-center">Status Action</th>
                      <th className="p-4 text-center">Reminders</th>
                      <th className="p-4 text-center">Delete</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#242424]/40 text-[#F5F5F5]">
                    {reservations.map((res) => (
                      <tr key={res.id} className="hover:bg-[#242424]/10">
                        <td className="p-4">
                          <p className="font-semibold">{res.name}</p>
                          <p className="text-[10px] text-neutral-500 mt-0.5">{res.phone} &bull; {res.email}</p>
                        </td>
                        <td className="p-4">
                          <p className="font-medium">{res.date}</p>
                          <p className="text-[10px] text-neutral-500 mt-0.5 font-mono">{res.time}</p>
                        </td>
                        <td className="p-4 text-center font-serif text-sm font-semibold text-[#D4AF37]">{res.guests}</td>
                        <td className="p-4 max-w-xs">
                          {res.specialRequests ? (
                            <ExpanderText text={res.specialRequests} limit={10} />
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
                                onClick={() => handleApproveAndPrompt(res)}
                                className="p-1 rounded bg-[#242424] hover:bg-emerald-500 hover:text-[#1A1A1A] border border-neutral-800 text-emerald-500 transition-all cursor-pointer"
                                title="Approve Table"
                              >
                                <CheckCheck className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                onClick={() => updateReservationStatus(res.id, 'cancelled')}
                                className="p-1 rounded bg-[#242424] hover:bg-red-500 hover:text-[#1A1A1A] border border-neutral-800 text-red-500 transition-all cursor-pointer"
                                title="Decline Table"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-center min-w-[170px]">
                          <div className="flex flex-col items-center space-y-1.5">
                            <div className="flex space-x-1 justify-center">
                              {/* Email Indicator */}
                              <span className={`px-1.5 py-0.5 text-[8px] uppercase tracking-wider font-semibold rounded flex items-center gap-1 ${
                                (res.reminderStatus === 'email_sent' || res.reminderStatus === 'both_sent')
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25'
                                  : 'bg-[#242424] text-neutral-500 border border-neutral-800/40'
                              }`}>
                                <Mail className="w-2.5 h-2.5" />
                                Email
                              </span>
                              
                              {/* SMS Indicator */}
                              <span className={`px-1.5 py-0.5 text-[8px] uppercase tracking-wider font-semibold rounded flex items-center gap-1 ${
                                (res.reminderStatus === 'sms_sent' || res.reminderStatus === 'both_sent')
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25'
                                  : 'bg-[#242424] text-neutral-500 border border-neutral-800/40'
                              }`}>
                                <Smartphone className="w-2.5 h-2.5" />
                                SMS
                              </span>
                            </div>
                            
                            <button
                              onClick={() => openReminderHub(res)}
                              className="px-2.5 py-1 bg-[#242424] border border-neutral-800 hover:border-[#D4AF37] text-[8.5px] uppercase tracking-widest text-[#D4AF37] font-bold rounded flex items-center gap-1 hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-all cursor-pointer"
                              title="Dispatch Guest Reminders"
                            >
                              <Bell className="w-2.5 h-2.5 animate-pulse" /> Dispatch
                            </button>
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <button 
                            onClick={() => {
                              triggerConfirm(
                                "Archive Reservation",
                                `Are you sure you want to permanently archive the reservation under the name "${res.name}"?`,
                                () => deleteReservation(res.id),
                                "Archive",
                                true
                              );
                            }}
                            className="p-1 text-red-400 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20 rounded cursor-pointer"
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
                        <td className="p-4 max-w-xs">
                          {inq.message ? (
                            <ExpanderText text={inq.message} limit={10} />
                          ) : (
                            <span className="text-[10px] text-neutral-600 italic">No message drafted</span>
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
                            onClick={() => {
                              triggerConfirm(
                                "Delete Inquiry Brief",
                                `Are you sure you want to permanently delete the inquiry brief from "${inq.companyName || inq.contactName}"?`,
                                () => deleteInquiry(inq.id),
                                "Delete",
                                true
                              );
                            }}
                            className="p-1 text-red-500 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20 rounded cursor-pointer"
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
                      onClick={() => {
                        triggerConfirm(
                          "De-Authorize Gallery Asset",
                          `Are you sure you want to permanently archive the visual asset titled "${item.title}"?`,
                          () => deleteGalleryItem(item.id),
                          "De-Authorize",
                          true
                        );
                      }}
                      className="w-full py-2 bg-red-600 hover:bg-red-500 text-white text-[9px] uppercase font-bold tracking-widest rounded-sm transition-colors text-center inline-flex items-center justify-center gap-1 cursor-pointer"
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
                      <td className="p-4 max-w-xs">
                        <ExpanderText text={test.review} limit={10} />
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => {
                            triggerConfirm(
                              "Delete Client Review",
                              `Are you sure you want to permanently remove the review posted by "${test.name}"?`,
                              () => deleteTestimonial(test.id),
                              "Delete",
                              true
                            );
                          }}
                          className="p-1.5 rounded bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all inline-block cursor-pointer"
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

        {/* -------------------- SUB TAB: TABLETOP QR CODES -------------------- */}
        {activeAdminTab === 'qrcode' && (
          <AdminQRCodeGenerator />
        )}

      </div>

      {/* --- MOCK NOTIFICATION Toast alert --- */}
      {notificationToast && (
        <div className="fixed bottom-6 right-6 z-50 shadow-2xl rounded border border-[#D4AF37]/30 bg-[#1A1A1A] p-4 text-xs font-semibold text-white max-w-sm flex items-center gap-3">
          <div className="p-2 rounded bg-[#D4AF37]/10 text-amber-400">
            {notificationToast.type === 'sms' && <Smartphone className="w-5 h-5 text-[#D4AF37] animate-pulse" />}
            {notificationToast.type === 'email' && <Mail className="w-5 h-5 text-[#D4AF37] animate-pulse" />}
            {notificationToast.type === 'success' && <CheckCheck className="w-5 h-5 text-emerald-400" />}
          </div>
          <div className="flex-1">
            <p className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold">Notification Dispatcher</p>
            <p className="mt-0.5 text-[#F5F5F5]">{notificationToast.message}</p>
          </div>
          <button 
            onClick={() => setNotificationToast(null)} 
            className="text-neutral-500 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* --- PRESTIGE DISPATCHER: CUSTOM GUEST REMINDERS MODAL --- */}
      {selectedResForReminder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-[#1C1C1C] border border-neutral-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col font-sans">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-[#141414]">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded bg-[#D4AF37]/10 flex items-center justify-center border border-[#D4AF37]/20">
                  <Bell className="w-5 h-5 text-[#D4AF37] animate-pulse" />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-bold">Stewards Control Hub</span>
                  <h3 className="font-serif text-lg text-white font-semibold">Guest Notification & Reminders Dispatch</h3>
                </div>
              </div>
              <button 
                onClick={() => setSelectedResForReminder(null)}
                className="text-neutral-500 hover:text-white p-2 hover:bg-neutral-800 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 flex-1">
              {/* Guest Profile Summary Card */}
              <div className="bg-[#242424]/40 border border-[#242424] p-4 rounded grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-neutral-500 block uppercase tracking-wider text-[8px] font-bold">Host Guest Name</span>
                  <span className="font-serif font-semibold text-white text-sm block mt-1">{selectedResForReminder.name}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block uppercase tracking-wider text-[8px] font-bold">Curated Dining Slot</span>
                  <span className="font-medium text-neutral-300 block mt-1 font-mono">{selectedResForReminder.date} @ {selectedResForReminder.time}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block uppercase tracking-wider text-[8px] font-bold">Party Density</span>
                  <span className="font-medium text-[#D4AF37] block mt-1 font-serif text-sm">{selectedResForReminder.guests} Guests Confirmed</span>
                </div>
                <div>
                  <span className="text-neutral-500 block uppercase tracking-wider text-[8px] font-bold">Interactive State</span>
                  <span className={`px-2 py-0.5 inline-block text-[8px] uppercase tracking-wider font-extrabold rounded mt-1.5 ${
                    selectedResForReminder.status === 'confirmed' 
                      ? 'bg-emerald-500/15 text-emerald-400' 
                      : 'bg-amber-500/15 text-amber-400 animate-pulse'
                  }`}>
                    Reservation {selectedResForReminder.status}
                  </span>
                </div>
              </div>

              {/* Simulation Hub Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* 1. SMS Dispatch Engine & Smartphone Simulator */}
                <div className="bg-[#141414] border border-neutral-800 rounded p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
                      <div className="flex items-center space-x-2">
                        <Smartphone className="w-4 h-4 text-[#D4AF37]" />
                        <h4 className="text-[10px] uppercase tracking-widest text-[#F5F5F5] font-bold">SMS Dispatch Terminal</h4>
                      </div>
                      <span className="text-[9px] text-neutral-500 font-mono">{selectedResForReminder.phone}</span>
                    </div>

                    {/* Smartphone Simulator Mockup */}
                    <div className="border border-neutral-800/80 bg-black rounded-xl p-3 mx-auto max-w-[280px] my-3 shadow-inner">
                      {/* Top status bar */}
                      <div className="flex justify-between items-center text-[8px] text-neutral-500 font-mono px-2 mb-3">
                        <span>Manifesto Link</span>
                        <div className="flex space-x-1 items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-ping"></span>
                          <span>LTE</span>
                        </div>
                      </div>
                      
                      {/* Message Thread */}
                      <div className="space-y-2 max-h-[140px] overflow-y-auto mb-2 text-[9px] px-1 font-sans">
                        <p className="text-[8px] text-neutral-600 text-center uppercase tracking-widest my-1 font-mono">Today</p>
                        
                        <div className="bg-neutral-800 text-neutral-300 p-2.5 rounded-lg rounded-tl-none max-w-[90%] break-words">
                          {customSmsText || "Draft SMS text..."}
                        </div>
                      </div>
                    </div>

                    {/* SMS Message Customizer Textarea */}
                    <div className="mt-4 flex flex-col space-y-1.5">
                      <label className="text-[9px] uppercase tracking-wider text-neutral-500 font-bold">Compose SMS Dispatch Draft</label>
                      <textarea
                        rows={4}
                        value={customSmsText}
                        onChange={(e) => {
                          setCustomSmsText(e.target.value);
                          setSmsSentSuccess(false); // Reset success to let them re-save/re-send
                        }}
                        className="bg-[#1E1E1E] border border-neutral-800 focus:border-[#D4AF37] p-2.5 rounded text-xs text-white focus:outline-none resize-none font-sans"
                        placeholder="Draft SMS message body here..."
                      />
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-neutral-800/60 flex items-center justify-between">
                    <span className="text-[9px] text-neutral-500 font-mono">Status: {smsSentSuccess ? "Dispatched ✓" : "Pending Send"}</span>
                    <button
                      onClick={triggerMockSmsSend}
                      disabled={isSendingSms}
                      className={`px-4 py-2 rounded text-[10px] uppercase tracking-wider font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        smsSentSuccess
                          ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                          : 'bg-[#D4AF37] text-[#1A1A1A] hover:bg-[#D4AF37]/80'
                      }`}
                    >
                      {isSendingSms ? (
                        <>
                          <RotateCw className="w-3.5 h-3.5 animate-spin" />
                          Sending...
                        </>
                      ) : smsSentSuccess ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          SMS Dispatched
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          Send Mock SMS
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* 2. Email Dispatch Engine & Mail Client Simulator */}
                <div className="bg-[#141414] border border-neutral-800 rounded p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-[#D4AF37]" />
                        <h4 className="text-[10px] uppercase tracking-widest text-[#F5F5F5] font-bold">Email Dispatch Terminal</h4>
                      </div>
                      <span className="text-[9px] text-neutral-500 font-mono">{selectedResForReminder.email}</span>
                    </div>

                    {/* Email Subject Field */}
                    <div className="flex flex-col space-y-1 mb-3">
                      <label className="text-[8px] uppercase tracking-wider text-neutral-500 font-bold">Subject Header</label>
                      <input 
                        type="text" 
                        value={customEmailSubject}
                        onChange={(e) => {
                          setCustomEmailSubject(e.target.value);
                          setEmailSentSuccess(false);
                        }}
                        className="bg-[#1E1E1E] border border-neutral-800 focus:border-[#D4AF37] px-3 py-2 rounded text-xs text-white focus:outline-none font-sans"
                        placeholder="Subject..."
                      />
                    </div>

                    {/* Email Message Body Textarea */}
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-[8px] uppercase tracking-wider text-neutral-500 font-bold">Compose Email Dispatch Body</label>
                      <textarea
                        rows={8}
                        value={customEmailBody}
                        onChange={(e) => {
                          setCustomEmailBody(e.target.value);
                          setEmailSentSuccess(false);
                        }}
                        className="bg-[#1E1E1E] border border-neutral-800 focus:border-[#D4AF37] p-3 rounded text-xs text-white focus:outline-none font-mono text-[10px] leading-relaxed whitespace-pre-wrap resize-none"
                        placeholder="Dear Guest..."
                      />
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-neutral-800/60 flex items-center justify-between">
                    <span className="text-[9px] text-neutral-500 font-mono">Status: {emailSentSuccess ? "Dispatched ✓" : "Pending Send"}</span>
                    <button
                      onClick={triggerMockEmailSend}
                      disabled={isSendingEmail}
                      className={`px-4 py-2 rounded text-[10px] uppercase tracking-wider font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        emailSentSuccess
                          ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                          : 'bg-[#D4AF37] text-[#1A1A1A] hover:bg-[#D4AF37]/80'
                      }`}
                    >
                      {isSendingEmail ? (
                        <>
                          <RotateCw className="w-3.5 h-3.5 animate-spin" />
                          Sending...
                        </>
                      ) : emailSentSuccess ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          Email Dispatched
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          Send Mock Email
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-5 border-t border-neutral-800 bg-[#141414] flex justify-end">
              <button
                onClick={() => setSelectedResForReminder(null)}
                className="px-5 py-2.5 bg-[#D4AF37] text-[#1A1A1A] text-xs font-bold uppercase tracking-widest rounded hover:bg-[#D4AF37]/90 transition-colors cursor-pointer"
              >
                Conclude Notifications
              </button>
            </div>

          </div>
        </div>
      )}

      <ConfirmationDialog
        isOpen={confirmState.isOpen}
        title={confirmState.title}
        message={confirmState.message}
        confirmText={confirmState.confirmText}
        isDestructive={confirmState.isDestructive}
        onConfirm={confirmState.onConfirm}
        onCancel={() => setConfirmState(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
