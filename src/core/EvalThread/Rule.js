import Base from './Base';
import BotValue from './BotValue';

export default class Rule extends Base {
    constructor({
        children
    }, getParent) {
        super(arguments[0] || {}, getParent);
        if (!arguments[0]) throw new Error('');

        this.type = 'rule';
        this.children = [];
        // this.path = [...this.getParent().path, this.uid];

        if (children && Array.isArray(children)) {
            let internal = this;
            children.map(item => internal.children.push(new BotValue(item, () => this)));
        }
    }

    addBotValue(base) {
        const newBotValue = new BotValue({ state: this.state, path: this.path }, () => this);
        this.children.push(newBotValue);
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