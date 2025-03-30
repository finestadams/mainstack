"use client";

import { Button } from "@/components/ui/button";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  Tooltip,
} from "recharts";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useWallet, useTransactions } from "@/hooks/useApiData";
import { useMemo } from "react";

const groupTransactionsByDate = (transactions: any[]) => {
  const grouped: { [key: string]: number } = {};

  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    if (!grouped[formattedDate]) {
      grouped[formattedDate] = 0;
    }
    grouped[formattedDate] += transaction.amount;
  });

  return Object.entries(grouped)
    .map(([date, amount]) => ({
      date,
      amount,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export function Chart() {
  const { data: wallet } = useWallet();
  const { data: transactions } = useTransactions();

  const chartData = useMemo(() => {
    if (!transactions) return [];
    return groupTransactionsByDate(transactions);
  }, [transactions]);

  return (
    <Card className="w-full border-none bg-white shadow-none">
      <CardHeader className="flex justify-start items-center gap-x-14">
        <div>
          <p className="text-gray-400 text-sm">Available Balance</p>
          <p className="text-[#131316] text-3xl font-bold">
            {typeof wallet?.balance === "string"
              ? wallet?.balance
              : `USD ${Number(wallet?.balance).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`}
          </p>
        </div>
        <Button className="bg-black text-white px-10 py-6 rounded-full">
          Withdraw
        </Button>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-[200px] md:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 20,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid vertical={false} horizontal={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={{ stroke: "#DBDEE5" }}
                tickMargin={8}
                scale="point"
                padding={{ left: 0, right: 0 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                }}
                formatter={(value: number) =>
                  `USD ${value.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`
                }
              />
              <Line
                dataKey="amount"
                type="monotone"
                stroke="#FF5403"
                dot={false}
                activeDot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
