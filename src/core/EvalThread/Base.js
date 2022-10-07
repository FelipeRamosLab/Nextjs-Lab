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

    set(value) {
        this.setState((prev, props)=>{
            let current = {};
            current = prev.thread;

            this.path.map((item, i) => {
                if (i === this.path.length -1) {
                    current = {...current, ...value};
                }
            });


            return new EvalThread({...prev, thread: current});
        })
    }
}