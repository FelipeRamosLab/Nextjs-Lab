import EvalThread from '.';

export default class Base {
    constructor({
        uid,
        path,
        state,
        createdDate
    }, getParent) {
        this.uid = uid || Math.random().toString(36).split('.')[1];
        this.state = state || getParent().state;
        this.createdDate = createdDate || Date.now();

        if (!path) path = [];
        this.getParent = getParent;
        this.path = [...this.getParent().path, this.uid];

        if (this.state) {
            this.getState = this.state[0];
            this.setState = this.state[1];
        }
    }

    set(base) {
        this.setState(new EvalThread(base));

        if (this.type === 'action') {
            this.appendBotThread();
        }
    }

    appendBotThread() {
        // this.getParent().getParent()[this.eventName] = self;
    }

    setValue(base, prop, value) {
        this[prop] = value;
        this.set(base);
    }
}