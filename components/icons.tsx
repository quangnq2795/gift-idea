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


export const LikeIcon: React.FC<IconSvgProps> = ({
  size = 36, // Default size for width and height
  width,
  height,
  ...props
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#41b9e1" d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2l144 0c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48l-97.5 0c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3l0-38.3 0-48 0-24.9c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192l64 0c17.7 0 32 14.3 32 32l0 224c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32L0 224c0-17.7 14.3-32 32-32z"/></svg>
);


export const ShareIcon: React.FC<IconSvgProps> = ({
  size = 36,  // Default size if not provided
  width = size, // Default width to size
  height = size, // Default height to size
  ...props // Capture additional props (like className, onClick, etc.)
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    {...props} // Spread additional props to the SVG
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path
        d="M9.61109 12.4L10.8183 18.5355C11.0462 19.6939 12.6026 19.9244 13.1565 18.8818L19.0211 7.84263C19.248 7.41555 19.2006 6.94354 18.9737 6.58417M9.61109 12.4L5.22642 8.15534C4.41653 7.37131 4.97155 6 6.09877 6H17.9135C18.3758 6 18.7568 6.24061 18.9737 6.58417M9.61109 12.4L18.9737 6.58417M19.0555 6.53333L18.9737 6.58417"
        stroke="#ff3d3d"
        strokeWidth="2"
      />
    </g>
  </svg>
);

export const PinIcon: React.FC<IconSvgProps> = ({
  size = 36,       // Default size if not provided
  width = size,    // Width defaults to size
  height = size,   // Height defaults to size
  ...props         // Spread other SVG props like className, onClick, etc.
}) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    width={width}  
    height={height}  
    xmlns="http://www.w3.org/2000/svg" 
    {...props}  
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M16.4746 4.3747L19.6474 7.55072C20.6549 8.55917 21.4713 9.37641 21.9969 10.0856C22.5382 10.8161 22.8881 11.5853 22.6982 12.4634C22.5083 13.3415 21.8718 13.8972 21.0771 14.3383C20.3055 14.7665 19.2245 15.1727 17.8906 15.6738L15.9136 16.4166C15.1192 16.7151 14.9028 16.8081 14.742 16.9474C14.6611 17.0174 14.5887 17.0967 14.5263 17.1837C14.4021 17.3568 14.329 17.5812 14.1037 18.4L14.0914 18.4449C13.8627 19.2762 13.6739 19.9623 13.4671 20.4774C13.2573 21.0003 12.974 21.4955 12.465 21.786C12.1114 21.9878 11.7112 22.0936 11.3041 22.093C10.7179 22.0921 10.227 21.8014 9.78647 21.4506C9.35243 21.1049 8.8497 20.6016 8.24065 19.9919L6.65338 18.403L2.5306 22.53C2.23786 22.823 1.76298 22.8233 1.46994 22.5305C1.1769 22.2378 1.17666 21.7629 1.4694 21.4699L5.59326 17.3418L4.05842 15.8054C3.45318 15.1996 2.9536 14.6995 2.61002 14.2678C2.26127 13.8297 1.97215 13.3421 1.96848 12.7599C1.96586 12.3451 2.07354 11.9371 2.28053 11.5777C2.57116 11.0731 3.06341 10.7919 3.58296 10.5834C4.09477 10.3779 4.77597 10.1901 5.60112 9.96265L5.6457 9.95036C6.46601 9.7242 6.69053 9.65088 6.86346 9.52638C6.9526 9.4622 7.0337 9.38748 7.10499 9.30383C7.24338 9.14144 7.33502 8.92324 7.62798 8.12367L8.34447 6.16811C8.83874 4.819 9.23907 3.72629 9.66362 2.9461C10.1005 2.14324 10.654 1.49811 11.5357 1.30359C12.4175 1.10904 13.1908 1.46156 13.9246 2.0063C14.6375 2.53559 15.4597 3.35863 16.4746 4.3747ZM13.0304 3.21067C12.4277 2.76322 12.1086 2.71327 11.8588 2.76836C11.609 2.82349 11.3402 3.0033 10.9812 3.66306C10.6161 4.33394 10.2525 5.32066 9.73087 6.7443L9.03642 8.63971C9.02304 8.67621 9.00987 8.71226 8.99686 8.74786C8.76267 9.3886 8.58179 9.88351 8.24665 10.2768C8.09712 10.4522 7.92696 10.609 7.73987 10.7437C7.3205 11.0456 6.81257 11.1852 6.15537 11.3659C6.11884 11.3759 6.08184 11.3861 6.04438 11.3964C5.16337 11.6393 4.56523 11.8054 4.1418 11.9754C3.71693 12.146 3.615 12.2662 3.58038 12.3263C3.50616 12.4552 3.46751 12.6015 3.46845 12.7504C3.46889 12.8201 3.49835 12.9752 3.78366 13.3337C4.06799 13.6909 4.50615 14.1312 5.15229 14.778L9.26897 18.8989C9.91923 19.5498 10.3618 19.9912 10.721 20.2772C11.0814 20.5643 11.2369 20.5929 11.3064 20.593C11.4519 20.5933 11.595 20.5554 11.7215 20.4832C11.7821 20.4486 11.9033 20.3466 12.0751 19.9187C12.2462 19.4923 12.4133 18.8896 12.6574 18.0021C12.6677 17.9648 12.6778 17.9279 12.6878 17.8914C12.8678 17.2352 13.0069 16.7283 13.3075 16.3093C13.4384 16.1268 13.5903 15.9604 13.76 15.8134C14.15 15.4758 14.642 15.2914 15.2786 15.0527C15.314 15.0395 15.3498 15.0261 15.386 15.0124L17.3032 14.2921C18.7112 13.7631 19.6865 13.3946 20.3491 13.0268C21.0001 12.6655 21.178 12.3967 21.2321 12.1463C21.2863 11.8958 21.2353 11.5773 20.7917 10.9787C20.3403 10.3695 19.6045 9.63013 18.541 8.5656L15.1642 5.21861L13.0304 3.21067Z"
        fill="#fb4b4b"
      />
    </g>
  </svg>
);

export const Pin1Icon: React.FC<IconSvgProps> = ({
  size = 36,        // Default size if not provided
  width = size,     // Width defaults to size
  height = size,    // Height defaults to size
  ...props          // Spread other SVG props like className, onClick, etc.
}) => (
  <svg
    viewBox="0 0 24 24"
    width={width}
    height={height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props} // Apply any additional SVG props
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path
        d="M19.1835 7.80516L16.2188 4.83755C14.1921 2.8089 13.1788 1.79457 12.0904 2.03468C11.0021 2.2748 10.5086 3.62155 9.5217 6.31506L8.85373 8.1381C8.59063 8.85617 8.45908 9.2152 8.22239 9.49292C8.11619 9.61754 7.99536 9.72887 7.86251 9.82451C7.56644 10.0377 7.19811 10.1392 6.46145 10.3423C4.80107 10.8 3.97088 11.0289 3.65804 11.5721C3.5228 11.8069 3.45242 12.0735 3.45413 12.3446C3.45809 12.9715 4.06698 13.581 5.28476 14.8L6.69935 16.2163L2.22345 20.6964C1.92552 20.9946 1.92552 21.4782 2.22345 21.7764C2.52138 22.0746 3.00443 22.0746 3.30236 21.7764L7.77841 17.2961L9.24441 18.7635C10.4699 19.9902 11.0827 20.6036 11.7134 20.6045C11.9792 20.6049 12.2404 20.5358 12.4713 20.4041C13.0192 20.0914 13.2493 19.2551 13.7095 17.5825C13.9119 16.8472 14.013 16.4795 14.2254 16.1835C14.3184 16.054 14.4262 15.9358 14.5468 15.8314C14.8221 15.593 15.1788 15.459 15.8922 15.191L17.7362 14.4981C20.4 13.4973 21.7319 12.9969 21.9667 11.9115C22.2014 10.826 21.1954 9.81905 19.1835 7.80516Z"
        fill="#fb4b4b"
      />
    </g>
  </svg>
);


export const HeartIcon: React.FC<IconSvgProps> = ({
  size = 36, // Default size for both width and height
  width = size, // If width is not provided, fallback to size
  height = size, // If height is not provided, fallback to size
  ...props // Capture additional props like className, style, onClick, etc.
}) => (
  <svg
    width={width} // Use width prop
    height={height} // Use height prop
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props} // Spread remaining props onto the SVG element
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
        fill="#fb4b4b" // Set fill color to #fb4b4b
        stroke="#fb4b4b" // Optional: Stroke color matching the fill
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

export const Heart1Icon: React.FC<IconSvgProps> = ({
  size = 36, // Default size for both width and height
  width = size, // If width is not provided, fallback to size
  height = size, // If height is not provided, fallback to size
  ...props // Capture additional props like className, style, onClick, etc.
}) => (
  <svg
    width={width} // Use width prop
    height={height} // Use height prop
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props} // Spread remaining props onto the SVG element
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
        stroke="#fb4b4b"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);
