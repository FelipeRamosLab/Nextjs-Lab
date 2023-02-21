import axios from "axios";
import config from '../../../../config.json';

const root = config[config.root];

export default async function AddBotValue(req, res) {
    try {
        const body = req.body || {};
        const valueDoc = await axios.put(root + '/collection/create',  {
            collectionName: 'bot_values',
            data: {
                author: config.userTest,
                botParent: body.botUID,
                valueType: 'function'
            }
        });
        
        if (valueDoc.data.createdDoc) {
            if (body.threadRuleUID) {
                const appendRule = await axios.post(root + '/collection/update/document',  {
                    collectionName: 'thread_rules',
                    filter: { _id: body.threadRuleUID },
                    data: {$addToSet: { children: valueDoc.data.createdDoc._id }}
                });
            }

            const botUpdated = await axios.post(root + '/collection/update/document',  {
                collectionName: 'bots',
                filter: { _id: body.botUID },
                data: {$addToSet: { values: valueDoc.data.createdDoc._id }}
            });

            const botDetails = await axios.get(root + '/bot/details', {
                data: {
                    userUID: config.userTest,
                    botUID: req.body.botUID,
                }
            });

            res.status(200).send({
                bot: botDetails.data,
                created: valueDoc.data.createdDoc
            });
        } else {
            throw new Error('Error creating the value!');
        }
    } catch (err) {
        res.status(500).send(err);
    }
}
