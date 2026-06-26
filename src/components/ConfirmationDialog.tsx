import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, Trash2, AlertTriangle, X } from 'lucide-react';

interface ConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationDialog({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDestructive = false,
  onConfirm,
  onCancel
}: ConfirmationDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="fixed inset-0 bg-black/85 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-md bg-[#242424] border border-[#D4AF37]/30 p-6 rounded shadow-2xl z-10 text-[#B0B0B0] font-sans"
          >
            {/* Close button top right */}
            <button
              onClick={onCancel}
              className="absolute top-4 right-4 p-1 text-neutral-500 hover:text-white rounded-full hover:bg-neutral-800 transition-all cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Warning Icon and Header */}
            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-full shrink-0 ${
                isDestructive 
                  ? 'bg-red-500/10 text-red-500 border border-red-500/20' 
                  : 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20'
              }`}>
                {isDestructive ? <Trash2 className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
              </div>
              <div className="flex-1 min-w-0">
                <span className={`text-[8px] uppercase tracking-[0.25em] font-semibold block mb-1 ${
                  isDestructive ? 'text-red-400' : 'text-[#D4AF37]'
                }`}>
                  {isDestructive ? 'Destructive Action Pending' : 'Administrative Decision Required'}
                </span>
                <h3 className="font-serif text-lg text-[#F5F5F5] font-semibold tracking-wide">
                  {title}
                </h3>
                <p className="mt-2 text-xs text-neutral-400 leading-relaxed font-light">
                  {message}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-6 pt-4 border-t border-neutral-800 flex justify-end items-center space-x-3">
              <button
                type="button"
                onClick={onCancel}
                className="px-4.5 py-2.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-[10px] uppercase tracking-widest font-bold transition-all cursor-pointer"
              >
                {cancelText}
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className={`px-5 py-2.5 rounded text-[10px] uppercase tracking-widest font-bold transition-all cursor-pointer ${
                  isDestructive 
                    ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/10' 
                    : 'bg-[#D4AF37] hover:bg-[#F5F5F5] text-[#1A1A1A]'
                }`}
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
