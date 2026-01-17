import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { BlogDetail } from './pages/BlogDetail';
import { CreateBlog } from './pages/CreateBlog';
import { Bookmarks } from './pages/Bookmarks';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
      </Routes>
    </Layout>
  );
}

export default App;
