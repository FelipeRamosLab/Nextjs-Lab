import axios from "axios";
import config from '../../../../config.json';

const root = config[config.root];

export default async function CreateMasterAccount(req, res) {
    try {
        const masterAccount = await axios.put(root + '/master-account/create', {
            data: { collection: 'master_accounts', data: req.body }
        });

        res.status(200).json(masterAccount);
    } catch (err) {
        res.status(500).json(err);
    }
}
