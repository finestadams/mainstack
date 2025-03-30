import { useWallet } from "@/hooks/useApiData";
import { InfoIcon } from "lucide-react";
import React from "react";

const PaymentCard = () => {
  const { data: wallet } = useWallet();
  const data = [
    { label: "Ledger Balance", value: wallet?.ledger_balance || "USD 0.00" },
    { label: "Total Payout", value: wallet?.total_payout || "USD 0.00" },
    { label: "Total Revenue", value: wallet?.total_revenue || "USD 0.00" },
    { label: "Pending Payout", value: wallet?.pending_payout || "USD 0.00" },
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
            <span className="text-black font-bold text-[28px]">
              {typeof item.value === "string"
                ? item.value
                : `USD ${Number(item.value).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`}
            </span>
          </div>
          <div className="relative group">
            <InfoIcon className="text-gray-300 w-4 h-4" />
            <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2">
              {item.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentCard;
