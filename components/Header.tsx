"use client";

import React, { useState } from "react";
import HeaderDrop from "./HeaderDrop";
import AppsMenu from "./AppMenu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AddIcon,
  WalletIcon,
  ChatIcon,
  HomeIcon,
  LogoIcon,
  MenuIcon,
  NotificationIcon,
  ProfileIcon,
  SettingsIcon,
} from "./Icons";
import { ChevronDown } from "lucide-react";
import { useUser } from "@/hooks/useApiData";

const Header = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isAppsMenuVisible, setIsAppsMenuVisible] = useState(false);
  const [selectedApp, setSelectedApp] = useState("Apps");

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const toggleAppsMenu = () => {
    setIsAppsMenuVisible((prev) => !prev);
  };

  const handleAppSelection = (appName: string) => {
    setSelectedApp(`Apps ${appName}`);
    setIsAppsMenuVisible(false);
  };

  const pathname = usePathname();
  const isActiveLink = (path: string) => pathname === path;

  const navLinks = [
    {
      name: "Home",
      href: "/",
      icon: <HomeIcon />,
    },
    { name: "Analytics", href: "#", icon: <AddIcon /> },
    { name: "Revenue", href: "/revenue", icon: <WalletIcon /> },
    { name: "CRM", href: "#", icon: <ProfileIcon /> },
    { name: "Apps", href: "#", icon: <SettingsIcon /> },
  ];
  const { data: user } = useUser();

  return (
    <header className="flex flex-wrap items-center justify-between px-4 py-3 bg-white shadow-md relative rounded-full mb-6 md:px-6 md:py-4">
      <div className="p-2 rounded-md">
        <LogoIcon />
      </div>

      <div className="flex items-center space-x-4">
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 text-gray-600 relative">
          {navLinks.map((link) => (
            <div key={link.name} className="relative flex items-center">
              <Link
                href={link.href}
                onClick={link.name === "Apps" ? toggleAppsMenu : undefined}
                className={`flex items-center space-x-2 ${
                  isActiveLink(link.href) ||
                  (link.name === "Apps" && isAppsMenuVisible)
                    ? "bg-black text-white px-3 py-1 md:px-4 md:py-2 rounded-full"
                    : ""
                }`}
              >
                <span className="flex items-center space-x-2">
                  <p
                    className={`${
                      isActiveLink(link.href) ? "text-white" : "text-[#D9D9D9]"
                    }`}
                  >
                    {link.icon}
                  </p>
                  {link.name === "Apps" ? (
                    <>
                      <span className="text-sm md:text-base">
                        {selectedApp}
                      </span>
                      {isAppsMenuVisible && <ChevronDown />}
                    </>
                  ) : (
                    <span className="text-sm md:text-base">{link.name}</span>
                  )}
                </span>
              </Link>

              {link.name === "Apps" && isAppsMenuVisible && (
                <div className="absolute right-0 z-10 mt-2">
                  <AppsMenu onAppSelect={handleAppSelection} />
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="flex items-center space-x-2 md:space-x-4">
        <NotificationIcon />
        <ChatIcon />
        <div className="relative">
          <div
            className="flex items-center space-x-2 bg-[#EFF1F6] rounded-full px-3 py-1 md:px-4 md:py-2 cursor-pointer"
            onClick={toggleDropdown}
          >
            <div className="w-6 h-6 md:w-8 md:h-8 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer text-sm md:text-base">
              {user?.first_name?.charAt(0).toUpperCase()}
              {user?.last_name?.charAt(0).toUpperCase()}
            </div>
            <MenuIcon />
          </div>
          {isDropdownVisible && (
            <div className="absolute right-0 mt-2">
              {user && <HeaderDrop user={user} />}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
