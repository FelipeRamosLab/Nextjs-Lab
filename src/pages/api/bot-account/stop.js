import ajax from '../../../services/ajax';

const root = process.env.NEXT_PUBLIC_host;

export default async function StopBotAccount(req, res) {
    try {
        const botAccount = await ajax(root + '/bot-account/stop', req.body).post();
        const master = await ajax(process.env.NEXT_PUBLIC_host + '/master-account/get', { 
            masterUID: req.body.masterUID, 
            userUID: req.body.userUID._id
        }).post();

        res.status(200).send(master);
    } catch (err) {
        res.status(500).send(err);
    }
}
