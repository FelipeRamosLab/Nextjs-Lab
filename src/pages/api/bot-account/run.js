import ajax from '../../../services/ajax';

const root = process.env.NEXT_PUBLIC_host;

export default async function RunBotAccount(req, res) {
    try {
        const slot = await ajax(root + '/bot-account/run', req.body).post();
        const master = await ajax(process.env.NEXT_PUBLIC_host + '/master-account/get', { 
            masterUID: req.body.masterUID, 
            userUID: req.body.userUID
        }).post();

        if (slot.success && master.success) {
            res.status(200).send(master);
        }
    } catch (err) {
        res.status(500).send(err);
    }
}
