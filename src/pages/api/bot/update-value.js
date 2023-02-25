const root = URLs.serverHost;

export default async function UpdateBotValue(req, res) {
    try {
        await ajax(root + '/collection/update/document', {
            collectionName: 'bot_values',
            filter: req.body._id,
            data: req.body.toUpdate
        }).post();

        const bot = await ajax(root + '/bot/details', {
            userUID: process.env.userTest,
            botUID: req.body.botUID
        }).get();

        res.status(200).send(bot);
    } catch (err) {
        const response = err.response;
        res.status(500).send(response ? response.data : err);
    }
}
