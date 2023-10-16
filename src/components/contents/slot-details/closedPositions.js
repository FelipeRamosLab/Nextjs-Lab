import { useContext } from 'react';
import ActivityDataContext from '../../../context/activityData';
import PaginationTable from '../../displays/paginationTable';

const columns = [
    { id: 'cod', label: 'COD', minWidth: 50 },
    { id: 'positionType', label: 'Operação', minWidth: 50, format: (value) => value === 'long' ? 'Compra' : 'Venda' },
    { id: 'openTime', label: 'Aberta em', minWidth: 100, format: (value) => new Date(value).toLocaleString() },
    { id: 'closeTime', label: 'Fechada em', minWidth: 100, format: (value) => new Date(value).toLocaleString() },
    {
      id: 'pnl',
      label: 'PNL',
      align: 'center',
      format: (value) => toMoney(value)
    },
    {
      id: 'roe',
      label: 'ROE',
      align: 'center',
      format: (value) => toPercent(value)
    },
    {
      id: 'openPrice',
      label: 'Abertura',
      align: 'right',
      format: (value) => toMoney(value)
    },
    {
      id: 'closePrice',
      label: 'Fechamento',
      align: 'right',
      format: (value) => toMoney(value)
    },
    {
      id: 'stopPrice',
      label: 'Stoploss',
      align: 'right',
      format: (value) => toMoney(value)
    },
    {
      id: 'gainPrice',
      label: 'Takeprofit',
      align: 'right',
      format: (value) => toMoney(value)
    },
    {
      id: 'quantity',
      label: 'Quantidade',
      align: 'right',
      format: (value) => value.toFixed(5)
    },
    {
      id: 'usedLeverege',
      label: 'Alavancagem',
      align: 'right',
      format: (value) => value.toFixed(0)
    },
    {
      id: 'initialMargin',
      label: 'Margem inicial',
      align: 'right',
      format: (value) => toMoney(value)
    },
    {
      id: 'initialGrossBalance',
      label: 'Bruto inicial',
      align: 'right',
      format: (value) => toMoney(value)
    },
    {
      id: 'tradeFee',
      label: 'Corrretagem',
      align: 'right',
      format: (value) => toMoney(value)
    }
];

export default function SlotClosedPositions() {
    const {activityData} = useContext(ActivityDataContext);

    async function loadPositions(page) {
        try {
            const response = await ajax('/bot-account/get-trades', {
                slotUID: activityData?.slot?._id,
                status: 'closed',
                page: page + 1
            }).post();

            return response.trades;
        } catch(err) {
            throw err;
        }
    }

    return <PaginationTable
        loadData={loadPositions}
        columns={columns}
    />;
}
