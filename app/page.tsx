import Link from 'next/link';
import { FileText, Shield, Zap, Search, ArrowRight, Github } from 'lucide-react';

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-2 font-bold text-xl">
                        <FileText className="h-6 w-6 text-primary" />
                        <span>DocClassifier</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">Login</Link>
                        <Link
                            href="/signup"
                            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="flex-1">

                <section className="py-24 px-4 bg-gradient-to-b from-primary/[0.03] to-background overflow-hidden">
                    <div className="container mx-auto text-center relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10" />

                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6 animate-fade-in">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Powered by Gemini 1.5 Flash
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl mx-auto leading-[1.1]">
                            Organize your documents with <span className="text-primary italic">Intelligence</span>
                        </h1>
                        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                            Upload any PDF, DOCX, or text file. Our AI automatically classifies, summarizes, and indexes them for you in seconds.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/signup"
                                className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:scale-105"
                            >
                                Start for Free
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                            <Link
                                href="#features"
                                className="inline-flex h-12 items-center justify-center rounded-lg border bg-background px-8 py-3 text-base font-medium shadow-sm transition-all hover:bg-accent"
                            >
                                How it works
                            </Link>
                        </div>
                    </div>
                </section>


                <section id="features" className="py-24 px-4">
                    <div className="container mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
                            <p className="text-muted-foreground max-w-xl mx-auto">Everything you need to manage your personal and professional documents.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "Instant Classification",
                                    desc: "Automatically detects if a document is an Invoice, Resume, Legal, or Financial record.",
                                    icon: <Zap className="h-6 w-6" />
                                },
                                {
                                    title: "AI Summarization",
                                    desc: "Get the core details of any document in 3-5 concise sentences immediately after upload.",
                                    icon: <FileText className="h-6 w-6" />
                                },
                                {
                                    title: "Smart Search",
                                    desc: "Search through your library by file name, category, or date with lightning speed.",
                                    icon: <Search className="h-6 w-6" />
                                }
                            ].map((f, i) => (
                                <div key={i} className="p-8 border rounded-2xl bg-card shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                                        {f.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <footer className="border-t py-12 px-4">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2 font-bold text-lg opacity-60">
                        <FileText className="h-5 w-5" />
                        <span>DocClassifier</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        © 2026 AI Document Classifier. Built with Next.js & Gemini.
                    </p>
                    <div className="flex items-center gap-4 grayscale opacity-60">
                        <Github className="h-5 w-5" />
                    </div>
                </div>
            </footer>
        </div>
    );
}
