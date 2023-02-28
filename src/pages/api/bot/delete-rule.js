import ajax from '../../../services/ajax';

const root = process.env.NEXT_PUBLIC_host;

export default async function DeleteRule(req, res) {
    try {
        const ruleDeleted = await ajax(root + '/collection/delete', {
            collectionName: 'thread_rules',
            filter: { _id: req.body.UID }
        }).delete();

        const bot = await ajax(root + '/bot/details', {
            userUID: process.env.NEXT_PUBLIC_testUserUID,
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
