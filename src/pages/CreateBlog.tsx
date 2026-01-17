import { useState, useEffect, useMemo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createBlog, type CreateBlogData } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Loader2, Save, Trash2, FileText, Clock, Target, CheckCircle2, AlertCircle, Eye, EyeOff, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const DRAFT_KEY = 'boulevard-blog-draft';

// Calculate statistics
function calculateStats(text: string) {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const paragraphs = text.trim() ? text.split('\n\n').filter(p => p.trim()).length : 0;
    const readingTime = Math.ceil(words / 200);

    return { words, characters, charactersNoSpaces, paragraphs, readingTime };
}

// SEO Score calculation
function calculateSEOScore(title: string, description: string) {
    let score = 0;
    const issues = [];

    if (title.length >= 30 && title.length <= 60) {
        score += 25;
    } else if (title.length > 0) {
        score += 10;
        issues.push(title.length < 30 ? 'Title too short' : 'Title too long');
    }

    if (description.length >= 120 && description.length <= 160) {
        score += 25;
    } else if (description.length > 0) {
        score += 10;
        issues.push(description.length < 120 ? 'Description too short' : 'Description too long');
    }

    if (title.length > 0) score += 25;
    if (description.length > 0) score += 25;

    return { score, issues };
}

export function CreateBlog() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [formData, setFormData] = useState<CreateBlogData>(() => {
        const saved = localStorage.getItem(DRAFT_KEY);
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch {
                return { title: '', category: [], description: '', coverImage: '', content: '' };
            }
        }
        return { title: '', category: [], description: '', coverImage: '', content: '' };
    });

    const [categoryInput, setCategoryInput] = useState('');
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const [hasDraft, setHasDraft] = useState(() => !!localStorage.getItem(DRAFT_KEY));
    const [showPreview, setShowPreview] = useState(false);

    const stats = useMemo(() => calculateStats(formData.content), [formData.content]);
    const seoScore = useMemo(() => calculateSEOScore(formData.title, formData.description), [formData.title, formData.description]);

    useEffect(() => {
        const hasContent = formData.title || formData.description || formData.content || formData.category.length > 0;
        if (!hasContent) return;

        const timer = setTimeout(() => {
            localStorage.setItem(DRAFT_KEY, JSON.stringify(formData));
            setLastSaved(new Date());
            setHasDraft(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, [formData]);

    const mutation = useMutation({
        mutationFn: createBlog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
            localStorage.removeItem(DRAFT_KEY);
            setHasDraft(false);
            navigate('/');
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.title && formData.description && formData.content) {
            mutation.mutate(formData);
        }
    };

    const handleAddCategory = () => {
        if (categoryInput.trim() && !formData.category.includes(categoryInput.trim().toUpperCase())) {
            setFormData({
                ...formData,
                category: [...formData.category, categoryInput.trim().toUpperCase()],
            });
            setCategoryInput('');
        }
    };

    const handleRemoveCategory = (cat: string) => {
        setFormData({
            ...formData,
            category: formData.category.filter((c) => c !== cat),
        });
    };

    const clearDraft = () => {
        if (confirm('Are you sure you want to clear the draft? This cannot be undone.')) {
            localStorage.removeItem(DRAFT_KEY);
            setFormData({ title: '', category: [], description: '', coverImage: '', content: '' });
            setHasDraft(false);
            setLastSaved(null);
        }
    };

    const formatLastSaved = () => {
        if (!lastSaved) return '';
        const seconds = Math.floor((Date.now() - lastSaved.getTime()) / 1000);
        if (seconds < 10) return 'just now';
        if (seconds < 60) return `${seconds}s ago`;
        const minutes = Math.floor(seconds / 60);
        return `${minutes}m ago`;
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-2">CREATE BLOG</h1>
                    <div className="flex items-center gap-3 flex-wrap">
                        <p className="text-muted-foreground font-medium">Share your thoughts and ideas</p>
                        {hasDraft && lastSaved && (
                            <div className="flex items-center gap-2 text-xs font-bold text-primary">
                                <Save className="h-3.5 w-3.5" />
                                <span>Draft saved {formatLastSaved()}</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant={showPreview ? "default" : "outline"}
                        onClick={() => setShowPreview(!showPreview)}
                        className="gap-2"
                    >
                        {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span className="hidden sm:inline">PREVIEW</span>
                    </Button>
                    {hasDraft && (
                        <Button variant="outline" size="icon" onClick={clearDraft} title="Clear draft">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    )}
                    <Link to="/">
                        <Button variant="outline" className="gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            <span className="hidden sm:inline">BACK</span>
                        </Button>
                    </Link>
                </div>
            </div>

            <div className={`grid gap-6 ${showPreview ? 'lg:grid-cols-2' : 'lg:grid-cols-[1fr_320px]'}`}>
                {/* Main Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>BLOG DETAILS</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">TITLE *</Label>
                                <Input
                                    id="title"
                                    placeholder="Enter blog title..."
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                                <p className="text-xs text-muted-foreground font-medium">
                                    {formData.title.length} / 60 characters (optimal: 30-60)
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">DESCRIPTION *</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Brief description of your blog..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                    rows={3}
                                />
                                <p className="text-xs text-muted-foreground font-medium">
                                    {formData.description.length} / 160 characters (optimal: 120-160)
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="coverImage">COVER IMAGE URL</Label>
                                <Input
                                    id="coverImage"
                                    type="url"
                                    placeholder="https://example.com/image.jpg"
                                    value={formData.coverImage}
                                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category">CATEGORIES</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="category"
                                        placeholder="Add category (e.g., TECH)"
                                        value={categoryInput}
                                        onChange={(e) => setCategoryInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleAddCategory();
                                            }
                                        }}
                                    />
                                    <Button type="button" onClick={handleAddCategory} variant="outline">
                                        ADD
                                    </Button>
                                </div>
                                {formData.category.length > 0 && (
                                    <div className="flex gap-2 flex-wrap mt-2">
                                        {formData.category.map((cat) => (
                                            <button
                                                key={cat}
                                                type="button"
                                                onClick={() => handleRemoveCategory(cat)}
                                                className="px-3 py-1 brutalist-border-sm bg-secondary text-secondary-foreground text-xs font-black hover:bg-destructive hover:text-destructive-foreground transition-colors"
                                            >
                                                {cat} ×
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="content">CONTENT *</Label>
                                <Textarea
                                    id="content"
                                    placeholder="Write your blog content here..."
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    required
                                    rows={12}
                                />
                            </div>

                            {mutation.error && (
                                <div className="bg-destructive/10 brutalist-border-sm p-4">
                                    <p className="text-sm font-bold text-destructive">
                                        Error: {mutation.error instanceof Error ? mutation.error.message : 'Failed to create blog'}
                                    </p>
                                </div>
                            )}

                            <div className="flex gap-3">
                                <Button type="submit" disabled={mutation.isPending} className="flex-1">
                                    {mutation.isPending ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                            CREATING...
                                        </>
                                    ) : (
                                        'CREATE BLOG'
                                    )}
                                </Button>
                                <Link to="/" className="flex-1">
                                    <Button type="button" variant="outline" className="w-full">
                                        CANCEL
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Preview or Statistics */}
                {showPreview ? (
                    /* Live Preview */
                    <Card className="lg:sticky lg:top-24 lg:self-start">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Eye className="h-4 w-4" />
                                LIVE PREVIEW
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
                            {formData.coverImage && (
                                <div className="brutalist-border-sm overflow-hidden h-48">
                                    <img
                                        src={formData.coverImage}
                                        alt="Cover preview"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                        }}
                                    />
                                </div>
                            )}

                            <div className="space-y-4">
                                <div className="flex gap-2 flex-wrap">
                                    {formData.category.length > 0 ? (
                                        formData.category.map((cat) => (
                                            <Badge key={cat}>{cat}</Badge>
                                        ))
                                    ) : (
                                        <span className="text-xs text-muted-foreground italic">No categories</span>
                                    )}
                                </div>

                                <h2 className="text-3xl font-black leading-tight">
                                    {formData.title || 'Your Blog Title'}
                                </h2>

                                <div className="flex items-center gap-3 text-sm text-muted-foreground font-bold">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        {format(new Date(), 'MMMM d, yyyy')}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4" />
                                        {stats.readingTime} min read
                                    </div>
                                </div>

                                <div className="brutalist-border-sm bg-accent/20 p-4">
                                    <p className="text-base font-medium leading-relaxed">
                                        {formData.description || 'Your blog description will appear here...'}
                                    </p>
                                </div>

                                <div className="h-[2px] bg-border" />

                                <div className="prose prose-sm max-w-none">
                                    <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap">
                                        {formData.content || 'Start writing your content to see the preview...'}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    /* Statistics Sidebar */
                    <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base flex items-center gap-2">
                                    <Target className="h-4 w-4" />
                                    SEO SCORE
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-black">{seoScore.score}%</span>
                                        {seoScore.score >= 75 ? (
                                            <CheckCircle2 className="h-5 w-5 text-primary" />
                                        ) : (
                                            <AlertCircle className="h-5 w-5 text-muted-foreground" />
                                        )}
                                    </div>
                                    <div className="h-2 bg-muted brutalist-border-sm">
                                        <div
                                            className="h-full bg-primary transition-all"
                                            style={{ width: `${seoScore.score}%` }}
                                        />
                                    </div>
                                </div>
                                {seoScore.issues.length > 0 && (
                                    <div className="space-y-1">
                                        {seoScore.issues.map((issue, i) => (
                                            <p key={i} className="text-xs text-muted-foreground font-medium">
                                                • {issue}
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base flex items-center gap-2">
                                    <FileText className="h-4 w-4" />
                                    STATISTICS
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-muted-foreground">Words</span>
                                        <span className="text-lg font-black">{stats.words}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-muted-foreground">Characters</span>
                                        <span className="text-lg font-black">{stats.characters}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-muted-foreground">Paragraphs</span>
                                        <span className="text-lg font-black">{stats.paragraphs}</span>
                                    </div>
                                    <div className="h-px bg-border my-2" />
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                                            <Clock className="h-3.5 w-3.5" />
                                            Reading Time
                                        </span>
                                        <span className="text-lg font-black text-primary">{stats.readingTime} min</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}
