"use client";

import { Chart } from "../../components/Chart";
import PaymentCard from "../../components/PaymentCard";
import TransactionTable from "../../components/TransactionTable";

export default function Revenue() {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between gap-x-10">
        <div className=" md:w-3/5">
          <Chart />
        </div>
        <div className=" md:w-2/5 max-w-xs">
          <PaymentCard />
        </div>
      </div>
      <TransactionTable />
    </>
  );
}
