import axios from "axios";
import config from '../../../../config.json';

const root = config[config.root];

export default async function DeleteRule(req, res) {
    try {
        const {data} = await axios.delete(root + '/collection/delete',  {
            data: {
                collectionName: 'thread_rules',
                filter: { _id: req.body.UID }
            }
        });

        const bot = await axios.get(root + '/bot/details', {
            data: {
                userUID: config.userTest,
                botUID: req.body.botUID,
            }
        });

        res.status(200).send({
            success: data.deleted ? true : false,
            bot: bot.data
        });
    } catch (err) {
        res.status(500).send(err);
    }
}
