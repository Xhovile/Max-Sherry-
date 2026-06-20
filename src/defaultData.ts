import { MenuItem, Event, GalleryItem, Testimonial, HomepageContent } from './types';

export const INITIAL_HOMEPAGE: HomepageContent = {
  heroTitle: "Fine Dining. Great Conversations. Memorable Experiences.",
  heroHeadline: "An exquisite fusion of modern culinary mastery and an elite social lounge experience. Centered in Rosebank, Johannesberg.",
  storyHeading: "Crafting Prestige Realities Since 2018",
  storyText1: "Founded by visionary cultural pioneers Max and Sherry, Max & Sherry Dine & Lounge has re-defined the culinary topography of Johannesburg. Melding high-society opulence with authentic culinary craft, our venue serves as a sanctuary for those who understand that dining is an art form of connection.",
  storyText2: "Every ingredient is meticulously sourced from sustainable local estates, and every cocktail tells a sensory narrative of luxury, culture, and absolute confidence. We invite you into a digital and physical home where prestige is default.",
  storyImage: "https://images.unsplash.com/photo-1485686531765-ba63b07845a7?auto=format&fit=crop&w=1200&q=80"
};

export const INITIAL_MENU: MenuItem[] = [
  // Breakfasts
  {
    id: "m_1",
    name: "Cured Salmon Sovereign Benedict",
    description: "Citrus-cured local ocean trout, soft-poached farm eggs, saffron-infused gold-leaf hollandaise on a toasted artisanal milk brioche.",
    price: 245,
    category: "breakfast",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
    tags: ["Signature", "Gluten-Free Available"]
  },
  {
    id: "m_2",
    name: "Truffle Forest Whipped Ricotta",
    description: "Sautéed wild king oyster mushrooms, shaved winter black truffles, dynamic garlic confit cream, toasted whole-wheat rustic sourdough.",
    price: 195,
    category: "breakfast",
    image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=800&q=80",
    tags: ["Vegetarian"]
  },
  // Lunch
  {
    id: "m_3",
    name: "A5 Wagyu Gold-Dust Sliders",
    description: "Three succulent premium grade Wagyu blend patties, aged gruyère crown, bone marrow caramelized onion confit, black charcoal buns, hand-rubbed truffle shoestring frites.",
    price: 320,
    category: "lunch",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    isSignature: true,
    tags: ["Best Seller", "Chef Passion"]
  },
  {
    id: "m_4",
    name: "The Rosebank Garden Harvest Bowl",
    description: "Heirloom purple baby carrots, red royal quinoa, fire-torched avocado, rich organic tahini orange emulsion, sand-toasted pine nuts.",
    price: 180,
    category: "lunch",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    tags: ["Vegan", "Clean Living"]
  },
  // Dinner
  {
    id: "m_5",
    name: "Prime Tomahawk Sands Reserve",
    description: "800g grand reserve dry-aged ribeye steak, flamed tableside, basted in double wood-smoked garlic gold butter, accompanied by triple-cooked handcut duck-fat chips.",
    price: 980,
    category: "dinner",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    isSignature: true,
    tags: ["Tableside Show", "Prestige Cut"]
  },
  {
    id: "m_6",
    name: "Karoo Herb Crust Lamb Cutlets",
    description: "Rosemary & pistachio French-trimmed lamb cutlets, velvet-smooth orange sweet potato puree, organic baby leeks, reduction of deep ruby cabernet sauvignon.",
    price: 440,
    category: "dinner",
    image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=800&q=80",
    tags: ["Local Heritage"]
  },
  {
    id: "m_7",
    name: "Pan-Seared Saffron Cape Salmon",
    description: "Crisp-skinned local salmon fillet, buttered samphire, sparkling Prosecco-velouté, delicate ocean foam, and Royal Baltic white sturgeon caviar crown.",
    price: 395,
    category: "dinner",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
    isSignature: true,
    tags: ["Caviar Touch"]
  },
  // Drinks
  {
    id: "m_8",
    name: "The Smoked Golden Sherry Reserve",
    description: "Aged Spanish Amontillado sherry, limited craft bourbon, essence of hand-expressed orange bitters, real edible 24K gold flakes, dramatic hollow hickory smoke dome reveal.",
    price: 185,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80",
    isSignature: true,
    tags: ["Interactive Drama", "Max Signature"]
  },
  {
    id: "m_9",
    name: "Cold-Pressed Hibiscus Negroni",
    description: "Inhouse floral-botanical gin, bitter orange Campari cold-fused with Hibiscus sabdariffa petals, sweet vermouth, dramatic cascading dry ice.",
    price: 170,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&w=800&q=80",
    tags: ["Botanical Science"]
  },
  // Specials
  {
    id: "m_10",
    name: "Knysna Imperial Oyster Harmony",
    description: "Half-dozen live coastal oysters on shaved glacier ice, customized wild lavender mignonette, cold-pressed green apple pearls, and lemon elderflower foam.",
    price: 490,
    category: "specials",
    image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=800&q=80",
    isSignature: true,
    tags: ["Ocean Fresh"]
  },
  {
    id: "m_11",
    name: "Moët & Chocolate Lava Valrhona",
    description: "Seductive 72% dark artisan Valrhona chocolate cake, flowing hot liquid gold truffle core, served alongside vintage Moët & Chandon champagne sorbet.",
    price: 210,
    category: "specials",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    tags: ["Decadence"]
  }
];

export const INITIAL_EVENTS: Event[] = [
  {
    id: "e_1",
    name: "Jazz & Shiraz Twilight Soirée",
    description: "An evocative evening of world-class South African acoustic jazz and curated vertical tastings of Sandton's most celebrated vintage red shirazes under the city skyline.",
    date: "2026-07-16",
    time: "19:00",
    price: 750,
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1200&q=80",
    venue: "Skyline Terrence & Lounge",
    slotsLeft: 14,
    status: "upcoming"
  },
  {
    id: "e_2",
    name: "Chef's Vault: Wagyu & Whiskey Masterclass",
    description: "A secure, closed-door 7-course culinary sensory voyage hosted in person by Max and our Executive Chef. Painstaking pairings with extreme single-malt Scottish and Cape whiskies.",
    date: "2026-07-28",
    time: "18:30",
    price: 1950,
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&q=80",
    venue: "The Private Sommelier Vault",
    slotsLeft: 0,
    status: "soldout"
  },
  {
    id: "e_3",
    name: "High Fashion Champagne & Caviar Brunch",
    description: "A vibrant synthesis of high runway couture showcasing prominent local designers, paired with flowing glasses of Grand Brut French Champagne, oysters, and premium caviar canapés.",
    date: "2026-08-15",
    time: "11:30",
    price: 1200,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
    venue: "Main Grand Dining Room",
    slotsLeft: 30,
    status: "upcoming"
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: "t_1",
    name: "Mandla Dhlamini",
    role: "Forbes Lifestyle Africa Contributor",
    review: "An absolute masterclass of Jo'burg dining. The Tomahawk Steak is visually and gustatorially flawless. The hospitality is deeply elegant, and the proprietors truly treat you as royalty. Standard of excellence that has set a new regional benchmark.",
    rating: 5,
    date: "May 2026"
  },
  {
    id: "t_2",
    name: "Sarah K.",
    role: "International Luxury Traveler Columnist",
    review: "The private terrace reminiscent of Dubai's elite rooftop lounges. Incredible acoustic treatment where you can enjoy deep private conversations while soaking in soft, hypnotic jazz. The smoked sherry cocktail is dramatic art.",
    rating: 5,
    date: "June 2026"
  },
  {
    id: "t_3",
    name: "Tariq J.",
    role: "Corporate Executive & Fine Connoisseur",
    review: "We reserved their Private Sommelier Vault for high-level shareholder negotiation dinners. The environment commands extreme confidence and prestige, and the team accommodated our complex culinary demands without hesitation.",
    rating: 5,
    date: "April 2026"
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: "g_1",
    title: "The Main Dining Room",
    description: "Warm golden lighting casting premium silhouettes against handcrafted velvet charcoal booths.",
    url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
    category: "ambience"
  },
  {
    id: "g_2",
    title: "Wagyu Perfection Toast",
    description: "A premium grade beef caramelized perfectly, displaying the peak of culinary confidence.",
    url: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    category: "dishes"
  },
  {
    id: "g_3",
    title: "Signature Smoked Whiskey Sherry",
    description: "Mesmerizing hickory smoke cascading over hand-expressed citrus and crystal clear ice blocks.",
    url: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80",
    category: "lounge"
  },
  {
    id: "g_4",
    title: "Jazz Twilight Gathering",
    description: "Live performances of acoustic perfection blending effortlessly with world-class guest conversations.",
    url: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=800&q=80",
    category: "events"
  },
  {
    id: "g_5",
    title: "The VIP Skyline Cigar Bar",
    description: "An exclusive warm open-air terrace where high-prestige guests dine and unwind under Johannesburg starlight.",
    url: "https://images.unsplash.com/photo-1485686531765-ba63b07845a7?auto=format&fit=crop&w=800&q=80",
    category: "ambience"
  },
  {
    id: "g_6",
    title: "Hand-curated Oyster Mignonette",
    description: "Perfect fresh oysters garnished with state-of-the-art culinary gels and gold-infused edible pearls.",
    url: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=800&q=80",
    category: "dishes"
  }
];
