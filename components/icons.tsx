import * as React from "react";

import { IconSvgProps } from "@/types";

export const Logo: React.FC<IconSvgProps> = ({
  size = 36,
  width,
  height,
  ...props
}) => (
  <svg
    fill="none"
    height={size || height}
    viewBox="0 0 32 32"
    width={size || width}
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);


export const SearchIcon = (props: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

export const StoreIcon: React.FC<IconSvgProps> = ({
  size = 36, // Default size for width and height
  width,
  height,
  ...props
}) => (
  <svg
    width={width || size}
    height={height || size}
    viewBox="0 0 120 120"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <style type="text/css">
      {`
        .st0 { fill: #FEE2B3; }
        .st1 { opacity: 0.1; }
        .st2 { fill: #562349; }
        .st3 { fill: #AD6989; }
        .st4 { fill: #FFA299; }
      `}
    </style>
    <g>
      <rect className="st0" height="62.8" width="66.9" x="26.6" y="36.4" />
      <rect className="st1" height="62.8" width="1.6" x="26.6" y="36.4" />
      <path className="st2" d="M63.8,61.6h-7.7c-2.6,0-4.7-2.1-4.7-4.7V36.4h17.1v20.5C68.5,59.5,66.4,61.6,63.8,61.6z" />
      <path className="st3" d="M46.8,61.6h-7.7c-2.6,0-4.7-2.1-4.7-4.7V36.4h17.1v20.5C51.5,59.5,49.4,61.6,46.8,61.6z" />
      <path className="st2" d="M29.7,61.6H22c-2.6,0-4.7-2.1-4.7-4.7V36.4h17.1v20.5C34.4,59.5,32.3,61.6,29.7,61.6z" />
      <path className="st3" d="M80.9,61.6h-7.7c-2.6,0-4.7-2.1-4.7-4.7V36.4h17.1v20.5C85.6,59.5,83.5,61.6,80.9,61.6z" />
      <path className="st2" d="M98,61.6h-7.7c-2.6,0-4.7-2.1-4.7-4.7V36.4h17.1v20.5C102.6,59.5,100.5,61.6,98,61.6z" />
      <g className="st1">
        <path d="M19.1,57.7V37.2h17.1h17.1h17.1h17.1h15.3v-0.8H85.6H68.5H51.5H34.4H17.4v20.5c0,2.2,1.6,4.1,3.6,4.6 C19.8,60.6,19.1,59.2,19.1,57.7z" />
      </g>
      <rect className="st4" height="24.8" width="16.4" x="39.4" y="74.4" />
      <g>
        <rect className="st4" height="7.4" width="5.4" x="68" y="84.2" />
        <rect className="st4" height="7.4" width="5.4" x="75.8" y="84.2" />
        <rect className="st4" height="7.4" width="5.4" x="68" y="74.4" />
        <rect className="st4" height="7.4" width="5.4" x="75.8" y="74.4" />
      </g>
      <path className="st4" d="M83.1,36.4H36.9V25.2c0-2.5,2-4.5,4.5-4.5h37.2c2.5,0,4.5,2,4.5,4.5V36.4z" />
      <path className="st1" d="M38.4,25.7c0-2.5,2-4.5,4.5-4.5h37.2c0.2,0,0.4,0,0.6,0.1c-0.6-0.3-1.3-0.6-2.1-0.6H41.4c-2.5,0-4.5,2-4.5,4.5v11.2h1.5V25.7z" />
    </g>
  </svg>
);

export const RemoveImageIcon: React.FC<IconSvgProps> = ({
  size = 36, // Default size for width and height
  width,
  height,
  ...props
}) => (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
  <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM6.75 9.25a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Z" clipRule="evenodd" />
</svg>

)

export const AddImageIcon: React.FC<IconSvgProps> = ({
  className = "w-10 h-10", // Default size using Tailwind
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`text-gray-600 ${className}`} // Allow external class overrides
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM11.25 7a.75.75 0 0 1 1.5 0v4.25H17a.75.75 0 0 1 0 1.5h-4.25V17a.75.75 0 0 1-1.5 0v-4.25H7a.75.75 0 0 1 0-1.5h4.25V7Z"
      clipRule="evenodd"
    />
  </svg>
);
