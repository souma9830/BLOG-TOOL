import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Button } from './components/ui/button';

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
    <div className="max-w-5xl mx-auto space-y-10">
      <div className="space-y-6">
        <h1 className="text-6xl font-black text-foreground leading-none tracking-tighter">
          BLOG<br />APPLICATION
        </h1>
        <p className="text-lg text-muted-foreground font-medium max-w-2xl">
          A distinctive platform for publishing and discovering articles.
          Built with modern tools and a bold design philosophy.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-black text-foreground tracking-tight">COMPONENTS</h2>
        <div className="flex gap-4 flex-wrap">
          <Button>DEFAULT</Button>
          <Button variant="outline">OUTLINE</Button>
          <Button variant="secondary">SECONDARY</Button>
        </div>
      </div>

      <div className="bg-accent/30 brutalist-border p-8 space-y-4 brutalist-shadow transform rotate-1">
        <div className="transform -rotate-1">
          <h3 className="text-2xl font-black mb-3">IN DEVELOPMENT</h3>
          <p className="text-base text-foreground/80 font-medium">
            Blog list, article details, and creation interface coming soon.
          </p>
        </div>
      </div>
    </div>
  );
}

function CreatePage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-5xl font-black tracking-tighter">CREATE<br />NEW BLOG</h1>
      <p className="text-lg text-muted-foreground font-medium">Form interface in progress.</p>
    </div>
  );
}

export default App;
