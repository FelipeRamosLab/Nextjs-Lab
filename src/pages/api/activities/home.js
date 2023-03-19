import ajax from '../../../services/ajax';

export default async function HomeActivity(req, res) {
    const myBotsData = { collectionName: 'bots', filter: {author: process.env.NEXT_PUBLIC_testUserUID }, options: { populate: {levels: 3} } };

    try {
        const myBots = await ajax(process.env.NEXT_PUBLIC_HOST_CLIENT_SERVER + '/collection/get/queryCollection', myBotsData).get();

        // for (let i = 0; i < userRes.masterAccounts.length; i++) {
        //     const item = userRes.masterAccounts[i];
        //     const openedTradesData = { collectionName: 'positions', filter: {user: item.user, master: item._id, status: 'opened' }};
        //     const runningSlotsData = { collectionName: 'bot_accounts', filter: {user: item.user, master: item._id, status: 'running' }};

        //     const openTrades = await ajax(process.env.NEXT_PUBLIC_HOST_CLIENT_SERVER + '/collection/get/queryCollection', openedTradesData).get();
        //     const runningSlots = await ajax(process.env.NEXT_PUBLIC_HOST_CLIENT_SERVER + '/collection/get/queryCollection', runningSlotsData).get();

        //     userRes.masterAccounts[i].openTradesCount = openTrades.result.length;
        //     userRes.masterAccounts[i].runningSlotsCount = runningSlots.result.length;
        // }

        res.status(200).json({
            myBots: myBots.result
        });
    } catch (err) {
        res.status(500).json(err);
    }
}
