import axios from "axios";
import config from '../../../../config.json';

const root = config[config.root];

export default async function CreateBotAccount(req, res) {
    try {
        const botAccount = await axios.put(root + '/bot-account/create', req.body);

        res.status(200).send(botAccount.data);
    } catch ({response: {data}}) {
        res.status(500).send(data);
    }
}
