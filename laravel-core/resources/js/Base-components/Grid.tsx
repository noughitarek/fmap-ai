import { Button } from '@headlessui/react';
import React, { ReactNode } from 'react';

interface PageProps {
    title: string;
    children: ReactNode;
    header?: ReactNode;
}

const Grid: React.FC<PageProps> = ({ title, children, header }) => {
    return (<div className="mt-5 grid grid-cols-12 gap-6">
                <div className="intro-y col-span-12 lg:col-span-12">
                    <div className="preview-component intro-y box">
                        <div className="flex flex-col items-center border-b border-slate-200/60 p-5 dark:border-darkmode-400 sm:flex-row">
                            <h2 className="mr-auto text-base font-medium">{title}</h2>
                            {header}
                        </div>
                        <div className="p-5">
                            <div className="preview relative [&.hide]:overflow-hidden [&.hide]:h-0">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
};

export default Grid;