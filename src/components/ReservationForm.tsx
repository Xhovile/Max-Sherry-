import React, { useState, useEffect } from 'react';
import { Calendar, Users, Clock, Mail, Phone, User, MessageCircle, ClipboardCheck, ArrowRight, ShieldCheck } from 'lucide-react';
import { Reservation } from '../types';

interface ReservationFormProps {
  prefilledEvent?: string;
  createReservation: (res: Omit<Reservation, "id" | "status" | "createdAt">) => Reservation;
}

export default function ReservationForm({ prefilledEvent = "", createReservation }: ReservationFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [specialRequests, setSpecialRequests] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedVoucher, setSubmittedVoucher] = useState<Reservation | null>(null);

  // Auto-set prefilled requests
  useEffect(() => {
    if (prefilledEvent) {
      setSpecialRequests(`Booking specifically for: [${prefilledEvent}]`);
    } else {
      setSpecialRequests("");
    }
  }, [prefilledEvent]);

  const timeSlots = [
    "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", 
    "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !date || !time) {
      alert("Please populate all necessary fields to authenticate your reservation.");
      return;
    }

    setIsSubmitting(true);

    // Simulate luxury processing lag
    setTimeout(() => {
      const confirmedRes = createReservation({
        name,
        email,
        phone,
        date,
        time,
        guests,
        specialRequests
      });

      setSubmittedVoucher(confirmedRes);
      setIsSubmitting(false);

      // Clean state
      setName("");
      setEmail("");
      setPhone("");
      setDate("");
      setTime("");
      setGuests(2);
      setSpecialRequests("");
    }, 1200);
  };

  return (
    <div id="reservation-page-view" className="w-full bg-[#1A1A1A] pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Title Deck */}
        <div className="text-center max-w-2xl mx-auto mb-12 flex flex-col items-center">
          <span className="text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-semibold mb-3">
            &bull; PRIVATE BOOKING PROTOCOL &bull;
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-[#F5F5F5] font-medium leading-none">
            Secure a Sommelier Table
          </h1>
          <p className="text-xs md:text-sm text-[#B0B0B0] mt-3 font-light tracking-wide">
            Submissions go directly to management’s scheduling system. Pre-schedule events, custom dietary courses, or private requests.
          </p>
        </div>

        {submittedVoucher ? (
          /* SUCCESS SCREEN - RESERVATION VOUCHER */
          <div id="reservation-voucher" className="bg-[#242424] border-2 border-[#D4AF37]/30 max-w-xl mx-auto rounded p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#D4AF37]" />
            
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] mx-auto flex items-center justify-center mb-6 border border-[#D4AF37]/30">
              <ClipboardCheck className="w-8 h-8" />
            </div>

            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block">Booking Authorized</span>
            <h2 className="font-serif text-3xl text-[#F5F5F5] mt-2 mb-4">Sovereign Receipt</h2>
            
            {/* Divider */}
            <div className="w-full border-t border-[#1A1A1A] my-6 border-dashed" />

            {/* Voucher Metadata Grid */}
            <div className="grid grid-cols-2 gap-y-4 gap-x-12 text-left mb-8 max-w-md mx-auto">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#B0B0B0] block">Reservation ID</span>
                <span className="text-xs font-mono text-[#F5F5F5] font-semibold">MS-{submittedVoucher.id.split('_')[1]}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#B0B0B0] block">Guest Host</span>
                <span className="text-xs text-[#F5F5F5] font-semibold">{submittedVoucher.name}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#B0B0B0] block">Date Reserved</span>
                <span className="text-xs text-[#F5F5F5] font-semibold">{submittedVoucher.date}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#B0B0B0] block">Time Window</span>
                <span className="text-xs text-[#F5F5F5] font-semibold">{submittedVoucher.time}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#B0B0B0] block">Sovereign Count</span>
                <span className="text-xs text-[#D4AF37] font-semibold">{submittedVoucher.guests} Adults</span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#B0B0B0] block">Lounge Status</span>
                <span className="text-xs font-sans text-amber-400 capitalize font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                  {submittedVoucher.status}
                </span>
              </div>
            </div>

            {submittedVoucher.specialRequests && (
              <div className="p-4 bg-[#1A1A1A]/60 border-l-2 border-[#D4AF37] text-left max-w-md mx-auto mb-8 rounded">
                <span className="text-[8px] uppercase tracking-widest text-[#B0B0B0] block font-mono">Special Directives</span>
                <p className="text-xs text-[#B0B0B0] mt-1 font-light italic">“{submittedVoucher.specialRequests}”</p>
              </div>
            )}

            <p className="text-[11px] text-[#B0B0B0] leading-relaxed max-w-md mx-auto mb-8">
              A reservation counselor will verify your table allocation via phone/email shortly. If you require immediate booking updates, please contact Max or Sherry directly on WhatsApp.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href={`https://wa.me/27825554321?text=Hi%20Max%20%26%20Sherry%2C%20I've%20just%20submitted%20reservation%20ID%20MS-${submittedVoucher.id.split('_')[1]}%20for%20${submittedVoucher.name}.%20Please%20verify.`}
                target="_blank"
                referrerPolicy="no-referrer"
                className="w-full sm:w-auto px-6 py-3.5 bg-emerald-700 hover:bg-emerald-600 text-[#F5F5F5] text-[10px] uppercase tracking-widest font-semibold font-sans transition-all inline-flex items-center justify-center gap-2"
              >
                <ClipboardCheck className="w-4 h-4" /> Message WhatsApp
              </a>
              <button
                onClick={() => setSubmittedVoucher(null)}
                className="w-full sm:w-auto px-6 py-3.5 bg-transparent hover:bg-[#D4AF37]/10 text-xs border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[#D4AF37] uppercase tracking-widest font-semibold transition-all"
              >
                Book Another Table
              </button>
            </div>
          </div>
        ) : (
          /* FORM ENTRY STAGE */
          <form id="reservation-booking-form" onSubmit={handleSubmit} className="bg-[#242424]/40 border border-[#242424] p-8 md:p-12 rounded-sm space-y-8">
            
            {prefilledEvent && (
              <div className="p-4 bg-[#D4AF37]/10 border-l border-[#D4AF37] text-[#D4AF37] text-xs flex items-center justify-between rounded">
                <span>Currently scheduling for: <strong>{prefilledEvent}</strong></span>
                <span className="text-[9px] uppercase tracking-wider font-semibold bg-[#D4AF37] text-[#1A1A1A] px-2 py-0.5 rounded-sm">Premium Selection</span>
              </div>
            )}

            {/* Input fields grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Name */}
              <div className="flex flex-col space-y-2">
                <label className="text-[10px] text-[#B0B0B0] uppercase tracking-widest font-medium" htmlFor="host-name">
                  Guest Host Name <span className="text-[#D4AF37]">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#B0B0B0]" />
                  <input 
                    type="text" 
                    id="host-name" 
                    required
                    placeholder="e.g. Mzwandile Nkosi"
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-[#242424] text-xs py-3.5 pl-12 pr-4 text-[#F5F5F5] focus:outline-none focus:border-[#D4AF37] transition-all rounded tracking-wide"
                  />
                </div>
              </div>

              {/* Guests Count */}
              <div className="flex flex-col space-y-2">
                <label className="text-[10px] text-[#B0B0B0] uppercase tracking-widest font-medium" htmlFor="guest-count">
                  Number of Guests <span className="text-[#D4AF37]">*</span>
                </label>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#B0B0B0]" />
                  <select 
                    id="guest-count" 
                    required
                    value={guests} 
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full bg-[#1A1A1A] border border-[#242424] text-xs py-3.5 pl-12 pr-4 text-[#F5F5F5] focus:outline-none focus:border-[#D4AF37] transition-all rounded tracking-wide appearance-none"
                  >
                    {[...Array(20)].map((_, i) => (
                      <option key={i+1} value={i+1} className="bg-[#1A1A1A] text-[#F5F5F5]">
                        {i+1 === 1 ? '1 Guest (Solo Dining)' : `${i+1} Guests`}
                      </option>
                    ))}
                    <option value="25" className="bg-[#1A1A1A] text-[#F5F5F5]">Private Party (20 - 45 guests)</option>
                    <option value="50" className="bg-[#1A1A1A] text-[#F5F5F5]">Full Lounge Buyout (45+ guests)</option>
                  </select>
                </div>
              </div>

              {/* Personal Email */}
              <div className="flex flex-col space-y-2">
                <label className="text-[10px] text-[#B0B0B0] uppercase tracking-widest font-medium" htmlFor="guest-email">
                  Email Address <span className="text-[#D4AF37]">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#B0B0B0]" />
                  <input 
                    type="email" 
                    id="guest-email" 
                    required
                    placeholder="e.g. nkosi.m@heritage.co.za"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-[#242424] text-xs py-3.5 pl-12 pr-4 text-[#F5F5F5] focus:outline-none focus:border-[#D4AF37] transition-all rounded tracking-wide"
                  />
                </div>
              </div>

              {/* Personal Contact phone */}
              <div className="flex flex-col space-y-2">
                <label className="text-[10px] text-[#B0B0B0] uppercase tracking-widest font-medium" htmlFor="guest-phone">
                  Phone Number <span className="text-[#D4AF37]">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#B0B0B0]" />
                  <input 
                    type="tel" 
                    id="guest-phone" 
                    required
                    placeholder="e.g. +27 82 555 4321"
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-[#242424] text-xs py-3.5 pl-12 pr-4 text-[#F5F5F5] focus:outline-none focus:border-[#D4AF37] transition-all rounded tracking-wide"
                  />
                </div>
              </div>

              {/* Date selection  */}
              <div className="flex flex-col space-y-2">
                <label className="text-[10px] text-[#B0B0B0] uppercase tracking-widest font-medium" htmlFor="booking-date">
                  Reservation Date <span className="text-[#D4AF37]">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#B0B0B0]" />
                  <input 
                    type="date" 
                    id="booking-date" 
                    required
                    min={new Date().toISOString().split('T')[0]} // prevent past bookings
                    value={date} 
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-[#242424] text-xs py-3.5 pl-12 pr-4 text-[#F5F5F5] focus:outline-none focus:border-[#D4AF37] transition-all rounded tracking-wide font-sans cursor-pointer"
                  />
                </div>
              </div>

              {/* Time slice selections */}
              <div className="flex flex-col space-y-2">
                <label className="text-[10px] text-[#B0B0B0] uppercase tracking-widest font-medium" htmlFor="booking-time">
                  Time Allocation <span className="text-[#D4AF37]">*</span>
                </label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#B0B0B0]" />
                  <select 
                    id="booking-time" 
                    required
                    value={time} 
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-[#242424] text-xs py-3.5 pl-12 pr-4 text-[#F5F5F5] focus:outline-none focus:border-[#D4AF37] transition-all rounded tracking-wide cursor-pointer appearance-none"
                  >
                    <option value="" className="text-neutral-500">Pick preferred time slot...</option>
                    <optgroup label="Brunch & Afternoon Slots" className="bg-[#1A1A1A] text-[#B0B0B0]">
                      {timeSlots.slice(0, 6).map((slot) => (
                        <option key={slot} value={slot} className="text-[#F5F5F5] bg-[#1A1A1A]">{slot}</option>
                      ))}
                    </optgroup>
                    <optgroup label="Dinner & Lounge Lounge Slots" className="bg-[#1A1A1A] text-[#B0B0B0]">
                      {timeSlots.slice(6).map((slot) => (
                        <option key={slot} value={slot} className="text-[#F5F5F5] bg-[#1A1A1A]/90">{slot}</option>
                      ))}
                    </optgroup>
                  </select>
                </div>
              </div>

            </div>

            {/* Special Request Area */}
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] text-[#B0B0B0] uppercase tracking-widest font-medium" htmlFor="booking-demands">
                Special Directives & Request Details
              </label>
              <textarea 
                id="booking-demands" 
                rows={4}
                placeholder="Declare any severe allergens, dietary preferences, celebratory triggers (e.g. birthdays, fine-art showcases), or specific section requests (e.g. Sommelier Vault / Skyline Terrace)."
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-[#242424] text-xs p-4 text-[#F5F5F5] focus:outline-none focus:border-[#D4AF37] transition-all rounded tracking-wide font-sans resize-none"
              />
            </div>

            {/* Booking rules agreement */}
            <div className="flex items-start gap-3 bg-[#1A1A1A]/40 p-4 border border-[#242424] rounded">
              <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
              <div className="text-[10px] text-[#B0B0B0] leading-normal font-light">
                By ticking submit, you understand that table locks are held for maximum 15 minutes after scheduled time. Large private gatherings (8+ guests) are subject to vertical dining rules and may require card authorizations in follow-up calls.
              </div>
            </div>

            {/* Submit Control */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-10 py-4.5 bg-[#D4AF37] hover:bg-[#F5F5F5] text-[#1A1A1A] text-xs uppercase tracking-[0.25em] font-bold transition-all duration-300 inline-flex items-center justify-center gap-2 pointer shadow-md"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-[#1A1A1A] border-t-transparent rounded-full animate-spin" />
                    <span>Synchronizing Server...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Reservation Request</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
