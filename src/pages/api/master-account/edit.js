import ajax from '../../../services/ajax';

const root = process.env.NEXT_PUBLIC_host;

export default async function EditMaster(req, res) {
    try {
        const slotResponse = await ajax(root + '/collection/update/document', {
            collectionName: 'master_accounts',
            filter: req.body._id,
            data: req.body
        }).post();
        
        if (slotResponse.success) {
            const master = await ajax(root + '/collection/get/doc', {
                collectionName: 'master_accounts',
                filter: req.body._id
            }).get();

            res.status(200).send({
                success: true,
                master: master.doc
            });
        }
    } catch ({response: {data}}) {
        res.status(500).send(data);
    }
}
