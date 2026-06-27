import React, { useState } from 'react';
import { Calendar, Users, Briefcase, Sparkles, Building, PhoneCall, CheckCircle, ArrowRight } from 'lucide-react';
import { CorporateInquiry } from '../types';

interface CorporateViewProps {
  createInquiry: (inq: Omit<CorporateInquiry, "id" | "status" | "createdAt">) => CorporateInquiry;
}

export default function CorporateView({ createInquiry }: CorporateViewProps) {
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [eventType, setEventType] = useState("Corporate Dinner");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(20);
  const [message, setMessage] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState<CorporateInquiry | null>(null);

  const corporateOptions = [
    {
      title: "Executive Meetings & Luncheons",
      description: "Equipped with pristine sound-sealing, fast secure connectivity, and high-level projector capabilities in our Private Sommelier Vault. Includes custom lunch menus or personal hors d'oeuvres curation.",
      capacity: "10 - 25 guests",
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80",
      icon: <Building className="w-5 h-5 text-[#D4AF37]" />
    },
    {
      title: "Key Brand & Product Launches",
      description: "Secure the entire Main Dining Room or Skyline Lounge for grand couture runways, design unveils, or media pressers. Outfitted with high-fidelity visual and acoustic platforms with staging capabilities.",
      capacity: "40 - 120 guests",
      image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=600&q=80",
      icon: <Sparkles className="w-5 h-5 text-[#D4AF37]" />
    },
    {
      title: "High-Society Dinners & Tastings",
      description: "Bring associates together for exclusive multi-course culinary tastings flamed tableside, complemented by vertical Shiraz pairings and top-shelf whiskey reveals overseen by Max.",
      capacity: "15 - 50 guests",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
      icon: <Briefcase className="w-5 h-5 text-[#D4AF37]" />
    },
    {
      title: "Private Celebrations & Milestone Galas",
      description: "From intimate premium birthday socials to legacy retirement celebrations. Receive curated cocktail menus themed to your color preferences with live musical arrangements scheduled on request.",
      capacity: "12 - 80 guests",
      image: "https://images.unsplash.com/photo-1485686531765-ba63b07845a7?auto=format&fit=crop&w=600&q=80",
      icon: <Calendar className="w-5 h-5 text-[#D4AF37]" />
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !email || !phone || !date || !guests) {
      alert("Please complete the required details before sending.");
      return;
    }

    setIsSubmitting(true);

    // Simulate custom planner allocation latency
    setTimeout(() => {
      const savedInq = createInquiry({
        companyName,
        contactName,
        email,
        phone,
        eventType,
        date,
        guests,
        message
      });

      setSubmittedSuccess(savedInq);
      setIsSubmitting(false);

      // Reset Form fields
      setCompanyName("");
      setContactName("");
      setEmail("");
      setPhone("");
      setEventType("Corporate Dinner");
      setDate("");
      setGuests(20);
      setMessage("");
    }, 1500);
  };

  return (
    <div id="corporate-page-view" className="w-full bg-[#1A1A1A] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Editorial Heading Column */}
        <section className="text-center max-w-4xl mx-auto mb-20 flex flex-col items-center">
          <span className="text-xs uppercase tracking-[0.45em] text-[#D4AF37] font-semibold mb-6 block">
            &bull; HIGH-SOCIETY & EXECUTIVE BOOKINGS &bull;
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#F5F5F5] tracking-tight leading-none mb-6">
            Private Banquets<br />
            <span className="italic font-light text-[#D4AF37]">& Hires</span>
          </h1>
          <div className="w-24 h-[1.5px] bg-[#D4AF37] mb-8" />
          <p className="font-sans text-sm md:text-lg text-[#B0B0B0] max-w-2xl mx-auto tracking-wide font-light leading-relaxed">
            Formulate legacy agreements and celebrate milestones in rooms designed specifically to elevate. Secure exclusive corporate lockouts and custom banquets.
          </p>
        </section>

        {/* Dynamic Presentation Cards Row */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          {corporateOptions.map((opt, i) => (
            <div 
              key={i} 
              id={`corporate-opt-card-${i}`}
              className="bg-[#242424]/30 border border-[#242424] hover:border-[#D4AF37]/20 rounded-sm overflow-hidden flex flex-col sm:flex-row gap-0 group transition-all duration-300"
            >
              <div className="w-full sm:w-2/5 relative min-h-[220px] overflow-hidden bg-[#1A1A1A]">
                <img 
                  src={opt.image} 
                  alt={opt.title} 
                  className="w-full h-full object-cover grayscale brightness-85 group-hover:scale-102 group-hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-[#1A1A1A]/95 p-2 rounded-sm border border-[#D4AF37]/20">
                  {opt.icon}
                </div>
              </div>

              <div className="w-full sm:w-3/5 p-8 flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="text-[9px] uppercase tracking-widest text-[#D4AF37]" htmlFor="details">
                    Capacity limit: {opt.capacity}
                  </span>
                  <h3 className="font-serif text-xl text-[#F5F5F5] group-hover:text-[#D4AF37] transition-all">
                    {opt.title}
                  </h3>
                  <p className="text-xs text-[#B0B0B0] leading-relaxed font-light">
                    {opt.description}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEventType(opt.title.split(' & ')[0].split(' ')[0]);
                    document.getElementById('corporate-inquiry-box')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-left text-[10px] uppercase tracking-widest text-[#D4AF37] hover:text-[#F5F5F5] transition-all pt-4 font-semibold shrink-0"
                >
                  Select Event Slot &rarr;
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* Custom Inquiry Form Section */}
        <section id="corporate-inquiry-box" className="max-w-3xl mx-auto scroll-mt-24">
          
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl text-[#F5F5F5]">Custom Hiring Quotation</h2>
            <p className="text-xs text-[#B0B0B0] mt-2 font-light">Initialize secure planning and schedule consultations with our executive manager.</p>
          </div>

          {submittedSuccess ? (
            /* SUCCESS FEEDBACK BLOCK */
            <div id="quotation-success" className="bg-[#242424] border border-[#D4AF37]/35 rounded p-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/20">
                <CheckCircle className="w-8 h-8" />
              </div>

              <h3 className="font-serif text-2xl text-[#F5F5F5]">Inquiry Received</h3>
              <p className="text-xs text-[#B0B0B0] leading-relaxed max-w-md mx-auto">
                Thank you for choosing Max & Sherry Dine & Lounge, <strong>{submittedSuccess.contactName}</strong>. Your executive venue inquiries regarding our <strong>{submittedSuccess.eventType}</strong> on <strong>{submittedSuccess.date}</strong> have been securely routed to our management group.
              </p>

              <div className="p-4 bg-[#1A1A1A] border-l-2 border-[#D4AF37] text-left max-w-sm mx-auto">
                <span className="text-[8px] uppercase tracking-widest text-[#B0B0B0] font-mono block">Inquiry Code ID</span>
                <span className="text-xs font-mono text-white text-[#D4AF37] font-semibold">MS-INQ-{submittedSuccess.id.split('_')[1]}</span>
              </div>

              <p className="text-[11px] text-[#B0B0B0] italic font-light">
                An event hospitality advocate will dial you back or construct a custom PDF prospectus within the next 12 business hours.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href={`https://wa.me/265995700800?text=Hi%20Max%20%26%20Sherry%2C%20I've%20just%20sent%20a%20private%20hire%20quotation%20request%20MS-INQ-${submittedSuccess.id.split('_')[1]}%20for%20${submittedSuccess.eventType}.%20Please%20advise.`}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="px-6 py-3 bg-emerald-700 hover:bg-emerald-600 font-sans text-white text-[10px] uppercase tracking-widest font-semibold transition-all flex items-center gap-2"
                >
                  Confirm on WhatsApp
                </a>
                <button
                  onClick={() => setSubmittedSuccess(null)}
                  className="px-6 py-3 bg-[#1A1A1A] border border-[#242424] text-[#B0B0B0] hover:text-[#F5F5F5] font-sans text-[10px] uppercase tracking-widest font-semibold transition-all"
                >
                  Send New Inquire
                </button>
              </div>
            </div>
          ) : (
            /* ACTIVE FORM */
            <form onSubmit={handleSubmit} className="bg-[#242424]/40 border border-[#242424] p-8 md:p-12 rounded-sm space-y-8 text-[#B0B0B0]">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Contact Name */}
                <div className="flex flex-col space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-medium text-[#B0B0B0]" htmlFor="corp-contact">
                    Primary Host Contact <span className="text-[#D4AF37]">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="corp-contact" 
                    required
                    placeholder="e.g. Sibongile Cele"
                    value={contactName} 
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-[#242424] text-xs py-3.5 px-4 text-[#F5F5F5] focus:outline-none focus:border-[#D4AF37] transition-all rounded tracking-wide"
                  />
                </div>

                {/* Company Name */}
                <div className="flex flex-col space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-medium text-[#B0B0B0]" htmlFor="corp-company">
                    Company Name / House Designation
                  </label>
                  <input 
                    type="text" 
                    id="corp-company" 
                    placeholder="e.g. Anglo Resources Ltd"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-[#242424] text-xs py-3.5 px-4 text-[#F5F5F5] focus:outline-none focus:border-[#D4AF37] transition-all rounded tracking-wide"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-medium text-[#B0B0B0]" htmlFor="corp-email">
                    Corporate Email <span className="text-[#D4AF37]">*</span>
                  </label>
                  <input 
                    type="email" 
                    id="corp-email" 
                    required
                    placeholder="e.g. sibongile@angloresources.co.za"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-[#242424] text-xs py-3.5 px-4 text-[#F5F5F5] focus:outline-none focus:border-[#D4AF37] transition-all rounded tracking-wide"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-medium text-[#B0B0B0]" htmlFor="corp-phone">
                    Direct Phone Line <span className="text-[#D4AF37]">*</span>
                  </label>
                  <input 
                    type="tel" 
                    id="corp-phone" 
                    required
                    placeholder="e.g. +27 11 498 7000"
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-[#242424] text-xs py-3.5 px-4 text-[#F5F5F5] focus:outline-none focus:border-[#D4AF37] transition-all rounded tracking-wide"
                  />
                </div>

                {/* Date Selection */}
                <div className="flex flex-col space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-medium text-[#B0B0B0]" htmlFor="corp-date">
                    Requested Date <span className="text-[#D4AF37]">*</span>
                  </label>
                  <input 
                    type="date" 
                    id="corp-date" 
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={date} 
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-[#242424] text-xs py-3.5 px-4 text-[#F5F5F5] focus:outline-none focus:border-[#D4AF37] transition-all rounded tracking-wide font-sans cursor-pointer"
                  />
                </div>

                {/* Event category list */}
                <div className="flex flex-col space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-medium text-[#B0B0B0]" htmlFor="corp-type">
                    Classification Category <span className="text-[#D4AF37]">*</span>
                  </label>
                  <select 
                    id="corp-type" 
                    required
                    value={eventType} 
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-[#242424] text-xs py-3.5 px-4 text-[#F5F5F5] focus:outline-none focus:border-[#D4AF37] transition-all rounded tracking-wide appearance-none cursor-pointer"
                  >
                    <option value="Executive Meeting">Executive Meeting</option>
                    <option value="Product Launch">Product Launch</option>
                    <option value="Corporate Dinner">Corporate Dinner</option>
                    <option value="Birthday Celebration">Birthday Celebration</option>
                    <option value="Private Lounge Buyout">Full Lounge Buyout</option>
                    <option value="Wine Tasting Seminar">Whisky/Wine Seminar</option>
                  </select>
                </div>

                {/* Guests Count */}
                <div className="flex flex-col space-y-2 md:col-span-2">
                  <label className="text-[10px] uppercase tracking-widest font-medium text-[#B0B0B0]" htmlFor="corp-guests">
                    Anticipated Guest Count <span className="text-[#D4AF37]">*</span>: {guests} guests
                  </label>
                  <input 
                    type="range" 
                    id="corp-guests"
                    min="5" 
                    max="150" 
                    step="5"
                    value={guests} 
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full h-1 text-[#D4AF37] bg-neutral-800 accent-[#D4AF37] rounded cursor-pointer mt-2"
                  />
                  <div className="flex justify-between text-[8px] font-mono tracking-wider mt-1 text-neutral-500">
                    <span>5 GUESTS</span>
                    <span>75 GUESTS</span>
                    <span>150+ GUESTS (FULL CAP)</span>
                  </div>
                </div>

              </div>

              {/* Text Area Description of requirements */}
              <div className="flex flex-col space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-medium text-[#B0B0B0]" htmlFor="corp-message">
                  Briefly Describe Specific Staging or Acoustic Demands
                </label>
                <textarea 
                  id="corp-message" 
                  rows={4}
                  placeholder="Outline any key audio-visual demands, stage needs, food buffet structures, single-malt scotch flight preferences, or secure transport/entrance protocols."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-[#242424] text-xs p-4 text-[#F5F5F5] focus:outline-none focus:border-[#D4AF37] transition-all rounded tracking-wide font-sans resize-none"
                />
              </div>

              {/* Submit panel */}
              <div className="text-center pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-10 py-5 bg-[#D4AF37] hover:bg-[#F5F5F5] text-[#1A1A1A] text-xs uppercase tracking-[0.25em] font-bold transition-all duration-300 inline-flex items-center justify-center gap-2 pointer"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-[#1A1A1A] border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting Brief...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Quotation Request</span>
                      <ArrowRight className="w-4.5 h-4.5" />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </section>

      </div>
    </div>
  );
}
