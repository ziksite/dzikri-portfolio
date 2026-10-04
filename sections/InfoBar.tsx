import type { Dictionary } from "@/i18n";
import { cn } from "@/lib/utils";

export function InfoBar({ items }: { items: Dictionary["quickInfo"] }) {
  return (
    <div className="w-full border-y-2 border-foreground bg-white mt-12 md:mt-0 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x-2 divide-y-2 md:divide-y-0 divide-foreground">
        {items.map((item) => (
          <div
            key={item.label}
            className={cn(
              "py-6 px-4 md:px-8 flex flex-col justify-center items-center text-center transition-colors cursor-default",
              item.live ? "hover:bg-green-50" : "hover:bg-gray-50"
            )}
          >
            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">{item.label}</span>
            {item.live ? (
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" aria-hidden="true" />
                <span className="text-sm font-bold tracking-wide text-green-700">{item.value}</span>
              </span>
            ) : (
              <span className="text-sm font-bold tracking-wide text-foreground">{item.value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
