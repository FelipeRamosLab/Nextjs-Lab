export default async function ExchangeGetAssets(req, res) {
    try {
        const assets = await ajax(URLs.serverHost + '/exchange/get-assets').get();

        if (assets.success) {
            res.status(200).send(assets);
        } else {
            res.status(500).send(assets);
        }
    } catch (err) {
        res.status(500).send(err);
    }
}
