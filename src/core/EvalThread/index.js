import Block from './Block';
import Action from './Action';
import configs from '../../../config.json';

export default class EvalThread {
    constructor({
        uid,
        author,
        thread,
        state,
        action
    }) {
        if (!state || state.length !== 2) throw new Error('');

        this.author = author || configs.userTest;
        this.uid = uid || Math.random().toString(36).split('.')[1];
        this.getState = state[0];
        this.setState = state[1];
        this.state = state;
        this.path = [this.uid];

        if (thread) this.thread = new Block(thread || {}, () => this);
        if (action) this.action = new Action(action || {}, () => this);
    }

    addAction(actionEvent) {
        const newAction = new Action({ eventName: actionEvent }, () => this);

        if (!this.action) {
            this.setState((prev)=>{ return new EvalThread({...prev, action: newAction }) });
        }
        return this;
    }

    addBlock() {
        const newBlock = new Block({state: this.state}, () => this);

        if (!this.thread) {
            this.setState((prev)=>{ return new EvalThread({...prev, thread: newBlock }) });
        }
        return this;
    }
}
