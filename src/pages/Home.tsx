import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchBlogs } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { PlusCircle, Calendar, ArrowUpRight } from 'lucide-react';
import { format } from 'date-fns';

export function Home() {
    const { data: blogs, isLoading, error } = useQuery({
        queryKey: ['blogs'],
        queryFn: fetchBlogs,
    });

    if (error) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center px-4">
                <div className="bg-destructive/10 brutalist-border p-8 md:p-12 max-w-md w-full space-y-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-black text-destructive">ERROR</h2>
                    <p className="text-sm font-medium text-destructive/80">
                        {error instanceof Error ? error.message : 'Failed to load blogs'}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 md:space-y-12">
            {/* Hero Section */}
            <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground tracking-tighter mb-3 md:mb-4">
                    DISCOVER STORIES
                </h1>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-base md:text-lg text-muted-foreground font-medium">
                        {isLoading ? 'Loading amazing content...' : `${blogs?.length || 0} articles ready to read`}
                    </p>
                    <Link to="/create">
                        <Button size="lg" className="gap-2 px-6 md:px-8 w-full sm:w-auto">
                            <PlusCircle className="h-5 w-5" />
                            WRITE STORY
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Blog Grid */}
            {isLoading ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="brutalist-border bg-card p-6 space-y-4">
                            <div className="flex justify-between">
                                <Skeleton className="h-5 w-20" />
                                <Skeleton className="h-4 w-16" />
                            </div>
                            <Skeleton className="h-7 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                    ))}
                </div>
            ) : blogs && blogs.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {blogs.map((blog) => (
                        <Link key={blog.id} to={`/blogs/${blog.id}`} className="block group">
                            <Card className="h-full hover:-translate-y-2 hover:brutalist-shadow transition-all duration-200">
                                {blog.coverImage && (
                                    <div className="h-48 md:h-56 overflow-hidden brutalist-border-sm border-b-0">
                                        <img
                                            src={blog.coverImage}
                                            alt={blog.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                )}

                                <CardHeader className="space-y-4 p-5 md:p-6">
                                    <div className="flex items-start justify-between gap-2 flex-wrap">
                                        <div className="flex gap-2 flex-wrap">
                                            {blog.category.slice(0, 2).map((cat) => (
                                                <Badge key={cat} variant="secondary" className="text-xs">
                                                    {cat}
                                                </Badge>
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-bold">
                                            <Calendar className="h-3.5 w-3.5" />
                                            <span>{format(new Date(blog.date), 'MMM d')}</span>
                                        </div>
                                    </div>

                                    <h2 className="text-xl md:text-2xl font-black leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                                        {blog.title}
                                    </h2>
                                </CardHeader>

                                <CardContent className="p-5 md:p-6 pt-0 space-y-4">
                                    <p className="text-sm text-muted-foreground font-medium line-clamp-3 leading-relaxed">
                                        {blog.description}
                                    </p>

                                    <div className="flex items-center gap-2 text-xs font-black text-primary">
                                        <span>READ ARTICLE</span>
                                        <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="min-h-[50vh] flex items-center justify-center">
                    <div className="bg-muted brutalist-border p-8 md:p-12 text-center space-y-4 max-w-md">
                        <div className="text-5xl md:text-6xl mb-2">📝</div>
                        <h3 className="text-2xl md:text-3xl font-black">NO STORIES YET</h3>
                        <p className="text-muted-foreground font-medium">
                            Be the first to share your thoughts
                        </p>
                        <Link to="/create">
                            <Button className="mt-4">CREATE FIRST STORY</Button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
