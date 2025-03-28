import {DetailedHTMLProps, forwardRef, InputHTMLAttributes} from 'react';

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label?: string;
    error: boolean;
}

export const Input = forwardRef<HTMLInputElement, Props>(({
                                                              label, error, ...restProps
                                                          }, ref) => {
    return (
        <div className={'w-full flex flex-col justify-center gap-1'}>
            {label && <label className={'text-xl text-left text-[var(--text-Strong)] font-medium'}>{label}</label>}
            <input ref={ref} {...restProps}
                   className={`outline-none border-2 border-solid border-[#CFCFCF] rounded-[4px] p-2 pl-3.5 text-left 
                   ${error && 'border-[#cb8b2a] border-opacity-50'} 
                       transition-all duration-300 ease-in-out text-xl font-normal text-[var(--text-Strong)] 
                    placeholder:text-[#9a9a9a] focus:border-[var(--border-B)]`}/>
        </div>
    );
});
