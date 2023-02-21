import axios from "axios";
import config from '../../../../config.json';

const root = config[config.root];

export default async function AddBlockRule(req, res) {
    const type = req.body && req.body.type;
    let created;

    try {
        if (type === 'blocks') {
            created = await axios.put(root + '/collection/create',  {
                collectionName: 'thread_blocks',
                data: {
                    author: config.userTest,
                    ifType: 'and'
                }
            });
        } else if (type === 'rules') { 
            created = await axios.put(root + '/collection/create',  {
                collectionName: 'thread_rules',
                data: { author: config.userTest }
            });
        } else {
            res.status(500).send({success: false, message: 'The param req.body.type param should be "blocks" or "rules", but received' + type});
        }

        if (created && created.data && created.data.createdDoc) {
            const blockAppended = await axios.post(root + '/collection/update/document',  {
                collectionName: 'thread_blocks',
                filter: { _id: req.body.parentBlockUID},
                data: { $addToSet: {[type]: created.data.createdDoc._id} }
            });

            const bot = await axios.get(root + '/bot/details', {
                data: {
                    userUID: config.userTest,
                    botUID: req.body.botUID,
                }
            });
    
            if (blockAppended.data.success) {
                res.status(200).send({
                    bot: bot.data,
                    created: created.data.createdDoc
                });
            } else {
                res.status(500).send(blockAppended);
            }
        } else {
            throw { error: true, message: 'There is an issue with the block creation!' };
        }
    } catch (err) {
        res.status(500).send(err);
    }
}
