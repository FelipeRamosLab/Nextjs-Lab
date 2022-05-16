import axios from "axios";
import config from '../../../../config.json';

const root = config[config.root];

export default async function MyBots(req, res) {
    try {
        const bot = await axios.get(root + '/collection/get/queryCollection', {
            data: {
                collection: 'bots',
                filter: {author: '627acf881e10121be3e718e0'},
                options: {populate: true}
            }
        });

        res.status(200).send(bot.data);
    } catch (err) {
        res.status(500).send(err);
    }
}
