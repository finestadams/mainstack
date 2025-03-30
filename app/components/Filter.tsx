"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const transactionTypes = [
  "Store Transactions",
  "Get Tipped",
  "Withdrawals",
  "Chargebacks",
  "Cashbacks",
];

const transactionStatuses = ["Successful", "Pending", "Failed"];

export function Filter({
  isSheetOpen,
  setIsSheetOpen,
}: {
  isSheetOpen: boolean;
  setIsSheetOpen: (open: boolean) => void;
}) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [isTransactionTypeOpen, setIsTransactionTypeOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  // Handle checkbox toggle for transaction types
  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type]
    );
  };

  const toggleStatus = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((item) => item !== status)
        : [...prev, status]
    );
  };

  const resetFilters = () => {
    setSelectedTypes([]);
    setSelectedStatuses([]);
    setStartDate(undefined);
    setEndDate(undefined);
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <button
          className="px-4 py-2 text-sm bg-gray-100 rounded-full hover:bg-gray-200
          text-[#131316] font-semibold flex items-center cursor-pointer"
        >
          Filter{" "}
          <span className="ml-1">
            <ChevronDown className="text-[#131316] h-4 w-4" />
          </span>
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="p-6 flex flex-col justify-between h-full"
      >
        <SheetHeader>
          <SheetTitle className="text-lg font-semibold text-[#131316]">
            Filter Transactions
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          <div>
            <Label className="text-sm text-gray-500">Date Range</Label>
            <div className="flex items-center space-x-4 mt-2">
              <Popover>
                <PopoverTrigger asChild>
                  <div className="relative w-full">
                    <Input
                      readOnly
                      value={startDate ? startDate.toLocaleDateString() : ""}
                      placeholder="Start Date"
                      className="cursor-pointer"
                    />
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                  />
                </PopoverContent>
              </Popover>

              {/* End Date */}
              <Popover>
                <PopoverTrigger asChild>
                  <div className="relative w-full">
                    <Input
                      readOnly
                      value={endDate ? endDate.toLocaleDateString() : ""}
                      placeholder="End Date"
                      className="cursor-pointer"
                    />
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div>
            <Label className="text-sm text-gray-500">Transaction Type</Label>
            <Popover
              open={isTransactionTypeOpen}
              onOpenChange={setIsTransactionTypeOpen}
            >
              <PopoverTrigger asChild>
                <div className="relative">
                  <Input
                    readOnly
                    value={
                      selectedTypes.length > 0
                        ? selectedTypes.join(", ")
                        : "Select Transaction Types"
                    }
                    className="cursor-pointer"
                  />
                  {isTransactionTypeOpen ? (
                    <ChevronUp className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  ) : (
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  )}
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-4">
                <div className="space-y-2">
                  {transactionTypes.map((type) => (
                    <label
                      key={type}
                      className="flex items-center space-x-2 flex-1 w-full cursor-pointer"
                    >
                      <Checkbox
                        checked={selectedTypes.includes(type)}
                        onCheckedChange={() => toggleType(type)}
                      />
                      <span className="text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label className="text-sm text-gray-500">Transaction Status</Label>
            <Popover open={isStatusOpen} onOpenChange={setIsStatusOpen}>
              <PopoverTrigger asChild>
                <div className="relative">
                  <Input
                    readOnly
                    value={
                      selectedStatuses.length > 0
                        ? selectedStatuses.join(", ")
                        : "Select Transaction Statuses"
                    }
                    className="cursor-pointer"
                  />
                  {isStatusOpen ? (
                    <ChevronUp className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  ) : (
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  )}
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-4">
                <div className="space-y-2">
                  {transactionStatuses.map((status) => (
                    <label
                      key={status}
                      className="flex items-center space-x-2 flex-1 w-full cursor-pointer"
                    >
                      <Checkbox
                        checked={selectedStatuses.includes(status)}
                        onCheckedChange={() => toggleStatus(status)}
                      />
                      <span className="text-sm text-gray-700">{status}</span>
                    </label>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <SheetFooter className="sticky bottom-0 left-0 w-full p-4 bg-white border-t">
          <div className="flex items-center space-x-4">
            {/* Clear Button */}
            <Button
              variant="outline"
              className="w-1/2 text-gray-500 border-gray-300 hover:bg-gray-100"
              onClick={resetFilters}
            >
              Clear
            </Button>

            <SheetClose asChild>
              <Button
                className="w-1/2 bg-black text-white"
                onClick={() => setIsSheetOpen(false)}
              >
                Apply Filters
              </Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
