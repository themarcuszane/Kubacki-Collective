'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { Portrait } from '@/lib/public-images';

type Props = {
  images: readonly Portrait[];
  label: string;
  intervalMs?: number;
};

export function PortraitCarousel({ images, label, intervalMs = 6000 }: Props) {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const respectPreference = () => {
      if (preference.matches) setIsPlaying(false);
    };
    respectPreference();
    preference.addEventListener('change', respectPreference);
    return () => preference.removeEventListener('change', respectPreference);
  }, []);

  useEffect(() => {
    if (!isPlaying || images.length < 2) return;
    const timer = window.setInterval(() => setIndex(current => (current + 1) % images.length), intervalMs);
    return () => window.clearInterval(timer);
  }, [isPlaying, images.length, intervalMs]);

  if (images.length === 0) return null;
  const activeIndex = index % images.length;
  const active = images[activeIndex];
  const select = (next: number) => {
    setIndex((next + images.length) % images.length);
    setIsPlaying(false);
  };

  return (
    <figure
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className="min-w-0 border border-white/15 bg-[#191613]"
      onFocusCapture={event => {
        if ((event.target as HTMLElement).dataset.slideshowToggle !== 'true') setIsPlaying(false);
      }}
      onKeyDown={event => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          select(activeIndex + (event.key === 'ArrowLeft' ? -1 : 1));
        }
      }}
    >
      <div className="relative aspect-[9/10] overflow-hidden bg-[#171411]">
        {images.map((image, i) => (
          <div
            key={image.src}
            role="group"
            aria-roledescription="slide"
            aria-label={`Photo ${i + 1} of ${images.length}: ${image.label}`}
            aria-hidden={i !== activeIndex}
            className={`absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none ${i === activeIndex ? 'opacity-100' : 'opacity-0'}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 48vw, 100vw"
              priority={i === 0}
              style={{ objectFit: 'contain' }}
            />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-white/10 px-4 py-3">
        <figcaption className="min-w-0" aria-live={isPlaying ? 'off' : 'polite'} aria-atomic="true">
          <span className="block text-[10px] uppercase tracking-[0.2em] text-[#c2a77a]">{String(activeIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span>
          <span className="mt-1 block text-sm text-[#f2eee6]">{active.label}</span>
        </figcaption>
        <div className="flex shrink-0 items-center gap-1">
          <button type="button" aria-label="Previous photo" onClick={() => select(activeIndex - 1)} className="h-11 w-11 border border-white/20 text-xl text-[#f2eee6] transition-colors hover:bg-white/10"><span aria-hidden="true">←</span></button>
          <button type="button" data-slideshow-toggle="true" aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'} aria-pressed={isPlaying} onClick={() => setIsPlaying(playing => !playing)} className="h-11 min-w-14 border border-white/20 px-2 text-xs text-[#f2eee6] transition-colors hover:border-[#c2a77a] hover:bg-white/10">{isPlaying ? 'Pause' : 'Play'}</button>
          <button type="button" aria-label="Next photo" onClick={() => select(activeIndex + 1)} className="h-11 w-11 border border-white/20 text-xl text-[#f2eee6] transition-colors hover:bg-white/10"><span aria-hidden="true">→</span></button>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-1 border-t border-white/10 px-3 py-1.5" aria-label="Choose a photo">
        {images.map((image, i) => (
          <button key={image.src} type="button" aria-label={`Show photo ${i + 1}: ${image.label}`} aria-pressed={i === activeIndex} onClick={() => select(i)} className="flex h-8 w-8 items-center justify-center">
            <span aria-hidden="true" className={`h-1.5 rounded-full transition-all motion-reduce:transition-none ${i === activeIndex ? 'w-5 bg-[#c2a77a]' : 'w-1.5 bg-white/45'}`} />
          </button>
        ))}
      </div>
    </figure>
  );
}
