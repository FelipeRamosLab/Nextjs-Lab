import axios from 'axios';

export default class ListDocsModel {
    constructor({
        collection, // String
        filter, // String | Object (Mongoose filter standard)
        Content, // React component to render the content
        state // React useState array
    }) {
        if (!arguments[0]) throw 'At least 1 argument is expected at ListDocsModel! But received any argument.';
        if (!collection) throw 'The arguments[0].collection param is required at ListDocsModel!';
        if (!state || !Array.isArray(state) && state.length == 2) throw 'The arguments[0].state param is required and should be an React useState array, at ListDocsModel!';

        this.collection = collection;
        this.filter = filter;
        this.Content = Content;

        this.getState = state[0];
        this.setState = state[1];
    }

    async loadData() {
        // debugger
    }
}
