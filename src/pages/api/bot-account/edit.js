import ajax from '../../../services/ajax';

const root = process.env.NEXT_PUBLIC_HOST_CLIENT_SERVER;

export default async function EditSlot(req, res) {
    try {
        const slotResponse = await ajax(root + '/collection/update/document', {
            collectionName: 'bot_accounts',
            filter: req.body.slotUID,
            data: req.body.data
        }).post();
        
        if (slotResponse.success) {
            const slot = await ajax(root + '/collection/get/doc', {
                collectionName: 'bot_accounts',
                filter: req.body.slotUID
            }).get();

            res.status(200).send({
                success: true,
                slot: slot.doc
            });
        }
    } catch ({response: {data}}) {
        res.status(500).send(data);
    }
}
