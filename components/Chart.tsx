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
import { useWallet } from "@/hooks/useApiData";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

export function Chart() {
  const { data: wallet } = useWallet();
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
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} horizontal={false} />{" "}
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={{ stroke: "#DBDEE5" }}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                }}
              />
              <Line
                dataKey="desktop"
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
