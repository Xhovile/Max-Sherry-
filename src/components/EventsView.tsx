import React from 'react';
import { Calendar, Clock, MapPin, Ticket, AlertCircle, Sparkles, ShieldCheck } from 'lucide-react';
import { Event } from '../types';
import EventCountdown from './EventCountdown';

interface EventsViewProps {
  events: Event[];
  onBookEvent: (eventName: string) => void;
}

export default function EventsView({ events, onBookEvent }: EventsViewProps) {
  return (
    <div id="events-main-view" className="w-full bg-[#1A1A1A] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Editorial Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
          <span className="text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-semibold mb-3">
            &bull; SOCIAL CURATIONS & PARLORS &bull;
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-[#F5F5F5] font-medium leading-none">
            Signature Happenings
          </h1>
          <p className="text-xs md:text-sm text-[#B0B0B0] mt-4 font-light tracking-wide">
            Explore and reserve premium experiences. No third-party ticketing required. Claim your seats in our digital sanctuary.
          </p>
        </div>

        {/* Dynamic Events Cards Map */}
        <div className="space-y-16">
          {events.map((ev, index) => {
            const isSoldOut = ev.status === 'soldout';
            const isLeftIndex = index % 2 === 0;

            return (
              <div 
                key={ev.id} 
                id={`events-page-card-${ev.id}`}
                className={`bg-[#242424]/20 border border-[#242424] hover:border-[#D4AF37]/15 rounded-sm overflow-hidden flex flex-col lg:flex-row gap-0 transition-all duration-300 ${
                  isLeftIndex ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Event Photo Stage */}
                <div className="w-full lg:w-1/2 relative aspect-[16/10] md:aspect-[21/9] lg:aspect-auto bg-[#1A1A1A] overflow-hidden min-h-[300px]">
                  <img 
                    src={ev.image} 
                    alt={ev.name}
                    className="w-full h-full object-cover filter brightness-90 saturate-85 hover:scale-103 hover:saturate-100 transition-all duration-700"
                  />
                  
                  {/* Dynamic Indicators */}
                  <div className="absolute top-6 left-6 flex items-center space-x-2">
                    {ev.slotsLeft !== undefined && ev.slotsLeft > 0 && ev.slotsLeft <= 15 && (
                      <span className="bg-amber-600/90 text-white font-sans text-[9px] uppercase tracking-widest font-semibold px-2.5 py-1.5 rounded-sm">
                        Only {ev.slotsLeft} Seats Left
                      </span>
                    )}

                    {isSoldOut ? (
                      <span className="bg-red-950/90 text-red-100 font-sans text-[9px] uppercase tracking-widest font-semibold px-2.5 py-1.5 rounded-sm border border-red-500/20">
                        Registration Closed
                      </span>
                    ) : (
                      <span className="bg-[#D4AF37] text-[#1A1A1A] font-sans text-[9px] uppercase tracking-widest font-bold px-2.5 py-1.5 rounded-sm flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Upcoming Highlight
                      </span>
                    )}
                  </div>
                </div>

                {/* Event Specification Deck */}
                <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-between">
                  <div className="space-y-6">
                    {/* Time Coordinate Bar */}
                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#D4AF37]">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        <span>{ev.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span>{ev.time}</span>
                      </div>
                    </div>

                    <h2 className="font-serif text-3xl text-[#F5F5F5] font-medium leading-tight">
                      {ev.name}
                    </h2>

                    <p className="text-xs md:text-sm text-[#B0B0B0] leading-relaxed font-light">
                      {ev.description}
                    </p>

                    {/* Venue & Location specifications */}
                    <div className="flex items-start gap-2.5 text-xs text-[#B0B0B0] pt-2">
                      <MapPin className="w-4.5 h-4.5 text-[#D4AF37] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[#F5F5F5] uppercase tracking-widest text-[10px] font-semibold">{ev.venue}</span>
                        <p className="text-[10px] text-[#B0B0B0] mt-0.5 font-light">Max & Sherry Dine & Lounge Estate, New Naperi, Blantyre</p>
                      </div>
                    </div>

                    {/* Urgent Seating Countdown Timer */}
                    <EventCountdown date={ev.date} time={ev.time} status={ev.status} />
                  </div>

                  {/* Pricing and Action Deck */}
                  <div className="border-t border-[#242424] pt-8 mt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                      <span className="text-[9px] text-[#B0B0B0] uppercase tracking-wider block font-mono">Admission Package</span>
                      <div className="flex items-baseline gap-1.5 mt-1">
                        <span className="font-serif text-2xl text-[#D4AF37] font-semibold">MWK {Number(ev.price).toLocaleString()}</span>
                        <span className="text-[10px] text-[#B0B0B0]">/ person</span>
                      </div>
                    </div>

                    <button
                      disabled={isSoldOut}
                      onClick={() => onBookEvent(ev.name)}
                      className={`w-full sm:w-auto px-8 py-4 uppercase tracking-[0.2em] text-xs transition-colors font-semibold shadow-sm ${
                        isSoldOut
                          ? 'bg-[#242424] text-neutral-600 border border-neutral-800 cursor-not-allowed'
                          : 'bg-[#D4AF37] hover:bg-[#F5F5F5] text-[#1A1A1A] pointer'
                      }`}
                    >
                      {isSoldOut ? 'Sold Out' : 'Book Experience Table'}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}

          {events.length === 0 && (
            <div className="py-20 text-center flex flex-col items-center border border-[#242424] rounded bg-[#242424]/10">
              <AlertCircle className="w-12 h-12 text-[#D4AF37]/40 mb-4" />
              <h4 className="font-serif text-xl text-[#F5F5F5]">No Events Listed Currently</h4>
              <p className="text-xs text-[#B0B0B0] mt-1 font-light">Please verify later or consult on WhatsApp for customized scheduling.</p>
            </div>
          )}
        </div>

        {/* Private Events Banner promotion */}
        <section className="mt-24 p-8 md:p-12 rounded bg-cover bg-center border border-[#D4AF37]/15 relative overflow-hidden"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80')` }}
        >
          <div className="absolute inset-0 bg-neutral-950/85" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center lg:text-left">
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#D4AF37] font-mono flex items-center justify-center lg:justify-start gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Private Reservation Guarantee
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-[#F5F5F5] mt-2.5">Corporate & High-Society Private Hires</h3>
              <p className="text-xs text-[#B0B0B0] mt-2 font-light leading-relaxed">
                Need absolute corporate confidentiality or celebrating a milestone anniversary with a closed-door party? Outsource your stress to our premier lounge and executive banqueting organizers.
              </p>
            </div>
            
            <button
              onClick={() => { onBookEvent("Private Corporate Lounge Booking"); }}
              className="bg-[#D4AF37] text-[#1A1A1A] hover:bg-[#F5F5F5] transition-all px-8 py-4 uppercase text-xs tracking-widest font-semibold shrink-0"
            >
              Request Venue Buyout
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
