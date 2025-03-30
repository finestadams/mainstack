import { InfoIcon } from "lucide-react";
import React from "react";

const PaymentCard = () => {
  const data = [
    { label: "Ledger Balance", value: "USD 0.00" },
    { label: "Total Payout", value: "USD 55,080.00" },
    { label: "Total Revenue", value: "USD 175,580.00" },
    { label: "Pending Payout", value: "USD 0.00" },
  ];

  return (
    <div className="space-y-6 max-w-xs">
      {data.map((item, index) => (
        <div key={index} className="flex justify-between  pb-4">
          <div className="flex flex-col items-left justify-start">
            <div className="flex items-center space-x-2">
              <span className="text-[#56616B] text-sm font-normal">
                {item.label}
              </span>
            </div>

            {/* Value */}
            <span className="text-black font-bold text-[28px]">
              {item.value}
            </span>
          </div>
          <div>
            <InfoIcon className="text-gray-300 w-4 h-4" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentCard;
