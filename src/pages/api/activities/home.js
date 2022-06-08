import axios from "axios";
import config from '../../../../config.json';

const root = config[config.root];

export default async function HomeActivity(req, res) {
    try {
        const user = await axios.get(root + '/collection/get/doc', {
            data: { collection: 'users', filter: config.userTest, options: { populate: true } }
        });
        const myBots = await axios.get(root + '/collection/get/queryCollection', {
            data: { collection: 'bots', filter: {author: config.userTest }, options: { populate: true } }
        });

        res.status(200).json({
            user: user.data.doc,
            myBots: myBots.data.result
        });
    } catch (err) {
        res.status(500).json(err);
    }
}
