import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import { Label } from './components/ui/label';
import { Skeleton } from './components/ui/skeleton';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Layout>
  );
}

function HomePage() {
  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <div className="space-y-4">
        <h1 className="text-6xl font-black text-foreground leading-none tracking-tighter">
          BOULEVARD
        </h1>
        <p className="text-lg text-muted-foreground font-medium max-w-2xl">
          A distinctive blog platform with bold design and clean functionality.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-3xl font-black text-foreground tracking-tight">COMPONENTS SHOWCASE</h2>

        <div className="space-y-4">
          <h3 className="text-xl font-black">BUTTONS</h3>
          <div className="flex gap-3 flex-wrap">
            <Button>DEFAULT</Button>
            <Button variant="outline">OUTLINE</Button>
            <Button variant="secondary">SECONDARY</Button>
            <Button variant="ghost">GHOST</Button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-black">BADGES</h3>
          <div className="flex gap-3 flex-wrap">
            <Badge>FINANCE</Badge>
            <Badge variant="secondary">TECH</Badge>
            <Badge variant="outline">BUSINESS</Badge>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-black">CARDS</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>SAMPLE BLOG POST</CardTitle>
                <CardDescription>Published 2 days ago</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium text-muted-foreground">
                  This is a preview of how blog cards will look in the application with the brutalist design system.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>LOADING STATE</CardTitle>
                <CardDescription>Skeleton component demo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-black">FORM INPUTS</h3>
          <div className="max-w-md space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">BLOG TITLE</Label>
              <Input id="title" placeholder="Enter your blog title..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">BLOG CONTENT</Label>
              <Textarea id="content" placeholder="Write your content here..." />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CreatePage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-5xl font-black tracking-tighter">CREATE<br />NEW BLOG</h1>
      <p className="text-lg text-muted-foreground font-medium">
        Blog creation form coming next...
      </p>
    </div>
  );
}

export default App;
