const {validateProp, validateNum} = require('./validate');

function toMoney(rootObj, inputPath, options) {
    const {zeroAsFalse} = options || {};
    const value = Number(validateProp(rootObj, inputPath));

    if (zeroAsFalse && value === 0) return undefined;
    if(!validateNum(value)) return undefined;
    return new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol'}).format(value);
}

function toPercent(rootObj, inputPath) {
    const value = Number(validateProp(rootObj, inputPath));

    if(!validateNum(value)) return undefined;
    return new Intl.NumberFormat('pt-BR', { style: 'percent' }).format(value / 100);
}

function concatUnit(rootObj, inputPath, prefix, suffix) {
    let value = Number(validateProp(rootObj, inputPath));
    if(!validateNum(value)) return undefined;

    if (prefix) value = prefix + value;
    if (suffix) value = value + suffix;

    return value;
}

module.exports = {
    toMoney,
    toPercent,
    concatUnit
};
