import axios from 'axios';
import config from '../../../../config.json';

const root = config[config.root];

export default async function UpdateThreadBlock(req, res) {
    try {
        await axios.post(root + '/collection/update/document', {
            collectionName: 'thread_blocks',
            filter: req.body._id,
            data: req.body.toUpdate
        });

        const bot = await axios.get(root + '/bot/details', {
            data: {
                userUID: config.userTest,
                botUID: req.body.botUID,
            }
        });

        res.status(200).send({
            bot: bot.data
        });
    } catch (err) {
        const response = err.response;
        res.status(500).send(response ? response.data : err);
    }
}
