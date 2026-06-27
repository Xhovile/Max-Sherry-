import React, { useState, useRef, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface ExpanderTextProps {
  text: string;
  limit?: number;
}

export default function ExpanderText({ text, limit = 10 }: ExpanderTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isExpanded) return;

    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  if (!text) return null;

  const shouldTruncate = text.length > limit;
  const displayedText = isExpanded 
    ? text 
    : (shouldTruncate ? `${text.slice(0, limit)}...` : text);

  return (
    <div ref={containerRef} className="relative inline-block w-full font-sans">
      <div className={`p-1.5 rounded transition-all duration-200 ${
        isExpanded 
          ? 'bg-[#1e1e1e] border border-[#2e2e2e] shadow-xl z-20 absolute left-0 top-0 min-w-[240px] max-w-sm' 
          : 'bg-transparent'
      }`}>
        <p className={`text-[11px] leading-relaxed break-words text-neutral-400 ${isExpanded ? 'whitespace-pre-wrap italic font-light' : 'italic'}`}>
          “{displayedText}”
        </p>
        
        {shouldTruncate && (
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-1 inline-flex items-center gap-1 text-[9px] uppercase tracking-wider text-[#D4AF37] hover:text-[#F5F5F5] font-bold focus:outline-none transition-colors cursor-pointer"
          >
            {isExpanded ? (
              <>
                <EyeOff className="w-3 h-3" /> Hide
              </>
            ) : (
              <>
                <Eye className="w-3 h-3" /> View
              </>
            )}
          </button>
        )}
      </div>
      {/* Invisible spacer to maintain layout height when absolute positioning triggers */}
      {isExpanded && (
        <div className="opacity-0 pointer-events-none select-none text-[11px] italic p-1.5">
          “{text.slice(0, limit)}...”
          {shouldTruncate && <div className="mt-1 h-3" />}
        </div>
      )}
    </div>
  );
}
