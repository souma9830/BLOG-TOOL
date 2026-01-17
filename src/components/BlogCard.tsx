import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';
import type { Blog } from '@/lib/api';

interface BlogCardProps {
    blog: Blog;
}

export function BlogCard({ blog }: BlogCardProps) {
    return (
        <Link to={`/blogs/${blog.id}`} className="block">
            <Card className="hover:-translate-y-1 hover:brutalist-shadow transition-all cursor-pointer h-full">
                <CardHeader className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                        <div className="flex gap-2 flex-wrap">
                            {blog.category.slice(0, 2).map((cat) => (
                                <Badge key={cat} variant="secondary" className="text-xs">
                                    {cat}
                                </Badge>
                            ))}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-bold">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{format(new Date(blog.date), 'MMM d, yyyy')}</span>
                        </div>
                    </div>
                    <CardTitle className="text-xl leading-tight line-clamp-2">
                        {blog.title}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground font-medium line-clamp-3">
                        {blog.description}
                    </p>
                </CardContent>
            </Card>
        </Link>
    );
}
