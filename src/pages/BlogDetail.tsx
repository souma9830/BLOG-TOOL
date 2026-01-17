import { useQuery } from '@tanstack/react-query';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchBlogById } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Calendar, Share2 } from 'lucide-react';
import { format } from 'date-fns';

export function BlogDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: blog, isLoading, error } = useQuery({
        queryKey: ['blog', id],
        queryFn: () => fetchBlogById(id!),
        enabled: !!id,
    });

    if (error) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center px-4">
                <div className="bg-destructive/10 brutalist-border p-8 md:p-12 max-w-md w-full space-y-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-black text-destructive">ERROR</h2>
                    <p className="text-sm font-medium text-destructive/80">
                        {error instanceof Error ? error.message : 'Failed to load blog'}
                    </p>
                    <Button onClick={() => navigate('/')}>BACK TO HOME</Button>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto space-y-6 md:space-y-8 px-4">
                <Skeleton className="h-10 w-32" />
                <div className="space-y-4 md:space-y-6">
                    <Skeleton className="h-64 md:h-96 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-6 w-3/4" />
                    <div className="space-y-3 pt-6">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                </div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center px-4">
                <div className="bg-muted brutalist-border p-8 md:p-12 text-center space-y-4 max-w-md w-full">
                    <h2 className="text-2xl md:text-3xl font-black">NOT FOUND</h2>
                    <p className="text-muted-foreground font-medium">This story doesn't exist</p>
                    <Button onClick={() => navigate('/')}>BACK TO HOME</Button>
                </div>
            </div>
        );
    }

    return (
        <article className="max-w-4xl mx-auto space-y-6 md:space-y-8">
            {/* Navigation */}
            <div className="flex items-center justify-between gap-4">
                <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => navigate('/')}
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="hidden sm:inline">BACK</span>
                </Button>
                <Button variant="ghost" className="gap-2">
                    <Share2 className="h-4 w-4" />
                    <span className="hidden sm:inline">SHARE</span>
                </Button>
            </div>

            {/* Cover Image */}
            {blog.coverImage && (
                <div className="brutalist-border overflow-hidden h-64 sm:h-80 md:h-96">
                    <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            {/* Content */}
            <div className="space-y-6 md:space-y-8">
                {/* Meta */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                        {blog.category.map((cat) => (
                            <Badge key={cat} className="px-3 md:px-4 py-1.5">{cat}</Badge>
                        ))}
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-[1.1] tracking-tighter">
                        {blog.title}
                    </h1>

                    <div className="flex items-center gap-3 text-sm md:text-base text-muted-foreground font-bold">
                        <Calendar className="h-4 w-4 md:h-5 md:w-5" />
                        <span>{format(new Date(blog.date), 'MMMM d, yyyy')}</span>
                    </div>
                </div>

                {/* Description */}
                <div className="brutalist-border-sm bg-accent/20 p-6 md:p-8">
                    <p className="text-lg md:text-xl font-medium leading-relaxed">
                        {blog.description}
                    </p>
                </div>

                {/* Divider */}
                <div className="h-[3px] bg-border" />

                {/* Main Content */}
                <div className="prose prose-base md:prose-lg max-w-none">
                    <div className="text-base md:text-lg font-medium leading-[1.8] whitespace-pre-wrap">
                        {blog.content}
                    </div>
                </div>
            </div>

            {/* Back Button */}
            <div className="pt-8 md:pt-12 border-t-2 border-border">
                <Button
                    variant="outline"
                    className="gap-2 w-full sm:w-auto"
                    onClick={() => navigate('/')}
                >
                    <ArrowLeft className="h-4 w-4" />
                    BACK TO ALL STORIES
                </Button>
            </div>
        </article>
    );
}
