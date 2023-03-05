import ajax from '../../../services/ajax';
import config from '../../../../config.json';

export default async function HomeActivity(req, res) {
    try {
        const trades = await ajax(process.env.NEXT_PUBLIC_host + '/collection/get/queryCollection', {
            collectionName: 'positions',
            filter: { botSlot: req.body.slotUID, status: req.body.status },
            options: {
                paginate: {
                    views: config.pages.slotDetails.closedTradesPerPage,
                    page: req.body.page,
                    seeMore: true
                },
                sort: {
                    createdAt: -1
                }
            }
        }).get();

        res.status(200).json({
            success: true,
            trades: trades.result
        });
    } catch (err) {
        res.status(500).json(err);
    }
}
