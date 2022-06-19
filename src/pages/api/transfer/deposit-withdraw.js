import axios from "axios";
import config from '../../../../config.json';

const root = config[config.root];

export default async function DepositWithdrawTransfer(req, res) {
    try {
        const transfered = await axios.put(root + '/transfer/deposit-withdraw', req.body);

        if (transfered.status === 200 && transfered.data.success) {
            const data = transfered.data;
            const master = await axios.post(root + '/master-account/get', { masterUID: data.transfer.master, userUID: data.transfer.user });
            if (master.status === 200 && master.data.success) {
                res.status(200).send(master.data.masterAccount);
            } else {
                res.status(500).send(master.data);
            }
        } else {
            res.status(500).send(transfered.data);
        }
    } catch (err) {
        res.status(500).send(err);
    }
}
