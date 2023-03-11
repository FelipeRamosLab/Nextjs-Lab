import { useState } from 'react';
import TableFlex from '../displays/tableFlex';

export default function Limits({entity}) {
    const [seeMore, setSeeMore] = useState(false);
    const limits = entity?.limits;

    return (
        <div className="master-infos card">
            <h3 className="title">Limites</h3>

            <TableFlex
                data={[
                    [ 'Avalancagem:', concatUnit(limits?.leverege, null, 'x' ) || '--', !seeMore],
                    [ 'Prejuízo (trade):', `${toMoney(limits?.tradeLoss?.money)} / ${toPercent(limits?.tradeLoss?.percent, null, 2)}`],
                    [ 'Lucro (trade):', `${toMoney(limits?.tradeGain?.money)} / ${toPercent(limits?.tradeGain?.percent, null, 2)}`],
                    [ 'Prejuízo (diário):', `${toMoney(limits?.dailyLoss?.money)} / ${toPercent(limits?.dailyLoss?.percent, null, 2)}`],
                    [ 'Lucro (diário):', `${toMoney(limits?.dailyGain?.money)} / ${toPercent(limits?.dailyGain?.percent, null, 2)}`],
                    [ 'Prejuízo (mensal):', `${toMoney(limits?.monthlyLoss?.money)} / ${toPercent(limits?.monthlyLoss?.percent, null, 2)}`, !seeMore],
                    [ 'Lucro (mensal):', `${toMoney(limits?.monthlyGain?.money)} / ${toPercent(limits?.monthlyGain?.percent, null, 2)}`, !seeMore]
                ]}
                labelClass="label"
                valueClass="value"
            />

            <button
                type="button"
                className="button full-width top-border transparent small"
                onClick={() => setSeeMore(!seeMore)}
            >{!seeMore ? 'Ver Mais' : 'Ver Menos'}</button>
        </div>
    )
}
