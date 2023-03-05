// import Base from './Base';
import Rule from './Rule';

export default class Block {
    constructor(setup = {
        ...this,
        path,
        ifType,
        blocks,
        rules,
        children
    }, getParent) {
        // super(setup, getParent);
        const {type, children, ifType, path} = setup || {};

        if (type !== 'or' || type !== 'and') new Error('');

        this.type = 'block';
        this.ifType = ifType || null;
        this.blocks = [];
        this.rules = [];

        if (children && Array.isArray(children)) {
            let internal = this;

            children.map(item => {
                switch (item.type) {
                    case 'block': {
                        internal.blocks.push(new Block(item, () => this));
                        break;
                    }
                    case 'rule': {
                        internal.rules.push(new Rule(item, () => this));
                        break;
                    }
                    default: new Error('');
                }
            });
        }

        this.children = [...this.blocks, ...this.rules].sort((a, b) => a.createdDate - b.createdDate);
    }

    addBlock(base) {
        const newBlock = new Block({path: this.path, state: this.state}, () => this);
        
        this.children.push(newBlock);
        this.set(base);

        return newBlock;
    }

    addRule(base) {
        const newRule = new Rule({path: this.path, state: this.state}, () => this);
        
        this.children.push(newRule);
        this.set(base);

        return newRule;
    }

    remove(base, parent) {
        const EvalThread = require('./index');

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