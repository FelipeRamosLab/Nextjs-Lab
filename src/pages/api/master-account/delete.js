import ajax from '../../../services/ajax';

const root = process.env.NEXT_PUBLIC_host;

export default async function DeleteMasterAccount(req, res) {
    try {
        const deleted = await ajax(root + '/master-account/delete', req.body).delete();

        res.status(200).send(deleted);
    } catch ({response: { data }}) {
        res.status(500).send(data);
    }
}
