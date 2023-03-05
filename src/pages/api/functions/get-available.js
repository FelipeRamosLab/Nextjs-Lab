const root = process.env.NEXT_PUBLIC_host;

export default async function GetPageData(req, res) {
    try {
        const availableFunctionsData = { collectionName: 'functions', options: { populate: {levels: 3} } };
        const availableFunctions = await ajax(process.env.NEXT_PUBLIC_host + '/collection/get/queryCollection', availableFunctionsData).get();

        res.status(200).send({
            success: true,
            functions: availableFunctions.result
        });
    } catch(err) {
        res.status(500).send(err);
    }
}
