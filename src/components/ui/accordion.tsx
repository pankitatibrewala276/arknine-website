"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b border-[var(--color-mist)]", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-5 font-medium cursor-pointer group",
        className
      )}
      {...props}
    >
      {children}
      <span className="accordion-icon relative w-4 h-4 shrink-0" aria-hidden="true">
        {/* Horizontal line — always visible */}
        <span className="absolute top-1/2 left-0 w-full h-[1.5px] bg-[var(--color-cool-grey)] -translate-y-1/2 transition-colors duration-300 group-[[data-state=open]]:bg-[var(--color-primary)]" />
        {/* Vertical line — scales to 0 when open */}
        <span className="absolute top-0 left-1/2 w-[1.5px] h-full bg-[var(--color-cool-grey)] -translate-x-1/2 transition-all duration-300 [cubic-bezier(0.25,1,0.5,1)] origin-center group-[[data-state=open]]:scale-y-0 group-[[data-state=open]]:opacity-0 group-[[data-state=open]]:bg-[var(--color-primary)]" />
      </span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm data-[state=closed]:animate-[accordion-up_250ms_cubic-bezier(0.25,1,0.5,1)] data-[state=open]:animate-[accordion-down_350ms_cubic-bezier(0.25,1,0.5,1)]"
    {...props}
  >
    <div className={cn("pb-5 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
