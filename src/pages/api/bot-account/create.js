const root = URLs.serverHost;

export default async function CreateBotAccount(req, res) {
    try {
        const slotResponse = await ajax(root + '/bot-account/create', req.body).put();
        
        if (slotResponse.success) {
            const master = await ajax(URLs.serverHost + '/master-account/get', { 
                masterUID: slotResponse.slot.master, 
                userUID: slotResponse.slot.user
            }).post();

            res.status(200).send({
                slot: slotResponse.slot,
                master: master.masterAccount
            });
        }
    } catch ({response: {data}}) {
        res.status(500).send(data);
    }
}
