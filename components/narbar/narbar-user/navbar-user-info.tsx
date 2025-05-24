"use client";

import { useState, useEffect, useRef } from "react";
import { Avatar } from "@heroui/avatar";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import { BookmarkIcon, SettingsIcon, LogoutIcon } from "@/components/icons";

export const NavbarUserInfo = () => {
  const [isHovered, setIsHovered] = useState(false);
  const listboxRef = useRef<HTMLDivElement | null>(null); // Create a ref for the listbox

  return (
    <Dropdown placement="bottom-end" ref={listboxRef}>
      <DropdownTrigger>
        <Avatar
          isBordered
          showFallback
          name="Q"
          src="https://images.unsplash.com/broken"
          className="hover:cursor-pointer w-[30px] h-[30px]"
          color= {isHovered ? "secondary": "primary"}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User menu" className="min-w-[160px]">
        <DropdownItem key="bookmark" startContent={<BookmarkIcon className="w-4 h-4 text-blue-500" />}>Ghi nhớ</DropdownItem>
        <DropdownItem key="setting" startContent={<SettingsIcon className="w-4 h-4 text-gray-500" />}>Setting</DropdownItem>
        <DropdownItem key="logout" startContent={<LogoutIcon className="w-4 h-4 text-red-500" />}>Logout</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

// Nếu chưa có các icon, thêm tạm SVG demo bên dưới:
// BookmarkIcon
// SettingsIcon
// LogoutIcon
