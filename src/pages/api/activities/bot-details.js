import axios from "axios";
import config from '../../../../config.json';

const root = config[config.root];

export default async function BotDetails(req, res) {
    try {
        const bot = await axios.get(root + '/bot/details', {
            data: {
                userUID: config.userTest,
                botUID: req.body.bot
            }
        });

        if (bot.data) {
            res.status(200).send(bot.data);
        } else {
            res.status(500).send(bot);
        }
    } catch ({response: {data}}) {
        res.status(500).send(data);
    }
}
