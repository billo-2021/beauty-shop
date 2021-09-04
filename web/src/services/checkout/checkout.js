import {crudService} from "../crud/crud";
import { getCart, removeCart} from "../cart/cart";
import { DateTime } from 'luxon';
import {getUser} from "../authentication/authentication";

const checkoutPath = 'orders';
const checkoutCrudService = crudService();

export const checkout = async (shippingDetails) => {
    const cart = await getCart();
    const getCartTotal = () => {
        return cart.items.reduce((previousValue, currentValue) => previousValue + currentValue.price * currentValue.quantity, 0)
    }

    const order = {
        userEmailAddress: cart.userEmailAddress,
        shippingDetails: {...shippingDetails},
        items: [...cart.items],
        dateCreated: DateTime.local().toISO(),
        total: getCartTotal(),
        status: 'Pending'
    };

    await checkoutCrudService.post(checkoutPath, order);
    await removeCart(cart._id);
}

export const getOrders = async () => {
    return [];
}

export const getUserOrders = async ({skip, limit}) => {
    const user = getUser();
    const response = await checkoutCrudService.get(checkoutPath, {params: {userEmailAddress: user.email, $skip: skip, $limit: limit}});
    return response.data;
}

export const getOrder = async (id) => {
    const response = await checkoutCrudService.get(`${checkoutPath}/${id}`);
    console.log({response});

    return response.data;
}

export const updateOrder = async () => {
    return [];
}
