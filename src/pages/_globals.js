function declareGlobals(obj) {
    Object.keys(obj).map(key => global[key] = obj[key]);
}

// Declaring the globals
declareGlobals({
    URLs: {
        serverHost: process.env.hostURL
    }
});
declareGlobals(require('../utils/common'));
declareGlobals(require('../utils/numbers'));
declareGlobals(require('../utils/validate'));

export default function ToRender() {
    return <></>;
}
