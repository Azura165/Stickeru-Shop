import React from "react";

export default function ProductSkeleton() {
  return (
    <div 
      className="animate-pulse bg-white flex flex-col overflow-hidden" 
      style={{ 
        border: "3px solid #1e1b4b", 
        boxShadow: "4px 4px 0px 0px #1e1b4b" 
      }}
    >
      <div className="w-full aspect-square bg-[#ede9fe] border-b-[3px] border-[#1e1b4b]" />
      <div className="p-4 flex flex-col gap-3">
        <div className="h-5 bg-[#ede9fe] rounded w-3/4 border-2 border-[#1e1b4b]" />
        <div className="h-4 bg-[#ede9fe] rounded w-full border-2 border-[#1e1b4b]" />
        <div className="mt-2 h-6 bg-[#ede9fe] rounded w-1/3 border-2 border-[#1e1b4b]" />
        <div className="mt-3 h-10 bg-[#ede9fe] rounded w-full border-2 border-[#1e1b4b]" />
      </div>
    </div>
  );
}
