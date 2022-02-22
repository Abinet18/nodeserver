import { Router } from 'express';
import { addBlog, deleteBlog, getBlog, getBlogs, queryBlogs, updateBlog } from '../models/blogs';

const routes = Router();

routes.get('/', async (req, res) => {
    console.log('You are in blogs route');
    const blogs = await getBlogs();
    // console.log('blogs found', blogs);
    res.json(blogs);
})

routes.get('/:id', async (req, res) => {
    console.log('You are in blogs route');
    const blog = await getBlog(req.params.id);
    res.json(blog);
})

routes.post('/add', async (req, res) => {
    console.log('Adding', req.body);
    const blog = req.body;
    const blogAdded = await addBlog(blog);
    res.json(blogAdded);
})

routes.post('/update', async (req, res) => {
    console.log('Updating', req.body);
    let blog = req.body;
    const blogUpdated = await updateBlog(blog);
    res.json(blogUpdated);
})

routes.delete('/delete', async (req, res) => {
    console.log('Deleting', req.body);
    const blog = req.body;
    const deletedBlog = await deleteBlog(blog);
    res.json(blog);
})

routes.get('/query', async (req, res) => {
    console.log('Querying', req.body);
    const blogs = await queryBlogs(req.body.query);
    res.json(blogs);
})


export default routes;