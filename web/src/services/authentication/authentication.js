import { DateTime } from 'luxon';

import {getStorageToken, getStorageUser, setStorageToken, setStorageUser, removeStorageToken, removeStorageUser} from '../session-storage/session-storage';
import {crudService} from "../crud/crud";

const authenticationPath = 'authentication';
const usersPath = 'users';

const authenticationCrudService = crudService();

const getToken = () => {
    try {
        return JSON.parse(window.atob(getStorageToken().split('.')[1]));
    }
    catch(error) {
        logout();
        return false;
    }
}
const setToken = setStorageToken;
const removeToken = removeStorageToken;

export const getUser = getStorageUser;
export const setUser = setStorageUser;
const removeUser = removeStorageUser;

const isTokenValid = () => {
    const token = getToken();
    if(!token) {
        return false;
    }
    const tokenExpiryDate = new Date(0);
    tokenExpiryDate.setUTCSeconds(token.exp);
    const bufferPeriod = DateTime.utc().plus({ minutes: 15 });
    console.log({tokenExpiryDate});
    return tokenExpiryDate > bufferPeriod.toJSDate();
}

export const isLoggedIn = () => {
    if(isTokenValid()) {
        return true;
    }

    logout();
    return false;
}

export const login = async (email, password) => {
    const response = await authenticationCrudService.post(authenticationPath, {strategy: 'local', email, password});

    const { accessToken, user } = response.data;
    accessToken && setToken(accessToken);
    user && setUser(user);

    return response;
};

export const registerUser = async (user) => {
    const {
        firstName,
        lastName,
        cellphoneNumber,
        emailAddress,
        password
    } = user;

    const response = await authenticationCrudService.post(usersPath, {firstName, lastName, cellphoneNumber, email: emailAddress, password, roles: 'Customer'});
    await login(emailAddress, password);

    return response;
}

export const logout = () => {
    removeStorageToken();
    removeStorageUser();
};
