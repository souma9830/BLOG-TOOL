import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchBlogs, fetchBookmarks } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Bookmark, Calendar, ArrowUpRight, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

export function Bookmarks() {
    const { data: blogs, isLoading: blogsLoading } = useQuery({
        queryKey: ['blogs'],
        queryFn: fetchBlogs,
    });

    const { data: bookmarks, isLoading: bookmarksLoading } = useQuery({
        queryKey: ['bookmarks'],
        queryFn: fetchBookmarks,
    });

    const isLoading = blogsLoading || bookmarksLoading;

    // Filter blogs that match bookmark IDs
    const bookmarkedBlogs = blogs?.filter(blog =>
        bookmarks?.some(b => b.blogId === blog.id)
    ) || [];

    return (
        <div className="space-y-8 md:space-y-12">
            <div className="text-center md:text-left">
                <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground tracking-tighter mb-3 md:mb-4">
                            YOUR BOOKMARKS
                        </h1>
                        <p className="text-base md:text-lg text-muted-foreground font-medium">
                            {isLoading ? 'Loading...' : `${bookmarkedBlogs.length} saved article${bookmarkedBlogs.length !== 1 ? 's' : ''}`}
                        </p>
                    </div>
                    <Link to="/">
                        <Button variant="outline" className="gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            <span className="hidden sm:inline">BACK</span>
                        </Button>
                    </Link>
                </div>
            </div>

            {isLoading ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {[...Array(3)].map((_, i) => (
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
            ) : bookmarkedBlogs.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {bookmarkedBlogs.map((blog) => (
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
                        <div className="text-5xl md:text-6xl mb-2">
                            <Bookmark className="h-16 w-16 mx-auto text-muted-foreground" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black">NO BOOKMARKS YET</h3>
                        <p className="text-muted-foreground font-medium">
                            Start bookmarking articles you love!
                        </p>
                        <Link to="/">
                            <Button className="mt-4">EXPLORE STORIES</Button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
