import ajax from '../../../services/ajax';

export default async function ExchangeGetAssets(req, res) {
    try {
        const assets = await ajax(process.env.NEXT_PUBLIC_HOST_CLIENT_SERVER + '/exchange/get-assets').get();

        if (assets.success) {
            res.status(200).send(assets);
        } else {
            res.status(500).send(assets);
        }
    } catch (err) {
        res.status(500).send(err);
    }
}
