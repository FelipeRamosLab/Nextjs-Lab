import axios from "axios";
import config from '../../../../config.json';

const root = config[config.root];

export default async function UpdateBotValue(req, res) {
    try {
        const bot = await axios.post(root + '/collection/update/document',  {
            collectionName: 'bot_values',
            filter: { _id: req.body._id },
            data: req.body.toUpdate,
            options: { returnDocs: true }
        });

        res.status(200).send(bot.data);
    } catch (err) {
        res.status(500).send(err);
    }
}
