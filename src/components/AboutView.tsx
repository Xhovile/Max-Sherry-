import React from 'react';
import { Award, Users, ChevronRight, Globe, Compass, Star } from 'lucide-react';

export default function AboutView() {
  const milestones = [
    {
      year: "2018",
      title: "The Genesis Concept",
      description: "Cultural visionary Max and master gastronomer Sherry combine their expertise to construct a bespoke sanctuary in Area 10, Lilongwe, filling the vacuum for a true luxury cocktail lounge and premium restaurant theater."
    },
    {
      year: "2020",
      title: "The Organic Alliance",
      description: "Pioneering exclusive, direct contracts with independent Malawian farm estates and fresh Lake Malawi Chambo fisheries, establishing a sustainable, lake-to-lounge culinary pipeline."
    },
    {
      year: "2022",
      title: "Sommelier Vault Dedication",
      description: "Introducing our underground Private Dining Room and Sommelier Vault, securing state-of-the-art acoustic sealing and high-grade security for diplomats, cultural elite, and heads of trade."
    },
    {
      year: "2024",
      title: "Unveiling The Skyline Terrace",
      description: "Establishing our luxurious open-air penthouse terrace, carrying fire pits, custom-engineered acoustics, and setting the stage for prestigious twilight acoustic jazz."
    },
    {
      year: "2026",
      title: "Digital Prestige Era",
      description: "Harmonizing our flawless physical hospitality with next-generation digital prestige booking frameworks, making event and table organization effortless for corporate hosts."
    }
  ];

  const corePillars = [
    {
      title: "Culinary Decadence",
      desc: "Our kitchens refuse standard fast-track preparation. Every prime cut is dry-aged on hooks in clean salt-brick vaults for 28-40 days to capture deep, savory notes.",
      icon: <Award className="w-5 h-5 text-[#D4AF37]" />
    },
    {
      title: "Atmospheric Precision",
      desc: "Every light fixture operates at a custom-engineered Kelvin rating, reflecting amber golds over soft velvet curves, casting a warm gold glow over guests.",
      icon: <Compass className="w-5 h-5 text-[#D4AF37]" />
    },
    {
      title: "Absolute Integrity",
      desc: "Hospitality at Max & Sherry is default-prestige. We guarantee our clients supreme security, strict operational privacy, and pristine convenience.",
      icon: <Users className="w-5 h-5 text-[#D4AF37]" />
    }
  ];

  return (
    <div id="about-page-view" className="w-full bg-[#1A1A1A] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* 1. EDITORIAL MAGAZINE TITLE HEADER */}
        <section className="text-center max-w-4xl mx-auto mb-20 flex flex-col items-center">
          <span className="text-xs uppercase tracking-[0.45em] text-[#D4AF37] font-semibold mb-6 block">
            &bull; THE EDITORIAL CHRONICLE &bull;
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#F5F5F5] tracking-tight leading-none mb-6">
            The Story Behind<br />
            <span className="italic font-light text-[#D4AF37]">Max & Sherry</span>
          </h1>
          <div className="w-24 h-[1.5px] bg-[#D4AF37] mb-8" />
          <p className="font-sans text-sm md:text-lg text-[#B0B0B0] max-w-2xl mx-auto tracking-wide font-light leading-relaxed">
            Lilongwe’s prominent luxury dining room and lounge was born out of a simple, revolutionary premise: that fine culinary craftsmanship should fuel real community celebration and prestigious human interaction.
          </p>
        </section>

        {/* 2. THE FOUNDERS EDITORIAL BLOCK */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-32">
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            <div className="absolute -inset-3 border border-[#D4AF37]/15 rounded-sm pointer-events-none" />
            <div className="overflow-hidden bg-[#242424] aspect-[4/3] rounded-sm">
              <img 
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&q=80" 
                alt="Sherry with culinary team"
                className="w-full h-full object-cover filter grayscale contrast-110 hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute bottom-4 left-4 bg-[#1A1A1A]/95 p-4 border border-[#242424]">
              <p className="text-[10px] uppercase tracking-widest text-[#D4AF37]">CULINARY LEADERSHIP</p>
              <h4 className="font-serif text-sm text-[#F5F5F5] mt-1 font-semibold">Executive Gastronomy Unit</h4>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col space-y-6 order-1 lg:order-2">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
              THE SOVEREIGN ENVISIONING
            </span>
            <h2 className="font-serif text-3xl md:text-4.5xl text-[#F5F5F5] leading-tight">
              A Symphony Crafted by Max & Sherry
            </h2>
            <p className="text-xs md:text-sm text-[#B0B0B0] leading-relaxed font-light">
              We did not set out to launch 'another restaurant'. In a digital-first era where human conversation has been compressed into tiny interfaces, we realized that an elite, warm physical meeting room is the ultimate currency of culture.
            </p>
            <p className="text-xs md:text-sm text-[#B0B0B0] leading-relaxed font-light">
              Sherry spearheaded the development of our kitchen’s culinary rules: zero compromise on farm freshness, extreme precision in sourcing local birds and fish, and incorporating classic French recipes with vibrant local Malawian spices. Max designed the somatic environment: low light, mahogany paneling, amber glows, and acoustic separation that permits soft, confidential deals over exquisite single malts.
            </p>
            <div className="p-6 bg-[#242424]/40 border-l-2 border-[#D4AF37] rounded-r">
              <p className="text-xs text-[#F5F5F5] italic font-light">
                “When you come through those double bronze doors in Area 10, you are not merely stepping into a dining room. You are claiming your seat in a legacy of hospitality.”
              </p>
              <span className="text-[10px] mt-2 block text-[#D4AF37] uppercase tracking-widest font-mono">&mdash; MAX & SHERRY, CHIEF PROPRIETORS</span>
            </div>
          </div>
        </section>

        {/* 3. EXPERIENCE PILLARS */}
        <section className="py-16 border-y border-[#D4AF37]/10 mb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {corePillars.map((pillar, i) => (
              <div key={i} className="flex flex-col space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#242424] border border-[#D4AF37]/20 flex items-center justify-center">
                  {pillar.icon}
                </div>
                <h3 className="font-serif text-xl text-[#F5F5F5]">{pillar.title}</h3>
                <p className="text-xs text-[#B0B0B0] leading-relaxed font-light">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. CHRONOLOGICAL MAGAZINE LUXURY TIMELINE */}
        <section className="relative">
          <div className="text-center max-w-xl mx-auto mb-20 flex flex-col items-center">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-4">
              &bull; THE ARCHIVAL PATHWAY &bull;
            </span>
            <h2 className="font-serif text-3xl md:text-4.5xl text-[#F5F5F5]">
              Milestones of Luxury
            </h2>
          </div>

          <div className="relative border-l border-[#D4AF37]/20 pl-8 md:pl-16 space-y-16 max-w-4xl mx-auto">
            {milestones.map((milestone, idx) => (
              <div key={idx} id={`timeline-milestone-${idx}`} className="relative">
                {/* Glowing Dot on Timeline */}
                <div className="absolute -left-[41px] md:-left-[73px] top-1.5 w-6 h-6 rounded-full bg-[#1A1A1A] border-2 border-[#D4AF37] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                </div>

                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12">
                  <div className="md:w-32 shrink-0">
                    <span className="font-serif text-4xl text-[#D4AF37] tracking-wider leading-none">
                      {milestone.year}
                    </span>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <h3 className="font-serif text-2xl text-[#F5F5F5]">
                      {milestone.title}
                    </h3>
                    <p className="text-xs md:text-sm text-[#B0B0B0] leading-relaxed font-light">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. COMMUNITY IMPACT SUMMARY */}
        <section className="mt-32 p-8 md:p-16 rounded-sm bg-[#242424]/30 border border-[#242424] flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto">
          <div className="md:w-1/3 text-center md:text-left">
            <h3 className="font-serif text-3xl text-[#F5F5F5] mb-2">Community Elevation</h3>
            <span className="text-xs text-[#D4AF37] uppercase tracking-[0.2em] font-mono">Real Impact Numbers</span>
          </div>

          <div className="md:w-2/3 grid grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center md:text-left">
              <span className="font-mono text-3xl lg:text-4xl text-[#D4AF37] font-semibold">100%</span>
              <p className="text-[10px] uppercase tracking-wider text-[#B0B0B0] mt-1.5">Free Range Karoo Sourcing</p>
            </div>
            <div className="text-center md:text-left">
              <span className="font-mono text-3xl lg:text-4xl text-[#D4AF37] font-semibold">45+</span>
              <p className="text-[10px] uppercase tracking-wider text-[#B0B0B0] mt-1.5">Local Artists Supported</p>
            </div>
            <div className="text-center md:text-left col-span-2 lg:col-span-1">
              <span className="font-mono text-3xl lg:text-4xl text-[#D4AF37] font-semibold">6,200+</span>
              <p className="text-[10px] uppercase tracking-wider text-[#B0B0B0] mt-1.5">Elite Bookings Administered</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
