export interface Catalog {
    material: string;
    name: string;
    price: number;
    type: string;
    unit: string;
    width: number;
}

export interface Configurations {
    key: string;
    name: string;
    step: number;
    type: string;
    max?: number;
    min?: number;
    value?: number;
}

export const fetchDataCatalog = async () => {
    try {
        const response = await fetch('/data/data.json');
        const jsonData: Catalog[] = await response.json();

        return jsonData.reduce<Map<string, Catalog[]>>((acc, item) => {
            const currentTypeArray = acc.get(item.type) || [];
            currentTypeArray.push(item);
            acc.set(item.type, currentTypeArray);
            return acc;
        }, new Map());
    } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
    }
};

export const fetchDataConfigurations = async () => {
    try {
        const response = await fetch('/data/config.json');
        const jsonData: Configurations[] = await response.json();
        return jsonData.reduce<Map<string, Configurations[]>>((acc, item) => {
            const currentTypeArray = acc.get(item.type) || [];
            currentTypeArray.push(item);
            acc.set(item.type, currentTypeArray);
            return acc;
        }, new Map());
    } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
    }
};
