import { Link, useLocation } from 'react-router-dom';
import { PenSquare, Moon, Sun, Bookmark } from 'lucide-react';
import { useTheme } from '@/lib/theme';
import logo from '../assets/logo.png';

export function Layout({ children }: { children: React.ReactNode }) {
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="min-h-screen bg-background flex flex-col transition-colors duration-200">
            <nav className="bg-card brutalist-border-sm border-b-0 border-t-0 border-x-0 sticky top-0 z-50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        <Link to="/" className="flex items-center space-x-2 md:space-x-3 shrink-0">
                            <div className="bg-primary p-1.5 md:p-2 brutalist-border-sm brutalist-shadow-sm transform -rotate-2">
                                <img src={logo} alt="Boulevard Logo" className="h-6 w-6 md:h-8 md:w-8 object-contain" />
                            </div>
                            <span className="text-xl md:text-2xl font-black text-foreground tracking-tight hidden xs:inline-block">
                                BOULEVARD
                            </span>
                        </Link>

                        <div className="flex items-center gap-2 md:space-x-3 overflow-x-auto no-scrollbar py-1">
                            <button
                                onClick={toggleTheme}
                                className="p-2 md:px-3 md:py-2.5 brutalist-border-sm bg-card text-foreground hover:brutalist-shadow-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0 shrink-0"
                                aria-label="Toggle theme"
                            >
                                {theme === 'light' ? (
                                    <Moon className="h-4 w-4 md:h-5 md:w-5" strokeWidth={2.5} />
                                ) : (
                                    <Sun className="h-4 w-4 md:h-5 md:w-5" strokeWidth={2.5} />
                                )}
                            </button>

                            <Link to="/" className="shrink-0">
                                <button
                                    className={`p-2 md:px-5 md:py-2.5 font-bold text-sm brutalist-border-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 ${location.pathname === '/'
                                        ? 'bg-primary text-primary-foreground brutalist-shadow-sm'
                                        : 'bg-card text-foreground hover:brutalist-shadow-sm'
                                        }`}
                                >
                                    <span className="md:hidden font-black text-xs">HOME</span>
                                    <span className="hidden md:inline">BLOGS</span>
                                </button>
                            </Link>

                            <Link to="/bookmarks" className="shrink-0">
                                <button
                                    className={`p-2 md:px-5 md:py-2.5 font-bold text-sm brutalist-border-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 ${location.pathname === '/bookmarks'
                                        ? 'bg-accent text-accent-foreground brutalist-shadow-sm'
                                        : 'bg-card text-foreground hover:brutalist-shadow-sm'
                                        }`}
                                >
                                    <Bookmark className="h-4 w-4 md:h-4 md:w-4" strokeWidth={2.5} />
                                    <span className="hidden md:inline">SAVED</span>
                                </button>
                            </Link>

                            <Link to="/create" className="shrink-0">
                                <button
                                    className={`p-2 md:px-5 md:py-2.5 font-bold text-sm brutalist-border-sm flex items-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 ${location.pathname === '/create'
                                        ? 'bg-secondary text-secondary-foreground brutalist-shadow-sm'
                                        : 'bg-card text-foreground hover:brutalist-shadow-sm'
                                        }`}
                                >
                                    <PenSquare className="h-4 w-4 md:h-4 md:w-4" strokeWidth={2.5} />
                                    <span className="hidden md:inline">CREATE</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1">
                {children}
            </main>

            <footer className="brutalist-border-sm border-b-0 border-x-0 bg-card">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <p className="text-center font-bold text-sm text-muted-foreground tracking-wide">
                        © 2026 BOULEVARD · REACT + TANSTACK QUERY + TAILWIND
                    </p>
                </div>
            </footer>
        </div>
    );
}
