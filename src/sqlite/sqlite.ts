import sqlite3 from 'sqlite3';
import { Blog } from '../models/data';

const db = new sqlite3.Database('./blogs.db', (err) => {
    if (err) {
        console.log(err.message);
        return undefined;
    }
    console.log('Connected to sqlite databas blogs');
    return
});

export function run(sql: string, params?: any[]) {

    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) {
                console.log('Error running sql ' + sql)
                console.log(err)
                reject(err)
            } else {
                resolve(this)
            }
        })
    })
}

export async function createBlogsTable() {
    const sql = `CREATE TABLE IF NOT EXISTS blogs (
        id Text,
        blog_title Text,
        blog_text Text,
        blog_date Text,
        user_id Text
    );`
    await run(sql);
    console.log('creating table blogs if not exists');
}


export async function getAllBlogsFromSqliteDB() {

    const sql = "SELECT * from blogs";
    const res = await run(sql);
    console.log('db run result', res);
    return res;
}

export async function addBlogToSqliteDB(blog: Blog) {
    await createBlogsTable();
    const sql = "INSERT INTO blogs (id,blog_title,blog_text,blog_date,user_id) VALUES (?,?,?,?,?)";
    const params = [blog.id, blog.blogTitle, blog.blogText, blog.blogDate, blog.userId];
    const res = await run(sql);
    console.log('db run result', res);
    return res;
}

export async function deleteBlogFromSqliteDB(id: String) {
    const sql = "DELETE FROM blogs where id= ?";
    const params = [id];
    const res = await run(sql);
    console.log('db run result', res);
    return res;
}