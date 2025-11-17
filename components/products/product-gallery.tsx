"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

interface ProductGalleryProps {
  images: string[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [selected, setSelected] = useState(images[0]);

  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
        <Image src={selected} alt="Produto" fill className="object-cover" />
      </div>
      <div className="mt-4 grid grid-cols-4 gap-4">
        {images.map((image) => (
          <motion.button
            key={image}
            onClick={() => setSelected(image)}
            whileHover={{ scale: 0.98 }}
            className={`relative aspect-square overflow-hidden rounded-2xl border ${selected === image ? 'border-secondary' : 'border-black/10'}`}
          >
            <Image src={image} alt="thumb" fill className="object-cover" />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
