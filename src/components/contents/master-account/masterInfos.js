import { useState } from 'react';
import TableFlex from '../../displays/tableFlex';

export default function MasterInfos({master}) {
    const [seeMore, setSeeMore] = useState(false);
    const shortPosition = validateProp(master, ['disableShortPosition']) ? 'Desabilitado' : 'Habilitado';
    const createdAt = new Date(validateProp(master, ['createdAt']));

    return (
        <div className="master-infos card">
            <TableFlex
                data={[
                    [ 'ID da conta:', validateProp(master, ['cod']) || '--'],
                    [ 'Criado em:', createdAt.toLocaleDateString() + ' - ' + createdAt.toLocaleTimeString() ],
                    [ 'Exchange:', validateProp(master, ['exchange']).toUpperCase() ],
                    [ 'Alocação disponível:', toPercent(master, ['availableAllocation']) ],
                    [ 'Total na carteira:', toMoney(master, ['futuresWallet', 'totalWalletBalance']) || '--' ],
                    [ 'Posição de venda:', shortPosition ],
                ]}
                labelClass="label"
                valueClass="value"
            />

            {/* <button
                type="button"
                className="button full-width top-border transparent small"
                onClick={()=>setSeeMore(!seeMore)}
            >{!seeMore ? 'Ver Mais' : 'Ver Menos'}</button> */}
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
