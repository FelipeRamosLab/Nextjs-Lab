function getUID() {
    return Math.random().toString(36).split('.')[1];
}

module.exports = {
    getUID
};