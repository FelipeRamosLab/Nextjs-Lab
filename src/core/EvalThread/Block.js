import EvalThread from './index';
import Base from './Base';
import Config from './Config';

export default class Block extends Base {
    constructor(setup = {
        ...this,
        type,
        path,
        ifType,
        children
    }, getParent) {
        super(setup, getParent);
        const {type, children, ifType, path} = setup || {};

        this.type = type;
        this.children = [];
        
        switch (this.type) {
            case 'block': {
                this.ifType = ifType || null;
                break;
            }
            case 'rule': {
                break;
            }
        }

        if (children && Array.isArray(children)) {
            const self = this;

            children.map(item => {
                if (self.type === 'rule') {
                    self.children.push(new Config(item, () => this));
                } else {
                    self.children.push(new Block(item, () => this));
                }
            });
        }

    }

    addBlock(base) {
        const newBlock = new Block({
            type: 'block', 
            path: this.path, 
            state: this.state
        }, () => this);
        
        this.children.push(newBlock);
        this.set(base);

        return newBlock;
    }

    addRule(base) {
        const newRule = new Block({
            type: 'rule',
            path: this.path, 
            state: this.state
        }, () => this);
        
        this.children.push(newRule);
        this.set(base);

        return newRule;
    }

    addConfig(base) {
        const newConfig = new Config({ state: this.state, path: this.path }, () => this);
        this.children.push(newConfig);
        this.set(base);
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