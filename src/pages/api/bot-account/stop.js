import config from '../../../../config.json';

const root = config[config.root];

export default async function StopBotAccount(req, res) {
    try {
        const botAccount = await ajax(root + '/bot-account/stop', req.body).post();

        res.status(200).send(botAccount);
    } catch (err) {
        res.status(500).send(err);
    }
}
