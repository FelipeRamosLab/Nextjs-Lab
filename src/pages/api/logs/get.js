import ajax from '../../../services/ajax';
import config from '../../../../config.json'

const root = process.env.NEXT_PUBLIC_HOST_CLIENT_SERVER;

export default async function LogsGet(req, res) {
    try {
        const logs = await ajax(root + '/collection/get/queryCollection', {
            collectionName: 'logs',
            filter: {read: req.body.read},
            options: {
                paginate: {
                    seeMore: true,
                    views: config.pages.logs.itemsPerPage,
                    page: req.body.page
                },
                sort: {
                    createdAt: -1
                }
            }
        }).get();

        res.status(200).send({
            success: true,
            logs
        });
    } catch (err) {
        res.status(500).send(err);
    }
}
