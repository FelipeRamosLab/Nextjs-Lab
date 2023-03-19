import ajax from '../../../services/ajax';

const root = process.env.NEXT_PUBLIC_HOST_CLIENT_SERVER;

export default async function UpdateBot(req, res) {
    try {
        const updated = await ajax(root + '/collection/update/document', {
            collectionName: 'bots',
            filter: req.body._id,
            data: req.body
        }).post();

        const bot = await ajax(root + '/bot/details', {
            userUID: process.env.NEXT_PUBLIC_testUserUID,
            botUID: req.body._id
        }).get();

        res.status(200).send({
            success: true,
            bot
        });
    } catch (err) {
        const response = err.response;
        res.status(500).send(response ? response.data : err);
    }
}
