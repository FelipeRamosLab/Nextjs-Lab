import EvalThread from './index';
import Base from './Base';
import Rule from './Rule';

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
        this.children = [];
        this.path = [];

        if (children && Array.isArray(children)) {
            let internal = this;

            children.map(item => {
                switch (item.type) {
                    case 'block': {
                        internal.children.push(new Block(item));
                        break;
                    }
                    case 'rule': {
                        internal.children.push(new Rule(item));
                        break;
                    }
                    default: new Error('');
                }
            });
        }
    }

    addBlock(base) {
        const newBlock = new Block({path: this.path, state: this.state});
        
        this.children.push(newBlock);
        this.set(base);

        return newBlock;
    }

    addRule(base) {
        const newRule = new Rule({path: this.path, state: this.state});
        
        this.children.push(newRule);
        this.set(base);

        return newRule;
    }

    remove(base, parent) {
        if (parent.thread) {
            parent.thread = null;

            parent.setState(prev => {
                return new EvalThread({...prev, ...parent});
            });
            return base;
        }

        if (parent.children) {
            parent.children = parent.children.filter(item => {
                if (item.uid !== this.uid) return item;
            });

            this.set(base);
        }
    }
}