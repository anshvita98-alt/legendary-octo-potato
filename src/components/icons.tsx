import type { SVGProps } from "react";

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 100 100"
      fill="none"
      {...props}
    >
      {/* JLI Logo in Purple - 3D effect */}
      {/* Letter J */}
      <path
        d="M 15 85 L 15 30 Q 15 20 25 20 L 35 20 L 35 30 L 25 30 L 25 75 Q 25 85 35 85 L 45 85 L 45 95 L 25 95 Q 15 95 15 85 Z"
        fill="currentColor"
        opacity="0.9"
      />
      {/* Letter L */}
      <path
        d="M 50 20 L 60 20 L 60 85 Q 60 95 50 95 L 40 95 L 40 85 L 50 85 L 50 30 L 50 20 Z"
        fill="currentColor"
        opacity="0.85"
      />
      {/* Letter I */}
      <path
        d="M 68 20 L 78 20 L 78 85 Q 78 95 68 95 L 68 95 L 68 85 L 68 30 L 68 20 Z"
        fill="currentColor"
        opacity="0.8"
      />
      {/* 3D Shadow effect */}
      <path
        d="M 18 88 L 28 88 L 28 98 L 18 98 Z"
        fill="currentColor"
        opacity="0.3"
      />
      <path
        d="M 53 88 L 63 88 L 63 98 L 53 98 Z"
        fill="currentColor"
        opacity="0.3"
      />
      <path
        d="M 71 88 L 81 88 L 81 98 L 71 98 Z"
        fill="currentColor"
        opacity="0.3"
      />
    </svg>
  ),
  metaMask: (props: SVGProps<SVGSVGElement>) => (
    <svg width="24" height="24" viewBox="0 0 119 119" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* This is a simplified representation of the MetaMask logo */}
      <path d="M78.6 23.4l-31.8 18.2-12.8 7.3-13.4-7.7v23.2l13.4 7.7 12.8 7.3 31.8 18.2 13.5-7.8V31.2L78.6 23.4z" fill="#E2761B" />
      <path d="M78.6 23.4L46.8 41.6l-12.8 7.3 12.8 7.3L78.6 74.4l13.5-7.8V31.2L78.6 23.4z" fill="#E4761B" />
      <path d="M46.8 41.6l-12.8 7.3-13.4-7.7v23.2l13.4 7.7 12.8 7.3L78.6 92.8l-12.9-7.4-18.9-10.9z" fill="#D7C1B3" />
      <path d="M46.8 41.6L34 48.9l-13.4-7.7v23.2l13.4 7.7L46.8 80.4l18.9-10.9-18.9-10.9z" fill="#E3751A" />
    </svg>
  ),
  coinbase: (props: SVGProps<SVGSVGElement>) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* This is a simplified representation of the Coinbase logo */}
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" fill="#0052FF" />
      <path d="M12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" fill="white" />
    </svg>
  ),
};
