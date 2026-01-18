import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBlogById, fetchBookmarks, addBookmark, removeBookmark } from '@/lib/api';
import { getBlogLikes, hasUserLiked, toggleLike } from '@/lib/interactions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Toast } from '@/components/ui/toast';
import { ArrowLeft, Calendar, Share2, Clock, Heart, Bookmark as BookmarkIcon } from 'lucide-react';
import { format } from 'date-fns';

function calculateReadingTime(text: string): number {
    const wordsPerMinute = 200;
    const wordCount = text.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes;
}

export function BlogDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [scrollProgress, setScrollProgress] = useState(0);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    // Local state for Likes (still using localStorage as requested)
    const [likes, setLikes] = useState(0);
    const [userLiked, setUserLiked] = useState(false);
    const [likeAnimation, setLikeAnimation] = useState(false);

    const { data: blog, isLoading, error } = useQuery({
        queryKey: ['blog', id],
        queryFn: () => fetchBlogById(id!),
        enabled: !!id,
    });

    // Fetch bookmarks from server
    const { data: bookmarks } = useQuery({
        queryKey: ['bookmarks'],
        queryFn: fetchBookmarks,
    });

    const currentBookmark = bookmarks?.find(b => b.blogId === id);
    const isBookmarked = !!currentBookmark;

    // Mutations
    const addBookmarkMutation = useMutation({
        mutationFn: addBookmark,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
            showToastMessage('📚 Bookmarked!');
        },
    });

    const removeBookmarkMutation = useMutation({
        mutationFn: removeBookmark,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
            showToastMessage('Removed from bookmarks');
        },
    });

    // Initialize likes
    useEffect(() => {
        if (id) {
            setLikes(getBlogLikes(parseInt(id)));
            setUserLiked(hasUserLiked(parseInt(id)));
        }
    }, [id]);

    // Reading progress
    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;
            const totalScrollable = documentHeight - windowHeight;
            const progress = (scrollTop / totalScrollable) * 100;
            setScrollProgress(Math.min(100, Math.max(0, progress)));
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleShare = async () => {
        const url = window.location.href;
        try {
            if (navigator.share) {
                await navigator.share({
                    title: blog?.title || 'Blog Post',
                    text: blog?.description || '',
                    url: url,
                });
                showToastMessage('Shared successfully!');
            } else {
                await navigator.clipboard.writeText(url);
                showToastMessage('Link copied to clipboard!');
            }
        } catch (err) {
            console.log('Share cancelled or failed');
        }
    };

    const handleLike = () => {
        if (!id) return;
        const result = toggleLike(parseInt(id));
        setLikes(result.likes);
        setUserLiked(result.liked);
        setLikeAnimation(true);
        setTimeout(() => setLikeAnimation(false), 300);
        showToastMessage(result.liked ? '❤️ Liked!' : 'Unliked');
    };

    const handleBookmark = () => {
        if (!id) return;
        if (isBookmarked && currentBookmark) {
            removeBookmarkMutation.mutate(currentBookmark.id);
        } else {
            addBookmarkMutation.mutate(id);
        }
    };

    const showToastMessage = (message: string) => {
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

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

    const readingTime = calculateReadingTime(blog.content + ' ' + blog.description);

    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-muted">
                <div
                    className="h-full bg-primary transition-all duration-150"
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>

            <Toast message={toastMessage} isVisible={showToast} />

            <article className="max-w-4xl mx-auto space-y-6 md:space-y-8">
                <div className="flex items-center justify-between gap-4">
                    <Button
                        variant="outline"
                        className="gap-2"
                        onClick={() => navigate('/')}
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span className="hidden sm:inline">BACK</span>
                    </Button>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            className="gap-2"
                            onClick={handleShare}
                        >
                            <Share2 className="h-4 w-4" />
                            <span className="hidden sm:inline">SHARE</span>
                        </Button>
                    </div>
                </div>

                {blog.coverImage && (
                    <div className="brutalist-border overflow-hidden h-64 sm:h-80 md:h-96">
                        <img
                            src={blog.coverImage}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                <div className="space-y-6 md:space-y-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                            {blog.category.map((cat) => (
                                <Badge key={cat} className="px-3 md:px-4 py-1.5">{cat}</Badge>
                            ))}
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-[1.1] tracking-tighter">
                            {blog.title}
                        </h1>

                        <div className="flex items-center gap-4 md:gap-6 text-sm md:text-base text-muted-foreground font-bold flex-wrap">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 md:h-5 md:w-5" />
                                <span>{format(new Date(blog.date), 'MMMM d, yyyy')}</span>
                            </div>
                            <div className="flex items-center gap-2 text-primary">
                                <Clock className="h-4 w-4 md:h-5 md:w-5" />
                                <span>{readingTime} min read</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 pb-6 border-b-2 border-border">
                        <Button
                            onClick={handleLike}
                            variant={userLiked ? "default" : "outline"}
                            className={`gap-2 ${likeAnimation ? 'scale-110' : ''} transition-transform`}
                        >
                            <Heart className={`h-5 w-5 ${userLiked ? 'fill-primary-foreground' : 'fill-primary text-primary'}`} />
                            <span className="font-black">{likes}</span>
                        </Button>
                        <Button
                            onClick={handleBookmark}
                            disabled={addBookmarkMutation.isPending || removeBookmarkMutation.isPending}
                            variant={isBookmarked ? "default" : "outline"}
                            className="gap-2"
                        >
                            <BookmarkIcon className={`h-5 w-5 ${isBookmarked ? 'fill-primary-foreground' : ''}`} />
                            <span className="hidden sm:inline">
                                {isBookmarked ? 'BOOKMARKED' : 'BOOKMARK'}
                            </span>
                        </Button>
                    </div>

                    <div className="brutalist-border-sm bg-accent/20 p-6 md:p-8">
                        <p className="text-lg md:text-xl font-medium leading-relaxed">
                            {blog.description}
                        </p>
                    </div>

                    <div className="h-[3px] bg-border" />

                    <div className="prose prose-base md:prose-lg max-w-none">
                        <div className="text-base md:text-lg font-medium leading-[1.8] whitespace-pre-wrap">
                            {blog.content}
                        </div>
                    </div>
                </div>

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
        </>
    );
}
