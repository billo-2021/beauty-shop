const tokenStorageKey = 'TOKEN_STORAGE_KEY';
const userStorageKey = 'USER_STORAGE_KEY';
const formStateStorageKey = 'FORM_STATE_STORAGE_KEY';
const cartStorageKey = 'CART_STORAGE_KEY';
const redirectUrlKey = 'REDIRECT_URL_KEY';

export const setStorageToken = token => sessionStorage.setItem(tokenStorageKey, token);
export const getStorageToken = () => sessionStorage.getItem(tokenStorageKey);
export const removeStorageToken = () => sessionStorage.removeItem(tokenStorageKey);

export const setStorageUser = user => sessionStorage.setItem(userStorageKey, JSON.stringify(user));
export const getStorageUser = () => {
    try {
        return JSON.parse(sessionStorage.getItem(userStorageKey));
    }
    catch(error) {
        return null;
    }
}
export const removeStorageUser = () => sessionStorage.removeItem(userStorageKey);

export const setStorageFormState = formState => sessionStorage.setItem(formStateStorageKey, JSON.stringify(formState));
export const getStorageFormState = () => {
    try {
        return JSON.parse(sessionStorage.getItem(formStateStorageKey));
    }
    catch(error) {
        return null;
    }
}

export const setStorageCart = cart => sessionStorage.setItem(cartStorageKey, JSON.stringify(cart));
export const getStorageCart = () => {
    try {
        return JSON.parse(sessionStorage.getItem(cartStorageKey));
    }
    catch(error) {
        return null;
    }
}
export const removeStorageCart = () => sessionStorage.removeItem(cartStorageKey);

export const setStorageRedirectUrl = url => sessionStorage.setItem(redirectUrlKey, url);
export const getStorageRedirectUrl = () => sessionStorage.getItem(redirectUrlKey);
export const removeStorageRedirectUrl = () => sessionStorage.removeItem(redirectUrlKey);
