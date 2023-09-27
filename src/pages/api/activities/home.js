import ajax from '../../../services/ajax';

export default async function HomeActivity(req, res) {
    const myBotsData = { collectionName: 'bots', filter: {author: process.env.NEXT_PUBLIC_testUserUID }, options: { populate: {levels: 3} } };

    try {
        const myBots = await ajax(process.env.NEXT_PUBLIC_HOST_CLIENT_SERVER + '/collection/get/query', myBotsData).get();

        res.status(200).json({
            myBots: myBots.result
        });
    } catch (err) {
        res.status(500).json(err);
    }
}
