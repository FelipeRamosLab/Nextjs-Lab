import Base from './Base';

export default class Action extends Base {
    constructor(setup = {
        ...this,
        botThread,
        eventName,
        valueType,
        valueFunction,
        functionConfig
    }, getParent) {
        super(setup, getParent);
        const {
            botThread,
            eventName,
            valueType,
            valueFunction,
            functionConfig
        } = setup || {};

        this.type = 'action';
        this.botThread = botThread;
        this.eventName = eventName;
        this.valueType = valueType;
        this.valueFunction = valueFunction;
        this.functionConfig = functionConfig;
    }
}