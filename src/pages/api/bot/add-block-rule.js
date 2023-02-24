import config from '../../../../config.json';

const root = config[config.root];

export default async function AddBlockRule(req, res) {
    const type = req.body && req.body.type;
    let created;

    try {
        if (type === 'blocks') {
            created = await ajax(root + '/collection/create',  {
                collectionName: 'thread_blocks',
                data: {
                    author: config.userTest,
                    ifType: 'and'
                }
            }).put();
        } else if (type === 'rules') { 
            created = await ajax(root + '/collection/create',  {
                collectionName: 'thread_rules',
                data: { author: config.userTest }
            }).put();
        } else {
            res.status(500).send({success: false, message: 'The param req.body.type param should be "blocks" or "rules", but received' + type});
        }

        if (created && created.createdDoc) {
            const blockAppended = await ajax(root + '/collection/update/document',  {
                collectionName: 'thread_blocks',
                filter: { _id: req.body.parentBlockUID},
                data: { $addToSet: {[type]: created.createdDoc._id} }
            }).post();

            const bot = await ajax(root + '/bot/details', {
                userUID: config.userTest,
                botUID: req.body.botUID
            }).get();
    
            if (blockAppended.success) {
                res.status(200).send({
                    bot: bot,
                    created: created.createdDoc
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
