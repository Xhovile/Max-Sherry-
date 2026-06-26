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
  // STARTERS
  {
    id: "m_1",
    name: "Cream of Mushroom Soup",
    description: "Velvety forest mushroom purée finished with white truffle essence, fresh microgreens, and home-baked garlic croutons.",
    price: 10500,
    category: "starters",
    image: "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&w=800&q=80",
    tags: ["Warm", "Vegetarian"]
  },
  {
    id: "m_2",
    name: "Cream of Vegetable Soup",
    description: "Rich and comforting cream soup of slow-simmered seasonal Malawian garden vegetables, finished with double cream.",
    price: 9900,
    category: "starters",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=800&q=80",
    tags: ["Warm", "Vegetarian"]
  },
  {
    id: "m_3",
    name: "Coriander Chicken Livers",
    description: "Tender chicken livers pan-sautéed in farm butter, fresh coriander herb, garlic confit, and Sherry's mild piri-piri cream.",
    price: 9800,
    category: "starters",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
    tags: ["Sautéed", "Spicy Note"]
  },
  {
    id: "m_4",
    name: "Greek Salad",
    description: "Plump cherry tomatoes, crisp cucumber, red onion, Kalamata olives, and block Danish feta dressed in wild oregano and olive oil.",
    price: 9500,
    category: "starters",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    tags: ["Fresh", "Vegetarian"]
  },
  {
    id: "m_5",
    name: "Beef Salad",
    description: "Thinly sliced seared prime beef over local wild rocket, shaved parmesan, pine nuts, and a vintage balsamic glaze.",
    price: 9500,
    category: "starters",
    image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?auto=format&fit=crop&w=800&q=80",
    tags: ["Seared", "Protein Fresh"]
  },
  {
    id: "m_6",
    name: "Onion Rings",
    description: "Large hand-cut sweet onion hoops dipped in golden beer batter, fried crispy, served with a zesty garlic aioli.",
    price: 9500,
    category: "starters",
    image: "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?auto=format&fit=crop&w=800&q=80",
    tags: ["Crispy", "Bite-Sized"]
  },
  {
    id: "m_7",
    name: "Chicken Wings (Peri-Peri)",
    description: "Succulent free-range wings basted in our authentic house-secret hot Peri-Peri marinade, flame-grilled over charcoal.",
    price: 11000,
    category: "starters",
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80",
    tags: ["Flame-Grilled", "Spicy"]
  },
  {
    id: "m_8",
    name: "Zinziri (Grilled Quail)",
    description: "Tender local quail slow-roasted with wild Malawian forest spices and glazed with raw organic mountain honey.",
    price: 12000,
    category: "starters",
    isSignature: true,
    image: "https://res.cloudinary.com/db3xx6mn4/image/upload/v1782411640/KNQR/products/ohmfunrgylieyhcwhu2j.jpg",
    tags: ["Max & Sherry Signature", "Malawian Quail"]
  },
  {
    id: "m_9",
    name: "Classic Prawn Cocktail",
    description: "Poached wild-caught queen prawns on shredded crisp iceberg lettuce, finished with a classic brandy-infused Marie Rose sauce.",
    price: 17500,
    category: "starters",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
    tags: ["Seafood", "Heritage Classic"]
  },
  {
    id: "m_10",
    name: "Fried Calamari",
    description: "Lightly dusted Falkland calamari tubes and tentacles, crisp-fried, served with garlic-herb dipping butter.",
    price: 17500,
    category: "starters",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80",
    tags: ["Seafood", "Crisp Classic"]
  },
  {
    id: "m_11",
    name: "Mozzarella Sticks",
    description: "Panko-crumbed stretchy mozzarella batons fried golden brown, accompanied by a spicy sweet plum dipping jam.",
    price: 15500,
    category: "starters",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
    tags: ["Cheesy", "Warm"]
  },
  {
    id: "m_12",
    name: "Bruschetta",
    description: "Toasted artisan sourdough topped with vine-ripened tomatoes, fresh basil, garlic, and extra virgin olive oil.",
    price: 10500,
    category: "starters",
    image: "https://images.unsplash.com/photo-1572656631137-7935297eff55?auto=format&fit=crop&w=800&q=80",
    tags: ["Vegetarian", "Toasted Art"]
  },

  // STEAKS & BEEF
  {
    id: "m_13",
    name: "T-Bone Steak",
    description: "Generous 450g prime cut presenting both fillet and sirloin, flame-grilled to order, basted in house basting.",
    price: 18500,
    category: "steaks_beef",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    tags: ["Elite Cut", "Flame-Grilled"]
  },
  {
    id: "m_14",
    name: "Portuguese Steak",
    description: "Juicy pan-seared rump steak topped with a fried egg, garlic, and a rich red wine-infused Portuguese sauce.",
    price: 17500,
    category: "steaks_beef",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
    tags: ["Pan-Seared", "Saucy Craft"]
  },
  {
    id: "m_15",
    name: "Minute Steak",
    description: "Thinly sliced tender sirloin steak, flash-grilled on a high flame with garlic butter and fresh herbs.",
    price: 17500,
    category: "steaks_beef",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80",
    tags: ["Flash-Grilled", "Garlic Butter"]
  },
  {
    id: "m_16",
    name: "Rib-Eye Steak",
    description: "Elegantly marbled, succulent 300g rib-eye steak, char-grilled to locking in rich, beefy flavors.",
    price: 18500,
    category: "steaks_beef",
    image: "https://images.unsplash.com/photo-1546964124-0cce460f38ef?auto=format&fit=crop&w=800&q=80",
    tags: ["Elite Cut", "Marbled Richness"]
  },
  {
    id: "m_17",
    name: "Rump Steak",
    description: "Classic, robustly flavored 350g rump steak, basted in heritage herbs and cooked to preferred temperature.",
    price: 18500,
    category: "steaks_beef",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    tags: ["Heritage Cut", "Robust Flavor"]
  },
  {
    id: "m_18",
    name: "Fillet Mignon",
    description: "The ultimate melt-in-the-mouth 250g tenderloin cut, elegantly wrapped in a delicate herb crown.",
    price: 19500,
    category: "steaks_beef",
    isSignature: true,
    image: "https://images.unsplash.com/photo-1529692236671-f1f6e946a88a?auto=format&fit=crop&w=800&q=80",
    tags: ["Tenderloin", "Elite Signature"]
  },
  {
    id: "m_19",
    name: "New York Strip Steak",
    description: "Premium, tender 300g strip loin steak featuring a delicious outer fat cap, grilled to caramelized perfection.",
    price: 19000,
    category: "steaks_beef",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
    tags: ["Strip Loin", "Crisp Fat Cap"]
  },
  {
    id: "m_20",
    name: "Mixed Grill",
    description: "An ultimate meat lover's platter: grilled steak, pork chop, boerewors sausage, grilled chicken, and a fried egg.",
    price: 39500,
    category: "steaks_beef",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
    tags: ["Ultimate Feast", "Multi-Meat"]
  },
  {
    id: "m_21",
    name: "Nyama Yozonga",
    description: "Local specialty of seasoned beef spiral roll, slow-braised to tenderness in an aromatic local tomato-onion gravy.",
    price: 17500,
    category: "steaks_beef",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    tags: ["Local Heritage", "Slow-Braised"]
  },
  {
    id: "m_22",
    name: "Boiled Beef Shin",
    description: "Comforting slow-boiled premium beef shin, fall-off-the-bone tender, cooked in an aromatic, clear vegetable broth.",
    price: 17500,
    category: "steaks_beef",
    image: "https://images.unsplash.com/photo-1607532941433-304659e8198a?auto=format&fit=crop&w=800&q=80",
    tags: ["Warm Comfort", "Bone-In Classic"]
  },
  {
    id: "m_23",
    name: "Ox Liver",
    description: "Pan-fried tender ox liver strips cooked with caramelized sweet onions and a rich brown pan gravy.",
    price: 17000,
    category: "steaks_beef",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
    tags: ["Pan-Fried", "Iron-Rich"]
  },
  {
    id: "m_24",
    name: "Beef / Chicken Stir Fry",
    description: "Wok-tossed julienne beef or chicken strips with crisp seasonal garden vegetables in a savory ginger-soy glaze.",
    price: 16500,
    category: "steaks_beef",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
    tags: ["Wok-Tossed", "Quick Fresh"]
  },

  // PORK
  {
    id: "m_25",
    name: "Pork Chop",
    description: "Thick-cut, flame-grilled pork chop basted in a sticky apple-sage glaze, cooked juicy and tender.",
    price: 17500,
    category: "pork",
    image: "https://images.unsplash.com/photo-1432139548538-809aa4f12807?auto=format&fit=crop&w=800&q=80",
    tags: ["Apple Glaze", "Flame-Grilled"]
  },
  {
    id: "m_26",
    name: "Sherry’s Pork Ribs",
    description: "Slow-roasted pork baby back ribs basted in Sherry's famous smoky-sweet house barbecue sauce.",
    price: 19500,
    category: "pork",
    isSignature: true,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    tags: ["Lounge Favorite", "House BBQ"]
  },
  {
    id: "m_27",
    name: "King’s Pork Ribs",
    description: "A majestic, extra-large rack of tender pork ribs, double-basted and caramelized over open charcoal.",
    price: 24500,
    category: "pork",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    tags: ["Elite Portion", "Double Basted"]
  },
  {
    id: "m_28",
    name: "Pork Khwasu-Khwasu",
    description: "Irresistible, crispy local-style dry fried pork chunks, seasoned with salt, pepper, garlic, and green chilies.",
    price: 19500,
    category: "pork",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    tags: ["Local Style", "Crisp Fried"]
  },

  // CHICKEN
  {
    id: "m_29",
    name: "Flame-Grilled Chicken",
    description: "Half free-range chicken basted with your choice of Lemon & Herb or hot Peri-Peri, flame-cooked to perfection.",
    price: 17500,
    category: "chicken",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80",
    tags: ["Flame-Grilled", "Choice of Baste"]
  },
  {
    id: "m_30",
    name: "Chicken Khwasu-Khwasu",
    description: "Local-style savory deep-fried chicken pieces, seasoned in local spices, crisp on the outside and moist inside.",
    price: 18500,
    category: "chicken",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80",
    tags: ["Local Style", "Crisp Savory"]
  },
  {
    id: "m_31",
    name: "Akosanu’s Local Chicken",
    description: "Savory stew of traditional free-range local chicken, slow-simmered in a rich tomato and onion gravy.",
    price: 17500,
    category: "chicken",
    isSignature: true,
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80",
    tags: ["Village Heritage", "Slow-Simmered"]
  },
  {
    id: "m_32",
    name: "Mexican Full Chicken",
    description: "Whole premium spring chicken, marinated in Mexican-style lime, chili, and cumin spices, char-grilled to order.",
    price: 0,
    isMarketPrice: true,
    category: "chicken",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80",
    tags: ["Market Price", "Whole Bird"]
  },
  {
    id: "m_33",
    name: "Chicken Kebabs",
    description: "Skewers of tender marinated chicken breast cubes, bell peppers, and onions, grilled with sweet chili baste.",
    price: 13500,
    category: "chicken",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
    tags: ["Skewered", "Sweet Chili"]
  },

  // PASTA
  {
    id: "m_34",
    name: "Chicken Alfredo Penne",
    description: "Creamy, rich penne pasta tossed with grilled chicken strips, wild mushrooms, and fresh parmesan cheese.",
    price: 21999,
    category: "pasta",
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=800&q=80",
    tags: ["Creamy Penne", "Parmesan Rich"]
  },
  {
    id: "m_35",
    name: "Spaghetti Bolognese",
    description: "Classic Italian spaghetti tossed in a rich, slow-simmered beef ragù, finished with grated parmesan.",
    price: 21500,
    category: "pasta",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80",
    tags: ["Classic Italian", "Beef Ragù"]
  },
  {
    id: "m_36",
    name: "Three-Cheese Chicken Penne",
    description: "Decadent baked penne with chicken, layered in a rich sauce of Mozzarella, Cheddar, and Parmesan cheeses.",
    price: 21500,
    category: "pasta",
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=800&q=80",
    tags: ["Baked Cheese", "Trio Formaggio"]
  },
  {
    id: "m_37",
    name: "Lasagna",
    description: "Layers of fresh pasta, rich beef bolognese, velvety bechamel sauce, and melted golden mozzarella cheese.",
    price: 18000,
    category: "pasta",
    image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=800&q=80",
    tags: ["Fresh Baked", "Layered Feast"]
  },
  {
    id: "m_38",
    name: "Tagliatelle Tesco",
    description: "Flat ribbon pasta tossed with tender chicken strips, green peas, and fresh basil in a creamy pesto sauce.",
    price: 19500,
    category: "pasta",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80",
    tags: ["Green Pesto", "Ribbon Pasta"]
  },
  {
    id: "m_39",
    name: "Yumo’s Pasta Salad",
    description: "Chilled fusilli pasta tossed with cherry tomatoes, bell peppers, olives, feta, and a light herb vinaigrette.",
    price: 18000,
    category: "pasta",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    tags: ["Chilled Fresher", "Herb Vinaigrette"]
  },

  // SEAFOOD
  {
    id: "m_40",
    name: "Prawns",
    description: "Plump queen prawns grilled in lemon-butter sauce or spicy peri-piri, served over a bed of savory rice.",
    price: 19500,
    category: "seafood",
    image: "https://images.unsplash.com/photo-1559737605-de6a7c50379b?auto=format&fit=crop&w=800&q=80",
    tags: ["Queen Prawns", "Grilled Rice"]
  },
  {
    id: "m_41",
    name: "Hake Fillets",
    description: "Tender ocean hake fillets, available either lightly battered and fried golden or pan-seared in lemon-garlic butter.",
    price: 19500,
    category: "seafood",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
    tags: ["Ocean Hake", "Crisp or Pan-Seared"]
  },
  {
    id: "m_42",
    name: "Tilapia Fillets",
    description: "Pan-fried premium Tilapia fillets basted in mild herbs, served with a fresh lemon wedge.",
    price: 17500,
    category: "seafood",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
    tags: ["Tender Tilapia", "Pan-Fried"]
  },
  {
    id: "m_43",
    name: "Lobster",
    description: "Prestigious whole rock lobster tail, grilled with garlic butter and finished under a flame, served tableside.",
    price: 0,
    isMarketPrice: true,
    category: "seafood",
    image: "https://images.unsplash.com/photo-1553618551-fba689030290?auto=format&fit=crop&w=800&q=80",
    tags: ["Market Price", "Elite Sovereign"]
  },
  {
    id: "m_44",
    name: "Norwegian Salmon",
    description: "Fresh Norwegian salmon fillet, pan-seared medium-rare, served with a delicate lemon-dill cream sauce.",
    price: 0,
    isMarketPrice: true,
    category: "seafood",
    isSignature: true,
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
    tags: ["Market Price", "Norwegian Import"]
  },
  {
    id: "m_45",
    name: "Seafood Platter",
    description: "An elite selection of prawns, hake, calamari, mussels, and fish fillets, grilled to perfection with lemon butter.",
    price: 0,
    isMarketPrice: true,
    category: "seafood",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
    tags: ["Market Price", "Ocean Feast"]
  },

  // LAKE MALAWI SPECIALTIES
  {
    id: "m_46",
    name: "Batala (Medium)",
    description: "Freshly caught Lake Malawi Batala fish, medium portion, grilled or fried with traditional spices.",
    price: 19500,
    category: "lake_malawi",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
    tags: ["Lake Harvest", "Batala Fish"]
  },
  {
    id: "m_47",
    name: "Batala (Large)",
    description: "A substantial, prime-sized Lake Malawi Batala fish, pan-seared with onion-tomato relish.",
    price: 24500,
    category: "lake_malawi",
    isSignature: true,
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
    tags: ["Lake Harvest", "Elite Feast"]
  },
  {
    id: "m_48",
    name: "Chambo (Medium)",
    description: "The iconic Malawian Chambo fish, medium-sized, prepared either crispy fried or flame-cooked with local spices.",
    price: 18500,
    category: "lake_malawi",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
    tags: ["Traditional Heritage", "Medium Chambo"]
  },
  {
    id: "m_49",
    name: "Chambo (Large)",
    description: "A large, whole Lake Malawi Chambo fish basted in species relish, cooked traditional style.",
    price: 23000,
    category: "lake_malawi",
    isSignature: true,
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
    tags: ["Traditional Heritage", "Large Chambo"]
  },
  {
    id: "m_50",
    name: "Chambo Fillets",
    description: "Boneless, tender fillets of Lake Malawi Chambo, pan-seared with sweet onions, tomatoes, and herbs.",
    price: 17500,
    category: "lake_malawi",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
    tags: ["Boneless", "Lake Delicacy"]
  },
  {
    id: "m_51",
    name: "Khota (Medium)",
    description: "Lake Malawi Khota fish, medium cut, seasoned with local salt and spice rub, fried golden.",
    price: 19500,
    category: "lake_malawi",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
    tags: ["Gold Crispy", "Khota Fish"]
  },
  {
    id: "m_52",
    name: "Khota (Large)",
    description: "A generous, large portion of Lake Malawi Khota fish, basted in heritage herbs and cooked juicy.",
    price: 25000,
    category: "lake_malawi",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
    tags: ["Generous Portion", "Khota Feast"]
  },
  {
    id: "m_53",
    name: "Nkhungu",
    description: "Local high-protein Lake Malawi lake-fly delicacy cakes, pan-seared with onions and local spices.",
    price: 10000,
    category: "lake_malawi",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
    tags: ["Traditional Delicacy", "Extremely Rare"]
  },
  {
    id: "m_54",
    name: "Kampango Fish",
    description: "Highly sought-after Lake Malawi Kampango catfish steak, flame-grilled and basted in traditional butter relish.",
    price: 0,
    isMarketPrice: true,
    category: "lake_malawi",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
    tags: ["Market Price", "Kampango Catfish"]
  },
  {
    id: "m_55",
    name: "Titia’s Catfish",
    description: "Freshly caught local catfish, slow-cooked in a savory curry gravy with wild tomatoes and herbs.",
    price: 0,
    isMarketPrice: true,
    category: "lake_malawi",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
    tags: ["Market Price", "Savory Stew"]
  },
  {
    id: "m_56",
    name: "Mbalagha from Ngosi Village",
    description: "Traditional specialty fish harvested from Ngosi Village, seasoned with heritage spices and slow-charred.",
    price: 0,
    isMarketPrice: true,
    category: "lake_malawi",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
    tags: ["Market Price", "Traditional Village Recipe"]
  },

  // VEGETARIAN
  {
    id: "m_57",
    name: "Vegetable Pasta",
    description: "Penne pasta tossed with a colourful medley of roasted seasonal garden vegetables, garlic, and fresh basil pomodoro.",
    price: 17000,
    category: "vegetarian",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80",
    tags: ["Garden Fresh", "Vegetarian"]
  },
  {
    id: "m_58",
    name: "Parmesan Spinach Mushroom Pasta",
    description: "Creamy fettuccine tossed with fresh baby spinach, sautéed wild mushrooms, and generous parmesan cheese.",
    price: 17500,
    category: "vegetarian",
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=800&q=80",
    tags: ["Parmesan Loaded", "Rich Sautéed"]
  },
  {
    id: "m_59",
    name: "Fajita Vegetables",
    description: "Sizzling platter of seasoned bell peppers, onions, and zucchini, served with warm tortillas and guacamole.",
    price: 15500,
    category: "vegetarian",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    tags: ["Sizzling", "Spiced Fajita"]
  },

  // KIDS’ MENU
  {
    id: "m_60",
    name: "Hot Dog",
    description: "Classic junior grilled sausage served in a warm bun with fries and ketchup.",
    price: 8000,
    category: "kids",
    image: "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=800&q=80",
    tags: ["Junior Comfort", "Fries Included"]
  },
  {
    id: "m_61",
    name: "Hamburger",
    description: "Perfectly sized, flame-grilled beef patty in a soft toasted bun, served with crispy French frites.",
    price: 10500,
    category: "kids",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    tags: ["Beef Patty", "Fries Included"]
  },
  {
    id: "m_62",
    name: "Chicken Nuggets",
    description: "Tender breast chicken bites in a safe, crispy crumb coating, served with honey-mustard dipping sauce.",
    price: 9999,
    category: "kids",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80",
    tags: ["Crisp Chicken", "Dip Honey-Mustard"]
  },
  {
    id: "m_63",
    name: "Chicken Mayo Sandwich",
    description: "Soft bread filled with shredded chicken breast tossed in creamy, mild mayonnaise, served with frites.",
    price: 9500,
    category: "kids",
    image: "https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?auto=format&fit=crop&w=800&q=80",
    tags: ["Shredded Chicken", "Fries Included"]
  },
  {
    id: "m_64",
    name: "Bacon & Cheese Sandwich",
    description: "Toasted sandwich loaded with crispy bacon and melted Cheddar cheese, served with frites.",
    price: 9500,
    category: "kids",
    image: "https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?auto=format&fit=crop&w=800&q=80",
    tags: ["Bacon Cheddar", "Fries Included"]
  },
  {
    id: "m_65",
    name: "Gizzards",
    description: "Bite-sized local chicken gizzards, seasoned in safe spices and dry fried golden brown.",
    price: 9500,
    category: "kids",
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80",
    tags: ["Bite-Sized", "Dry Fried"]
  },
  {
    id: "m_66",
    name: "Meatballs",
    description: "Tender mini beef meatballs simmered in a mild, sweet tomato sauce, served with fries.",
    price: 9500,
    category: "kids",
    image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=800&q=80",
    tags: ["Savory Beef", "Mild Tomato"]
  },

  // DESSERTS
  {
    id: "m_67",
    name: "Sherry’s Ice Cream",
    description: "Three scoops of premium, cold-churned vanilla bean, rich chocolate, or strawberry ice cream.",
    price: 6000,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?auto=format&fit=crop&w=800&q=80",
    tags: ["Cold Trio", "Double Cream"]
  },
  {
    id: "m_68",
    name: "Classic Vanilla Gateau",
    description: "A moist, layered vanilla sponge cake topped with luxurious fresh cream and seasonal berries.",
    price: 9000,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    tags: ["Layered Cake", "Sweet Indulgence"]
  },
  {
    id: "m_69",
    name: "Fruit Salad",
    description: "A refreshing bowl of freshly diced local seasonal tropical fruits, finished with a dash of lime juice.",
    price: 9000,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    tags: ["Healthy Fresh", "Tropical Local"]
  },

  // BEVERAGES
  {
    id: "m_70",
    name: "Bottle of Water",
    description: "Chilled premium bottled Malawian spring water (Still or Sparkling).",
    price: 1500,
    category: "beverages",
    image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=800&q=80",
    tags: ["Still", "Sparkling"]
  },
  {
    id: "m_71",
    name: "Minerals",
    description: "Your selection of Coca-Cola, Fanta, Sprite, or Ginger Ale minerals served cold over ice.",
    price: 1500,
    category: "beverages",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80",
    tags: ["Sodas", "Chilled"]
  },
  {
    id: "m_72",
    name: "Sugar-Free Juice",
    description: "Guilt-free, freshly squeezed local seasonal fruit juice without added sugar.",
    price: 5000,
    category: "beverages",
    image: "https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&w=800&q=80",
    tags: ["Fresh Juice", "Healthy Cold"]
  },
  {
    id: "m_73",
    name: "Tea",
    description: "A warm, comforting pot of traditional Malawian black tea or fragrant herbal tea.",
    price: 5000,
    category: "beverages",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
    tags: ["Hot Pot", "Local Blend"]
  },
  {
    id: "m_74",
    name: "Coffee",
    description: "Single-origin luxury Malawian Arabica espresso, Americano, or Cappuccino.",
    price: 6000,
    category: "beverages",
    image: "https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=800&q=80",
    tags: ["Arabica", "Hot Drink"]
  },
  {
    id: "m_75",
    name: "Glass of Wine",
    description: "A premium glass of house red, white, or rosé wine, hand-selected from our sommelier cave.",
    price: 8000,
    category: "beverages",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80",
    tags: ["Wine", "Glass Pour"]
  },
  {
    id: "m_76",
    name: "Bottle of Wine",
    description: "A full bottle of our exquisite house vintage wine, perfect for sharing and celebration.",
    price: 22000,
    category: "beverages",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80",
    tags: ["Wine", "Full Bottle"]
  },
  {
    id: "m_77",
    name: "Milkshake",
    description: "Thick, creamy milkshake prepared with fresh premium dairy, choice of Vanilla, Chocolate, or Strawberry.",
    price: 9500,
    category: "beverages",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
    tags: ["Thick", "Sweet Dairy"]
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
    url: "https://res.cloudinary.com/db3xx6mn4/image/upload/v1782411640/KNQR/products/ohmfunrgylieyhcwhu2j.jpg",
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
