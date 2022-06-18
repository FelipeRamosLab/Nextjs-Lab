function validateProp(rootObj, path) {
    let result = rootObj;

    path && path.map(prop=>{
        if (result) result = result[prop];
    });

    return result;
}

function validateNum(value) {
    if (isNaN(value) || (!value && value !== 0)) return false;
    return true;
}

module.exports = {
    validateProp,
    validateNum
}
