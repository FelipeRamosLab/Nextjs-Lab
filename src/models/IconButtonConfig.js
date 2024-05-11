export default class IconButtonConfig {
    constructor(setup) {
        const {
            id,
            Icon,
            action,
            display,
            color,
            disabled,
            title
        } = Object(setup);

        if (display === undefined) this.display = true;
        this.id = id || Math.random();
        this.Icon = Icon;
        this.action = action;
        this.display = display === undefined || display ? true : false;
        this.color = color;
        this.disabled = disabled;
        this.title = title;
    }
}
