import { api } from './api';

export const login = async (email, senha) => {
    try {
        const response = await api.post('/auth/login', { email, senha });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.erro || error.response.data.error || 'Erro ao fazer login');
        } else if (error.request) {
            throw new Error('Servidor não respondeu. Verifique sua conexão.');
        } else {
            throw new Error('Erro ao processar requisição: ' + error.message);
        }
    }
};

export const logout = async () => {
    try {
        await api.post('/auth/logout');
    } catch (error) {
        // Ignora erro - removemos o token mesmo se o logout falhar no servidor
    } finally {
        localStorage.removeItem('token');
    }
};

export const cadastro = async (nome, email, senha) => {
    try {
        const response = await api.post('/users', { nome, email, senha });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.erro || error.response.data.error || 'Erro ao fazer cadastro');
        } else if (error.request) {
            throw new Error('Servidor não respondeu. Verifique sua conexão.');
        } else {
            throw new Error('Erro ao processar requisição: ' + error.message);
        }
    }
};