import { cn } from "@/lib/utils";

const categoryStyles: Record<string, string> = {
    Invoice: "bg-blue-100 text-blue-700 border-blue-200",
    Resume: "bg-green-100 text-green-700 border-green-200",
    Legal: "bg-purple-100 text-purple-700 border-purple-200",
    Academic: "bg-yellow-100 text-yellow-700 border-yellow-200",
    Medical: "bg-red-100 text-red-700 border-red-200",
    Financial: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Personal: "bg-pink-100 text-pink-700 border-pink-200",
    Other: "bg-slate-100 text-slate-700 border-slate-200",
};

export default function CategoryBadge({ category, className }: { category: string; className?: string }) {
    const style = categoryStyles[category] || categoryStyles.Other;

    return (
        <span className={cn(
            "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
            style,
            className
        )}>
            {category}
        </span>
    );
}
