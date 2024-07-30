import React, { ChangeEvent } from 'react';

interface Props {
    title: string;
    name: string;
    description?: string;
    old: string[];
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const CustomCheckBox: React.FC<Props> = ({ title, name, description, handleChange, old }) => {
    return (
        <div className="flex flex-col md:flex-row items-start md:items-center mt-5 pt-5 first:mt-0 first:pt-0 pb-4">
            <div className="flex-1 md:w-64 md:mr-10">
                <div className="text-left">
                    <div className="flex items-center">
                        <div className="font-medium">{title}</div>
                    </div>
                    {description && (
                        <div className="leading-relaxed text-slate-500 text-xs mt-3">
                            {description}
                        </div>
                    )}
                </div>
                <label className="flex items-center">
                    {old.map((row, index)=>(
                        <div key={index}>
                            <input checked type="checkbox" name={name} value={row} className="form-control" onChange={handleChange}/>
                            <span className="ml-2">{row}</span>
                        </div>
                    ))}
                </label>
            </div>
        </div>
    );
};

export default CustomCheckBox;
