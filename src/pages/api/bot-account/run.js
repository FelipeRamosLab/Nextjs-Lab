import axios from "axios";
import config from '../../../../config.json';

const root = config[config.root];

export default async function RunBotAccount(req, res) {
    try {
        const botAccount = await axios.post(root + '/bot-account/run', req.body);

        res.status(200).send(botAccount.data);
    } catch (err) {
        res.status(500).send(err);
    }
}
