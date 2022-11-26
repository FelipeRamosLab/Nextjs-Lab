import axios from 'axios';
import config from '../../../../config.json';

const root = config[config.root];

export default async function DeleteMasterAccount(req, res) {
    try {
        const deleted = await axios.delete(root + '/master-account/delete', {data: req.body});

        res.status(200).send(deleted.data);
    } catch ({response: { data }}) {
        res.status(500).send(data);
    }
}
