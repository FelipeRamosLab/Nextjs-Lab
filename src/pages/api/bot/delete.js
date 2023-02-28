import ajax from '../../../services/ajax';

const root = process.env.NEXT_PUBLIC_host;

export default async function DeleteRule(req, res) {
    try {
        const deleted = await ajax(root + '/collection/delete', {
            collectionName: 'bots',
            filter: { _id: req.body.botUID }
        }).delete();

        res.status(200).send({
            success: deleted ? true : false
        });
    } catch (err) {
        res.status(500).send(err);
    }
}
