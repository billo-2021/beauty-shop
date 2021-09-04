import axios from 'axios';

export const apiBaseUrl = process.env.REACT_APP_BASE_URL || '';

export const crudService = path => axios.create({baseURL: apiBaseUrl, url: path});
