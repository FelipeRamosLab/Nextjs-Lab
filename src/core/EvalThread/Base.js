import EvalThread from '.';
import configs from '../../../config.json';

export default class Base {
    constructor({
        uid,
        author,
        path,
        state,
        createdDate
    }, getParent) {
        this.uid = uid || Math.random().toString(36).split('.')[1];
        this.state = state || getParent().state;
        this.author = author || configs.userTest;
        this.createdDate = createdDate || Date.now();

        if (!path) path = [];
        this.getParent = getParent;

        if (this.state) {
            this.getState = this.state[0];
            this.setState = this.state[1];
        }
    }

    set() {
        this.setState((prev) => {
            return new EvalThread(prev);
        });
    }

    setValue(prop, value) {
        this[prop] = value;
        this.set();
    }
}