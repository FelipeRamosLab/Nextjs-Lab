import ajax from '../../../services/ajax';

const root = process.env.NEXT_PUBLIC_HOST_CLIENT_SERVER;

export default async function DepositWithdrawTransfer(req, res) {
    try {
        const transfered = await ajax(root + '/transfer/deposit-withdraw', req.body).put();

        if (transfered.success) {
            const masterRes = await ajax(root + '/master-account/get', {
                masterUID: transfered.master,
                userUID: transfered.user
            }).post();

            res.status(200).send(JSON.parse(masterRes));
        } else {
            res.status(500).send(transfered);
        }
    } catch (err) {
        res.status(500).send(err);
    }
}
