"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import UploadDropzone from '@/components/UploadDropzone';
import { useSupabase } from '@/lib/supabase-provider';
import { supabase } from '@/lib/supabaseClient';
import { ArrowLeft, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function UploadPage() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();


    useState(() => {
        supabase.auth.getUser().then(({ data }) => setUser(data.user));
    });

    const handleUpload = async (file: File) => {
        setIsProcessing(true);
        try {

            const formData = new FormData();
            formData.append('file', file);

            const uploadRes = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const contentType = uploadRes.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await uploadRes.text();
                console.error('Server returned non-JSON response:', text);
                throw new Error('Server returned an error page. Check terminal for details.');
            }

            const uploadData = await uploadRes.json();
            if (!uploadRes.ok) throw new Error(uploadData.error || 'Upload failed');


            const analyzeRes = await fetch('/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    storage_path: uploadData.storage_path,
                    file_name: uploadData.file_name,
                }),
            });

            const docData = await analyzeRes.json();
            if (!analyzeRes.ok) throw new Error(docData.error);

            router.push(`/document/${docData.id}`);

        } catch (error: any) {
            console.error(error);
            throw error;
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-muted/30">
            <Navbar user={user} />

            <main className="container mx-auto py-12 px-4 max-w-4xl">
                <div className="mb-8">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
                    >
                        <ArrowLeft className="mr-1 h-4 w-4" />
                        Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight">Upload Document</h1>
                    <p className="text-muted-foreground">
                        Our AI will automatically categorize and summarize your document.
                    </p>
                </div>

                <div className="bg-card border rounded-2xl p-8 shadow-sm">
                    <UploadDropzone onUpload={handleUpload} isProcessing={isProcessing} />

                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 border-t pt-8">
                        <div className="text-center">
                            <div className="mx-auto w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                                <CheckCircle2 className="w-5 h-5 text-primary" />
                            </div>
                            <h4 className="font-semibold text-sm">Step 1: Upload</h4>
                            <p className="text-xs text-muted-foreground mt-1">Files are stored securely in Supabase Storage.</p>
                        </div>
                        <div className="text-center">
                            <div className="mx-auto w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-3 text-primary">
                                <Loader2 className="w-5 h-5" />
                            </div>
                            <h4 className="font-semibold text-sm">Step 2: Analyze</h4>
                            <p className="text-xs text-muted-foreground mt-1">Gemini AI extracts text and identifies the category.</p>
                        </div>
                        <div className="text-center">
                            <div className="mx-auto w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                                <FileText className="w-5 h-5 text-primary" />
                            </div>
                            <h4 className="font-semibold text-sm">Step 3: Save</h4>
                            <p className="text-xs text-muted-foreground mt-1">Metadata is indexed for fast searching and filtering.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

import { FileText } from 'lucide-react';
