import {
  CalendarIcon,
  ChevronRight,
  FileIcon,
  Link2Icon,
  ReceiptIcon,
  StoreIcon,
} from "lucide-react";
import React from "react";

const apps = [
  {
    name: "Link in Bio",
    description: "Manage your Link in Bio",
    icon: <Link2Icon />,
  },
  {
    name: "Store",
    description: "Manage your Store activities",
    icon: <StoreIcon />,
  },
  {
    name: "Media Kit",
    description: "Manage your Media Kit",
    icon: <FileIcon />,
  },
  {
    name: "Invoicing",
    description: "Manage your Invoices",
    icon: <ReceiptIcon />,
  },
  {
    name: "Bookings",
    description: "Manage your Bookings",
    icon: <CalendarIcon />,
  },
];

const AppsMenu = ({
  onAppSelect,
}: {
  onAppSelect: (appName: string) => void;
}) => {
  return (
    <div className="absolute top-16 right-0 w-80 bg-white shadow-lg rounded-lg p-4">
      {apps.map((app, index) => (
        <div
          key={index}
          className="group flex items-center space-x-4 p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
          onClick={() => onAppSelect(app.name)}
        >
          <div className="text-2xl">{app.icon}</div>
          <div className="flex-1">
            <h4 className="font-medium text-black">{app.name}</h4>
            <p className="text-sm text-gray-500">{app.description}</p>
          </div>
          <ChevronRight className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </div>
      ))}
    </div>
  );
};

export default AppsMenu;
