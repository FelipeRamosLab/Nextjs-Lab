import ajax from '../../../services/ajax';

export default async function HomeActivity(req, res) {
    const userData = { collectionName: 'users', filter: process.env.NEXT_PUBLIC_testUserUID, options: { populate: {levels: 3} } };
    const myBotsData = { collectionName: 'bots', filter: {author: process.env.NEXT_PUBLIC_testUserUID }, options: { populate: {levels: 3} } };
    const availableFunctionsData = { collectionName: 'functions', options: { populate: {levels: 3} } };

    try {
        const user = await ajax(process.env.NEXT_PUBLIC_host + '/collection/get/doc', userData).get();
        const myBots = await ajax(process.env.NEXT_PUBLIC_host + '/collection/get/queryCollection', myBotsData).get();
        const availableFunctions = await ajax(process.env.NEXT_PUBLIC_host + '/collection/get/queryCollection', availableFunctionsData).get();
        let userRes = user.doc;

        // for (let i = 0; i < userRes.masterAccounts.length; i++) {
        //     const item = userRes.masterAccounts[i];
        //     const openedTradesData = { collectionName: 'positions', filter: {user: item.user, master: item._id, status: 'opened' }};
        //     const runningSlotsData = { collectionName: 'bot_accounts', filter: {user: item.user, master: item._id, status: 'running' }};

        //     const openTrades = await ajax(process.env.NEXT_PUBLIC_host + '/collection/get/queryCollection', openedTradesData).get();
        //     const runningSlots = await ajax(process.env.NEXT_PUBLIC_host + '/collection/get/queryCollection', runningSlotsData).get();

        //     userRes.masterAccounts[i].openTradesCount = openTrades.result.length;
        //     userRes.masterAccounts[i].runningSlotsCount = runningSlots.result.length;
        // }

        res.status(200).json({
            user: userRes,
            myBots: myBots.result,
            availableFunctions: availableFunctions.result
        });
    } catch (err) {
        res.status(500).json(err);
    }
}
