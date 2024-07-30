import React, { ReactNode } from 'react';

interface PageProps {
    title: string;
    header: ReactNode;
    children: ReactNode;
}

const Page: React.FC<PageProps> = ({ title, header, children }) => {
    return (
        <>
            <h2 className="intro-y text-lg font-medium mt-10">{title}</h2>
            <div className="grid grid-cols-12 gap-6 mt-5">
                <div className="intro-y col-span-12 flex flex-wrap xl:flex-nowrap items-center mt-2">
                    {header}
                </div>
            </div>
            {children}
        </>
    );
};

export default Page;
