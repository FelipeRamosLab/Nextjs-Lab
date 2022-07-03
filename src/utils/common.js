function getUID() {
    return Math.random().toString(36).split('.')[1];
}

function createURL(path, queryParams) {
    let params = '';

    Object.keys(queryParams || {}).map(key=>{
        if(!params) params = '?';
        else params += '&';
        params += key + '=' + queryParams[key];
    });

    return path + params;
}

module.exports = {
    getUID,
    createURL
};