import {crudService} from "../crud/crud";
import {isLoggedIn, getUser} from "../authentication/authentication";
import {getStorageCart, setStorageCart} from "../session-storage/session-storage";
import { findProduct } from "../products/products";

const cartPath = 'cart';
const cartCrudService = crudService();

export const getCart = async () => {
    const loggedIn = isLoggedIn();

    if(!loggedIn) {
        const cart = getStorageCart() || {items: []};

        console.log({cart});
        return cart;
    }

    const user = getUser();
    let response = await cartCrudService.get(cartPath, {params: {userEmailAddress: user.email}});

    if(response.data?.data?.length === 0) {
        const cart = {userEmailAddress: user.email, items: []};
        await cartCrudService.post(cartPath, cart);
        response = await cartCrudService.get(cartPath, {params: {userEmailAddress: user.email}});
    }

    return response.data.data[0];
}

export const addToCart = async (productId, quantity) => {
    const loggedIn = isLoggedIn();
    const product = await findProduct(productId);
    let cart = await getCart();

    let oldItemIdx = cart.items.findIndex(item => item.productId === product._id);
    const newItem = oldItemIdx !== -1 ? cart.items[oldItemIdx]
        :
        {productId: product._id, name: product.name, price: product.price, quantity: 0};
    console.log({newItem})
    newItem.quantity += quantity;
    console.log({newItem});

    if(newItem.quantity <= 0) {
        cart.items.splice(oldItemIdx, 1);
    }
    else if(oldItemIdx === -1) {
        cart.items = [...cart.items, newItem];
    }

    if(!loggedIn) {
        setStorageCart(cart);
    }
    else {
        return await cartCrudService.put(`${cartPath}/${cart._id}`, cart);
    }
}

export const removeCart = async (id) => {
    return await cartCrudService.delete(`${cartPath}/${id}`);
}
