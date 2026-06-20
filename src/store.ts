import { useState, useEffect } from "react";
import { MenuItem, Event, Reservation, GalleryItem, Testimonial, CorporateInquiry, HomepageContent } from "./types";
import { INITIAL_HOMEPAGE, INITIAL_MENU, INITIAL_EVENTS, INITIAL_TESTIMONIALS, INITIAL_GALLERY } from "./defaultData";

// Initial reservations to ensure the admin dashboard looks professional out-of-the-box
const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: "r_1",
    name: "Chimwemwe Phiri",
    phone: "+265 888 123 456",
    email: "phiri@malawicommunity.org",
    date: "2026-07-16",
    time: "19:30",
    guests: 2,
    specialRequests: "Celebrating our 10th milestone anniversary with a romantic candlelight dining setup. We pre-ordered the Zinziri Heritage Quail and Lake Chambo courses.",
    status: "confirmed",
    createdAt: "2026-06-18T14:30:00Z"
  },
  {
    id: "r_2",
    name: "Elena Rostova",
    phone: "+265 999 432 101",
    email: "e.rostova@gemfinance.com",
    date: "2026-07-28",
    time: "18:30",
    guests: 6,
    specialRequests: "Family gathering table reservation. We filled out our custom pre-order details online. No seafood or saffron ingredients please.",
    status: "pending",
    createdAt: "2026-06-19T09:12:00Z"
  },
  {
    id: "r_3",
    name: "Dr. Raymond Gondwe",
    phone: "+265 888 911 0044",
    email: "gondwe.corp@alliance-mw.org",
    date: "2026-08-15",
    time: "12:00",
    guests: 8,
    specialRequests: "Business dinner and luxury lounge reception. Please book our private seating layout and line up some Smoked Golden Sherry cockatils.",
    status: "pending",
    createdAt: "2026-06-20T03:45:00Z"
  }
];

const INITIAL_INQUIRIES: CorporateInquiry[] = [
  {
    id: "i_1",
    companyName: "Press Corporation Ltd",
    contactName: "Susan Chisale",
    email: "susan.chisale@presscorp.mw",
    phone: "+265 111 770 000",
    eventType: "Corporate Dinner",
    date: "2026-09-12",
    guests: 35,
    message: "Seeking to secure our annual regional executive dinner. We are extremely interested in the food pre-order service to allow customized preparations of international and local delicacies.",
    status: "pending",
    createdAt: "2026-06-18T10:15:00Z"
  },
  {
    id: "i_2",
    companyName: "Stella Creative Arts",
    contactName: "Tamara Mkandawire",
    email: "tamara@creativestellamw.com",
    phone: "+265 888 357 159",
    eventType: "Bespoke Anniversary Event",
    date: "2026-10-05",
    guests: 50,
    message: "A large high-profile social milestone birthday and relationship celebration. We would love candles, a romantic live jazz trio backdrop, and premium lounge cocktail hospitality.",
    status: "reviewed",
    createdAt: "2026-06-19T16:40:00Z"
  }
];

export function useMaxSherryStore() {
  const [homepage, setHomepage] = useState<HomepageContent>(INITIAL_HOMEPAGE);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU);
  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS);
  const [reservations, setReservations] = useState<Reservation[]>(INITIAL_RESERVATIONS);
  const [gallery, setGallery] = useState<GalleryItem[]>(INITIAL_GALLERY);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [inquiries, setInquiries] = useState<CorporateInquiry[]>(INITIAL_INQUIRIES);

  // Load from LocalStorage if exists
  useEffect(() => {
    try {
      const savedHomepage = localStorage.getItem("max_sherry_homepage");
      if (savedHomepage) setHomepage(JSON.parse(savedHomepage));

      const savedMenu = localStorage.getItem("max_sherry_menu");
      if (savedMenu) setMenuItems(JSON.parse(savedMenu));

      const savedEvents = localStorage.getItem("max_sherry_events");
      if (savedEvents) setEvents(JSON.parse(savedEvents));

      const savedReservations = localStorage.getItem("max_sherry_reservations");
      if (savedReservations) setReservations(JSON.parse(savedReservations));

      const savedGallery = localStorage.getItem("max_sherry_gallery");
      if (savedGallery) setGallery(JSON.parse(savedGallery));

      const savedTestimonials = localStorage.getItem("max_sherry_testimonials");
      if (savedTestimonials) setTestimonials(JSON.parse(savedTestimonials));

      const savedInquiries = localStorage.getItem("max_sherry_inquiries");
      if (savedInquiries) setInquiries(JSON.parse(savedInquiries));
    } catch (e) {
      console.error("Failed to parse stored localStorage data", e);
    }
  }, []);

  // Save changes helper
  const saveState = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // Home actions
  const updateHomepage = (newContent: HomepageContent) => {
    setHomepage(newContent);
    saveState("max_sherry_homepage", newContent);
  };

  // Menu actions
  const addMenuItem = (item: Omit<MenuItem, "id">) => {
    const newItem: MenuItem = { ...item, id: `m_${Date.now()}` };
    const updated = [newItem, ...menuItems];
    setMenuItems(updated);
    saveState("max_sherry_menu", updated);
  };

  const updateMenuItem = (updatedItem: MenuItem) => {
    const updated = menuItems.map(item => item.id === updatedItem.id ? updatedItem : item);
    setMenuItems(updated);
    saveState("max_sherry_menu", updated);
  };

  const deleteMenuItem = (id: string) => {
    const updated = menuItems.filter(item => item.id !== id);
    setMenuItems(updated);
    saveState("max_sherry_menu", updated);
  };

  // Events actions
  const addEvent = (ev: Omit<Event, "id">) => {
    const newEvent: Event = { ...ev, id: `e_${Date.now()}` };
    const updated = [newEvent, ...events];
    setEvents(updated);
    saveState("max_sherry_events", updated);
  };

  const updateEvent = (updatedEvent: Event) => {
    const updated = events.map(ev => ev.id === updatedEvent.id ? updatedEvent : ev);
    setEvents(updated);
    saveState("max_sherry_events", updated);
  };

  const deleteEvent = (id: string) => {
    const updated = events.filter(ev => ev.id !== id);
    setEvents(updated);
    saveState("max_sherry_events", updated);
  };

  // Reservation actions
  const createReservation = (res: Omit<Reservation, "id" | "status" | "createdAt">) => {
    const newRes: Reservation = {
      ...res,
      id: `r_${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    const updated = [newRes, ...reservations];
    setReservations(updated);
    saveState("max_sherry_reservations", updated);
    return newRes;
  };

  const updateReservationStatus = (id: string, status: 'pending' | 'confirmed' | 'cancelled') => {
    const updated = reservations.map(res => res.id === id ? { ...res, status } : res);
    setReservations(updated);
    saveState("max_sherry_reservations", updated);
  };

  const deleteReservation = (id: string) => {
    const updated = reservations.filter(res => res.id !== id);
    setReservations(updated);
    saveState("max_sherry_reservations", updated);
  };

  // Gallery actions
  const addGalleryItem = (item: Omit<GalleryItem, "id">) => {
    const newItem: GalleryItem = { ...item, id: `g_${Date.now()}` };
    const updated = [newItem, ...gallery];
    setGallery(updated);
    saveState("max_sherry_gallery", updated);
  };

  const deleteGalleryItem = (id: string) => {
    const updated = gallery.filter(item => item.id !== id);
    setGallery(updated);
    saveState("max_sherry_gallery", updated);
  };

  // Testimonials actions
  const addTestimonial = (item: Omit<Testimonial, "id" | "date">) => {
    const newTestimonial: Testimonial = {
      ...item,
      id: `t_${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    };
    const updated = [newTestimonial, ...testimonials];
    setTestimonials(updated);
    saveState("max_sherry_testimonials", updated);
  };

  const deleteTestimonial = (id: string) => {
    const updated = testimonials.filter(item => item.id !== id);
    setTestimonials(updated);
    saveState("max_sherry_testimonials", updated);
  };

  // Inquiry actions
  const createInquiry = (inq: Omit<CorporateInquiry, "id" | "status" | "createdAt">) => {
    const newInq: CorporateInquiry = {
      ...inq,
      id: `i_${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    const updated = [newInq, ...inquiries];
    setInquiries(updated);
    saveState("max_sherry_inquiries", updated);
    return newInq;
  };

  const updateInquiryStatus = (id: string, status: 'pending' | 'reviewed' | 'completed') => {
    const updated = inquiries.map(inq => inq.id === id ? { ...inq, status } : inq);
    setInquiries(updated);
    saveState("max_sherry_inquiries", updated);
  };

  const deleteInquiry = (id: string) => {
    const updated = inquiries.filter(inq => inq.id !== id);
    setInquiries(updated);
    saveState("max_sherry_inquiries", updated);
  };

  // Complete reset to presets helper in dashboard
  const resetToFactoryDefaults = () => {
    setHomepage(INITIAL_HOMEPAGE);
    setMenuItems(INITIAL_MENU);
    setEvents(INITIAL_EVENTS);
    setReservations(INITIAL_RESERVATIONS);
    setGallery(INITIAL_GALLERY);
    setTestimonials(INITIAL_TESTIMONIALS);
    setInquiries(INITIAL_INQUIRIES);

    localStorage.removeItem("max_sherry_homepage");
    localStorage.removeItem("max_sherry_menu");
    localStorage.removeItem("max_sherry_events");
    localStorage.removeItem("max_sherry_reservations");
    localStorage.removeItem("max_sherry_gallery");
    localStorage.removeItem("max_sherry_testimonials");
    localStorage.removeItem("max_sherry_inquiries");
  };

  return {
    homepage,
    menuItems,
    events,
    reservations,
    gallery,
    testimonials,
    inquiries,
    updateHomepage,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    addEvent,
    updateEvent,
    deleteEvent,
    createReservation,
    updateReservationStatus,
    deleteReservation,
    addGalleryItem,
    deleteGalleryItem,
    addTestimonial,
    deleteTestimonial,
    createInquiry,
    updateInquiryStatus,
    deleteInquiry,
    resetToFactoryDefaults
  };
}
