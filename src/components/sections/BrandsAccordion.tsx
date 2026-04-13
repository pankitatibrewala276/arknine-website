"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { company } from "@/data/company";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const brandImages = [
  "/images/Dukaan Dost.png", "/images/Monotone.png"
];

export function BrandsAccordion() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="brands-feature">
      {/* Left — Accordion */}
      <div className="brands-feature__list">
        <Accordion
          type="single"
          defaultValue="brand-0"
          className="w-full"
          onValueChange={(val) => {
            if (val) {
              setActiveIndex(Number(val.replace("brand-", "")));
            }
          }}
        >
          {company.brands.map((brand, i) => {
            const itemValue = `brand-${i}`;
            const isActive = activeIndex === i;

            return (
              <AccordionItem
                key={brand.name}
                value={itemValue}
                className={i === 0 ? "border-t border-[var(--color-mist)]" : ""}
              >
                <AccordionTrigger className="gap-4 py-6">
                  <div className="flex items-center gap-4 text-left">
                    <span
                      className={`font-[family-name:var(--font-heading)] text-xs transition-colors duration-300 ${
                        isActive
                          ? "text-[var(--color-primary)]"
                          : "text-[var(--color-cool-grey)]"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3
                      className={`font-[family-name:var(--font-heading)] text-lg md:text-xl transition-colors duration-300 ${
                        isActive
                          ? "text-[var(--color-primary)]"
                          : "text-[var(--color-charcoal)]"
                      }`}
                    >
                      {brand.name}
                    </h3>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-[calc(2ch+1rem)]">
                    <p className="text-sm text-[var(--color-stone)] leading-relaxed max-w-[440px] mb-4">
                      {brand.description}
                    </p>
                    {brand.url && (
                      <a
                        href={brand.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:gap-3 transition-all duration-300"
                      >
                        Visit Website
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M3 8h10M9 4l4 4-4 4" />
                        </svg>
                      </a>
                    )}

                    {/* Mobile-only image */}
                    <div className="mt-5 md:hidden overflow-hidden rounded-xl">
                      <Image
                        src={brandImages[i]}
                        alt={brand.name}
                        width={800}
                        height={600}
                        className="w-full max-h-64 object-cover"
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>

      {/* Right — Image with crossfade */}
      <div className="brands-feature__image-wrap">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeIndex}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{
              opacity: { duration: 0.4, ease: [0.25, 1, 0.5, 1] },
              scale: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
            }}
          >
            <Image
              src={brandImages[activeIndex]}
              alt={company.brands[activeIndex].name}
              width={800}
              height={600}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
