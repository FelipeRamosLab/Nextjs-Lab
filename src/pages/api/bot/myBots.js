import config from '../../../../config.json';

const root = config[config.root];

export default async function MyBots(req, res) {
    try {
        const bot = await ajax(root + '/collection/get/queryCollection', {
            collectionName: 'bots',
            filter: {author: config.userTest},
            options: {populate: true}
        }).get();

        res.status(200).send(bot);
    } catch (err) {
        res.status(500).send(err);
    }
}
