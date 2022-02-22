import { now } from "lodash";

export type Blog = {
    id: string,
    userId: string,
    blogDate: Date,
    blogTitle: string,
    blogText: string
}

let blogs: Blog[] = [
    {
        id: 'blog1',
        userId: '',
        blogDate: new Date(),
        blogText: 'Test sample blog 1 text',
        blogTitle: 'Blog 1'
    },
    {
        id: 'blog2',
        userId: '',
        blogDate: new Date(),
        blogText: 'Test sample blog 2 text',
        blogTitle: 'Blog 2'
    }
];


export const addBlog = (d: Blog) => {
    blogs.push(d);
}

export const updateBlog = (d: Blog) => {
    const index = blogs.findIndex(b => b.id === d.id);
    if (index) {
        blogs[index] = { ...blogs[index], ...d }
    }
}

export const deleteBlog = (d: Blog) => {
    const index = blogs.findIndex(b => b.id === d.id);
    blogs.splice(index, 1);
}

export const queryBlogs = (q: string) => {
    const qLower = q.toLowerCase();
    return blogs.filter(b => b.blogTitle.toLowerCase().includes(qLower) || b.blogText.toLowerCase().includes(qLower))
}

export const getBlogs = () => {
    return blogs;
}

export const getBlog = (blogId: string) => {
    return blogs.find(b => b.id === blogId)
}