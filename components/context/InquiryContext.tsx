"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { InquiryModal } from "@/components/ui/InquiryModal";

type InquiryContextType = {
  isOpen: boolean;
  openInquiry: (initialService?: string) => void;
  closeInquiry: () => void;
};

const InquiryContext = createContext<InquiryContextType | undefined>(undefined);

export function InquiryProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);

  const openInquiry = (service?: string) => {
    setSelectedService(service);
    setIsOpen(true);
  };

  const closeInquiry = () => {
    setIsOpen(false);
  };

  return (
    <InquiryContext.Provider value={{ isOpen, openInquiry, closeInquiry }}>
      {children}
      <InquiryModal
        initialService={selectedService}
        isOpen={isOpen}
        onClose={closeInquiry}
      />
    </InquiryContext.Provider>
  );
}

export function useInquiryModal() {
  const context = useContext(InquiryContext);
  if (!context) {
    throw new Error("useInquiryModal must be used within an InquiryProvider");
  }
  return context;
}

