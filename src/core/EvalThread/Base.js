import EvalThread from '.';

export default class Base {
    constructor({
        path,
        state
    }) {
        this.uid = Math.random().toString(36).split('.')[1];
        this.state = state;

        if (!path) path = [];
        this.path = path.concat([this.uid]);

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