import { useState, useEffect } from "react";
import { MenuItem, Event, Reservation, GalleryItem, Testimonial, CorporateInquiry, HomepageContent } from "./types";
import { INITIAL_HOMEPAGE, INITIAL_MENU, INITIAL_EVENTS, INITIAL_TESTIMONIALS, INITIAL_GALLERY } from "./defaultData";

// Initial reservations to ensure the admin dashboard looks professional out-of-the-box
const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: "r_1",
    name: "Mzwandile Nkosi",
    phone: "+27 82 555 4321",
    email: "nkosi.m@heritage.co.za",
    date: "2026-07-16",
    time: "19:30",
    guests: 4,
    specialRequests: "Table with optimal view of the live jazz band. Celebrating our 10th anniversary.",
    status: "confirmed",
    createdAt: "2026-06-18T14:30:00Z"
  },
  {
    id: "r_2",
    name: "Elena Rostova",
    phone: "+27 71 333 9876",
    email: "e.rostova@gemfinance.com",
    date: "2026-07-28",
    time: "18:30",
    guests: 2,
    specialRequests: "Chef's Vault attendee. Saffron/seafood food allergy. Please notify kitchen.",
    status: "pending",
    createdAt: "2026-06-19T09:12:00Z"
  },
  {
    id: "r_3",
    name: "Sir Raymond Granger",
    phone: "+27 83 911 0044",
    email: "granger.corp@alliance.org",
    date: "2026-08-15",
    time: "11:30",
    guests: 8,
    specialRequests: "High Fashion Brunch. Request VIP velvet seating booth near the main stage.",
    status: "pending",
    createdAt: "2026-06-20T03:45:00Z"
  }
];

const INITIAL_INQUIRIES: CorporateInquiry[] = [
  {
    id: "i_1",
    companyName: "Anglo Resources Ltd",
    contactName: "Sibongile Cele",
    email: "sibongile@angloresources.co.za",
    phone: "+27 11 498 7000",
    eventType: "Corporate Dinner",
    date: "2026-09-12",
    guests: 45,
    message: "Seeking to secure the Private Sommelier Vault for our annual global executive board dinner. We require fine-wine pairings, projector access, and custom dietary accommodations.",
    status: "pending",
    createdAt: "2026-06-18T10:15:00Z"
  },
  {
    id: "i_2",
    companyName: "Vivid Couture Africa",
    contactName: "Katlego Mokwena",
    email: "katlego@vividcouture.co",
    phone: "+27 82 121 5432",
    eventType: "Product Launch",
    date: "2026-10-05",
    guests: 70,
    message: "High-end spring designer line unveiling. We interest in complete buyout of the Main Grand Dining Room. Require staging, custom white-glove cocktail trays, and luxury photo-wall setup.",
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
