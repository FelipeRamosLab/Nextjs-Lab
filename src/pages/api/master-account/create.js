import axios from "axios";
import config from '../../../../config.json';

const root = config[config.root];

export default async function CreateMasterAccount(req, res) {
    try {
        const masterAccount = await axios.put(root + '/master-account/create', req.body);

        res.status(200).send(masterAccount.data);
    } catch ({response: {data}}) {
        res.status(500).send(data);
    }
}
