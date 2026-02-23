export default function HeroOverlay() {
  return (
    <>
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'repeating-linear-gradient(0deg, rgba(255,255,255,0.018) 0, rgba(255,255,255,0.018) 1px, transparent 1px, transparent 3px)',
          opacity: 0.35,
          mixBlendMode: 'soft-light'
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'linear-gradient(to bottom, rgba(18,16,15,0.28) 0%, rgba(18,16,15,0.7) 58%, rgba(18,16,15,0.9) 100%)'
        }}
      />
    </>
  );
}
