const root = URLs.serverHost;

export default async function DeleteRule(req, res) {
    try {
        const ruleDeleted = await ajax(root + '/collection/delete', {
            collectionName: 'thread_rules',
            filter: { _id: req.body.UID }
        }).delete();

        const bot = await ajax(root + '/bot/details', {
            userUID: process.env.userTest,
            botUID: req.body.botUID
        }).get();

        res.status(200).send({
            success: ruleDeleted.deleted ? true : false,
            bot: bot
        });
    } catch (err) {
        res.status(500).send(err);
    }
}
