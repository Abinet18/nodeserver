import { Schema, model, connect, Mongoose } from 'mongoose'
import { string } from 'yup';
import { addBlogsToCache, addBlogToCache, deleteBlogFromCache, getBlogsFromCache } from '../cache/cache';
import { addBlogInCassandra, deleteFromCassandra, getBlogsFromCassandra } from '../cassandra/db';
import { deleteBlogFromFileDB, getAllBlogsFromFileDb, saveBlogInFileDb } from '../filedb/fileDb';
import { addBlogToSqliteDB, deleteBlogFromSqliteDB, getAllBlogsFromSqliteDB } from '../sqlite/sqlite';
import { Blog } from './data';

const BlogSchema = new Schema<Blog>({
    id: {
        type: String,
        required: true
    },
    blogDate: {
        type: Date,
        required: true
    },
    blogText: {
        type: String,
        required: true
    },
    blogTitle: {
        type: String,
        required: true
    },
    userId: {
        type: String
    }

});

const BlogModel = model('Blog', BlogSchema);

export const addBlog = async (d: Blog) => {
    // const blog = new BlogModel(d);
    // const blogAdded = await blog.save();
    // const blogAdded = await addBlogInCassandra(d);
    // await saveBlogInFileDb(d);
    await addBlogToSqliteDB(d);
    await addBlogToCache(d);
    return d;
}

export const updateBlog = async (d: Blog) => {
    const updatedBlog = await BlogModel.updateOne({ id: d.id }, { $set: d });
    return updatedBlog;
}

export const deleteBlog = async (d: Blog) => {
    // const deletedBlog = await BlogModel.deleteOne({ id: d.id });
    // const deletedBlog = await deleteFromCassandra(d);
    // await deleteBlogFromFileDB(d.id);
    await deleteBlogFromSqliteDB(d.id);
    await deleteBlogFromCache(d);
    return d;
}

export const queryBlogs = async (q: string) => {
    const blogs = await BlogModel.find({ $or: [{ blogTitle: { like: q } }, { blogText: { like: q } }] });
}

export const getBlogs = async () => {
    // const blogs = await BlogModel.find({});
    let blogs: Blog[] = await getBlogsFromCache();
    if (blogs && blogs.length > 0) {
        console.log('return blogs from cache');
        return blogs;
    }
    // blogs = await getBlogsFromCassandra() || [];
    // blogs = await getAllBlogsFromFileDb();
    await getAllBlogsFromSqliteDB();
    if (blogs.length > 0) {
        addBlogsToCache(blogs);
    }
    return blogs;
}

export const getBlog = async (blogId: string) => {
    const blog = await BlogModel.findOne({ id: blogId });
    return blog;
}

