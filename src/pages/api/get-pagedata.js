import ajax from '../../services/ajax';

const root = process.env.NEXT_PUBLIC_HOST_CLIENT_SERVER;

export default async function GetPageData(req, res) {
    try {
        const userData = { collectionName: 'users', filter: process.env.NEXT_PUBLIC_testUserUID, options: { populate: {levels: 3} } };

        const logs = await ajax(root + '/collection/get/query', {
            collectionName: 'logs',
            filter: { read: false },
            options: { onlyCount: true }
        }).get();
        const user = await ajax(root + '/collection/get/doc', userData).get();

        res.status(200).send({
            success: true,
            logsCount: logs.queryCount,
            user: user.doc
        });
    } catch(err) {
        res.status(500).send(err);
    }
}
