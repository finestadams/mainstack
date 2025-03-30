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

const Header = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isAppsMenuVisible, setIsAppsMenuVisible] = useState(false);
  const [selectedApp, setSelectedApp] = useState("Apps"); // Default text for the Apps link

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const toggleAppsMenu = () => {
    setIsAppsMenuVisible((prev) => !prev);
  };

  const handleAppSelection = (appName: string) => {
    setSelectedApp(`Apps ${appName}`);
    setIsAppsMenuVisible(false); // Close the AppsMenu after selection
  };

  const pathname = usePathname();
  const isActiveLink = (path: string) => pathname === path;

  // Navigation links array
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

  return (
    <header className="flex flex-wrap items-center justify-between px-6 py-4 bg-white shadow-md relative rounded-full mb-10">
      {/* Left Section */}
      <div className="p-2 rounded-md">
        <LogoIcon />
      </div>

      {/* Navigation Links */}
      <div className="flex items-center space-x-4">
        <nav className="hidden md:flex items-center space-x-6 text-gray-600 relative">
          {navLinks.map((link) => (
            <div key={link.name} className="relative flex items-center">
              <Link
                href={link.href}
                onClick={link.name === "Apps" ? toggleAppsMenu : undefined}
                className={`flex items-center space-x-2 ${
                  isActiveLink(link.href) ||
                  (link.name === "Apps" && isAppsMenuVisible)
                    ? "bg-black text-white px-4 py-2 rounded-full"
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
                      <span>{selectedApp}</span>
                      {isAppsMenuVisible && <ChevronDown />}
                    </>
                  ) : (
                    <span>{link.name}</span>
                  )}
                </span>
              </Link>
              {/* Show AppsMenu below the "Apps" link */}
              {link.name === "Apps" && isAppsMenuVisible && (
                <div className="absolute -right-30 z-10 -top-2">
                  <AppsMenu onAppSelect={handleAppSelection} />
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        <NotificationIcon />
        <ChatIcon />
        <div className="relative">
          <div
            className="flex items-center space-x-2 bg-[#EFF1F6] rounded-full px-4 py-2 cursor-pointer"
            onClick={toggleDropdown}
          >
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer">
              OJ
            </div>
            <MenuIcon />
          </div>
          {isDropdownVisible && (
            <div className="absolute right-0 mt-2">
              <HeaderDrop />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
