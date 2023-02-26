const root = URLs.serverHost;

export default async function MyBots(req, res) {
    try {
        const bots = await ajax(root + '/collection/get/queryCollection', {
            collectionName: 'bots',
            filter: {author: testData.userUID},
            options: {populate: true}
        }).get();

        res.status(200).send(bots.result);
    } catch (err) {
        res.status(500).send(err);
    }
}
