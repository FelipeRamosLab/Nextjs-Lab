import ajax from '../../../services/ajax';

const root = process.env.NEXT_PUBLIC_HOST_CLIENT_SERVER;

export default async function MyBots(req, res) {
    try {
        const bots = await ajax(root + '/collection/get/queryCollection', {
            collectionName: 'bots',
            filter: {author: process.env.NEXT_PUBLIC_testUserUID},
            options: {populate: true}
        }).get();

        res.status(200).send(bots.result);
    } catch (err) {
        res.status(500).send(err);
    }
}
