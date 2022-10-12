import axios from "axios";
import config from '../../../../config.json';

const root = config[config.root];

export default async function HomeActivity(req, res) {
    try {
        const user = await axios.get(root + '/collection/get/doc', {
            data: { collection: 'users', filter: config.userTest, options: { populate: {levels: 3} } }
        });
        const myBots = await axios.get(root + '/collection/get/queryCollection', {
            data: { collection: 'bots', filter: {author: config.userTest }, options: { populate: {levels: 3} } }
        });
        console.log()
        const availableFunctions = await axios.get(root + '/collection/get/queryCollection', {
            data: { collection: 'functions', options: { populate: {levels: 3} } }
        });
        let userRes = user.data.doc;

        for (let i = 0; i < userRes.masterAccounts.length; i++) {
            const item = userRes.masterAccounts[i];

            const openTrades = await axios.get(root + '/collection/get/queryCollection', {
                data: { collection: 'positions', filter: {user: item.user, master: item._id, status: 'opened' } }
            });
            const runningSlots = await axios.get(root + '/collection/get/queryCollection', {
                data: { collection: 'bot_accounts', filter: {user: item.user, master: item._id, status: 'running' } }
            });

            userRes.masterAccounts[i].openTradesCount = openTrades.data.result.length;
            userRes.masterAccounts[i].runningSlotsCount = runningSlots.data.result.length;
        }

        res.status(200).json({
            user: userRes,
            myBots: myBots.data.result,
            availableFunctions: availableFunctions.data.result
        });
    } catch (err) {
        res.status(500).json(err);
    }
}
