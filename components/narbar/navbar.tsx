'use client'

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
} from "@heroui/navbar";
// import { useUser } from "@/components/hooks/useUser";
import NextLink from "next/link";
import { Logo, StoreIcon } from "@/components/icons";
import { NarBarSeachInput } from "./narbar-search/narbar-search-input";
import { NavbarUser } from "./narbar-user/narbar-user";
import { useState } from "react";

export const Navbar = () => {
  //const { userId, isLoading } = useUser();
  const { userId, isLoading } = {userId:"11111", isLoading:"ok"}

  const handleStoreClick = (e: React.MouseEvent) => {
    // if (isLoading || !userId) {
    //   e.preventDefault(); // Prevent navigation
    //   alert("You need to log in to access the store.");
    // }
  };

  return (
    <div>
      <div>
        <NextUINavbar maxWidth="2xl" position="sticky">
          <NavbarBrand className="max-w-fit">
            <NextLink className="flex justify-start items-center gap-1" href="/">
              <Logo />
              <p className="font-bold text-inherit">ACME</p>
            </NextLink>
          </NavbarBrand>

          <NavbarContent className="flex flex-grow">
            <div className="flex w-full gap-6">
              <div className="flex justify-end items-center w-[20%] gap-2">
                <NextLink href={`/mystore/${userId}`} onClick={handleStoreClick}>
                  <StoreIcon />
                </NextLink>
              </div>

              <div className="hidden md:flex w-[60%] relative">
                <div className="flex-grow">
                  <NarBarSeachInput/>
                </div>
              </div>

              <div className="w-[20%]"></div>
            </div>
          </NavbarContent>

          <NavbarContent className="max-w-fit flex items-center gap-6 relative">
            <NavbarUser />
          </NavbarContent>
        </NextUINavbar>
      </div>
      <div className="block sm:hidden w-full">
        <NextUINavbar maxWidth="2xl" className="h-[40px]">
          <div className="flex-grow">
            <NarBarSeachInput/>
          </div>
        </NextUINavbar>
      </div>
    </div>
  );
};
