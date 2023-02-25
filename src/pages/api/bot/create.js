const root = URLs.serverHost;

export default async function CreateBot(req, res) {
    try {
        const bot = await ajax(root + '/bot/create', req.body).put();

        res.status(200).send(bot.data);
    } catch ({response: {data}}) {
        res.status(500).send(data);
    }
}
