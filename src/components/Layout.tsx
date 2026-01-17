import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PenSquare, BookOpen } from 'lucide-react';

export function Layout({ children }: { children: React.ReactNode }) {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
            <nav className="border-b border-border/40 backdrop-blur-xl bg-background/80 sticky top-0 z-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link to="/" className="flex items-center space-x-2 group">
                            <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                                className="bg-primary rounded-lg p-2"
                            >
                                <BookOpen className="h-5 w-5 text-primary-foreground" />
                            </motion.div>
                            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                CA Monk Blog
                            </span>
                        </Link>

                        <div className="flex items-center space-x-4">
                            <Link to="/">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname === '/'
                                            ? 'bg-primary text-primary-foreground'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                                        }`}
                                >
                                    All Blogs
                                </motion.button>
                            </Link>
                            <Link to="/create">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors ${location.pathname === '/create'
                                            ? 'bg-primary text-primary-foreground'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                                        }`}
                                >
                                    <PenSquare className="h-4 w-4" />
                                    <span>Create Blog</span>
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>

            <footer className="border-t border-border/40 mt-auto">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <p className="text-center text-sm text-muted-foreground">
                        © 2026 CA Monk Blog. Built with React, TanStack Query & Tailwind CSS.
                    </p>
                </div>
            </footer>
        </div>
    );
}
