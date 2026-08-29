"use client";

import React from "react";
import { ComicButton, ComicButtonProps } from "./ComicButton";
import { useInquiryModal } from "@/components/context/InquiryContext";

export interface InquiryTriggerButtonProps extends Omit<ComicButtonProps, "onClick"> {
  service?: string;
  children: React.ReactNode;
}

export function InquiryTriggerButton({
  service,
  children,
  ...buttonProps
}: InquiryTriggerButtonProps) {
  const { openInquiry } = useInquiryModal();

  return (
    <ComicButton
      {...buttonProps}
      onClick={() => openInquiry(service)}
    >
      {children}
    </ComicButton>
  );
}

