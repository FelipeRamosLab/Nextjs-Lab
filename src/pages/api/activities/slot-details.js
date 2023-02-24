import config from '../../../../config.json';

const root = config[config.root];

export default async function SlotDetailsActivity(req, res) {
    try {
        const slot = await ajax(root + '/bot-account/details', {
            slotUID: req.body.slotUID, masterUID: req.body.master, userUID: req.body.user 
        }).get();

        if (slot.success) {
            return res.status(200).send({
                user: slot.slotDetails.user,
                slot: slot.slotDetails
            });
        } else {
            return res.status(500).send(slot);
        }
    } catch (err) {
        return res.status(500).send(err);
    }
}
