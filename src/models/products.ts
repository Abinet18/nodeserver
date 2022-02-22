
export type Product = {
    id: string;
    name: string;
    manufacturedBy: string;
    manufactureYear: string;
}

let products: Product[] = [
    {
        id: '1',
        name: 'Jeans',
        manufacturedBy: 'Levi',
        manufactureYear: '2020'
    },
];


export const addProduct = (p: Product) => {
    products.push(p);
}

export const updateProduct = (d: Product) => {
    const index = products.findIndex(b => b.id === d.id);
    if (index) {
        products[index] = { ...products[index], ...d }
    }
}

export const deleteProduct = (d: Product) => {
    const index = products.findIndex(b => b.id === d.id);
    products.splice(index, 1);
}

export const queryProducts = (q: string) => {
    const qLower = q.toLowerCase();
    return products.filter(b => b.name.toLowerCase().includes(qLower) || b.manufacturedBy.toLowerCase().includes(qLower))
}

export const getProducts = () => {
    return products;
}

export const getProduct = (productId: string) => {
    return products.find(b => b.id === productId)
}