import axios from "axios";
import config from '../../../../../config.json';

const root = config[config.root];

export default async function HomeActivity(req, res) {
    try {
        const user = await axios.get(root + '/collection/get/doc', {
            data: { collection: 'users', filter: '627acf881e10121be3e718e0', options: { populate: true } }
        });

        res.status(200).json({
            user: user.data.doc
        });
    } catch (err) {
        res.status(500).json(err);
    }
}
