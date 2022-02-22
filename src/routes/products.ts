import { Router } from 'express';
import { addProduct, deleteProduct, getProduct, getProducts, queryProducts, updateProduct } from '../models/products';
const routes = Router();

routes.get('/', async (req, res) => {
    console.log('You are in products route');
    const products = await getProducts();
    console.log('products found', products);
    res.json(products);
})

routes.get('/:id', async (req, res) => {
    console.log('You are in products route');
    const Product = await getProduct(req.params.id);
    res.json(Product);
})

routes.post('/add', async (req, res) => {
    console.log('Adding', req.body);
    const Product = req.body;
    const ProductAdded = await addProduct(Product);
    res.json(ProductAdded);
})

routes.post('/update', async (req, res) => {
    console.log('Updating', req.body);
    let Product = req.body;
    const ProductUpdated = await updateProduct(Product);
    res.json(ProductUpdated);
})

routes.delete('/delete', async (req, res) => {
    console.log('Deleting', req.body);
    const Product = req.body;
    const deletedProduct = await deleteProduct(Product);
    res.json(Product);
})

routes.get('/query', async (req, res) => {
    console.log('Querying', req.body);
    const products = await queryProducts(req.body.query);
    res.json(products);
})


export default routes;