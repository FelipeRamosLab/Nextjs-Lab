import axios from 'axios';

export default class AJAX {
    constructor(url, customHost) {
        this.host = customHost || 'http://localhost:80';
        this.url = this.host + url;
    }

    async get(params, options) {
        try {
            const token = await cookieStore.get('token');
            const response = await axios.get(this.url, {
                ...Object(options),
                headers: { token: token?.value || '' },
                data: params
            });

            return response.data;
        } catch (err) {
            if(err?.response?.data?.name === 'USER_NOT_AUTHORIZED' && window.location.pathname !== '/') {
                open('/', '_self');
            }

            throw err?.response?.data
        }
    }

    async post(params, options) {
        try {
            const token = await cookieStore.get('token');
            const response = await axios.post(this.url, params, {
                ...Object(options),
                headers: { token: token?.value }
            });

            return response.data;
        } catch (err) {
            if(err?.response?.data?.name === 'USER_NOT_AUTHORIZED' && window.location.pathname === '/') {
                open('/', '_self');
            }

            throw err?.response?.data
        }
    }

    async put(params, options) {
        try {
            const token = await cookieStore.get('token');
            const response = await axios.put(this.url, params, {
                ...Object(options),
                headers: { token: token?.value }
            });

            return response.data;
        } catch (err) {
            if(err?.response?.data?.name === 'USER_NOT_AUTHORIZED' && window.location.pathname === '/') {
                open('/', '_self');
            }

            throw err?.response?.data
        }
    }

    async delete(params, options) {
        try {
            const token = await cookieStore.get('token');
            const response = await axios.delete(this.url, {
                ...Object(options),
                headers: { token: token?.value },
                data: params
            });

            return response.data;
        } catch (err) {
            if(err?.response?.data?.name === 'USER_NOT_AUTHORIZED' && window.location.pathname === '/') {
                open('/', '_self');
            }

            throw err?.response?.data
        }
    }
}
