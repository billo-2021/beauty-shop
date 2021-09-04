import {crudService} from "../crud/crud";

const productsPath = 'products';
const productsCrudService = crudService();

export const getProducts = async ({skip, limit}) => {
    const response = await productsCrudService.get(productsPath, {params: {$skip: skip, $limit: limit}});

    return response.data;
}

export const findProduct = async (id) => {
    const response = await productsCrudService.get(`${productsPath}/${id}`);
    return response.data;
}

export const addProduct = async (product) => {
    const {
        name,
        brand,
        category,
        price,
        quantity,
        description
    } = product;

    return await productsCrudService.post(productsPath, {name, brand, category, price, quantity, description});
}

export const updateProduct = async (product) => {
    const {
        _id,
        name,
        brand,
        category,
        price,
        quantity,
        description
    } = product;

    return await productsCrudService.put(`${productsPath}/${_id}`, {_id, name, brand, category, price, quantity, description});
}

export const removeProduct = async (id) => {
    return await productsCrudService.delete(`${productsPath}/${id}`);
}
