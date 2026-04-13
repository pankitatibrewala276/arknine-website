"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export function BlogArticleImage({ src }: { src: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  /* Parallax: image moves slower than scroll + subtle zoom */
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.02]);

  return (
    <div className="blog-article-image" ref={containerRef}>
      <div className="blog-article-image__wrap">
        <motion.div
          style={{ y, scale, width: "100%", height: "100%" }}
        >
          <Image
            src={src}
            alt=""
            width={1200}
            height={545}
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </motion.div>
      </div>
    </div>
  );
}
