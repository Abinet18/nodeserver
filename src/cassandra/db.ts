import cassandra from 'cassandra-driver';
import { Blog } from '../models/data';
const authProvider = new cassandra.auth.PlainTextAuthProvider('cassandra', 'cassandra');
const contactPoints = ['127.0.0.1'];
const client = new cassandra.Client({ contactPoints: contactPoints, authProvider: authProvider, keyspace: 'blogs', localDataCenter: 'datacenter1' });


async function execute(query: string, params?: string[], callback?: Function) {

    try {
        const result = await client.execute(query, params);
        if (callback) {
            callback(result);
        }
        return result;
    } catch (err) {
        console.log(err);
        if (callback) {
            callback(err)
        }

    }
}




export const getBlogsFromCassandra = async () => {
    const query = 'SELECT * from blogs.blogs';
    const result = await execute(query);
    const blogs: Blog[] | undefined = result?.rows.map(row => ({
        id: row.get('id'),
        blogTitle: row.get('blogtitle'),
        blogText: row.get('blogtext'),
        blogDate: row.get('blogdate'),
        userId: row.get('userid')
    }));
    console.log('blogs from cassandra', blogs)
    return blogs;
}

export const addBlogInCassandra = async (blog: Blog) => {
    const insertStmt = `INSERT INTO blogs.blogs (id,blogTitle,blogText,blogDate,userId)
     VALUES ('${blog.id}','${blog.blogTitle}','${blog.blogText}','${blog.blogDate}','${blog.userId}')`;
    const result = await execute(insertStmt);
    console.log('added to database', result, insertStmt);
}

export const deleteFromCassandra = async (blog: Blog) => {
    const deleteStmt = `DELETE FROM blogs.blogs 
    WHERE id='${blog.id}' IF EXISTS;`;
    const result = await execute(deleteStmt);
    console.log('deleted from database', result, deleteStmt);
}