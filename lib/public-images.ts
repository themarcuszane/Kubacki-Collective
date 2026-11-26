export type Portrait = {
  src: string;
  alt: string;
  label: string;
};

export const shirtPortrait: Portrait = {
  src: '/images/collective/derek-kubacki-shirt-poland.png',
  alt: 'Derek in the Kubacki Collective shirt concept',
  label: 'The shirt concept'
};

export const homePortraits: readonly Portrait[] = [
  shirtPortrait,
  { src: '/images/hero/paris-coat.jpg', alt: 'Derek in a dark coat on a city street', label: 'A city point of view' },
  { src: '/images/hero/rain-neon.jpg', alt: 'Derek under neon lights in the rain', label: 'After the rain' },
  { src: '/images/hero/snow-fire.jpg', alt: 'Derek beside a fire in a snowy forest', label: 'A winter pause' }
];

export const collectivePortraits: readonly Portrait[] = [
  shirtPortrait,
  { src: '/images/collective/mountain-view.jpg', alt: 'Derek on a mountain trail', label: 'Room to breathe' },
  { src: '/images/collective/nyc-walk-01.jpg', alt: 'Derek crossing a city street in a knit cap', label: 'The everyday uniform' },
  { src: '/images/collective/nyc-walk-02.jpg', alt: 'Derek walking through the city in a blue blazer', label: 'Keep moving' },
  { src: '/images/collective/paris-street-02.jpg', alt: 'Derek in a dark coat and cap on a Paris street', label: 'Quiet confidence' },
  { src: '/images/collective/Paris1.jpeg', alt: 'Derek in a trench coat near the Eiffel Tower', label: 'A change of scenery' },
  { src: '/images/collective/umbrella-portrait.jpg', alt: 'Derek beneath a clear umbrella', label: 'Whatever the weather' }
];
