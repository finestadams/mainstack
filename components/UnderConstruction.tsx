import Link from "next/link";
import React from "react";

const UnderConstruction: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold mb-4"> Under Construction </h1>
      <p className="text-lg mb-6">
        We're working hard to bring this page to life. In the meantime, check
        out our
        <Link href="/revenue" className="text-blue-500 underline pl-3">
          Revenue Page
        </Link>
        .
      </p>
    </div>
  );
};

export default UnderConstruction;
