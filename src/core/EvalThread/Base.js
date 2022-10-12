import EvalThread from '.';

export default class Base {
    constructor({
        uid,
        path,
        state,
        createdDate
    }, getParent) {
        this.uid = uid || Math.random().toString(36).split('.')[1];
        this.state = state;
        this.createdDate = createdDate || Date.now();

        if (!path) path = [];
        this.getParent = getParent;
        this.path = [...this.getParent().path, this.uid];

        if (state) {
            this.getState = state[0];
            this.setState = state[1];
        }
    }

    set(base) {
        this.setState(new EvalThread(base));
    }

    setValue(base, prop, value) {
        this[prop] = value;
        this.set(base);
    }
}