import ajax from '../../../services/ajax';

const root = process.env.NEXT_PUBLIC_host;

export default async function AddBotValue(req, res) {
    try {
        const body = req.body || {};
        const valueDoc = await ajax(root + '/collection/create',  {
            collectionName: 'bot_values',
            data: {
                author: process.env.NEXT_PUBLIC_testUserUID,
                botParent: body.botUID,
                valueType: 'function'
            }
        }).put();
        
        if (valueDoc.createdDoc) {
            if (body.threadRuleUID) {
                const appendRule = await ajax(root + '/collection/update/document',  {
                    collectionName: 'thread_rules',
                    filter: { _id: body.threadRuleUID },
                    data: {$addToSet: { children: valueDoc.createdDoc._id }}
                }).post();
            }

            const botUpdated = await ajax(root + '/collection/update/document',  {
                collectionName: 'bots',
                filter: { _id: body.botUID },
                data: {$addToSet: { values: valueDoc.createdDoc._id }}
            }).post();

            const botDetails = await ajax(root + '/bot/details', {
                userUID: process.env.NEXT_PUBLIC_testUserUID,
                botUID: req.body.botUID
            }).get();

            res.status(200).send({
                bot: botDetails,
                created: valueDoc.createdDoc
            });
        } else {
            throw new Error('Error creating the value!');
        }
    } catch (err) {
        res.status(500).send(err);
    }
}
