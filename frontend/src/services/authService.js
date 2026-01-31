import { api } from './api';

export const getTest = async () => {
    const response = await api.get('/test');
    return response.data;
};