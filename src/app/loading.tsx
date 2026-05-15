import ProductSkeleton from "@/components/ProductSkeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#ede9fe] flex flex-col items-center py-20 px-4">
      <div className="max-w-6xl w-full flex flex-col gap-8">
        <div className="animate-pulse bg-[#f5f3ff] h-40 w-full rounded-xl border-[4px] border-[#1e1b4b] shadow-[8px_8px_0_#1e1b4b]" />
        
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 w-full">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
