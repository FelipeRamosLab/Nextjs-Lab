import TableFlex from '../../displays/tableFlex';

export default function MasterInfos({master}) {
    return (
        <div className="master-infos">
            <TableFlex
                data={[
                    [ 'Avalancagem:', concatUnit(master, ['limits', 'leverege'], null, 'x' ) || '--'],
                    [ 'Prejuízo (Mensal):', getLoss(master, 'monthlyLoss') || '--' ],
                    [ 'Prejuízo (Diário):', getLoss(master, 'dailyLoss') || '--' ]
                ]}
                labelClass="label"
                valueClass="value"
            />

            <button type="button" className="button full-width top-border transparent small">Ver Mais</button>
        </div>
    )
}

function getLoss(master, period) {
    let money = toMoney(master, ['limits', period, 'money'], {zeroAsFalse: true});
    const percent = toPercent(master, ['limits', period, 'percent']);
    let result = '';

    if (money) result += money;
    if (money && percent) result += '/';
    if (percent) result += percent;
    if (!result) return undefined;
    return result;
}
