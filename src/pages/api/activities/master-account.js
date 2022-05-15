import axios from "axios";
import config from '../../../../config.json';

const root = config[config.root];

export default async function MasterAccountActivity(req, res) {
    try {
        const master = await axios.get(root + '/collection/get/doc', {
            data: { collection: 'master_accounts', filter: {_id: req.body.master, user: req.body.user}, options: { populate: true } }
        });

        res.status(200).json({
            user: master.data.doc.user,
            master: master.data.doc
        });
    } catch (err) {
        res.status(500).json(err);
    }
}
