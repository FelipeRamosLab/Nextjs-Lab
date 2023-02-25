const root = URLs.serverHost;

export default async function CreateMasterAccount(req, res) {
    try {
        const masterAccount = await ajax(root + '/master-account/create', req.body).put();

        res.status(200).send(masterAccount);
    } catch ({response: {data}}) {
        res.status(500).send(data);
    }
}
