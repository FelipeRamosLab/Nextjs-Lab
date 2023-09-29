import ajax from '../../../services/ajax';

const root = process.env.NEXT_PUBLIC_HOST_RUNNER;

export default async function RunBotAccount(req, res) {
    try {
        const slotRes = await ajax(root + '/bot-account/run', req.body).post();
        const { master } = Object(slotRes.slot);

        if (slotRes.success && master) {
            slotRes.master = master;
            res.status(200).send(slotRes);
        }
    } catch (err) {
        res.status(500).send(err);
    }
}
