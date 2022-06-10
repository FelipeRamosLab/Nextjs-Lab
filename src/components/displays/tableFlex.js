export default function TableFlex({data, lableClass, valueClass}) {
    return (
        <table>
            <tbody>
                {data.map((item, i)=>{
                    return (
                        <tr key={item[0].replaceAll(' ', '') + i}>
                            <td className={lableClass}>{item[0]}</td>
                            <td className={valueClass}>{item[1]}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
