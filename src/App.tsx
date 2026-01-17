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
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Welcome to CA Monk Blog
        </h1>
        <p className="text-muted-foreground text-lg">
          Modern blog application built with React, TanStack Query & Tailwind CSS
        </p>
      </div>

      <div className="flex justify-center gap-4">
        <Button>Primary Button</Button>
        <Button variant="outline">Outline Button</Button>
        <Button variant="secondary">Secondary Button</Button>
      </div>

      <div className="bg-card border border-border rounded-lg p-8 text-center space-y-4">
        <h2 className="text-2xl font-semibold">🚀 Components Ready</h2>
        <p className="text-muted-foreground">
          Layout, Navigation, and Button components are working!
        </p>
        <p className="text-sm text-muted-foreground">
          Building more components... Stay tuned!
        </p>
      </div>
    </div>
  );
}

function CreatePage() {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-3xl font-bold">Create Blog</h1>
      <p className="text-muted-foreground">Form coming soon...</p>
    </div>
  );
}

export default App;
