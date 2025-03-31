"use client";

import { useState } from "react";
import { DownloadIcon } from "lucide-react";
import { ArrowIconIn, ArrowIconOut, DocumentIcon } from "./Icons";
import { Filter } from "./Filter";
import { useTransactions } from "@/hooks/useApiData";

const TransactionTable = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [filters, setFilters] = useState({
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    transactionTypes: [] as string[],
    transactionStatuses: [] as string[],
  });

  const { data: transactions } = useTransactions();

  const applyFilters = (newFilters: Partial<typeof filters>) => {
    setFilters({
      startDate: undefined,
      endDate: undefined,
      transactionTypes: [],
      transactionStatuses: [],
      ...newFilters,
    });
  };

  const filteredTransactions = transactions?.filter((transaction) => {
    const transactionDate = new Date(transaction.date);

    if (filters.startDate && transactionDate < filters.startDate) {
      return false;
    }
    if (filters.endDate && transactionDate > filters.endDate) {
      return false;
    }

    if (
      filters.transactionTypes.length > 0 &&
      !filters.transactionTypes.includes(transaction.type)
    ) {
      return false;
    }

    if (
      filters.transactionStatuses.length > 0 &&
      !filters.transactionStatuses.includes(transaction.status)
    ) {
      return false;
    }

    return true;
  });

  return (
    <div className="bg-white pt-20 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#131316]">
            {filteredTransactions?.length || 0} Transactions
          </h2>
          {(transactions?.length ?? 0) > 0 && (
            <p className="text-sm text-gray-400">
              Your transactions from the last{" "}
              <span className="pr-1">
                {new Date(
                  Math.max(
                    ...(transactions || []).map((transaction) =>
                      new Date(transaction.date).getTime()
                    )
                  )
                ).toLocaleDateString("en-US", {
                  day: "numeric",
                })}
              </span>{" "}
              days
            </p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Filter
            isSheetOpen={isSheetOpen}
            setIsSheetOpen={setIsSheetOpen}
            onApplyFilters={applyFilters}
          />
          <button
            className="px-4 py-2 text-sm bg-gray-100 rounded-full hover:bg-gray-200
        text-[#131316] font-semibold flex items-center justify-center"
          >
            Export list{" "}
            <span className="ml-2">
              <DownloadIcon className="text-[#131316] h-4 w-4" />
            </span>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {filteredTransactions?.length === 0 ? (
          <div className="grid place-items-center gap-y-10 py-10">
            <div className="text-center">
              <DocumentIcon />

              <h3 className="text-2xl sm:text-3xl font-bold text-[#131316] pt-10 pb-5 text-left">
                No matching transaction found <br className="hidden sm:block" />{" "}
                for the selected filter
              </h3>
              <p className="text-sm text-gray-500 pb-5 text-left">
                Change your filters to see more results, or add a new product.
              </p>
              <button
                onClick={() =>
                  setFilters({
                    startDate: undefined,
                    endDate: undefined,
                    transactionTypes: [],
                    transactionStatuses: [],
                  })
                }
                className="px-4 py-2 text-sm bg-gray-100 rounded-full hover:bg-gray-200 text-[#56616B] font-semibold flex"
              >
                Clear Filter
              </button>
            </div>
          </div>
        ) : (
          filteredTransactions?.map((transaction, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 space-y-4 sm:space-y-0"
            >
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
                        : "text-gray-500"
                    }`}
                  >
                    {transaction.metadata?.product_name || transaction.status}
                  </p>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <p className="font-bold text-black">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    currencyDisplay: "code",
                  }).format(transaction.amount)}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(transaction.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionTable;
