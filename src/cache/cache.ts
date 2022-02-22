import * as redis from 'redis'
import { Blog } from '../models/data';

const port = 6379, hostname = 'localhost', password = 'eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81'

const client = redis.createClient();

let authenticated = false;

export const authenticateRedis = async () => {
    try {
        await client.connect();
        await client.auth({ password });
        authenticated = true;
    }
    catch (err) {
        authenticated = false;
    }
}


// const client = redis.createClient(port, host);


export const getBlogsFromCache = async () => {
    const list = await client.lRange('blogs', 0, -1);
    let blogs = [];
    for (let i = 0; i < list.length; i++) {
        const blog = await client.get(list[i]);
        blog && blogs.push(JSON.parse(blog));
    }

    return blogs;
}

export const addBlogsToCache = async (blogs: Blog[]) => {
    for (let i = 0; i < blogs.length; i++) {
        await addBlogToCache(blogs[i]);
    }
}

export const addBlogToCache = async (blog: Blog) => {
    await client.rPush('blogs', blog.id);
    await client.set(blog.id, JSON.stringify(blog));
}

export const deleteBlogFromCache = async (blog: Blog) => {
    await client.lRem('blogs', 0, blog.id);
    await client.del(blog.id);
}