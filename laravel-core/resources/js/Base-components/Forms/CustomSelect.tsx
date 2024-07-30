import React, { ChangeEvent } from 'react';

interface Element {
    id: number;
    name: string;
}

interface Props<T extends Element> {
    title: string;
    name: string;
    required: boolean;
    description?: string;
    elements: T[];
    instructions?: string;
    value?: number;
    handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const CustomSelect = <T extends Element>({ title, name, required, elements, description, instructions, value, handleChange }: Props<T>) => {
    return (
        <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0 pb-4">
            <div className="form-label xl:w-64 xl:!mr-10">
                <div className="text-left">
                    <div className="flex items-center">
                        <div className="font-medium">{title}</div>
                        { required && (<div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                            Required
                        </div>)}
                    </div>
                    {description && (
                        <div className="leading-relaxed text-slate-500 text-xs mt-3">
                            {description}
                        </div>
                    )}
                </div>
            </div>
            <div className="w-full mt-3 xl:mt-0 flex-1">
                <select
                    value={value}
                    name={name}
                    className="form-control"
                    onChange={handleChange}
                >
                    <option value={0}>Select the {title.toLowerCase()} from the list</option>
                    {elements.map((element) => (
                        <option key={element.id} value={element.id}>
                            {element.name}
                        </option>
                    ))}
                </select>
                {instructions && (
                    <div className="form-help text-right mt-2">
                        {instructions}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomSelect;
