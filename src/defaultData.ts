import { MenuItem, Event, GalleryItem, Testimonial, HomepageContent } from './types';

export const INITIAL_HOMEPAGE: HomepageContent = {
  heroTitle: "Fine Dining. Great Conversations. Memorable Experiences.",
  heroHeadline: "Centered in New Naperi, Blantyre, Malawi.",
  storyHeading: "Crafting Milestones & Memories Since 2018",
  storyText1: "Max & Sherry Dine and Lounge has completely redefined the upscale dining and leisure terrain of Blantyre. Rooted in New Naperi, our venue serves as a premium sanctuary for fine dining and relaxed loungers. We fuse deep Malawian heritage ingredients with modern international presentation to curate a sensory celebration that stays in memory.",
  storyText2: "Whether you join us for date nights, anniversaries, corporate group briefings, or personalized pre-ordered preparations, we assure you of supreme hospitality, intimate configurations, and absolute privacy. At Max & Sherry, you are not merely ordering food; you are claiming a front seat in a legacy of human storytelling, community, and luxurious hospitality.",
  storyImage: "https://images.unsplash.com/photo-1485686531765-ba63b07845a7?auto=format&fit=crop&w=1200&q=80"
};

export const INITIAL_MENU: MenuItem[] = [
  // Starters
  {
    id: "m_1",
    name: "Cream of Mushroom Soup",
    description: "Rich and velvety forest mushroom purée, finished with fresh garden sprouts and fine white truffle essence.",
    price: 17000,
    category: "starters",
    image: "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&w=800&q=80",
    tags: ["Creamy", "Vegetarian"]
  },
  {
    id: "m_2",
    name: "Cream of Vegetable Soup",
    description: "Creamy simmered seasonal garden vegetables in a rich cream soup base, garnished with crunchy home-baked croutons.",
    price: 16000,
    category: "starters",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=800&q=80",
    tags: ["Warm Comfort"]
  },
  {
    id: "m_3",
    name: "Greek Salad Classic",
    description: "Plump cherry tomatoes, crisp cucumber, red onion, kalamata olives, and block danish feta dressed in wild oregano and olive oil.",
    price: 19000,
    category: "starters",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    tags: ["Fresh", "Vegetarian"]
  },
  {
    id: "m_4",
    name: "Tender Beef Salad",
    description: "Pan-sliced seared prime beef tagliata over leafy rocket, shaved pecorino parmesan, pine nuts, and vintage white balsamic reduction.",
    price: 28000,
    category: "starters",
    image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?auto=format&fit=crop&w=800&q=80",
    tags: ["Premium Protein"]
  },
  {
    id: "m_5",
    name: "Crispy Golden Onion Rings",
    description: "Large hand-cut sweet onion hoops dipped in beer batter, cooked crisp, and served with a zesty garlic dip.",
    price: 12000,
    category: "starters",
    image: "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?auto=format&fit=crop&w=800&q=80",
    tags: ["Crispy Side"]
  },
  {
    id: "m_6",
    name: "Lemon Fried Calamari",
    description: "Lightly dusted Falkland calamari tubes and tentacles, shallow fried to perfection, served with garlic-herb dipping butter.",
    price: 26000,
    category: "starters",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80",
    tags: ["Seafood Quick"]
  },
  {
    id: "m_7",
    name: "Plated Mozzarella Sticks",
    description: "Double panko-crumbed stretchy mozzarella batons fried golden brown, accompanied by spicy sweet plum plum dipping jam.",
    price: 18000,
    category: "starters",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
    tags: ["Cheesy", "Warm"]
  },
  {
    id: "m_8",
    name: "Coriander Chicken Livers",
    description: "Decadent poultry livers pan-sautéed in double butter, fresh coriander herb, garlic confit, and mild heritage piri-piri cream, served with warm flatbread.",
    price: 22000,
    category: "starters",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
    tags: ["Best Seller", "Sautéed Craft"]
  },
  {
    id: "m_9",
    name: "Flame Wings Peri-Peri",
    description: "Succulent free-range chicken wings basted in our authentic house-secret hot Peri-Peri marinade, flame-cooked over red charcoal.",
    price: 24000,
    category: "starters",
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80",
    tags: ["Spicy Touch"]
  },
  {
    id: "m_10",
    name: "Classic Prawn Cocktail",
    description: "Poached wild-caught queen prawns on shredded crisp iceberg lettuce, drenched in premium brandy-infused house Marie Rose sauce.",
    price: 30000,
    category: "starters",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
    tags: ["Sovereign Taste", "Heritage Classic"]
  },
  {
    id: "m_11",
    name: "Zinziri Heritage Quail",
    description: "Tender local quail slow-roasted with wild Malawian forest spices and glazed with raw organic mountain honey, lemon, and wild herbs.",
    price: 36000,
    category: "starters",
    image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=800&q=80",
    isSignature: true,
    tags: ["Max & Sherry Signature", "Malawian Quail"]
  },

  // Main Courses
  {
    id: "m_12",
    name: "Flame-Grilled Tomahawk Ribeye",
    description: "Premium thick-cut ribeye steak on a long bone, hand-aged for 35 days, grilled over charcoal, accompanied by garlic herb butter and hand-cut duck-fat chips.",
    price: 96000,
    category: "mains",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    isSignature: true,
    tags: ["Signature Steak", "Elite Cut"]
  },
  {
    id: "m_13",
    name: "Seared Lake Chambo Fillet",
    description: "Freshly harvested Lake Malawi Chambo fish fillet, pan-seared in traditional species, tomatoes and onion relish, accompanied by maize meal or golden frites.",
    price: 58000,
    category: "mains",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
    isSignature: true,
    tags: ["Local Heritage", "Fresh From Lake"]
  },
  {
    id: "m_14",
    name: "Rosemary Roasted Garlic Chicken",
    description: "Succulent free-range half-chicken marinated in green rosemary, crushed garlic, and lemon, slow roasted to golden crispiness.",
    price: 48000,
    category: "mains",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80",
    tags: ["Classic Roast"]
  },
  {
    id: "m_15",
    name: "Truffled Forest Gnocchi",
    description: "Plump hand-rolled potato pasta tossed with forest wild oyster mushrooms, baby spinach, parmesan white cream sauce, and shaved black truffles.",
    price: 44000,
    category: "mains",
    image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=800&q=80",
    tags: ["Vegetarian Elite", "Pasta"]
  },
  {
    id: "m_16",
    name: "King Prawn Seabass Platter",
    description: "Tender grilled queen prawns and pan-cooked local seabass fillet basted in lemon-garlic butter with wild rice.",
    price: 79000,
    category: "mains",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
    tags: ["Seafood Platter"]
  },
  {
    id: "m_17",
    name: "Spiced Sweet Potato Curry",
    description: "Creamy rich coconut stew with Malawian curry spices, chickpeas, roasted sweet potato, served with toasted flatbread.",
    price: 39000,
    category: "mains",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    tags: ["Vegetarian", "Spiced"]
  },
  {
    id: "m_18",
    name: "Crisp Chicken Strips (Kids' Meal)",
    description: "Junior portion of tender chicken breast strips in safe crispy crumbs with hand-cut French frites and sweet cream dipping.",
    price: 19000,
    category: "mains",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    tags: ["Junior Dining"]
  },

  // Desserts
  {
    id: "m_19",
    name: "Warm Chocolate Lava Cake",
    description: "Molten rich dark chocolate Valrhona cake cooked to perfection, flowing liquid center, served with cold-churned vanilla bean ice cream.",
    price: 22000,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    tags: ["Sweet Decadence"]
  },
  {
    id: "m_20",
    name: "Sherry Baked Custard",
    description: "Velvety baked vanilla egg custard topped with caramelized sherry sugar coating and fresh garden berries.",
    price: 18000,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?auto=format&fit=crop&w=800&q=80",
    tags: ["Custard Craft"]
  },

  // Beverages
  {
    id: "m_21",
    name: "The Smoked Golden Sherry Reserve",
    description: "Aged premium sherry, limited small-batch bourbon, expressed orange bitters, edible gold leaves, and hickory smoke dome reveal.",
    price: 32000,
    category: "beverages",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80",
    isSignature: true,
    tags: ["Alcoholic", "Tableside Art"]
  },
  {
    id: "m_22",
    name: "Hibiscus Mint Pressed Botanical",
    description: "Cold-pressed local hibiscus flower tea, double infused with fresh garden mint leaves and squeezed mountain lime.",
    price: 13000,
    category: "beverages",
    image: "https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&w=800&q=80",
    tags: ["Cold Tea", "Refreshing"]
  },
  {
    id: "m_23",
    name: "Warm Spiced Malawian Coffee",
    description: "Single-origin luxury Malawian Arabica espresso roasted slow, finished with ground cinnamon, cardamom, and thick whipped cream.",
    price: 12000,
    category: "beverages",
    image: "https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=800&q=80",
    tags: ["Hot Drink", "Local Beans"]
  },
  {
    id: "m_24",
    name: "Passionfruit Mint Cooler",
    description: "Freshly muddled passionfruit pulp, fresh sweet mint, home-pressed lime juice, layered with chilled sparkling spring water.",
    price: 15000,
    category: "beverages",
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=800&q=80",
    tags: ["Soft Drink", "Muddled"]
  },

  // Specials (Lounge & Customized pre-orders)
  {
    id: "m_25",
    name: "Custom pre-order Feast",
    description: "Customized bespoke preparation of prestigious delicacies of your choosing, prepared upon 24-hour advance booking by Sherry's culinary team.",
    price: 90000,
    category: "specials",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    isSignature: true,
    tags: ["Pre-Order only", "Custom Preparation"]
  },
  {
    id: "m_26",
    name: "Sherry's Cellar Wine Pairing Board",
    description: "Artisanal cheeses, cured local cold cuts, paired perfectly with international wines and premium lounge cocktail flights.",
    price: 64000,
    category: "specials",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
    tags: ["Lounge Experience", "Elite Pairing"]
  }
];

export const INITIAL_EVENTS: Event[] = [
  {
    id: "e_1",
    name: "Jazz & Shiraz Anniversary Soirée",
    description: "An evocative candlelight evening of live premium acoustic jazz and curated vertical wine pairings under the stars. Perfect for romantic couples and date nights.",
    date: "2026-07-16",
    time: "19:00",
    price: 70000,
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1200&q=80",
    venue: "New Naperi Rooftop Garden & Lounge",
    slotsLeft: 12,
    status: "upcoming"
  },
  {
    id: "e_2",
    name: "Milestone Birthday Celebration Lounge",
    description: "Spacious group-dining layouts and candle-lit layouts hosted by Max & Sherry. Special private group bookings accommodating birthdays, corporate networking, and assemblies of 4+ guests.",
    date: "2026-07-28",
    time: "18:00",
    price: 100000,
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80",
    venue: "The Sommelier lounge corner",
    slotsLeft: 0,
    status: "soldout"
  },
  {
    id: "e_3",
    name: "Bespoke Pre-Order Gourmet Launch",
    description: "A pristine physical demonstration of our food pre-order capability. Customize your luxury meals beforehand and dine with absolute upscale culinary precision.",
    date: "2026-08-15",
    time: "12:00",
    price: 84000,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
    venue: "Grand Culinary Theater Room",
    slotsLeft: 18,
    status: "upcoming"
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: "t_1",
    name: "Isaac M.",
    role: "Premium Dining & Lifestyle Connoisseur",
    review: "An absolute masterclass in fine dining hospitality! The Zinziri heritage quail was cooked to spectacular melt-in-mouth perfection, and pan-seared Chambo fillet proves they honor local heritage. The romantic date night setup in Blantyre is fully default-prestige.",
    rating: 5,
    date: "May 2026"
  },
  {
    id: "t_2",
    name: "Daphne K.",
    role: "Diplomatic Affairs Coordinator",
    review: "We reserved the Sommelier lounge room for an advance executive dinner. Their pre-order food service makes customized preparation flawless. We dined with total operational privacy and experienced premium hospitality.",
    rating: 5,
    date: "June 2026"
  },
  {
    id: "t_3",
    name: "Limbani T.",
    role: "Blantyre Corporate Executive",
    review: "The ideal environment in Malawi for business contract signings, birthdays, and elite group gatherings. Max and Sherry personally guarantee that relationships and milestones are recorded in beautiful style.",
    rating: 5,
    date: "June 2026"
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: "g_1",
    title: "The Main Dining Room",
    description: "Warm glowing lights casting premium silhouettes over velvet dining setups in New Naperi, Blantyre.",
    url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
    category: "ambience"
  },
  {
    id: "g_2",
    title: "Zinziri Quail Masterpiece",
    description: "Traditional local bird slow-roasted in honey and indigenous mountain aromatics.",
    url: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=800&q=80",
    category: "dishes"
  },
  {
    id: "g_3",
    title: "The Smoked Sherry Reserve",
    description: "Interactive hickory smoke expanding under a glass globe, featuring 24K gold leaves.",
    url: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80",
    category: "lounge"
  },
  {
    id: "g_4",
    title: "Romantic Dinner Serenade",
    description: "Candle-lit couples' night and anniversary layouts with acoustic live guitars.",
    url: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=800&q=80",
    category: "events"
  },
  {
    id: "g_5",
    title: "Lounge Social Bar Scene",
    description: "Premium list of international and local drinks presented in an upscale evening atmosphere.",
    url: "https://images.unsplash.com/photo-1485686531765-ba63b07845a7?auto=format&fit=crop&w=800&q=80",
    category: "ambience"
  },
  {
    id: "g_6",
    title: "Lake Chambo Delicacy",
    description: "Crisp-skinned seared Chambo fish steak served with heritage relishes.",
    url: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
    category: "dishes"
  }
];
