import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
} from "@nextui-org/navbar";

import NextLink from "next/link";
import { Logo, StoreIcon } from "@/components/icons";
import { NarBarSeachInput } from "./narbar-search/narbar-search-input";
import { NavbarUser } from "./narbar-user/narbar-user";

export const Navbar = () => {
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
              <div className="flex justify-end items-center w-[20%]">
                <NextLink href="/">
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

          <NavbarContent className="max-w-fit">
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
