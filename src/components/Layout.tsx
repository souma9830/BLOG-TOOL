import { Link, useLocation } from 'react-router-dom';
import { PenSquare } from 'lucide-react';
import logo from '../assets/logo.png';

export function Layout({ children }: { children: React.ReactNode }) {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <nav className="bg-card brutalist-border-sm border-b-0 border-t-0 border-x-0 sticky top-0 z-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <Link to="/" className="flex items-center space-x-3">
                            <div className="bg-primary p-2 brutalist-border-sm brutalist-shadow-sm transform -rotate-2">
                                <img src={logo} alt="Boulevard Logo" className="h-8 w-8 object-contain" />
                            </div>
                            <span className="text-2xl font-black text-foreground tracking-tight">
                                BOULEVARD
                            </span>
                        </Link>

                        <div className="flex items-center space-x-3">
                            <Link to="/">
                                <button
                                    className={`px-5 py-2.5 font-bold text-sm brutalist-border-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0 ${location.pathname === '/'
                                        ? 'bg-primary text-primary-foreground brutalist-shadow-sm'
                                        : 'bg-card text-foreground hover:brutalist-shadow-sm'
                                        }`}
                                >
                                    BLOGS
                                </button>
                            </Link>
                            <Link to="/create">
                                <button
                                    className={`px-5 py-2.5 font-bold text-sm brutalist-border-sm flex items-center space-x-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 ${location.pathname === '/create'
                                        ? 'bg-secondary text-secondary-foreground brutalist-shadow-sm'
                                        : 'bg-card text-foreground hover:brutalist-shadow-sm'
                                        }`}
                                >
                                    <PenSquare className="h-4 w-4" strokeWidth={2.5} />
                                    <span>CREATE</span>
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
