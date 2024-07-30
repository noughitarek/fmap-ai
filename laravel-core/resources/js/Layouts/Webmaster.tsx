import MobileMenu from '@/Partiel/MobileMenu';
import SideMenu from '@/Partiel/SideMenu';
import Topbar from '@/Partiel/Topbar';
import { useState, PropsWithChildren, ReactNode } from 'react';
import { User } from '@/types';
import { MenuItem } from '@/types/MenuItem'

interface WebmasterProps {
    user: User;
    menu: MenuItem[];
    breadcrumb?: ReactNode;
    children?: React.ReactNode;
}

const Webmaster: React.FC<WebmasterProps> = ({ user, menu, breadcrumb, children }) => {
    return (
        <>
            <MobileMenu menuItems={menu}/>
            <div className="flex mt-[4.7rem] md:mt-0 overflow-hidden">
                <SideMenu menuItems={menu} />
                <div className="content">
                    <Topbar breadcrumb={breadcrumb} user={user}/>
                    {children}
                </div>
            </div>
        </>
    );
}
export default Webmaster;