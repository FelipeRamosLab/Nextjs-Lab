import ajax from '../../../services/ajax';

const root = process.env.NEXT_PUBLIC_HOST_CLIENT_SERVER;

export default async function SlotDetailsActivity(req, res) {
    const { slotUID, master } = Object(req.body);

    try {
        const slotRes = await ajax(root + '/bot-account/details', {
            slotUID: slotUID,
            masterUID: master,
            userUID: process.env.NEXT_PUBLIC_testUserUID
        }).get();

        if (!slotRes.success) {
            return res.status(500).send(slotRes);
        }
        
        const bot = await ajax(root + '/bot/details', {
            userUID: process.env.NEXT_PUBLIC_testUserUID,
            botUID: slotRes.slot.bot
        }).get();

        if (!bot) {
            return res.status(500).send(bot);
        }

        if (bot?.author?._id !== req.body?.user) {
            delete bot.eval;
            delete bot.values;
            delete bot.botThread;
        }

        return res.status(200).send({
            slot: slotRes?.slot,
            bot: bot
        });
    } catch (err) {
        return res.status(500).send(err);
    }
}
