import Base from './Base';

export default class Action extends Base {
    constructor(setup = {
        ...this,
        eventName,
        inputType
    }, getParent) {
        super(setup, getParent);
        const {
            eventName,
            inputType
        } = setup || {};

        this.type = 'action';
        this.eventName = eventName;
        this.inputType = inputType;
    }
}