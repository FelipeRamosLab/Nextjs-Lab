import axios from "axios";
import config from '../../../../config.json';

const root = config[config.root];

export default async function DepositWithdrawTransfer(req, res) {
    try {
        const transfered = await axios.put(root + '/transfer/deposit-withdraw', req.body);

        res.status(200).send(transfered.data);
    } catch (err) {
        res.status(500).send(err);
    }
}
