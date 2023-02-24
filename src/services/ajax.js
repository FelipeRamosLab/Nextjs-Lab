import axios from 'axios';
const https = require('https');
const agent = new https.Agent({
    rejectUnauthorized: false
});

module.exports = (url, data) => {
    return {
        get: async (config, getAxiosResponse) => {
            try {
                const response = await axios.get(url, {
                    ...config,
                    data,
                    httpsAgent: agent
                });

                if (response.status === 200) {
                    if (!getAxiosResponse) {
                        return response.data;
                    } else {
                        return response;
                    }
                } else {
                    throw response;
                }
            } catch(err) {
                throw err;
            }
        }, 
        post: async (config, getAxiosResponse) => {
            try {
                const response = await axios.post(url, data, {
                    ...config,
                    httpsAgent: agent
                });

                if (response.status === 200) {
                    if (!getAxiosResponse) {
                        return response.data;
                    } else {
                        return response;
                    }
                } else {
                    throw response;
                }
            } catch(err) {
                throw err;
            }
        },
        put: async (config, getAxiosResponse) => {
            try {
                const response = await axios.put(url, data, {
                    ...config,
                    httpsAgent: agent
                });

                if (response.status === 200) {
                    if (!getAxiosResponse) {
                        return response.data;
                    } else {
                        return response;
                    }
                } else {
                    throw response;
                }
            } catch(err) {
                throw err;
            }
        },
        delete: async (config, getAxiosResponse) => {
            try {
                const response = await axios.delete(url, {
                    ...config,
                    data,
                    httpsAgent: agent
                });

                if (response.status === 200) {
                    if (!getAxiosResponse) {
                        return response.data;
                    } else {
                        return response;
                    }
                } else {
                    throw response;
                }
            } catch(err) {
                throw err;
            }
        }
    }
};
