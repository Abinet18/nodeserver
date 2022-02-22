import { Blog } from "../models/data";
import fs from 'fs';
import path from "path";

const FILEDB_PATH = path.resolve(__dirname, 'blogs');
const fsPromises = fs.promises;

export async function saveBlogInFileDb(blog: Blog) {
    await fsPromises.writeFile(`${FILEDB_PATH}/${blog.id}`, JSON.stringify(blog));
    return blog;
}

export async function deleteBlogFromFileDB(id: String) {
    await fsPromises.rm(`${FILEDB_PATH}/${id}`);
    return id;
}

export async function getAllBlogsFromFileDb() {
    const blogIds = await fsPromises.readdir(FILEDB_PATH);
    let blogs = [];
    for (let i = 0; i < blogIds.length; i++) {
        let content = await fsPromises.readFile(`${FILEDB_PATH}/${blogIds[i]}`);
        blogs.push(JSON.parse(content.toString()));
    }

    return blogs;
}
