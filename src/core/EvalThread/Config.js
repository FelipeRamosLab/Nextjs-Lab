import Base from './Base';

export default class Config extends Base {
    constructor({
        type,
        valueType,
        primitiveType,
        primitiveValue,
        functionUID,
        toCompare,
        configs
    }, getParent) {
        super(arguments[0] || {}, getParent);
        if (!arguments[0]) throw new Error('');

        this.type = type || '';
        this.valueType = valueType || '';
        this.primitiveType = primitiveType || '';
        this.functionUID = functionUID || '';
        this.configs = configs || '';
        this.toCompare = toCompare || '';

        switch (primitiveType){
            case 'boolean': {
                this.primitiveValue = typeof primitiveValue === 'boolean' ? primitiveValue : null;
                break;
            }
            default: {
                this.primitiveValue = primitiveValue;
            }
        }
    }
}