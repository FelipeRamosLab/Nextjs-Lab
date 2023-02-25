export default async function HomeActivity(req, res) {
    const userData = { collectionName: 'users', filter: testData.userUID, options: { populate: {levels: 3} } };
    const myBotsData = { collectionName: 'bots', filter: {author: testData.userUID }, options: { populate: {levels: 3} } };
    const availableFunctionsData = { collectionName: 'functions', options: { populate: {levels: 3} } };

    try {
        const user = await ajax(URLs.serverHost + '/collection/get/doc', userData).get();
        const myBots = await ajax(URLs.serverHost + '/collection/get/queryCollection', myBotsData).get();
        const availableFunctions = await ajax(URLs.serverHost + '/collection/get/queryCollection', availableFunctionsData).get();
        let userRes = user.doc;

        for (let i = 0; i < userRes.masterAccounts.length; i++) {
            const item = userRes.masterAccounts[i];
            const openedTradesData = { collectionName: 'positions', filter: {user: item.user, master: item._id, status: 'opened' }};
            const runningSlotsData = { collectionName: 'bot_accounts', filter: {user: item.user, master: item._id, status: 'running' }};

            const openTrades = await ajax(URLs.serverHost + '/collection/get/queryCollection', openedTradesData).get();
            const runningSlots = await ajax(URLs.serverHost + '/collection/get/queryCollection', runningSlotsData).get();

            userRes.masterAccounts[i].openTradesCount = openTrades.result.length;
            userRes.masterAccounts[i].runningSlotsCount = runningSlots.result.length;
        }

        res.status(200).json({
            user: userRes,
            myBots: myBots.result,
            availableFunctions: availableFunctions.result
        });
    } catch (err) {
        res.status(500).json(err);
    }
}
