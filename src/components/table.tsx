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
            <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2 text-center">Наименование</th>
                <th className="border border-gray-300 p-2 text-center">ед.</th>
                <th className="border border-gray-300 p-2 text-center">кол-во</th>
                <th className="border border-gray-300 p-2 text-center">сумма</th>
            </tr>
            </thead>
            <tbody>
            {elements.map((elem, index) => (
                <tr key={index}>
                    <td className="border border-gray-300 p-2 text-center">{elem.title}</td>
                    <td className="border border-gray-300 p-2 text-center">{elem.unit}</td>
                    <td className="border border-gray-300 p-2 text-center">{elem.count}</td>
                    <td className="border border-gray-300 p-2 text-center">{elem.price.toFixed(2)}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};
