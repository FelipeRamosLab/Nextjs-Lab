import axios from "axios";
import config from '../../../../config.json';

const root = config[config.root];

export default async function CreateBot(req, res) {
    try {
        const bot = await axios.put(root + '/bot/create', req.body);

        res.status(200).send(bot.data);
    } catch (err) {
        res.status(500).send(err);
    }
}
