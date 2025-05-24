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

export const ShopeeIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    className={className}
    fill="none"
    aria-hidden="true"
  >
    <g>
      <g transform="scale(5.33333,5.33333)">
        <path
          d="M36.683,43h-25.366c-2.136,0 -3.896,-1.679 -3.996,-3.813l-1.272,-27.14c-0.027,-0.57 0.428,-1.047 0.999,-1.047h33.904c0.571,0 1.026,0.477 0.999,1.047l-1.272,27.14c-0.1,2.134 -1.86,3.813 -3.996,3.813z"
          fill="#fafafa"
        />
        <path
          d="M32.5,11.5h-2c0,-4.136 -2.916,-7.5 -6.5,-7.5c-3.584,0 -6.5,3.364 -6.5,7.5h-2c0,-5.238 3.813,-9.5 8.5,-9.5c4.687,0 8.5,4.262 8.5,9.5z"
          fill="#fafafa"
        />
        <path
          d="M24.248,25.688c-2.741,-1.002 -4.405,-1.743 -4.405,-3.577c0,-1.851 1.776,-3.195 4.224,-3.195c1.685,0 3.159,0.66 3.888,1.052c0.124,0.067 0.474,0.277 0.672,0.41l0.13,0.087l0.958,-1.558l-0.157,-0.103c-0.772,-0.521 -2.854,-1.733 -5.49,-1.733c-3.459,0 -6.067,2.166 -6.067,5.039c0,3.257 2.983,4.347 5.615,5.309c3.07,1.122 4.934,1.975 4.934,4.349c0,1.828 -2.067,3.314 -4.609,3.314c-2.864,0 -5.326,-2.105 -5.349,-2.125l-0.128,-0.118l-1.046,1.542l0.106,0.087c0.712,0.577 3.276,2.458 6.416,2.458c3.619,0 6.454,-2.266 6.454,-5.158c-0.001,-3.835 -3.266,-5.027 -6.146,-6.08z"
          fill="#f4511e"
        />
      </g>
    </g>
  </svg>
);



export const FacebookIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

export const EditIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

export const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6L6 18" />
    <path d="M6 6l12 12" />
  </svg>
);

export const AddIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => (
  <svg
    width={width || size}
    height={height || size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4v16m8-8H4"
    />
  </svg>
);

export const BookmarkIcon = ({ active = false, className = "w-5 h-5", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-5-7 5V5z"
      fill={active ? "#ef4444" : "none"}
      stroke={active ? "#ef4444" : "#3b82f6"}
    />
  </svg>
);

export const SettingsIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.049 2.927c.3-1.14 1.952-1.14 2.252 0a1.724 1.724 0 002.573 1.01c.993-.64 2.23.297 1.89 1.39a1.724 1.724 0 001.516 2.36c1.19.09 1.67 1.64.8 2.36a1.724 1.724 0 000 2.62c.87.72.39 2.27-.8 2.36a1.724 1.724 0 00-1.516 2.36c.34 1.093-.897 2.03-1.89 1.39a1.724 1.724 0 00-2.573 1.01c-.3 1.14-1.952 1.14-2.252 0a1.724 1.724 0 00-2.573-1.01c-.993.64-2.23-.297-1.89-1.39a1.724 1.724 0 00-1.516-2.36c-1.19-.09-1.67-1.64-.8-2.36a1.724 1.724 0 000-2.62c-.87-.72-.39-2.27.8-2.36a1.724 1.724 0 001.516-2.36c-.34-1.093.897-2.03 1.89-1.39.996.64 2.23-.297 2.573-1.01z"
    />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth={2} />
  </svg>
);

export const LogoutIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
  </svg>
);

export const ZaloIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 50 50"
    className={className}
    fill="none"
    aria-hidden="true"
  >
    <path fillRule="evenodd" clipRule="evenodd" d="M22.782 0.166016H27.199C33.2653 0.166016 36.8103 1.05701 39.9572 2.74421C43.1041 4.4314 45.5875 6.89585 47.2557 10.0428C48.9429 13.1897 49.8339 16.7347 49.8339 22.801V27.1991C49.8339 33.2654 48.9429 36.8104 47.2557 39.9573C45.5685 43.1042 43.1041 45.5877 39.9572 47.2559C36.8103 48.9431 33.2653 49.8341 27.199 49.8341H22.8009C16.7346 49.8341 13.1896 48.9431 10.0427 47.2559C6.89583 45.5687 4.41243 43.1042 2.7442 39.9573C1.057 36.8104 0.166016 33.2654 0.166016 27.1991V22.801C0.166016 16.7347 1.057 13.1897 2.7442 10.0428C4.43139 6.89585 6.89583 4.41245 10.0427 2.74421C13.1707 1.05701 16.7346 0.166016 22.782 0.166016Z" fill="#0068FF"/>
    <path opacity="0.12" fillRule="evenodd" clipRule="evenodd" d="M49.8336 26.4736V27.1994C49.8336 33.2657 48.9427 36.8107 47.2555 39.9576C45.5683 43.1045 43.1038 45.5879 39.9569 47.2562C36.81 48.9434 33.265 49.8344 27.1987 49.8344H22.8007C17.8369 49.8344 14.5612 49.2378 11.8104 48.0966L7.27539 43.4267L49.8336 26.4736Z" fill="#001A33"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M7.779 43.5892C10.1019 43.846 13.0061 43.1836 15.0682 42.1825C24.0225 47.1318 38.0197 46.8954 46.4923 41.4732C46.8209 40.9803 47.1279 40.4677 47.4128 39.9363C49.1062 36.7779 50.0004 33.22 50.0004 27.1316V22.7175C50.0004 16.629 49.1062 13.0711 47.4128 9.91273C45.7385 6.75436 43.2461 4.28093 40.0877 2.58758C36.9293 0.894239 33.3714 0 27.283 0H22.8499C17.6644 0 14.2982 0.652754 11.4699 1.89893C11.3153 2.03737 11.1636 2.17818 11.0151 2.32135C2.71734 10.3203 2.08658 27.6593 9.12279 37.0782C9.13064 37.0921 9.13933 37.1061 9.14889 37.1203C10.2334 38.7185 9.18694 41.5154 7.55068 43.1516C7.28431 43.399 7.37944 43.5512 7.779 43.5892Z" fill="white"/>
    <path d="M20.5632 17H10.8382V19.0853H17.5869L10.9329 27.3317C10.7244 27.635 10.5728 27.9194 10.5728 28.5639V29.0947H19.748C20.203 29.0947 20.5822 28.7156 20.5822 28.2606V27.1421H13.4922L19.748 19.2938C19.8428 19.1801 20.0134 18.9716 20.0893 18.8768L20.1272 18.8199C20.4874 18.2891 20.5632 17.8341 20.5632 17.2844V17Z" fill="#0068FF"/>
    <path d="M32.9416 29.0947H34.3255V17H32.2402V28.3933C32.2402 28.7725 32.5435 29.0947 32.9416 29.0947Z" fill="#0068FF"/>
    <path d="M25.814 19.6924C23.1979 19.6924 21.0747 21.8156 21.0747 24.4317C21.0747 27.0478 23.1979 29.171 25.814 29.171C28.4301 29.171 30.5533 27.0478 30.5533 24.4317C30.5723 21.8156 28.4491 19.6924 25.814 19.6924ZM25.814 27.2184C24.2785 27.2184 23.0273 25.9672 23.0273 24.4317C23.0273 22.8962 24.2785 21.645 25.814 21.645C27.3495 21.645 28.6007 22.8962 28.6007 24.4317C28.6007 25.9672 27.3685 27.2184 25.814 27.2184Z" fill="#0068FF"/>
    <path d="M40.4867 19.6162C37.8516 19.6162 35.7095 21.7584 35.7095 24.3934C35.7095 27.0285 37.8516 29.1707 40.4867 29.1707C43.1217 29.1707 45.2639 27.0285 45.2639 24.3934C45.2639 21.7584 43.1217 19.6162 40.4867 19.6162ZM40.4867 27.2181C38.9322 27.2181 37.681 25.9669 37.681 24.4124C37.681 22.8579 38.9322 21.6067 40.4867 21.6067C42.0412 21.6067 43.2924 22.8579 43.2924 24.4124C43.2924 25.9669 42.0412 27.2181 40.4867 27.2181Z" fill="#0068FF"/>
    <path d="M29.4562 29.0944H30.5747V19.957H28.6221V28.2793C28.6221 28.7153 29.0012 29.0944 29.4562 29.0944Z" fill="#0068FF"/>
  </svg>
);