import axios from "axios";
import config from '../../../../config.json';

const root = config[config.root];

export default async function MyBots(req, res) {
    try {
        const bot = await axios.get(root + '/collection/get/queryCollection', {
            data: {
                collectionName: 'bots',
                filter: {author: config.userTest},
                options: {populate: true}
            }
        });

        res.status(200).send(bot.data);
    } catch (err) {
        res.status(500).send(err);
    }
}
