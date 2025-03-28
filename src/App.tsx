import {useEffect, useState} from "react";
import {Select} from "./components/select.tsx";
import {Input} from "./components/input.tsx";
import {Table} from "./components/table.tsx";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Catalog, Configurations, fetchDataCatalog, fetchDataConfigurations} from "./data/dataFetcher.ts";

interface ElemDataOrder {
    unit: string;
    count: number;
    price: number;
    title: string;
}

export interface DataOrder {
    list: ElemDataOrder;
    pipe: ElemDataOrder;
    screws: ElemDataOrder;
}

const schema = z.object({
    width: z.string().min(1),
    height: z.string().min(1),
    list: z.string().min(1),
    pipe: z.string().min(1),
    frame: z.string().min(1),
})

type UserSchema = z.infer<typeof schema>;

function App() {
    const [dataCatalog, setDataCatalog] = useState<Map<string, Catalog[]>>(new Map());
    const [dataConfigurations, setDataConfigurations] = useState<Map<string, Configurations[]>>(new Map());
    const [dataOrder, setDataOrder] = useState<DataOrder>({} as DataOrder);
    const {watch, register, handleSubmit, setValue} = useForm({
        defaultValues: {
            list: '',
            pipe: '',
            frame: '',
            height: '',
            width: '',
        },
        resolver: zodResolver(schema)
    });

    useEffect(() => {
        fetchDataCatalog().then(response => {
            if (response) setDataCatalog(response);
        });
        fetchDataConfigurations().then(response => {
            if (response) setDataConfigurations(response);
        });
    }, []);

    const onSubmit = (data: UserSchema) => {
        const list = dataCatalog.get('list')?.find(i => i.name === data.list);
        const pipe = dataCatalog.get('pipe')?.find(i => i.name === data.pipe);
        const frame = dataConfigurations.get('frame')?.find(i => i.name === data.frame);
        const screws = dataConfigurations.get('fix')?.find(i => i.key === list?.material);
        const priceScrew = dataCatalog.get('fix');

        if (list && pipe && frame && screws && priceScrew && priceScrew.length > 0) {
            const width = +data.width;
            const height = +data.height;

            const pipeWidthInMeters = pipe.width / 1000;
            const step = frame.step;

            const totalWidthAvailable = width - pipeWidthInMeters;
            const numberScrews = height * width * (screws.value || 1);
            const numberOfPipes = Math.floor(totalWidthAvailable / (pipeWidthInMeters + step));
            const totalPipeLength = numberOfPipes * height;

            const squareList = list.width * width * height;

            setDataOrder({
                pipe: {unit: 'мп', count: totalPipeLength, price: totalPipeLength * pipe.price, title: pipe.name},
                list: {title: list.name, unit: 'м2', count: squareList, price: squareList * list.price},
                screws: {
                    unit: 'шт',
                    count: numberScrews,
                    title: 'Саморез',
                    price: numberScrews * priceScrew[0].price
                }
            });
        }
    }

    const createSizeInput = (label: string, name: 'width' | 'height') => {
        const config = dataConfigurations.get('size')?.find(i => i.name === label);

        return (
            <Input
                {...register(name, {min: config?.min, max: config?.max, required: true})}
                placeholder={label}
                type={'number'}
                label={label}
                min={config?.min}
                max={config?.max}
            />
        );
    };

    return (
        <main className={'w-full flex gap-10'}>
            <form className={'w-[60%] flex flex-col gap-5'} onSubmit={handleSubmit(onSubmit)}>
                <Select
                    labelSelect={'Выбор материала'}
                    options={dataCatalog.get('list')?.map((i: Catalog) => i.name) ?? []}
                    onClickSelect={(value) => setValue('list', value)}
                    value={watch('list')}
                    defaultValue={'Выберите материал'}
                />
                <Select
                    labelSelect={'Выбор трубы'}
                    options={dataCatalog.get('pipe')?.map((i: Catalog) => i.name) ?? []}
                    onClickSelect={(value) => setValue('pipe', value)}
                    value={watch('pipe')}
                    defaultValue={'Выберите трубу'}
                />
                {createSizeInput('Ширина', 'width')}
                {createSizeInput('Длина', 'height')}
                <Select
                    labelSelect={'Выбор прочности'}
                    options={dataConfigurations.get('frame')?.map((i: Configurations) => i.name) ?? []}
                    onClickSelect={(value) => setValue('frame', value)}
                    value={watch('frame')}
                    defaultValue={'Выберите прочность'}/>
                <button className="w-fit p-3 pl-7 pr-7 m-auto bg-[var(--border-B)] rounded text-white
                transition duration-300 ease-in-out hover:bg-[#0a0644] ">
                    Рассчитать
                </button>
            </form>
            {Object.keys(dataOrder).length > 0 && <Table dataOrder={dataOrder}/>}
        </main>
    );
}

export default App;
