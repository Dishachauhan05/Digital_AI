"use client";

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X, Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UploadDropzoneProps {
    onUpload: (file: File) => Promise<void>;
    isProcessing: boolean;
}

export default function UploadDropzone({ onUpload, isProcessing }: UploadDropzoneProps) {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]);
            setError(null);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
            'text/plain': ['.txt'],
            'text/markdown': ['.md'],
        },
        multiple: false,
        disabled: isProcessing,
    });

    const handleUpload = async () => {
        if (!file) return;
        try {
            await onUpload(file);
        } catch (err: any) {
            setError(err.message || "Upload failed");
        }
    };

    const removeFile = () => {
        setFile(null);
        setError(null);
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            {!file ? (
                <div
                    {...getRootProps()}
                    className={cn(
                        "relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl transition-all cursor-pointer bg-muted/30 hover:bg-muted/50 hover:border-primary/50",
                        isDragActive && "border-primary bg-primary/5",
                        isProcessing && "opacity-50 cursor-not-allowed"
                    )}
                >
                    <input {...getInputProps()} />
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <div className="p-4 bg-primary/10 rounded-full mb-4">
                            <Upload className="w-8 h-8 text-primary" />
                        </div>
                        <p className="mb-2 text-sm text-foreground font-semibold">
                            {isDragActive ? "Drop the file here" : "Click to upload or drag and drop"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            PDF, DOCX, TXT or Markdown (max. 10MB)
                        </p>
                    </div>
                </div>
            ) : (
                <div className="border rounded-xl p-6 bg-card shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-lg">
                                <File className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="font-medium text-sm truncate max-w-[200px]">{file.name}</p>
                                <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                        </div>
                        {!isProcessing && (
                            <button
                                onClick={removeFile}
                                className="p-1 hover:bg-muted rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-muted-foreground" />
                            </button>
                        )}
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-xs">
                            {error}
                        </div>
                    )}

                    <button
                        onClick={handleUpload}
                        disabled={isProcessing}
                        className={cn(
                            "w-full h-11 flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground font-medium transition-all hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed",
                            isProcessing && "animate-pulse"
                        )}
                    >
                        {isProcessing ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                AI is analyzing...
                            </>
                        ) : (
                            "Classify Document"
                        )}
                    </button>
                </div>
            )}
        </div>
    );
}
