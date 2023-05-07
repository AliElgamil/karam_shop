"use client";
import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
type image = {
  src: string;
  alt: string;
  addClass?: string;
  imgClass?: string;
};
export default function ImageLazy({
  src,
  alt,
  addClass = "h-full",
  imgClass,
}: image) {
  const [loading, setLoading] = useState(true);

  return (
    <div className={`relative ${addClass}  overflow-hidden`}>
      {loading ? (
        <div className="loading absolute inset-0 bg-white"></div>
      ) : null}
      <LazyLoadImage
        src={src}
        alt={alt}
        afterLoad={() => setLoading(false)}
        className={`object-cover w-full h-full ${imgClass} transition`}
      />
    </div>
  );
}
