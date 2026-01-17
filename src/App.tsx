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
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Blog Application
        </h1>
        <p className="text-muted-foreground text-lg">
          A simple and clean blog platform for sharing thoughts and ideas.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Components Preview</h2>
        <div className="flex gap-3">
          <Button>Default</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
        </div>
      </div>

      <div className="bg-card border rounded-lg p-8 space-y-3">
        <h3 className="text-lg font-medium">Work in Progress</h3>
        <p className="text-sm text-muted-foreground">
          Building the blog list, detail views, and creation form.
        </p>
      </div>
    </div>
  );
}

function CreatePage() {
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Create New Blog</h1>
      <p className="text-muted-foreground">Form components coming soon.</p>
    </div>
  );
}

export default App;
