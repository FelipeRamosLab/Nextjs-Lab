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
        const user = await axios.get(root + '/collection/get/doc', {
            data: { collectionName: 'users', filter: config.userTest, options: { populate: {levels: 3} } }
        });
        const availableFunctions = await axios.get(root + '/collection/get/queryCollection', {
            data: { collectionName: 'functions', options: { populate: {levels: 3} } }
        });

        if (bot.data) {
            res.status(200).send({
                availableFunctions: availableFunctions.data.result,
                bot: bot.data,
                user: user.data.doc
            });
        } else {
            res.status(500).send(bot);
        }
    } catch ({response: {data}}) {
        res.status(500).send(data);
    }
}
