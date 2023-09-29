import ajax from '../../../services/ajax';

export default async function MasterAccountActivity(req, res) {
    try {
        const master = await ajax(process.env.NEXT_PUBLIC_HOST_CLIENT_SERVER + '/master-account/get', { 
            masterUID: req.body.master, 
            userUID: process.env.NEXT_PUBLIC_testUserUID, 
            slotsPage: req.body.slotsPage
        }).post();
        const masterParsed = JSON.parse(master);
        const { data } = Object(masterParsed);
        const { user, botAccounts } = Object (data);

        if (masterParsed.success) {
            return res.status(200).send({
                user: user,
                master: data,
                masterSlots: botAccounts || []
            });
        } else {
            return res.status(500).send(masterParsed);
        }
    } catch (err) {
        return res.status(500).send(err);
    }
}
