import Base from './Base';
import Config from './Config';

export default class Rule extends Base {
    constructor({
        children
    }, getParent) {
        super(arguments[0] || {}, getParent);
        if (!arguments[0]) throw new Error('');

        this.type = 'rule';
        this.children = [];
        this.path = [...this.getParent().path, this.uid];

        if (children && Array.isArray(children)) {
            let internal = this;
            children.map(item => internal.children.push(new Config(item, () => this)));
        }
    }

    addConfig(base) {
        const newConfig = new Config({ state: this.state, path: this.path }, () => this);
        this.children.push(newConfig);
        this.set(base);
    }

    remove(base, parent) {
        if (parent.children) {
            parent.children = parent.children.filter(item => {
                if (item.uid !== this.uid) return item;
            });

            this.set(base);
        }
    }
}