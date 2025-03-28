import {FC} from "react";
import {DataOrder} from "../App.tsx";

interface Props {
    dataOrder: DataOrder
}

export const Table: FC<Props> = ({dataOrder}) => {
    const elements = [dataOrder.list, dataOrder.pipe, dataOrder.screws];

    return (
        <table className="w-full table-fixed border-collapse">
            <thead>
            <tr>
                <th>Наименование</th>
                <th>ед.</th>
                <th>кол-во</th>
                <th>сумма</th>
            </tr>
            </thead>
            <tbody>
            {elements.map((elem, index) => (
                <tr key={index}>
                    <td>{elem.title}</td>
                    <td>{elem.unit}</td>
                    <td>{elem.count}</td>
                    <td>{elem.price.toFixed(2)}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};
