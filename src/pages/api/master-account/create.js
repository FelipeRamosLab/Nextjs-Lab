import ajax from '../../../services/ajax';

const root = process.env.NEXT_PUBLIC_HOST_CLIENT_SERVER;

export default async function CreateMasterAccount(req, res) {
    try {
        const masterAccount = await ajax(root + '/master-account/create', req.body).put();

        res.status(200).send(masterAccount);
    } catch ({response: {data}}) {
        res.status(500).send(data);
    }
}
