import ajax from '../../../services/ajax';

const root = process.env.NEXT_PUBLIC_host;

export default async function UpdateThreadBlock(req, res) {
    try {
        await ajax(root + '/collection/update/document', {
            collectionName: 'thread_blocks',
            filter: req.body._id,
            data: req.body.toUpdate
        }).post();

        const bot = await ajax(root + '/bot/details', {
            userUID: process.env.NEXT_PUBLIC_testUserUID,
            botUID: req.body.botUID
        }).get();

        res.status(200).send({
            bot: bot
        });
    } catch (err) {
        const response = err.response;
        res.status(500).send(response ? response.data : err);
    }
}
