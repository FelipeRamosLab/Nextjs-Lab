import ajax from '../../../services/ajax';

const root = process.env.NEXT_PUBLIC_HOST_CLIENT_SERVER;

export default async function CreateBot(req, res) {
    try {
        const bot = await ajax(root + '/bot/create', req.body).put();

        res.status(200).send(bot);
    } catch (err) {
        res.status(500).send(err);
    }
}
