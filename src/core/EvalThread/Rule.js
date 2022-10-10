import Base from './Base';
import Config from './Config';

export default class Rule extends Base {
    constructor({
        children
    }) {
        super(arguments[0] || {});
        if (!arguments[0]) throw new Error('');

        this.type = 'rule';
        this.children = [];
        this.path = [];

        if (children && Array.isArray(children)) {
            let internal = this;
            children.map(item => internal.children.push(new Config(item)));
        }
    }

    addConfig(base) {
        const newConfig = new Config({ state: this.state, path: this.path });
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