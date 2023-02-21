import axios from "axios";
import config from '../../../../config.json';

const root = config[config.root];

export default async function DeleteRule(req, res) {
    try {
        const {data} = await axios.delete(root + '/collection/delete',  {
            data: {
                collectionName: 'thread_rules',
                filter: { _id: req.body.UID }
            }
        });

        res.status(200).send({ success: data.deleted ? true : false});
    } catch (err) {
        res.status(500).send(err);
    }
}
