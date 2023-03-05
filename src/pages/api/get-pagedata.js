const root = process.env.NEXT_PUBLIC_host;

export default async function GetPageData(req, res) {
    try {
        const userData = { collectionName: 'users', filter: process.env.NEXT_PUBLIC_testUserUID, options: { populate: {levels: 3} } };
        const availableFunctionsData = { collectionName: 'functions', options: { populate: {levels: 3} } };

        const logs = await ajax(root + '/collection/get/queryCollection', {
            collectionName: 'logs',
            filter: {read: false},
            options: { onlyCount: true }
        }).get();
        const user = await ajax(root + '/collection/get/doc', userData).get();
        const availableFunctions = await ajax(process.env.NEXT_PUBLIC_host + '/collection/get/queryCollection', availableFunctionsData).get();

        res.status(200).send({
            success: true,
            logsCount: logs.queryCount,
            user: user.doc,
            availableFunctions: availableFunctions.result
        });
    } catch(err) {
        res.status(500).send(err);
    }
}
