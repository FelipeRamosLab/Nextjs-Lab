const root = URLs.serverHost;

export default async function CreateBotAccount(req, res) {
    try {
        const botAccount = await ajax(root + '/bot-account/create', req.body).put();

        res.status(200).send(botAccount);
    } catch ({response: {data}}) {
        res.status(500).send(data);
    }
}
