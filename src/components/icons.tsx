import type { SVGProps } from "react";

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12.4 2.7c.3-.3.8-.3 1.1 0l7.1 7.1c.3.3.3.8 0 1.1l-7.1 7.1c-.3.3-.8.3-1.1 0l-7.1-7.1c-.3-.3-.3-.8 0-1.1l7.1-7.1z" />
      <path d="M12 22V12" />
      <path d="m3.5 10.5 8.5 8.5 8.5-8.5" />
    </svg>
  ),
  metaMask: (props: SVGProps<SVGSVGElement>) => (
    <svg width="24" height="24" viewBox="0 0 119 119" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        {/* This is a simplified representation of the MetaMask logo */}
        <path d="M78.6 23.4l-31.8 18.2-12.8 7.3-13.4-7.7v23.2l13.4 7.7 12.8 7.3 31.8 18.2 13.5-7.8V31.2L78.6 23.4z" fill="#E2761B"/>
        <path d="M78.6 23.4L46.8 41.6l-12.8 7.3 12.8 7.3L78.6 74.4l13.5-7.8V31.2L78.6 23.4z" fill="#E4761B"/>
        <path d="M46.8 41.6l-12.8 7.3-13.4-7.7v23.2l13.4 7.7 12.8 7.3L78.6 92.8l-12.9-7.4-18.9-10.9z" fill="#D7C1B3"/>
        <path d="M46.8 41.6L34 48.9l-13.4-7.7v23.2l13.4 7.7L46.8 80.4l18.9-10.9-18.9-10.9z" fill="#E3751A"/>
    </svg>
  ),
  coinbase: (props: SVGProps<SVGSVGElement>) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        {/* This is a simplified representation of the Coinbase logo */}
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" fill="#0052FF"/>
        <path d="M12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" fill="white"/>
    </svg>
  ),
};
