import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

const apiClient = axios.create({
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
    coverImage: string;
    content: string;
}

export interface CreateBlogData {
    title: string;
    category: string[];
    description: string;
    coverImage: string;
    content: string;
}

export const fetchBlogs = async (): Promise<Blog[]> => {
    const response = await apiClient.get<Blog[]>('/blogs');
    return response.data;
};

export const fetchBlogById = async (id: string): Promise<Blog> => {
    const response = await apiClient.get<Blog>(`/blogs/${id}`);
    return response.data;
};

export const createBlog = async (blogData: CreateBlogData): Promise<Blog> => {
    const newBlog = {
        ...blogData,
        date: new Date().toISOString(),
    };
    const response = await apiClient.post<Blog>('/blogs', newBlog);
    return response.data;
};
