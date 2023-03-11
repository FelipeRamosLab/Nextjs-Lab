import ajax from '../../../services/ajax';

const root = process.env.NEXT_PUBLIC_host;

export default async function SlotDetailsActivity(req, res) {
    try {
        const slot = await ajax(root + '/bot-account/details', {
            slotUID: req.body?.slotUID, masterUID: req.body?.master, userUID: req.body?.user 
        }).get();

        if (!slot.success) {
            return res.status(500).send(slot);
        }
        
        const bot = await ajax(root + '/bot/details', {
            userUID: req.body?.user,
            botUID: slot?.slotDetails?.bot
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
            slot: slot?.slotDetails,
            bot: bot
        });
    } catch (err) {
        return res.status(500).send(err);
    }
}
