const root = URLs.serverHost;

export default async function AddBotThread(req, res) {
    try {
        const block = await ajax(root + '/collection/create',  {
            collectionName: 'thread_blocks',
            data: {
                author: testData.userUID,
                ifType: 'and'
            }
        }).put();

        const botThread = await ajax(root + '/collection/create',  {
            collectionName: 'bot_threads',
            data: {
                author: testData.userUID,
                eventName: req.body.eventName,
                parentBot: req.body.botUID,
                thread: block.createdDoc && block.createdDoc._id
            }
        }).put();

        if (botThread && botThread.createdDoc) {
            const bot = await ajax(root + '/collection/update/document',  {
                collectionName: 'bots',
                filter: { _id: req.body.botUID},
                data: {
                    [`eval.${req.body.eventName}`]: botThread.createdDoc._id
                }
            }).post();
            const BotDetails = await ajax(root + '/bot/details', {
                userUID: testData.userUID,
                botUID: req.body.botUID
            }).get();
            res.status(200).send(BotDetails);
        } else {
            res.status(500).send(botThread);
        }
    } catch (err) {
        res.status(500).send(err);
    }
}
