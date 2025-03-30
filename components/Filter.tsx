"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetContent,
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

const datePresets = ["Today", "Last 7 days", "This month", "Last 3 months"];

export function Filter({
  isSheetOpen,
  setIsSheetOpen,
  onApplyFilters,
}: {
  isSheetOpen: boolean;
  setIsSheetOpen: (open: boolean) => void;
  onApplyFilters: (filters: {
    startDate?: Date;
    endDate?: Date;
    transactionTypes?: string[];
    transactionStatuses?: string[];
  }) => void;
}) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [isTransactionTypeOpen, setIsTransactionTypeOpen] =
    useState<boolean>(false);
  const [isStatusOpen, setIsStatusOpen] = useState<boolean>(false);

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
    setSelectedPreset(null);
  };

  const isApplyDisabled =
    selectedTypes.length === 0 &&
    selectedStatuses.length === 0 &&
    !startDate &&
    !endDate &&
    !selectedPreset;

  const handlePresetClick = (preset: string) => {
    setSelectedPreset(preset);
    const now = new Date();
    switch (preset) {
      case "Today":
        setStartDate(now);
        setEndDate(now);
        break;
      case "Last 7 days":
        setStartDate(new Date(now.setDate(now.getDate() - 7)));
        setEndDate(new Date());
        break;
      case "This month":
        setStartDate(new Date(now.getFullYear(), now.getMonth(), 1));
        setEndDate(new Date());
        break;
      case "Last 3 months":
        setStartDate(new Date(now.getFullYear(), now.getMonth() - 2, 1));
        setEndDate(new Date());
        break;
      default:
        setStartDate(undefined);
        setEndDate(undefined);
    }
  };

  const handleApplyFilters = () => {
    const filters: {
      startDate?: Date;
      endDate?: Date;
      transactionTypes?: string[];
      transactionStatuses?: string[];
    } = {};

    if (startDate) filters.startDate = startDate;
    if (endDate) filters.endDate = endDate;
    if (selectedTypes.length > 0) filters.transactionTypes = selectedTypes;
    if (selectedStatuses.length > 0) {
      filters.transactionStatuses = selectedStatuses.map((status) =>
        status.toLowerCase()
      );
    }

    console.log("Applied Filters:", filters);

    onApplyFilters(filters);
    setIsSheetOpen(false);
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <button
          className="px-4 py-2 text-sm bg-gray-100 rounded-full hover:bg-gray-200
          text-[#131316] font-semibold flex items-center cursor-pointer"
        >
          Filter
          {selectedTypes.length || selectedStatuses.length > 0 ? (
            <span className="bg-black w-5 h-5 rounded-full text-white text-sm ml-2">
              {selectedTypes.length + selectedStatuses.length}
            </span>
          ) : null}
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
          <SheetTitle className="text-2xl font-bold text-[#131316] absolute top-4 left-5">
            Filter
          </SheetTitle>
        </SheetHeader>
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            {datePresets.map((preset) => (
              <button
                key={preset}
                onClick={() => handlePresetClick(preset)}
                className={`px-1 py-1 text-sm rounded-full border ${
                  selectedPreset === preset
                    ? "bg-black text-white"
                    : "bg-gray-100 text-[#131316] hover:bg-gray-200"
                }`}
              >
                {preset}
              </button>
            ))}
          </div>

          <div>
            <Label className="text-base text-[#131316] font-normal">
              Date Range
            </Label>
            <div className="flex items-center space-x-4 mt-2">
              <Popover>
                <PopoverTrigger asChild>
                  <div className="relative w-full">
                    <Input
                      readOnly
                      value={startDate ? startDate.toLocaleDateString() : ""}
                      placeholder="Start Date"
                      className="cursor-pointer bg-[#EFF1F6]"
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

              <Popover>
                <PopoverTrigger asChild>
                  <div className="relative w-full">
                    <Input
                      readOnly
                      value={endDate ? endDate.toLocaleDateString() : ""}
                      placeholder="End Date"
                      className="cursor-pointer bg-[#EFF1F6]"
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
            <Label className="text-base text-[#131316] font-normal pb-2">
              Transaction Type
            </Label>
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
                    className="cursor-pointer bg-[#EFF1F6]"
                  />
                  {isTransactionTypeOpen ? (
                    <ChevronUp className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  ) : (
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  )}
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4">
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
            <Label className="text-base text-[#131316] font-normal pb-2">
              Transaction Status
            </Label>
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
                    className="cursor-pointer bg-[#EFF1F6] active:border-black focus-visible:border-black"
                  />
                  {isStatusOpen ? (
                    <ChevronUp className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  ) : (
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  )}
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4">
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

        <SheetFooter className="sticky bottom-0 left-0 w-full p-4 bg-white">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              className="w-1/2 text-gray-500 border-gray-300 hover:bg-gray-100 rounded-full"
              onClick={resetFilters}
            >
              Clear
            </Button>

            <Button
              className="w-1/2 bg-black text-white rounded-full"
              onClick={handleApplyFilters}
              disabled={isApplyDisabled}
            >
              Apply Filters
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
