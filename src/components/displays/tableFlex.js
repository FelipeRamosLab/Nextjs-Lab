export default function TableFlex({data, lableClass, valueClass, exclude}) {
    return (
        <table>
            <tbody>
                {data.map((item, i)=>{
                    const isExclude = exclude.find(looking=>looking === item.lable);

                    if (!isExclude) {
                        return (
                            <tr key={item.lable + i}>
                                <td className={lableClass}>{item.lable}</td>
                                <td className={valueClass}>{item.value}</td>
                            </tr>
                        );
                    }
                })}
            </tbody>
        </table>
    );
}

export class TableFlexData {
    constructor(setup = {
        lable: String(),
        value: String() || Number()
    }) {
        this.lable = setup.lable;
        this.value = setup.value;
    }
}
