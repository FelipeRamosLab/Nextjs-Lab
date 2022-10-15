import Block from './Block';
import Action from './Action';

export default class EvalThread {
    constructor({
        uid,
        thread,
        state,
        action
    }) {
        if (!state || state.length !== 2) throw new Error('');

        this.uid = uid || Math.random().toString(36).split('.')[1];
        this.getState = state[0];
        this.setState = state[1];
        this.state = state;
        this.path = [this.uid];
        this.thread = new Block(thread || {}, () => this);
        this.action = new Action(action || {}, () => this);
    }

    addBlock() {
        const newBlock = new Block({state: this.state}, () => this);

        if (!this.thread) {
            this.setState((prev)=>{ return new EvalThread({...prev, thread: newBlock }) });
        }
        return this;
    }
}
