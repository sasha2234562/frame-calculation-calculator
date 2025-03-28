import {FC, memo, useEffect, useRef, useState} from "react";

interface Props {
    labelSelect: string;
    options: string[];
    value: string;
    onClickSelect: (value: string) => void;
    defaultValue: string;
    error: boolean;
}

export const Select: FC<Props> = memo(({options, labelSelect, value, onClickSelect, defaultValue, error}) => {
    const [openSelectOptions, setOpenSelectOptions] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (elementRef.current && !elementRef.current.contains(event.target as Node)) {
                setOpenSelectOptions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const onClickOptions = () => {
        setOpenSelectOptions(true);
    };

    const onClickSelectHandler = (value: string) => {
        onClickSelect(value);
        setOpenSelectOptions(false);
    }

    return (
        <div className={'flex flex-col justify-start gap-1'} ref={elementRef}>
            <label className={'font-medium text-xl text-left text-[var(--text-Strong)]'}>{labelSelect}</label>
            <div
                className={`relative cursor-text h-[44px] border-2 border-opacity-50 ${
                    openSelectOptions ? 'rounded-t-[0] border-[var(--border-B)] border-b-0' : 'rounded-[4px] border-[#CFCFCF]'
                } ${error && 'border-[#cb8b2a]'}`}>
                <p className={`min-h-[47px] px-[16px] pt-[8px] pb-[4px] ${
                    value === '' ? 'text-[#9a9a9a]' : 'text-[var(--text-Strong)]'
                } text-[20px] font-normal leading-[24px] m-0 text-left z-100`}
                   onClick={onClickOptions}>{value || defaultValue}</p>
                {openSelectOptions && <div className="absolute left-0 right-0 top-[44px] z-[95]
                 bg-white custom-outline rounded-b-[4px] p-[16px] overscroll-contain">
                    <ul className="max-h-[144px] overflow-auto flex flex-col text-[#4D4D4D] text-[16px]
                    font-normal leading-[20px] list-none">
                        {options.map(item => {
                            return (
                                <li key={item}
                                    className="p-1.5 cursor-pointer mr-1.5 text-left
                                        transition-all duration-300 ease-in-out
                                        hover:bg-[#B4BEC8]"
                                    onClick={() => onClickSelectHandler(item)}>{item}</li>);
                        })}
                    </ul>
                </div>}
            </div>
        </div>
    );
});
