import Base from './Base';
import Block from './Block';
export default class EvalThread {
    constructor({
        uid,
        thread,
        state
    }) {
        if (!state && state.length !== 2) throw new Error('');

        this.uid = uid || Math.random().toString(36).split('.')[1];
        this.getState = state[0];
        this.setState = state[1];
        this.state = state;
        this.path = [this.uid];
        this.thread = thread ? new Block(thread, () => this) : null;
    }

    addBlock() {
        const newBlock = new Block({state: this.state}, () => this);

        if (!this.thread) {
            this.setState((prev)=>{ return new EvalThread({...prev, thread: newBlock }) });
        }

        return this;
    }
}
