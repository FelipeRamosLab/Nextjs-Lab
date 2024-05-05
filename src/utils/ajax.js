import axios from 'axios';
const https = require('https');
const agent = new https.Agent({
    rejectUnauthorized: false
  });

export default class AJAX {
    constructor(url, customHost) {
        this.host = customHost || process.env.NEXT_PUBLIC_HOST_RUNNER;
        this.url = this.host + url;
    }

    async get(params, options) {
        const { isServer } = Object(options);
        let response;

        try {
            if (!isServer) {
                const token = await cookieStore.get('token');
                response = await axios.get(this.url, {
                    ...Object(options),
                    headers: { token: token?.value || '' },
                    data: params
                });
            } else {
                response = await axios.get(this.url, { httpsAgent: agent });
            }

            return response.data;
        } catch (err) {
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
            throw err?.response?.data
        }
    }
}
