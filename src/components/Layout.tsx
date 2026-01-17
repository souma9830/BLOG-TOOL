import { Link, useLocation } from 'react-router-dom';
import { PenSquare, BookOpen } from 'lucide-react';

export function Layout({ children }: { children: React.ReactNode }) {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <nav className="border-b bg-white sticky top-0 z-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="bg-primary rounded-md p-2">
                                <BookOpen className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <span className="text-xl font-semibold text-foreground">
                                CA Monk Blog
                            </span>
                        </Link>

                        <div className="flex items-center space-x-2">
                            <Link to="/">
                                <button
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === '/'
                                            ? 'bg-primary text-primary-foreground'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                                        }`}
                                >
                                    All Blogs
                                </button>
                            </Link>
                            <Link to="/create">
                                <button
                                    className={`px-4 py-2 rounded-md text-sm font-medium flex items-center space-x-2 transition-colors ${location.pathname === '/create'
                                            ? 'bg-primary text-primary-foreground'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                                        }`}
                                >
                                    <PenSquare className="h-4 w-4" />
                                    <span>Create Blog</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
                {children}
            </main>

            <footer className="border-t mt-auto bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <p className="text-center text-sm text-muted-foreground">
                        © 2026 CA Monk. Built with React, TanStack Query & Tailwind CSS.
                    </p>
                </div>
            </footer>
        </div>
    );
}
