const root = URLs.serverHost;

export default async function DeleteBlock(req, res) {
    try {
        const blockDeleted = await ajax(root + '/collection/delete', {
            collectionName: 'thread_blocks',
            filter: { _id: req.body.UID }
        }).delete();

        const bot = await ajax(root + '/bot/details', {
            userUID: process.env.userTest,
            botUID: req.body.botUID
        }).get();

        res.status(200).send({
            success: blockDeleted.deleted ? true : false,
            bot: bot
        });
    } catch (err) {
        res.status(500).send(err);
    }
}
