import ajax from '../../../services/ajax';

export default async function BotDetails(req, res) {
    try {
        const bot = await ajax(process.env.NEXT_PUBLIC_HOST_CLIENT_SERVER + '/bot/details', {
            userUID: process.env.NEXT_PUBLIC_testUserUID,
            botUID: req.body.bot
        }).get();
        const user = await ajax(process.env.NEXT_PUBLIC_HOST_CLIENT_SERVER + '/collection/get/doc', {
            collectionName: 'users',
            filter: process.env.NEXT_PUBLIC_testUserUID, options: { populate: {levels: 3}
        }}).get();
        const availableFunctions = await ajax(process.env.NEXT_PUBLIC_HOST_CLIENT_SERVER + '/collection/get/query', {
            collectionName: 'functions',
            options: { populate: { levels: 3 } }
        }).get();

        if (bot) {
            res.status(200).send({
                availableFunctions: availableFunctions.result,
                bot: bot,
                user: user.doc
            });
        } else {
            res.status(500).send(bot);
        }
    } catch (err) {
        res.status(500).send(err);
    }
}
