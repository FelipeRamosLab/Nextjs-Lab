import axios from "axios";
import config from '../../../../config.json';

const root = config[config.root];

export default async function StopBotAccount(req, res) {
    try {
        const botAccount = await axios.post(root + '/bot-account/stop', req.body);

        res.status(200).send(botAccount.data);
    } catch (err) {
        res.status(500).send(err);
    }
}
