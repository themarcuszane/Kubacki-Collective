import type { SVGProps } from 'react';

type MarkProps = {
  size?: number;
  className?: string;
  title?: string;
};

export default function Mark({ size = 40, className, title }: MarkProps) {
  const ariaProps: SVGProps<SVGSVGElement> = title
    ? { role: 'img', 'aria-label': title }
    : { 'aria-hidden': true };

  return (
    <svg
      {...ariaProps}
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M10 10h44v44H10z"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path d="M22 20h24v24H22z" fill="currentColor" />
      <path
        d="M27 24h19v19H27z"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path d="M31 26h17v17H31z" fill="var(--color-soft-black, #12100f)" />
    </svg>
  );
}
