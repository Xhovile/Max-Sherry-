import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Calendar, Star, Utensils, Music, Wine, MessageSquare } from 'lucide-react';
import { MenuItem, Event, Testimonial, HomepageContent } from '../types';

interface HomeViewProps {
  homepage: HomepageContent;
  menuItems: MenuItem[];
  events: Event[];
  testimonials: Testimonial[];
  setActiveTab: (tab: string) => void;
}

export default function HomeView({ homepage, menuItems, events, testimonials, setActiveTab }: HomeViewProps) {
  // Filter signature/best dishes for the home page showcase
  const featuredDishes = menuItems.filter(item => item.isSignature || item.category === 'dinner').slice(0, 5);
  const [activeDishIndex, setActiveDishIndex] = useState(0);

  const signatureExperiences = [
    {
      title: "Dining Experience",
      description: "Sophisticated culinary mastery, fusing dry-aged Prime cuts with edible luxury details and world-class wine collections.",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
      icon: <Utensils className="w-5 h-5 text-[#D4AF37]" />
    },
    {
      title: "Private Events",
      description: "The Private Sommelier Vault and Skyline room offer absolute security, flawless sound proofing, and executive service.",
      image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
      icon: <Wine className="w-5 h-5 text-[#D4AF37]" />
    },
    {
      title: "Entertainment & Social Nights",
      description: "Atmospheric twilight jazz, high couture fashion brunches, and curated, intimate cultural happenings.",
      image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=800&q=80",
      icon: <Music className="w-5 h-5 text-[#D4AF37]" />
    }
  ];

  const handleNextDish = () => {
    setActiveDishIndex((prev) => (prev + 1) % featuredDishes.length);
  };

  const handlePrevDish = () => {
    setActiveDishIndex((prev) => (prev - 1 + featuredDishes.length) % featuredDishes.length);
  };

  return (
    <div id="home-view" className="w-full bg-[#1A1A1A]">
      
      {/* 1. CINEMATIC LANDING HERO SECTION */}
      <section id="hero-section" className="relative w-full h-screen min-h-[650px] flex items-center justify-center overflow-hidden">
        {/* Parallax Background Dark Atmosphere */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1485686531765-ba63b07845a7?auto=format&fit=crop&w=1920&q=90')`,
            filter: 'brightness(0.25) contrast(1.15)'
          }}
        />
        
        {/* Amber Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1A1A1A]/30 to-[#1A1A1A]" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[#1A1A1A]/80" />

        {/* Hero Interactive Typography & Actions */}
        <div className="relative max-w-5xl mx-auto px-6 text-center z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex items-center space-x-3 mb-6"
          >
            <span className="w-10 h-[1.5px] bg-[#D4AF37]" />
            <span className="font-sans text-xs uppercase tracking-[0.55em] text-[#D4AF37] font-semibold">
              PRESTIGE LUXURY DINE & LOUNGE
            </span>
            <span className="w-10 h-[1.5px] bg-[#D4AF37]" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#F5F5F5] tracking-tight leading-none mb-8"
          >
            Fine Dining.<br />
            <span className="italic font-light text-[#D4AF37] pr-2">Great Conversations.</span><br />
            Memorable Experiences.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-sans text-sm md:text-lg text-[#B0B0B0] max-w-2xl mx-auto tracking-wide font-light leading-relaxed mb-12"
          >
            {homepage.heroHeadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full max-w-lg"
          >
            <button
              id="hero-reserve-btn"
              onClick={() => setActiveTab('reserve')}
              className="w-full sm:w-auto px-8 py-4 bg-[#D4AF37] hover:bg-[#F5F5F5] text-[#1A1A1A] text-xs uppercase tracking-[0.25em] font-medium transition-all duration-300 pointer"
            >
              Reserve a Table
            </button>
            <button
              id="hero-menu-btn"
              onClick={() => setActiveTab('menu')}
              className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-[#D4AF37]/10 text-[#F5F5F5] hover:text-[#D4AF37] border border-[#F5F5F5]/30 hover:border-[#D4AF37] text-xs uppercase tracking-[0.25em] font-medium transition-all duration-300 pointer"
            >
              Explore Menu
            </button>
            <button
              id="hero-events-btn"
              onClick={() => setActiveTab('events')}
              className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-[#F5F5F5]/10 text-[#B0B0B0] hover:text-[#F5F5F5] text-xs uppercase tracking-[0.25em] font-medium transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" /> Upcoming Events
            </button>
          </motion.div>
        </div>

        {/* Bottom Scrolling Indicator Hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-40 animate-pulse">
          <span className="text-[9px] uppercase tracking-[0.4em] text-[#B0B0B0] mb-2 font-mono">SCROLL TO ASCEND</span>
          <div className="w-[1.5px] h-10 bg-[#D4AF37]/50" />
        </div>
      </section>

      {/* 2. THE BRAND STORY PREVIEW */}
      <section id="story-preview" className="py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-7 flex flex-col space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold flex items-center space-x-2">
            <span>&bull;</span> <span>The Max & Sherry Creed</span>
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#F5F5F5] leading-tight font-medium">
            {homepage.storyHeading}
          </h2>
          <div className="h-[1.5px] w-20 bg-[#D4AF37]/40 my-2" />
          <p className="font-sans text-xs md:text-sm text-[#B0B0B0] leading-relaxed max-w-2xl font-light">
            {homepage.storyText1}
          </p>
          <p className="font-sans text-xs md:text-sm text-[#B0B0B0] leading-relaxed max-w-2xl font-light">
            {homepage.storyText2}
          </p>
          <div className="pt-4">
            <button
              id="story-read-more"
              onClick={() => setActiveTab('story')}
              className="inline-flex items-center space-x-2 border-b border-[#D4AF37] pb-1.5 text-xs text-[#D4AF37] uppercase tracking-[0.25em] font-medium hover:text-[#F5F5F5] hover:border-[#F5F5F5] transition-all"
            >
              <span>Read Our Story</span>
              <span>&rarr;</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 relative group mt-8 lg:mt-0">
          <div className="absolute -inset-2 rounded border border-[#D4AF37]/10 group-hover:border-[#D4AF37]/30 transition-all duration-500 pointer-events-none" />
          <div className="overflow-hidden rounded-sm relative aspect-[4/5] bg-[#242424]">
            <img 
              src={homepage.storyImage} 
              alt="Luxury Lounge Atmosphere" 
              className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              loading="lazy"
            />
            {/* Ambient Shadow Box overlay inside image */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="font-serif text-lg italic text-[#F5F5F5] font-light">
                “Dining is not transactional. It is the architectural theater of community.”
              </span>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] mt-2 font-serif">
                — Max and Sherry, Founders
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SIGNATURE EXPERIENCES ROW */}
      <section id="signature-experiences" className="py-24 bg-[#151515] border-y border-[#D4AF37]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-4">
              &bull; THE TRIAD OF PRESTIGE &bull;
            </span>
            <h2 className="font-serif text-3xl md:text-4.5xl text-[#F5F5F5] leading-tight">
              Signature Experiences
            </h2>
            <p className="text-xs md:text-sm text-[#B0B0B0] mt-4 font-light tracking-wide max-w-xl">
              We design structured moments that stay in memory. Max & Sherry represents three distinct pillars of modern hospitality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {signatureExperiences.map((exp, idx) => (
              <div 
                key={idx}
                id={`sig-exp-card-${idx}`}
                className="group flex flex-col bg-[#1A1A1A] border border-[#242424] hover:border-[#D4AF37]/30 transition-all duration-500 rounded-sm overflow-hidden"
              >
                <div className="relative aspect-[3/2] overflow-hidden bg-[#242424]">
                  <img 
                    src={exp.image} 
                    alt={exp.title}
                    className="w-full h-full object-cover grayscale brightness-95 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent opacity-60" />
                  <div className="absolute top-4 right-4 bg-[#151515]/95 p-3 rounded border border-[#D4AF37]/20 flex items-center justify-center">
                    {exp.icon}
                  </div>
                </div>

                <div className="p-8 flex flex-col space-y-4">
                  <h3 className="font-serif text-xl text-[#F5F5F5] group-hover:text-[#D4AF37] transition-colors duration-300">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-[#B0B0B0] leading-relaxed font-light flex-grow">
                    {exp.description}
                  </p>
                  <button 
                    onClick={() => {
                      if (exp.title.includes("Private")) setActiveTab("corporate");
                      else if (exp.title.includes("Entertainment")) setActiveTab("events");
                      else setActiveTab("menu");
                    }}
                    className="text-left text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] group-hover:text-[#F5F5F5] transition-colors font-semibold"
                  >
                    Learn More &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED CULINARY SHOWCASE (CAROUSEL) */}
      <section id="featured-dishes" className="py-24 max-w-7xl mx-auto px-6 overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-xl text-left">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-4 block">
              &bull; MASTER WORK FROM THE KITCHEN
            </span>
            <h2 className="font-serif text-4xl text-[#F5F5F5]">
              Interactive Dish Showcase
            </h2>
            <p className="text-xs text-[#B0B0B0] mt-3 font-light leading-relaxed">
              Savor curated signature selections engineered for absolute taste perfection. Tap navigation to swipe the catalog.
            </p>
          </div>

          <div className="flex items-center space-x-3 mt-6 md:mt-0">
            <button
              id="showcase-prev"
              onClick={handlePrevDish}
              className="p-3.5 border border-[#242424] hover:border-[#D4AF37]/50 hover:bg-[#242424] text-[#B0B0B0] hover:text-[#D4AF37] transition-all rounded"
              aria-label="Previous Dish"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-mono text-[#D4AF37] tracking-widest px-2">
              {String(activeDishIndex + 1).padStart(2, '0')} / {String(featuredDishes.length).padStart(2, '0')}
            </span>
            <button
              id="showcase-next"
              onClick={handleNextDish}
              className="p-3.5 border border-[#242424] hover:border-[#D4AF37]/50 hover:bg-[#242424] text-[#B0B0B0] hover:text-[#D4AF37] transition-all rounded"
              aria-label="Next Dish"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Animation Card Container */}
        {featuredDishes.length > 0 && (
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDishIndex}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-[#242424]/40 p-8 md:p-12 border border-[#242424] rounded-sm items-center"
              >
                <div className="lg:col-span-5 relative aspect-square md:aspect-[4/3] lg:aspect-square bg-[#1A1A1A] overflow-hidden rounded">
                  <img 
                    src={featuredDishes[activeDishIndex].image} 
                    alt={featuredDishes[activeDishIndex].name}
                    className="w-full h-full object-cover brightness-95"
                  />
                  <div className="absolute top-4 left-4 bg-[#D4AF37] text-[#1A1A1A] text-[9px] uppercase tracking-[0.25em] font-semibold px-3 py-1.5 rounded-sm">
                    Prestige Recommendation
                  </div>
                </div>

                <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
                  <div className="flex flex-wrap items-center gap-2">
                    {featuredDishes[activeDishIndex].tags?.map((tag, i) => (
                      <span key={i} className="text-[10px] uppercase tracking-widest bg-[#1A1A1A] text-[#D4AF37] border border-[#D4AF37]/30 px-2.5 py-1 rounded-sm">
                        {tag}
                      </span>
                    ))}
                    <span className="text-[10px] uppercase tracking-widest bg-[#D4AF37]/10 text-[#D4AF37] px-2.5 py-1 rounded-sm border border-transparent">
                      {featuredDishes[activeDishIndex].category}
                    </span>
                  </div>

                  <h3 className="font-serif text-3xl md:text-4.5xl text-[#F5F5F5] leading-tight">
                    {featuredDishes[activeDishIndex].name}
                  </h3>

                  <p className="text-xs md:text-sm text-[#B0B0B0] leading-relaxed font-light">
                    {featuredDishes[activeDishIndex].description}
                  </p>

                  <div className="flex items-center justify-between border-t border-[#1A1A1A] pt-8 mt-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#B0B0B0]">Executive Price</span>
                      <span className="font-serif text-2xl text-[#D4AF37] font-medium mt-1">
                        R {featuredDishes[activeDishIndex].price}
                      </span>
                    </div>

                    <div className="flex items-center space-x-4">
                      <button 
                        onClick={() => setActiveTab('menu')}
                        className="text-xs uppercase tracking-[0.25em] text-[#B0B0B0] hover:text-[#D4AF37] px-4 py-3 border border-transparent hover:border-[#D4AF37]/20 transition-all font-medium"
                      >
                        Full Menu
                      </button>
                      <button
                        onClick={() => setActiveTab('reserve')}
                        className="bg-[#D4AF37] hover:bg-[#F5F5F5] text-[#1A1A1A] text-xs uppercase tracking-[0.2em] px-6 py-3 transition-colors font-semibold"
                      >
                        Reserve Dish Session
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* 5. UPCOMING EVENTS */}
      <section id="upcoming-events-preview" className="py-24 bg-[#151515] border-t border-[#D4AF37]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16">
            <div className="text-left">
              <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-3 block">
                &bull; EMBODIED EXPERIENCES
              </span>
              <h2 className="font-serif text-4xl text-[#F5F5F5]">
                Upcoming Social Events
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('events')}
              className="text-[#D4AF37] hover:text-[#F5F5F5] text-xs uppercase tracking-[0.25em] font-semibold border-b border-[#D4AF37] pb-1 mt-4 md:mt-0 transition-all"
            >
              Browse All Events &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.slice(0, 3).map((ev) => (
              <div 
                key={ev.id}
                id={`home-event-card-${ev.id}`}
                className="bg-[#1A1A1A] border border-[#242424] hover:border-[#D4AF37]/20 rounded-sm overflow-hidden flex flex-col group transition-all duration-300"
              >
                <div className="relative aspect-[16/10] bg-[#242424] overflow-hidden">
                  <img 
                    src={ev.image} 
                    alt={ev.name}
                    className="w-full h-full object-cover grayscale brightness-90 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
                  />
                  
                  {/* Event Ticket Price Label */}
                  <div className="absolute top-4 right-4 bg-[#1A1A1A]/95 text-[#D4AF37] font-serif font-semibold text-sm px-3.5 py-1.5 rounded-sm border border-[#D4AF37]/20">
                    R {ev.price}
                  </div>

                  {/* Solout Overlay */}
                  {ev.status === 'soldout' && (
                    <div className="absolute inset-0 bg-black/75 flex items-center justify-center">
                      <span className="border border-[#D4AF37] text-[#D4AF37] font-serif text-lg tracking-[0.2em] uppercase px-5 py-2">
                        FULLY RESERVED
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-8 flex flex-col flex-grow space-y-4">
                  <div className="text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] font-semibold flex items-center space-x-2">
                    <span>{ev.date}</span>
                    <span>&bull;</span>
                    <span>{ev.time}</span>
                  </div>

                  <h3 className="font-serif text-xl text-[#F5F5F5] group-hover:text-[#D4AF37] transition-all">
                    {ev.name}
                  </h3>

                  <p className="text-xs text-[#B0B0B0] leading-relaxed font-light flex-grow">
                    {ev.description.substring(0, 100)}...
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-[#242424]">
                    <span className="text-[9px] uppercase tracking-widest text-[#B0B0B0]">{ev.venue}</span>
                    <button
                      disabled={ev.status === 'soldout'}
                      onClick={() => setActiveTab('reserve')}
                      className={`text-xs uppercase tracking-[0.2em] font-semibold font-sans py-2 px-4 border ${
                        ev.status === 'soldout'
                          ? 'border-neutral-800 text-neutral-600 cursor-not-allowed'
                          : 'border-[#D4AF37] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#1A1A1A] transition-all'
                      }`}
                    >
                      {ev.status === 'soldout' ? 'Closed' : 'Book Now'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-3">
            &bull; PRESERVING AUDIT TRUST &bull;
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#F5F5F5]">
            Sovereign Reviews
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test) => (
            <div 
              key={test.id} 
              id={`testimonial-card-${test.id}`}
              className="bg-[#242424]/30 border border-[#242424] p-8 rounded-sm relative flex flex-col"
            >
              <div className="flex items-center space-x-1.5 mb-6 text-[#D4AF37]">
                {[...Array(test.rating)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <blockquote className="text-xs leading-relaxed text-[#B0B0B0] italic font-light mb-8 flex-grow">
                “{test.review}”
              </blockquote>

              <div className="flex flex-col pt-4 border-t border-[#242424]">
                <cite className="not-italic text-xs font-serif text-[#F5F5F5] font-semibold">{test.name}</cite>
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] mt-1 font-sans ">{test.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
