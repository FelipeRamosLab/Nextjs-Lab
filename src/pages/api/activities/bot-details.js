export default async function BotDetails(req, res) {
    try {
        const bot = await ajax(URLs.serverHost + '/bot/details', {
            userUID: testData.userUID,
            botUID: req.body.bot
        }).get();
        const user = await ajax(URLs.serverHost + '/collection/get/doc', {
            collectionName: 'users',
            filter: testData.userUID, options: { populate: {levels: 3}
        }}).get();
        const availableFunctions = await ajax(URLs.serverHost + '/collection/get/queryCollection', {
            collectionName: 'functions',
            options: { populate: { levels: 3 } }
        }).get();

        if (bot) {
            res.status(200).send({
                availableFunctions: availableFunctions.result,
                bot: bot,
                user: user.doc
            });
        } else {
            res.status(500).send(bot);
        }
    } catch (err) {
        res.status(500).send(err);
    }
}
