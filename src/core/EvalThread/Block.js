import Base from './Base';

export default class Block extends Base {
    constructor(setup = {
        ...this,
        path,
        ifType,
        children
    }) {
        super(setup);
        const {type, children, ifType, path} = setup || {};

        if (type !== 'or' || type !== 'and') new Error('');

        this.type = 'block';
        this.ifType = ifType || null;
        this.children = {};
        this.path = [];

        if (children && typeof children === 'object') {
            let internal = this;

            Object.keys(children).map(key => {
                const curr = children[key];

                switch (curr.type) {
                    case 'block': internal.children[key] = new Block(curr);
                    default: '';
                }
            });
        }
    }
    
    edit() {

    }

    remove() {

    }

    addBlock(base) {
        const newBlock = new Block({path: this.path, state: this.state});

        this.set({children: {...this.children, [newBlock.uid]: newBlock}})
    }

    addEvalRule() {

    }
}