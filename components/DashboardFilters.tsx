"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Filter } from 'lucide-react';
import { useCallback } from 'react';

interface DashboardFiltersProps {
    initialSearch?: string;
    initialCategory?: string;
    categories: string[];
}

export default function DashboardFilters({
    initialSearch = '',
    initialCategory = 'All',
    categories
}: DashboardFiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value && value !== 'All') {
                params.set(name, value);
            } else {
                params.delete(name);
            }
            return params.toString();
        },
        [searchParams]
    );

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const q = formData.get('q') as string;
        router.push(`/dashboard?${createQueryString('q', q)}`);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const category = e.target.value;
        router.push(`/dashboard?${createQueryString('category', category)}`);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="md:col-span-3 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <form onSubmit={handleSearch}>
                    <input
                        name="q"
                        type="text"
                        placeholder="Search documents..."
                        defaultValue={initialSearch}
                        className="w-full pl-10 h-10 rounded-md border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                </form>
            </div>
            <div className="relative">
                <Filter className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <select
                    value={initialCategory}
                    onChange={handleCategoryChange}
                    className="w-full pl-10 h-10 rounded-md border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring appearance-none"
                >
                    {categories.map(c => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
                <div className="absolute right-3 top-3 pointer-events-none">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-muted-foreground"
                    >
                        <path d="m6 9 6 6 6-6" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
