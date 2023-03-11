export default class IconButtonConfig {
    constructor({
        id,
        Icon,
        action,
        display
    }) {
        if (display === undefined) this.display = true;
        this.id = id || Math.random();
        this.Icon = Icon;
        this.action = action;
        this.display = display === undefined || display ? true : false;
    }
}
