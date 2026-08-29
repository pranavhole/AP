"use client";

import React, { useEffect, useState, useRef } from "react";
import { X, Send, Mail, CheckCircle2, Copy, Check, Loader2, AlertCircle } from "lucide-react";
import { SketchFrame } from "./SketchFrame";
import { SketchIconButton } from "./SketchIconButton";
import { ComicButton } from "./ComicButton";
import { Sparkle, StarDoodle, PaperPlaneDoodle } from "@/components/svg/Doodles";
import { SITE_INFO } from "@/lib/constants";

type InquiryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
};

const serviceOptions = [
  "Web Development",
  "E-Commerce",
  "Web Applications",
  "AI Integrations",
  "General Inquiry",
];

export function InquiryModal({
  isOpen,
  onClose,
  initialService = "Web Development",
}: InquiryModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState(initialService);
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsSubmitted(false);
    setErrorMessage(null);
    onClose();
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SITE_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          service,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to submit inquiry");
      }

      setIsSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      aria-labelledby="modal-title"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-[#17172A]/60 backdrop-blur-sm animate-fadeIn"
      role="dialog"
    >
      {/* Click outside backdrop */}
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10"
        onClick={handleClose}
      />

      {/* Main Hand-drawn Modal Container */}
      <div
        className="relative w-full max-w-[620px] my-auto"
        ref={modalRef}
      >
        <SketchFrame
          className="p-6 sm:p-8 md:p-9 text-left -rotate-[0.2deg]"
          doubleLine
          fill="cream"
          shadow="purple"
          shadowX={7}
          shadowY={8}
          variant="a"
        >
          {/* Header Bar with Hand-Drawn Close Button & Doodles */}
          <div className="flex items-start justify-between gap-4 mb-5 border-b-2 border-dashed border-[#17172A]/20 pb-4">
            <div className="flex items-center gap-3">
              {/* Mail Icon Blob */}
              <div className="relative isolate grid h-12 w-12 flex-none place-items-center -rotate-3">
                <svg
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 h-full w-full overflow-visible"
                  viewBox="0 0 100 100"
                >
                  <path
                    d="M 6,6 C 30,2 72,4 94,3 C 97,24 95,76 96,94 C 72,97 26,95 4,96 C 2,74 4,24 6,6 Z"
                    fill="#F6B8B8"
                    stroke="#17172A"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.4"
                  />
                </svg>
                <Mail className="text-[#17172A]" size={24} strokeWidth={2.4} />
              </div>

              <div>
                <h2
                  className="font-hand text-[clamp(1.75rem,2.8vw,2.4rem)] font-black leading-none text-[#17172A] m-0"
                  id="modal-title"
                >
                  Let&apos;s Talk!
                </h2>
                <p className="font-hand text-sm font-bold text-muted mt-1 mb-0">
                  {SITE_INFO.name} • Start your project inquiry
                </p>
              </div>
            </div>

            {/* Hand-Drawn Close Button */}
            <SketchIconButton
              ariaLabel="Close inquiry dialog"
              blobIndex={2}
              className="w-10 h-10 -mt-1 -mr-1"
              onClick={handleClose}
              shadow="pink"
              variant="pink"
            >
              <X size={20} strokeWidth={2.8} />
            </SketchIconButton>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 border-2 border-red-800 rounded-xl text-red-900 text-sm font-hand font-bold flex items-center gap-2">
              <AlertCircle className="flex-none text-red-700" size={18} />
              <span>{errorMessage}</span>
            </div>
          )}

          {!isSubmitted ? (
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-hand text-base font-black text-[#17172A] mb-1.5" htmlFor="inquiry-name">
                    Your Name *
                  </label>
                  <input
                    className="w-full bg-[#FFFDFC] text-[#17172A] font-bold font-hand text-base px-3.5 py-2.5 rounded-xl border-2 border-[#17172A] shadow-[2px_2px_0_#17172A] focus:outline-none focus:ring-2 focus:ring-[#7653D8]"
                    disabled={isSubmitting}
                    id="inquiry-name"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Smith"
                    required
                    type="text"
                    value={name}
                  />
                </div>

                <div>
                  <label className="block font-hand text-base font-black text-[#17172A] mb-1.5" htmlFor="inquiry-email">
                    Email Address *
                  </label>
                  <input
                    className="w-full bg-[#FFFDFC] text-[#17172A] font-bold font-hand text-base px-3.5 py-2.5 rounded-xl border-2 border-[#17172A] shadow-[2px_2px_0_#17172A] focus:outline-none focus:ring-2 focus:ring-[#7653D8]"
                    disabled={isSubmitting}
                    id="inquiry-email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    type="email"
                    value={email}
                  />
                </div>
              </div>

              {/* Service Selection Pills */}
              <div>
                <label className="block font-hand text-base font-black text-[#17172A] mb-2">
                  What do you need help with?
                </label>
                <div className="flex flex-wrap gap-2">
                  {serviceOptions.map((opt, idx) => {
                    const isSelected = service === opt;
                    const colors = ["#CFEBD8", "#FFF0B0", "#DCC8F6", "#F6B8B8", "#FFFDFC"];
                    const pillBg = isSelected ? "#F6B8B8" : colors[idx % colors.length];

                    return (
                      <button
                        className={`
                          px-3 py-1.5 font-hand text-xs sm:text-sm font-extrabold rounded-lg border-2 border-[#17172A]
                          cursor-pointer transition-all
                          ${
                            isSelected
                              ? "bg-[#F6B8B8] shadow-[2px_2px_0_#7653D8] -translate-y-0.5 text-[#17172A]"
                              : "hover:-translate-y-0.5 shadow-[1.5px_1.5px_0_#17172A] text-[#17172A]/80"
                          }
                        `}
                        disabled={isSubmitting}
                        key={opt}
                        onClick={() => setService(opt)}
                        style={{ backgroundColor: isSelected ? "#F6B8B8" : pillBg }}
                        type="button"
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Project Message */}
              <div>
                <label className="block font-hand text-base font-black text-[#17172A] mb-1.5" htmlFor="inquiry-message">
                  Project Details / Message *
                </label>
                <textarea
                  className="w-full bg-[#FFFDFC] text-[#17172A] font-bold font-hand text-base px-3.5 py-2.5 rounded-xl border-2 border-[#17172A] shadow-[2px_2px_0_#17172A] focus:outline-none focus:ring-2 focus:ring-[#7653D8] min-h-[95px] resize-y"
                  disabled={isSubmitting}
                  id="inquiry-message"
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your goals, timeline, and requirements..."
                  required
                  rows={3}
                  value={message}
                />
              </div>

              {/* Action Buttons & Direct Mail Bar */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <ComicButton
                  className="w-full sm:w-auto"
                  disabled={isSubmitting}
                  size="md"
                  type="submit"
                  variant="pink"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 animate-spin" size={18} />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-1" size={18} strokeWidth={2.4} /> Send Inquiry
                    </>
                  )}
                </ComicButton>

                {/* Copy Direct Mail Chip */}
                <button
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FFF0B0] border-2 border-[#17172A] rounded-lg text-xs font-hand font-black text-[#17172A] shadow-[1.5px_1.5px_0_#17172A] hover:-translate-y-0.5 transition-transform cursor-pointer"
                  onClick={handleCopyEmail}
                  title="Copy email address"
                  type="button"
                >
                  {copied ? <Check className="text-emerald-700" size={14} /> : <Copy size={14} />}
                  <span>{SITE_INFO.email}</span>
                </button>
              </div>
            </form>
          ) : (
            /* Success State */
            <div className="py-8 text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-[#CFEBD8] border-2 border-[#17172A] grid place-items-center shadow-[3px_3px_0_#17172A] -rotate-3">
                <CheckCircle2 className="text-[#17172A]" size={36} strokeWidth={2.5} />
              </div>
              <h3 className="font-hand text-3xl font-black text-[#17172A] m-0">
                Inquiry Saved Successfully!
              </h3>
              <p className="font-hand text-base font-bold text-muted max-w-md mx-auto">
                Thank you for reaching out to <strong>{SITE_INFO.name}</strong>. Your inquiry has been securely stored in our backend database, and our team will review your project requirements and get back to you within 24 hours.
              </p>
              <div className="pt-3">
                <ComicButton
                  onClick={handleClose}
                  size="md"
                  variant="mint"
                >
                  Back to Website
                </ComicButton>
              </div>
            </div>
          )}

          {/* Background Decorative Sparkles */}
          <Sparkle className="absolute -top-4 -left-4 w-7 h-7 text-[#7653D8] -rotate-12 pointer-events-none" />
          <StarDoodle className="absolute -bottom-4 -right-4 w-7 h-7 text-[#F9E37D] rotate-12 pointer-events-none" />
          <PaperPlaneDoodle className="absolute -bottom-6 -left-6 w-20 h-14 text-[#17172A] opacity-25 pointer-events-none" />
        </SketchFrame>
      </div>
    </div>
  );
}
