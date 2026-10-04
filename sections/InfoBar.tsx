import type { Dictionary } from "@/i18n";

export function InfoBar({ items }: { items: Dictionary["quickInfo"] }) {
  return (
    <div className="w-full border-y-2 border-foreground bg-white mt-12 md:mt-0 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x-2 divide-y-2 md:divide-y-0 divide-foreground">
        {items.map((item) => (
          <div
            key={item.label}
            className="py-6 px-4 md:px-8 flex flex-col justify-center items-center text-center hover:bg-gray-50 transition-colors cursor-default"
          >
            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">{item.label}</span>
            <span className="text-sm font-bold tracking-wide text-foreground">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
