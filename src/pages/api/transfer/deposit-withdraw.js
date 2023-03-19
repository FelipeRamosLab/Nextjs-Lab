import ajax from '../../../services/ajax';

const root = process.env.NEXT_PUBLIC_HOST_CLIENT_SERVER;

export default async function DepositWithdrawTransfer(req, res) {
    try {
        const transfered = await ajax(root + '/transfer/deposit-withdraw', req.body).put();

        if (transfered.success) {
            const master = await ajax(root + '/master-account/get', {
                masterUID: transfered.transfer.master,
                userUID: transfered.transfer.user
            }).post();

            if (master.success) {
                res.status(200).send(master.masterAccount);
            } else {
                res.status(500).send(master);
            }
        } else {
            res.status(500).send(transfered);
        }
    } catch (err) {
        res.status(500).send(err);
    }
}
