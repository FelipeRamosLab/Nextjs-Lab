import axios from "axios";
import config from '../../../../config.json';

const root = config[config.root];

export default async function AddBotThread(req, res) {
    try {
        const {data} = await axios.put(root + '/collection/create',  {
            collectionName: 'thread_blocks',
            data: {
                author: config.userTest,
                ifType: 'and'
            }
        });

        const botThread = await axios.put(root + '/collection/create',  {
            collectionName: 'bot_threads',
            data: {
                author: config.userTest,
                eventName: req.body.eventName,
                parentBot: req.body.botUID,
                thread: data && data.createdDoc && data.createdDoc._id
            }
        });

        if (botThread.data && botThread.data.createdDoc) {
            const bot = await axios.post(root + '/collection/update/document',  {
                collectionName: 'bots',
                filter: { _id: req.body.botUID},
                data: {
                    [`eval.${req.body.eventName}`]: botThread.data.createdDoc._id
                }
            });
            const BotDetails = await axios.get(root + '/bot/details', {
                data: {
                    userUID: config.userTest,
                    botUID: req.body.botUID
                }
            });
            res.status(200).send(BotDetails.data);
        } else {
            res.status(500).send(botThread);
        }
    } catch (err) {
        res.status(500).send(err);
    }
}
