import React from 'react';
import { Award, Users, ChevronRight, Globe, Compass, Star } from 'lucide-react';

export default function AboutView() {
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
            Blantyre’s prominent luxury dining room and lounge was born out of a simple, revolutionary premise: that fine culinary craftsmanship should fuel real community celebration and prestigious human interaction.
          </p>
        </section>

        {/* 2. THE FOUNDERS EDITORIAL BLOCK */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-32">
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            <div className="absolute -inset-3 border border-[#D4AF37]/15 rounded-sm pointer-events-none" />
            <div className="overflow-hidden bg-[#242424] aspect-[4/3] rounded-sm">
              <img 
                src="https://res.cloudinary.com/db3xx6mn4/image/upload/v1782401629/KNQR/products/pdrple0ww0b28xviljd1.jpg" 
                alt="Hope & Tamika Mezuwa"
                className="w-full h-full object-cover filter grayscale contrast-110 hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#1A1A1A]/95 p-4 border border-[#242424] text-center min-w-[150px]">
              <p className="text-[10px] uppercase tracking-widest text-[#D4AF37]">Hope & Tamika</p>
              <h4 className="font-serif text-sm text-[#F5F5F5] mt-1 font-semibold">Mezuwa</h4>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col space-y-6 order-1 lg:order-2">
            <h2 className="font-serif text-3xl md:text-4.5xl text-[#F5F5F5] leading-tight">
              A Symphony Crafted by Hope & Tamika Mezuwa
            </h2>
            <p className="text-xs md:text-sm text-[#B0B0B0] leading-relaxed font-light">
              We did not set out to launch 'another restaurant'. In a digital-first era where human conversation has been compressed into tiny interfaces, we realized that an elite, warm physical meeting room is the ultimate currency of culture.
            </p>
            <p className="text-xs md:text-sm text-[#B0B0B0] leading-relaxed font-light">
              Sherry spearheaded the development of our kitchen’s culinary rules: zero compromise on farm freshness, extreme precision in sourcing local birds and fish, and incorporating classic French recipes with vibrant local Malawian spices. Max designed the somatic environment: low light, mahogany paneling, amber glows, and acoustic separation that permits soft, confidential deals over exquisite single malts.
            </p>
            <div className="p-6 bg-[#242424]/40 border-l-2 border-[#D4AF37] rounded-r">
              <p className="text-xs text-[#F5F5F5] italic font-light">
                “When you come through those double bronze doors in New Naperi, you are not merely stepping into a dining room. You are claiming your seat in a legacy of hospitality.”
              </p>
            </div>
          </div>
        </section>

        {/* 3. OUR PHILOSOPHY */}
        <section id="our-philosophy" className="py-20 border-y border-[#D4AF37]/10 mb-20">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-4">
              &bull; OUR CONVICTION &bull;
            </span>
            <h2 className="font-serif text-3xl md:text-4.5xl text-[#F5F5F5] mb-8">
              Our Philosophy
            </h2>
            <p className="font-serif text-lg md:text-xl text-[#D4AF37] italic font-light mb-6 leading-relaxed">
              “We believe hospitality is measured not only by the food we serve but by how our guests feel from the moment they arrive.”
            </p>
            <p className="text-xs md:text-sm text-[#B0B0B0] leading-relaxed font-light">
              Our team is committed to consistency, professionalism, and genuine care. We source quality ingredients whenever possible, prepare every meal with attention to detail, and maintain an environment that balances elegance with comfort. The result is a space where celebrations become memories, conversations flourish, and every guest feels welcome.
            </p>
          </div>
        </section>

        {/* 4. WHAT WE STAND FOR */}
        <section id="what-we-stand-for" className="py-12 mb-20">
          <div className="text-center max-w-xl mx-auto mb-16 flex flex-col items-center">
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-4">
              &bull; PILLARS OF EXCELLENCE &bull;
            </span>
            <h2 className="font-serif text-3xl md:text-4.5xl text-[#F5F5F5]">
              What We Stand For
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-[#242424]/30 border border-[#242424] p-8 rounded-sm hover:border-[#D4AF37]/35 transition-all duration-300">
              <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold mb-3 block">01 / QUALITY</span>
              <h3 className="font-serif text-xl text-[#F5F5F5] mb-3">Quality</h3>
              <p className="text-xs text-[#B0B0B0] leading-relaxed font-light">
                Every meal is prepared with fresh ingredients, skilled craftsmanship, and attention to detail.
              </p>
            </div>

            <div className="bg-[#242424]/30 border border-[#242424] p-8 rounded-sm hover:border-[#D4AF37]/35 transition-all duration-300">
              <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold mb-3 block">02 / HOSPITALITY</span>
              <h3 className="font-serif text-xl text-[#F5F5F5] mb-3">Hospitality</h3>
              <p className="text-xs text-[#B0B0B0] leading-relaxed font-light">
                We believe outstanding service is warm, respectful, and personal.
              </p>
            </div>

            <div className="bg-[#242424]/30 border border-[#242424] p-8 rounded-sm hover:border-[#D4AF37]/35 transition-all duration-300">
              <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold mb-3 block">03 / COMMUNITY</span>
              <h3 className="font-serif text-xl text-[#F5F5F5] mb-3">Community</h3>
              <p className="text-xs text-[#B0B0B0] leading-relaxed font-light">
                Max & Sherry is a place where people gather to celebrate milestones, strengthen relationships, and create lasting memories.
              </p>
            </div>

            <div className="bg-[#242424]/30 border border-[#242424] p-8 rounded-sm hover:border-[#D4AF37]/35 transition-all duration-300">
              <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold mb-3 block">04 / EXCELLENCE</span>
              <h3 className="font-serif text-xl text-[#F5F5F5] mb-3">Excellence</h3>
              <p className="text-xs text-[#B0B0B0] leading-relaxed font-light">
                From the kitchen to the lounge, we continually strive to deliver an experience that reflects the highest standards of dining and hospitality.
              </p>
            </div>
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
