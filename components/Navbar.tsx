"use client";

import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { FileText, LogOut, LayoutDashboard, Upload } from 'lucide-react';

export default function Navbar({ user }: { user: any }) {
    const handleSignOut = async () => {
        await supabase.auth.signOut();
        window.location.href = '/login';
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                    <FileText className="h-6 w-6 text-primary" />
                    <span>DocClassifier <span className="text-primary/60 text-sm font-medium">AI</span></span>
                </Link>

                <div className="flex items-center gap-6">
                    {user ? (
                        <>
                            <Link href="/dashboard" className="text-sm font-medium hover:text-primary flex items-center gap-1">
                                <LayoutDashboard className="h-4 w-4" />
                                Dashboard
                            </Link>
                            <Link href="/upload" className="text-sm font-medium hover:text-primary flex items-center gap-1">
                                <Upload className="h-4 w-4" />
                                Upload
                            </Link>
                            <button
                                onClick={handleSignOut}
                                className="text-sm font-medium text-destructive hover:text-destructive/80 flex items-center gap-1"
                            >
                                <LogOut className="h-4 w-4" />
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="text-sm font-medium hover:text-primary">Login</Link>
                            <Link
                                href="/signup"
                                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
