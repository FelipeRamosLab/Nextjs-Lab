export default async function MasterAccountActivity(req, res) {
    try {
        const master = await ajax(URLs.serverHost + '/master-account/get', { 
            masterUID: req.body.master, 
            userUID: req.body.user, 
            slotsPage: req.body.slotsPage
        }).post();

        if (master.success) {
            return res.status(200).send({
                user: master.masterAccount.user,
                master: master.masterAccount,
                masterSlots: master.masterSlots
            });
        } else {
            return res.status(500).send(master);
        }
    } catch (err) {
        return res.status(500).send(err);
    }
}
