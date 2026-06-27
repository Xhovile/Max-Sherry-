import React, { useState, useEffect } from 'react';
import { Calendar, Users, Clock, Mail, Phone, User, MessageCircle, ClipboardCheck, ArrowRight, ShieldCheck, Armchair, Lock, Check, Info } from 'lucide-react';
import { Reservation } from '../types';

interface ReservationFormProps {
  prefilledEvent?: string;
  createReservation: (res: Omit<Reservation, "id" | "status" | "createdAt">) => Reservation;
  existingReservations?: Reservation[];
}

export const PREMIUM_TABLES = [
  { id: 1, name: "Sommelier Vault I", capacity: "2-4 guests", tier: "Ultra-VIP" },
  { id: 2, name: "Sommelier Vault II", capacity: "2-4 guests", tier: "Ultra-VIP" },
  { id: 3, name: "Skyline Terrace Alcove A", capacity: "2 guests", tier: "Premium" },
  { id: 4, name: "Skyline Terrace Alcove B", capacity: "2 guests", tier: "Premium" },
  { id: 5, name: "The Mahogany Salon Center", capacity: "4-6 guests", tier: "Elite" },
  { id: 6, name: "The Mahogany Salon Corner", capacity: "2-4 guests", tier: "Elite" },
  { id: 7, name: "Vintage Reserve Booth", capacity: "4-6 guests", tier: "Royal" },
  { id: 8, name: "Sherry Hearthside Sofa", capacity: "2-3 guests", tier: "Cozy" },
  { id: 9, name: "The Grand Library Table", capacity: "8-12 guests", tier: "Ambassador" },
  { id: 10, name: "Presidential Skyline Pavilion", capacity: "12-25 guests", tier: "Imperial" },
];

export default function ReservationForm({ prefilledEvent = "", createReservation, existingReservations = [] }: ReservationFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [specialRequests, setSpecialRequests] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedVoucher, setSubmittedVoucher] = useState<Reservation | null>(null);

  const isMonday = date ? new Date(date + 'T00:00:00').getDay() === 1 : false;

  // Auto-set prefilled requests
  useEffect(() => {
    if (prefilledEvent) {
      setSpecialRequests(`Booking specifically for: [${prefilledEvent}]`);
    } else {
      setSpecialRequests("");
    }
  }, [prefilledEvent]);

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", 
    "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "08:30 PM"
  ];

  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);

  function isSameTimeSlot(t1: string, t2: string): boolean {
    if (!t1 || !t2) return false;
    const normalize = (t: string) => {
      t = t.trim().toLowerCase();
      let hour = 0;
      if (t.includes('pm') || t.includes('am')) {
        const parts = t.replace(/(am|pm)/, '').trim().split(':');
        hour = parseInt(parts[0], 10);
        if (t.includes('pm') && hour < 12) hour += 12;
        if (t.includes('am') && hour === 12) hour = 0;
      } else {
        const parts = t.split(':');
        hour = parseInt(parts[0], 10);
      }
      return hour;
    };
    try {
      return normalize(t1) === normalize(t2);
    } catch (e) {
      return t1 === t2;
    }
  }

  // Calculate occupied tables dynamically
  const getOccupiedTableIds = (): Set<number> => {
    const occupied = new Set<number>();
    if (!date || !time) return occupied;

    const matchingRes = existingReservations.filter(
      res => res.date === date && res.status !== 'cancelled' && isSameTimeSlot(res.time, time)
    );

    matchingRes.forEach((res) => {
      const tableId = (Math.abs(res.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % 10) + 1;
      let finalTableId = tableId;
      for (let i = 0; i < 10; i++) {
        const candidate = ((tableId - 1 + i) % 10) + 1;
        if (!occupied.has(candidate)) {
          finalTableId = candidate;
          break;
        }
      }
      occupied.add(finalTableId);
    });

    return occupied;
  };

  const occupiedTableIds = getOccupiedTableIds();

  // Reset selected table if it gets booked or is invalid for the current slot
  useEffect(() => {
    if (selectedTableId && occupiedTableIds.has(selectedTableId)) {
      setSelectedTableId(null);
    }
  }, [date, time, selectedTableId, occupiedTableIds]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !date || !time) {
      alert("Please populate all necessary fields to authenticate your reservation.");
      return;
    }

    setIsSubmitting(true);

    // Simulate luxury processing lag
    setTimeout(() => {
      let finalRequests = specialRequests;
      if (selectedTableId) {
        const preferredTable = PREMIUM_TABLES.find(t => t.id === selectedTableId);
        if (preferredTable) {
          finalRequests = `[Seating Preference: ${preferredTable.name}] ${specialRequests}`.trim();
        }
      }

      const confirmedRes = createReservation({
        name,
        email,
        phone,
        date,
        time,
        guests,
        specialRequests: finalRequests
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
      setSelectedTableId(null);
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
                href={`https://wa.me/265995700800?text=Hi%20Max%20%26%20Sherry%2C%20I've%20just%20submitted%20reservation%20ID%20MS-${submittedVoucher.id.split('_')[1]}%20for%20${submittedVoucher.name}.%20Please%20verify.`}
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
                    placeholder="e.g. +265 995 70 08 00"
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
                {isMonday && (
                  <span className="text-[10px] text-amber-500 font-light mt-1">
                    ⚠️ Note: We are closed on Mondays. Booking is subject to special corporate buyout/approval.
                  </span>
                )}
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

            {/* Interactive Premium Table Availability Map */}
            <div className="bg-[#1C1C1C]/60 border border-[#242424] p-6 rounded-lg space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h4 className="font-serif text-lg text-[#F5F5F5] uppercase tracking-wider flex items-center gap-2">
                    <Armchair className="w-5 h-5 text-[#D4AF37]" /> Living Salon & Spatial Allocation
                  </h4>
                  <p className="text-[10px] text-neutral-400 mt-0.5 font-light">
                    Real-time boutique seating map for {date || "chosen date"} at {time || "chosen time"}
                  </p>
                </div>
                
                {date && time ? (
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-neutral-500 text-[10px] uppercase tracking-wider font-semibold">Status:</span>
                    <span className="px-2.5 py-1 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 rounded-full text-[10px] font-bold tracking-wider uppercase">
                      {10 - occupiedTableIds.size} of 10 Tables Available
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-amber-500 text-[10px] uppercase tracking-wider font-semibold bg-amber-500/5 px-2.5 py-1.5 rounded border border-amber-500/10">
                    <Info className="w-3.5 h-3.5 shrink-0" /> Pending Date & Time Input
                  </div>
                )}
              </div>

              {date && time ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {PREMIUM_TABLES.map((table) => {
                      const isOccupied = occupiedTableIds.has(table.id);
                      const isSelected = selectedTableId === table.id;
                      
                      return (
                        <button
                          key={table.id}
                          type="button"
                          disabled={isOccupied}
                          onClick={() => setSelectedTableId(isSelected ? null : table.id)}
                          className={`relative text-left p-3.5 rounded-lg border transition-all duration-300 flex flex-col justify-between h-28 cursor-pointer ${
                            isOccupied
                              ? 'bg-neutral-900/40 border-neutral-800/80 text-neutral-600 cursor-not-allowed select-none opacity-40'
                              : isSelected
                              ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-[#F5F5F5] shadow-[0_0_15px_rgba(212,175,55,0.15)] ring-1 ring-[#D4AF37]'
                              : 'bg-[#141414] border-neutral-800/80 text-neutral-300 hover:border-neutral-700/80 hover:bg-[#1A1A1A]'
                          }`}
                        >
                          <div className="flex items-start justify-between w-full">
                            <span className="text-[10px] font-mono text-neutral-500 font-medium">#{table.id}</span>
                            {isOccupied ? (
                              <Lock className="w-3.5 h-3.5 text-neutral-600" />
                            ) : isSelected ? (
                              <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                            ) : (
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                            )}
                          </div>

                          <div className="mt-auto">
                            <h5 className={`text-[11px] font-serif font-medium leading-tight ${isSelected ? 'text-[#D4AF37]' : 'text-neutral-200'}`}>
                              {table.name}
                            </h5>
                            <div className="flex items-center gap-1.5 mt-1.5">
                              <span className="text-[8px] uppercase tracking-wider text-neutral-500">{table.capacity}</span>
                              <span className="text-[7px] px-1 py-0.2 bg-neutral-900 border border-neutral-800 rounded text-neutral-400 font-mono scale-90 origin-left">{table.tier}</span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Dynamic Help Text & Selected Preference Highlight */}
                  <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-3 border-t border-neutral-900">
                    <div className="text-[10px] text-neutral-400 font-light max-w-lg leading-normal flex items-start gap-1.5">
                      <span className="text-[#D4AF37] font-semibold mt-0.5">Note:</span>
                      <span>
                        Seating pre-selections are registered as requests on your voucher receipt and optimized by our Head Concierge. We prioritize specific room allocations wherever logistically possible.
                      </span>
                    </div>

                    {selectedTableId && (
                      <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 px-3.5 py-2 rounded flex items-center gap-2 text-xs text-neutral-200 animate-fadeIn">
                        <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <div>
                          <p className="text-[9px] uppercase tracking-wider text-neutral-500 leading-none">Requested Seating</p>
                          <p className="font-serif text-[#D4AF37] font-semibold mt-0.5">{PREMIUM_TABLES.find(t => t.id === selectedTableId)?.name}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center text-neutral-500 bg-[#141414]/40 border border-dashed border-neutral-800/80 rounded-lg">
                  <Armchair className="w-8 h-8 text-neutral-600 mb-2 opacity-50" />
                  <p className="text-xs font-serif italic text-neutral-400">Please provide a valid date and time slot above.</p>
                  <p className="text-[10px] text-neutral-600 mt-1 max-w-xs leading-normal">
                    The luxury table roster updates live to prevent spatial collisions and showcase table options.
                  </p>
                </div>
              )}
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
