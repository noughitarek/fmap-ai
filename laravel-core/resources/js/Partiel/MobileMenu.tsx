import { Link } from '@inertiajs/react';
import { MenuItem } from '@/types/MenuItem'
import { BarChart2Icon, CornerDownRight, XCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@headlessui/react';
import Icon from '@/Base-components/Icon';

interface MobileMenuProps {
    menuItems: MenuItem[];
}

const MobileMenu:React.FC<MobileMenuProps> = ({menuItems}) => {
    const [menuActive, setMenuActive] = useState(false)
    return (
        <div className={"mobile-menu md:hidden " + (menuActive ? "mobile-menu--active" : "")}>
            <div className="mobile-menu-bar">
                <Link href="/" className="flex mr-auto">
                    <img className="ms-4 w-1/4" src="/dist/images/rtm.png"/>
                </Link>
                <Button className="mobile-menu-toggler" onClick={()=>setMenuActive(true)}> <BarChart2Icon className="w-8 h-8 text-white transform -rotate-90"/> </Button>
            </div>
            <div className="scrollable">
                <Button className="mobile-menu-toggler"  onClick={()=>setMenuActive(false)}> <XCircle className="w-8 h-8 text-white transform -rotate-90" /> </Button>
                <ul className="scrollable__content py-2">
                    {menuItems.map((menuItem, index) => (
                    <li key={index}>
                        {menuItem.route && menuItem.type === "link" ? (
                            <Link href={menuItem.route} className={`menu ${menuItem.active ? 'menu--active' : ''}`}>
                                <div className="menu__icon">
                                    {menuItem.icon && (
                                        menuItem.icon.type === 'feather' ? (
                                            <i className="align-middle" data-feather={menuItem.icon.content}></i>
                                        ) : (
                                            <Icon name={menuItem.icon.content} />
                                        )
                                    )}
                                </div>
                                <div className="menu__title"> {menuItem.content} </div>
                            </Link>
                        ) : menuItem.type === 'divider' ? (
                            <div  className="menu__devider my-6"></div >
                        ) : menuItem.sublinks ? (
                            <>
                                {menuItem.route && (
                                    <Link href={menuItem.route} className={`menu ${menuItem.active ? 'menu--active' : ''}`}>
                                        <div className="menu__icon">
                                            {menuItem.icon && (
                                                menuItem.icon.type === 'feather' ? (
                                                    <i className="align-middle" data-feather={menuItem.icon.content}></i>
                                                ) : (
                                                    <Icon name={menuItem.icon.content}/>
                                                )
                                            )}
                                        </div>
                                        <div className="menu__title"> {menuItem.content} </div>
                                    </Link>
                                )}
                                <ul className="menu__sub-open">
                                    {menuItem.sublinks.map((subMenuItem, subIndex) => (
                                        <li key={subIndex}>
                                            {subMenuItem.route && (
                                                <Link href={subMenuItem.route} className="menu">
                                                    <div className="menu__icon">
                                                        <CornerDownRight/>
                                                    </div>
                                                    <div className="menu__title"> {subMenuItem.content} </div>
                                                </Link>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) : null}

                    </li>
                    ))}
                </ul>
            </div>
        </div>

    )
}

export default MobileMenu;