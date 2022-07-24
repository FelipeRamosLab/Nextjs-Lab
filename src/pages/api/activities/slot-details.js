import axios from 'axios';
import config from '../../../../config.json';

const root = config[config.root];

export default async function SlotDetailsActivity(req, res) {
    try {
        const slot = await axios.get(root + '/bot-account/details', { 
            data: { slotUID: req.body.slotUID, masterUID: req.body.master, userUID: req.body.user }
        });

        if (slot.data.success) {
            return res.status(200).send({
                user: slot.data.slotDetails.user,
                slot: slot.data.slotDetails
            });
        } else {
            return res.status(500).send(slot.data);
        }
    } catch (err) {
        return res.status(500).send(err);
    }
}
