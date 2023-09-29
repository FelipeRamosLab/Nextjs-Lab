import ajax from '../../../services/ajax';

const root = process.env.NEXT_PUBLIC_HOST_RUNNER;

export default async function StopBotAccount(req, res) {
    try {
        const slot = await ajax(root + '/bot-account/stop', req.body).post();
        
        if (slot.success) {
            const master = await ajax(process.env.NEXT_PUBLIC_HOST_RUNNER + '/master-account/get', { 
                masterUID: req.body.masterUID, 
                userUID: req.body.userUID
            }).post();
    
            return res.status(200).send(master);
        } else {
            return res.status(200).send(slot);
        }
    } catch (err) {
        return res.status(500).send(err);
    }
}
