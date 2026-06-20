export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'starters' | 'mains' | 'desserts' | 'beverages' | 'specials';
  image: string;
  tags?: string[];
  isSignature?: boolean;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  price: number;
  image: string;
  venue: string;
  slotsLeft?: number;
  status: 'upcoming' | 'soldout' | 'past';
}

export interface Reservation {
  id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  url: string;
  category: 'ambience' | 'dishes' | 'events' | 'lounge';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  review: string;
  rating: number;
  date: string;
}

export interface CorporateInquiry {
  id: string;
  companyName?: string;
  contactName: string;
  email: string;
  phone: string;
  eventType: string;
  date: string;
  guests: number;
  message?: string;
  status: 'pending' | 'reviewed' | 'completed';
  createdAt: string;
}

export interface HomepageContent {
  heroTitle: string;
  heroHeadline: string;
  storyHeading: string;
  storyText1: string;
  storyText2: string;
  storyImage: string;
}
