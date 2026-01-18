import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export interface Blog {
    id: number;
    title: string;
    category: string[];
    description: string;
    date: string;
    coverImage?: string;
    content: string;
}

export interface CreateBlogData {
    title: string;
    category: string[];
    description: string;
    coverImage?: string;
    content: string;
}

export interface Bookmark {
    id: number;
    blogId: string;
}


export const fetchBlogs = async (): Promise<Blog[]> => {
    const response = await api.get('/blogs');
    return response.data;
};

export const fetchBlogById = async (id: string): Promise<Blog> => {
    const response = await api.get(`/blogs/${id}`);
    return response.data;
};

export const createBlog = async (data: CreateBlogData): Promise<Blog> => {
    const blogData = {
        ...data,
        date: new Date().toISOString(),
    };
    const response = await api.post('/blogs', blogData);
    return response.data;
};


export const fetchBookmarks = async (): Promise<Bookmark[]> => {
    const response = await api.get('/bookmarks');
    return response.data;
};

export const addBookmark = async (blogId: string): Promise<Bookmark> => {
    const response = await api.post('/bookmarks', { blogId });
    return response.data;
};

export const removeBookmark = async (bookmarkId: number): Promise<void> => {
    await api.delete(`/bookmarks/${bookmarkId}`);
};

export default api;
