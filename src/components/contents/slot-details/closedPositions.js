import { useContext, useRef, useState } from 'react';
import ActivityDataContext from '../../../context/activityData';
import PaginationTable from '../../displays/paginationTable';
import AJAX from '../../../utils/ajax';
import PositionDetails from '../../modals/PositionDetails';

const columns = [
    { id: 'cod', label: 'COD', minWidth: 50 },
    { id: 'positionType', label: 'Operação', minWidth: 50, format: (value) => value === 'long' ? 'Compra' : 'Venda' },
    { id: 'openTime', label: 'Aberta em', minWidth: 100, format: (value) => new Date(value).toLocaleString() },
    { id: 'closeTime', label: 'Fechada em', minWidth: 100, format: (value) => new Date(value).toLocaleString() },
    { id: 'symbol', label: 'Moeda', format: (value) => value },
    {
      id: 'realizedProfit',
      label: 'Realized Profit',
      align: 'center',
      format: (value) => toMoney(value, null, { numberDecimals: 3 })
    },
    {
      id: 'pnl',
      label: 'PNL',
      align: 'center',
      format: (value) => toMoney(value, null, { numberDecimals: 3 })
    },
    {
      id: 'roi',
      label: 'ROI',
      align: 'center',
      format: (value) => toPercent(value)
    },
    {
      id: 'tradeFee',
      label: 'Corrretagem',
      align: 'right',
      format: (value) => toMoney(value, null, { numberDecimals: 3 })
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
      id: 'usedLeverage',
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
    }
];

export default function SlotClosedPositions() {
    const {activityData} = useContext(ActivityDataContext);
    const [ positionModal, setPositionModal ] = useState(null);

    async function loadPositions(page) {
      try {
        const response = await new AJAX('/positions/get-trades').post({
          slotUID: activityData?.slot?._id,
          status: 'closed',
          page: page + 1
        });

        return response.trades;
      } catch(err) {
        throw err;
      }
    }

    return <>
      <PositionDetails positionModal={positionModal} setPositionModal={setPositionModal} />

      <PaginationTable
        loadData={loadPositions}
        columns={columns}
        handleRowClick={(ev, position) => {
          setPositionModal(position);
        }}
      />
    </>;
}
