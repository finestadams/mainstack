import {
  BugIcon,
  Gift,
  Link,
  LinkIcon,
  LogOutIcon,
  Receipt,
  Settings,
  SignatureIcon,
  SwitchCameraIcon,
} from "lucide-react";
import React from "react";
import { LogoIcon } from "./Icons";

const HeaderDrop = () => {
  return (
    <div className="w-64 bg-white rounded-lg shadow-lg p-4">
      {/* User Info */}
      <div className="flex items-center space-x-4 pb-4 border-b">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-black font-bold">
          OJ
        </div>
        <div>
          <h4 className="font-medium text-black">Olivier Jones</h4>
          <p className="text-sm text-gray-500">olivierjones@gmail.com</p>
        </div>
      </div>

      {/* Menu Items */}
      <ul className="mt-4 space-y-4 text-gray-600">
        <li className="flex items-center space-x-3 hover:text-black cursor-pointer">
          <span>
            <Settings />
          </span>
          <span>Settings</span>
        </li>
        <li className="flex items-center space-x-3 hover:text-black cursor-pointer">
          <span>
            <Receipt />
          </span>
          <span>Purchase History</span>
        </li>
        <li className="flex items-center space-x-3 hover:text-black cursor-pointer">
          <span>
            <Gift />
          </span>
          <span>Refer and Earn</span>
        </li>
        <li className="flex items-center space-x-3 hover:text-black cursor-pointer">
          <span>
            <LinkIcon />
          </span>
          <span>Integrations</span>
        </li>
        <li className="flex items-center space-x-3 hover:text-black cursor-pointer">
          <span>
            <BugIcon />
          </span>
          <span>Report Bug</span>
        </li>
        <li className="flex items-center space-x-3 hover:text-black cursor-pointer">
          <span>
            <SwitchCameraIcon />
          </span>
          <span>Switch Account</span>
        </li>
        <li className="flex items-center space-x-3 hover:text-black cursor-pointer">
          <span>
            <LogOutIcon />
          </span>
          <span>Sign Out</span>
        </li>
      </ul>
    </div>
  );
};

export default HeaderDrop;
