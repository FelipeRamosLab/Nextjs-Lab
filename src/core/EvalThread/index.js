import Base from './Base';
import Block from './Block';
export default class EvalThread {
    constructor({
        thread,
        state
    }) {
        if (!state && state.length !== 2) throw new Error('');

        this.thread = thread ? new Block(thread) : null;
        this.getState = state[0];
        this.setState = state[1];
        this.state = state;
    }

    addBlock() {
        const newBlock = new Block({state: this.state});

        if (!this.thread) {
            this.setState((prev)=>{ return new EvalThread({...prev, thread: newBlock }) });
        }

        return this;
    }
}
