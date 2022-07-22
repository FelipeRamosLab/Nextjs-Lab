import axios from "axios";
import config from '../../../../config.json';

const root = config[config.root];

export default async function MasterAccountActivity(req, res) {
    try {
        const master = await axios.post(root + '/master-account/get', { 
            masterUID: req.body.master, 
            userUID: req.body.user, 
            slotsPage: req.body.slotsPage
        });

        if (master.data.success) {
            return res.status(200).send({
                user: master.data.masterAccount.user,
                master: master.data.masterAccount,
                masterSlots: master.data.masterSlots
            });
        } else {
            return res.status(500).send(master.data);
        }
    } catch (err) {
        return res.status(500).send(err);
    }
}
