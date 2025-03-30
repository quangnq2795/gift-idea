"use client";

import { useState, useEffect, useRef } from "react";
import { Avatar } from "@heroui/avatar";
import { Listbox, ListboxItem } from "@heroui/listbox";
import { color } from "framer-motion";

export const NavbarUserInfo = () => {
  const [showListbox, setShowListbox] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const listboxRef = useRef<HTMLDivElement | null>(null); // Create a ref for the listbox

  const list = [
    { page: "Profile", href: "/profile" },
    { page: "Setting", href: "/setting" },
    { page: "Logout", href: "/logout" },
  ];

  const handleUserInfoClick = () => {
    setShowListbox((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (listboxRef.current && !listboxRef.current.contains(event.target as Node)) {
        setShowListbox(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={listboxRef}>
      <div onClick={handleUserInfoClick}>
        <Avatar
          isBordered
          showFallback
          name="Q"
          src="https://images.unsplash.com/broken"
          className="hover:cursor-pointer w-[30] h-[30]"
          color= {isHovered ? "secondary": "primary"}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      </div>

      {showListbox && (
        <Listbox className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40 z-10">
          {list.map((item, index) => (
            <ListboxItem key={index} href={item.href}>
              {item.page}
            </ListboxItem>
          ))}
        </Listbox>
      )}
    </div>
  );
};
