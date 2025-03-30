"use client";
import { ChevronDown, DownloadIcon } from "lucide-react";
import React, { useState } from "react";
import { ArrowIconIn, ArrowIconOut } from "./Icons";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Filter } from "./Filter";
import { useTransactions } from "@/hooks/useApiData";

const transactions1 = [
  {
    title: "Psychology of Money",
    name: "Roy Cash",
    amount: "USD 600",
    date: "Apr 03, 2022",
    type: "in",
    status: "",
  },
  {
    title: "Buy me a coffee",
    name: "Jonathan Smart",
    amount: "USD 100",
    date: "Apr 02, 2022",
    type: "in",
    status: "",
  },
  {
    title: "How to build an online brand",
    name: "Delvan Ludacris",
    amount: "USD 100",
    date: "Apr 02, 2022",
    type: "in",
    status: "",
  },
  {
    title: "Cash withdrawal",
    name: "Successful",
    amount: "USD 3000.33",
    date: "Apr 01, 2022",
    type: "out",
    status: "success",
  },
  {
    title: "Support my outreach",
    name: "Shawn Kane",
    amount: "USD 400",
    date: "Apr 02, 2022",
    type: "in",
    status: "",
  },
  {
    title: "Cash withdrawal",
    name: "Pending",
    amount: "USD 1004.44",
    date: "Apr 01, 2022",
    type: "out",
    status: "pending",
  },
  {
    title: "Learn how to pitch your idea",
    name: "Dujon Jericho",
    amount: "USD 500",
    date: "Apr 02, 2022",
    type: "in",
    status: "",
  },
];

const TransactionTable = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { data: transactions } = useTransactions();
  return (
    <div className=" bg-white pt-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#131316]">
            {transactions?.length} Transactions
          </h2>
          <p className="text-sm text-gray-400">
            Your transactions from the last
            <span className="pr-1">
              {" "}
              {new Date(
                Math.max(
                  ...(transactions || []).map((transaction) =>
                    new Date(transaction.date).getTime()
                  )
                )
              ).toLocaleDateString("en-US", {
                day: "numeric",
              })}
            </span>
            days
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Filter isSheetOpen={isSheetOpen} setIsSheetOpen={setIsSheetOpen} />
          <button
            className="px-4 py-2 text-sm bg-gray-100 rounded-full hover:bg-gray-200
          text-[#131316] font-semibold flex items-center cursor-pointer"
          >
            Export list{" "}
            <span className="ml-2">
              <DownloadIcon className="text-[#131316] h-4 w-4" />
            </span>
          </button>
        </div>
      </div>

      {/* Transactions */}
      <div className="space-y-6">
        {transactions?.map((transaction, index) => (
          <div key={index} className="flex items-center justify-between  pb-4 ">
            {/* Left Section */}
            <div className="flex items-center space-x-4">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full ${
                  transaction.type === "deposit"
                    ? "bg-green-100 text-green-500"
                    : "bg-red-100 text-red-500"
                }`}
              >
                {transaction.type === "deposit" ? (
                  <ArrowIconIn />
                ) : (
                  <ArrowIconOut />
                )}
              </div>
              <div>
                <h4 className="font-medium text-black">
                  {transaction.metadata?.name ||
                    (transaction.type === "withdrawal" && "Cash Withdrawal")}
                </h4>
                <p
                  className={`text-sm ${
                    transaction.status === "successful" &&
                    !transaction.metadata?.product_name
                      ? "text-green-500"
                      : transaction.status === "pending"
                      ? "text-[#A77A07]"
                      : transaction.metadata?.product_name
                      ? "text-gray-500"
                      : "text-gray-500"
                  }`}
                >
                  {transaction.metadata?.product_name ||
                    (transaction.status === "successful" &&
                    !transaction.metadata?.product_name
                      ? "Successful"
                      : transaction.metadata?.name || transaction.status)}
                </p>
              </div>
            </div>

            {/* Right Section */}
            <div className="text-right">
              <p className="font-bold text-black">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currencyDisplay: "code",
                  currency: "USD",
                }).format(transaction.amount)}
              </p>
              <p className="text-sm text-gray-500">{transaction.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionTable;
