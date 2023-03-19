import ajax from '../../../services/ajax';
import configs from '../../../../config.json'

export default async function Logs(req, res) {
    try {
        const logsRead = await ajax(process.env.NEXT_PUBLIC_HOST_CLIENT_SERVER + '/collection/get/queryCollection', {
            collectionName: 'logs',
            filter: { read: true },
            options: {
                paginate: {
                    views: configs.pages.logs.itemsPerPage
                },
                sort: {
                    createdAt: -1
                }
            }
        }).get();
        const logsUnread = await ajax(process.env.NEXT_PUBLIC_HOST_CLIENT_SERVER + '/collection/get/queryCollection', {
            collectionName: 'logs',
            filter: { read: false },
            options: {
                paginate: {
                    views: configs.pages.logs.itemsPerPage
                },
                sort: {
                    createdAt: -1
                }
            }
        }).get();

        res.status(200).send({
            success: true,
            logsRead,
            logsUnread
        });
    } catch (err) {
        res.status(500).send(err);
    }
}
