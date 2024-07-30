import { Bell, CreditCard, Edit, HelpCircle, Inbox, Lock, Search, ToggleRight, User as UserIcon, Users } from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';
import Dropdown from '@/Base-components/Dropdown';
import { User } from '@/types';
import { Link } from '@inertiajs/react';

interface TopbarProps{
    user: User;
    breadcrumb?: ReactNode;
}
const Topbar: React.FC<TopbarProps> = ({ breadcrumb, user }) => {
    const [searchActive, setSearchActive] = useState(false)
    const [align, setAlign] = useState<"right" | "left">("right");

    useEffect(()=>{
        if(window.innerWidth <= 600)
        {
            setAlign("left")
        }
        else
        {
            setAlign("right")
        }
    }, []);

    return (
        <div className="top-bar -mx-4 px-4 md:mx-0 md:px-0">
            <nav aria-label="breadcrumb" className="mr-auto hidden sm:flex">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href={route('dashboard')}>Inventaire</a></li>
                    {breadcrumb}
                </ol>
            </nav>
            <div className="relative mr-3 sm:mr-6">
                <div className="search hidden sm:block">
                    <input type="text" className="search__input form-control border-transparent" placeholder="Search..." onClick={()=>{setSearchActive(!searchActive)}} onBlur={()=>{setSearchActive(false)}}/>
                        <Search className="search__icon dark:text-slate-500"/>
                </div>
                <a className="notification sm:hidden" href=""> <Search className="notification__icon dark:text-slate-500"/> </a>
                <div className={`search-result ${searchActive ? 'show' : ''}`}>
                    <div className="search-result__content">
                        <div className="search-result__content__title">Pages</div>
                        <div className="mb-5">
                            <a href="" className="flex items-center">
                                <div className="w-8 h-8 bg-success/20 dark:bg-success/10 text-success flex items-center justify-center rounded-full"> <Inbox className="w-4 h-4"/> </div>
                                <div className="ml-3">Mail Settings</div>
                            </a>
                            <a href="" className="flex items-center mt-2">
                                <div className="w-8 h-8 bg-pending/10 text-pending flex items-center justify-center rounded-full"> <Users className="w-4 h-4"/> </div>
                                <div className="ml-3">Users & Permissions</div>
                            </a>
                            <a href="" className="flex items-center mt-2">
                                <div className="w-8 h-8 bg-primary/10 dark:bg-primary/20 text-primary/80 flex items-center justify-center rounded-full"> <CreditCard className="w-4 h-4"/> </div>
                                <div className="ml-3">Transactions Report</div>
                            </a>
                        </div>
                        <div className="search-result__content__title">Users</div>
                        <div className="mb-5">
                            <a href="" className="flex items-center mt-2">
                                <div className="w-8 h-8 image-fit">
                                    <img alt="Midone - HTML Admin Template" className="rounded-full" src="/dist/images/profile-2.jpg"/>
                                </div>
                                <div className="ml-3">sssssssssss sssssssss</div>
                                <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">keanureeves@left4code.com</div>
                            </a>
                            <a href="" className="flex items-center mt-2">
                                <div className="w-8 h-8 image-fit">
                                    <img alt="Midone - HTML Admin Template" className="rounded-full" src="/dist/images/profile-3.jpg"/>
                                </div>
                                <div className="ml-3">Angelina Jolie</div>
                                <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">angelinajolie@left4code.com</div>
                            </a>
                            <a href="" className="flex items-center mt-2">
                                <div className="w-8 h-8 image-fit">
                                    <img alt="Midone - HTML Admin Template" className="rounded-full" src="/dist/images/profile-13.jpg"/>
                                </div>
                                <div className="ml-3">Brad Pitt</div>
                                <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">bradpitt@left4code.com</div>
                            </a>
                            <a href="" className="flex items-center mt-2">
                                <div className="w-8 h-8 image-fit">
                                    <img alt="Midone - HTML Admin Template" className="rounded-full" src="/dist/images/profile-4.jpg"/>
                                </div>
                                <div className="ml-3">John Travolta</div>
                                <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">johntravolta@left4code.com</div>
                            </a>
                        </div>
                        <div className="search-result__content__title">Products</div>
                        <a href="" className="flex items-center mt-2">
                            <div className="w-8 h-8 image-fit">
                                <img alt="Midone - HTML Admin Template" className="rounded-full" src="/dist/images/preview-1.jpg"/>
                            </div>
                            <div className="ml-3">Apple MacBook Pro 13</div>
                            <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">PC &amp; Laptop</div>
                        </a>
                        <a href="" className="flex items-center mt-2">
                            <div className="w-8 h-8 image-fit">
                                <img alt="Midone - HTML Admin Template" className="rounded-full" src="/dist/images/preview-7.jpg"/>
                            </div>
                            <div className="ml-3">Dell XPS 13</div>
                            <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">PC &amp; Laptop</div>
                        </a>
                        <a href="" className="flex items-center mt-2">
                            <div className="w-8 h-8 image-fit">
                                <img alt="Midone - HTML Admin Template" className="rounded-full" src="/dist/images/preview-1.jpg"/>
                            </div>
                            <div className="ml-3">Samsung Galaxy S20 Ultra</div>
                            <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">Smartphone &amp; Tablet</div>
                        </a>
                        <a href="" className="flex items-center mt-2">
                            <div className="w-8 h-8 image-fit">
                                <img alt="Midone - HTML Admin Template" className="rounded-full" src="/dist/images/preview-3.jpg"/>
                            </div>
                            <div className="ml-3">Apple MacBook Pro 13</div>
                            <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">PC &amp; Laptop</div>
                        </a>
                    </div>
                </div>
            </div>
            
            <Dropdown>
                <Dropdown.Trigger>
                    <div className="dropdown-toggle dropdown notification notification--bullet cursor-pointer me-12" role="button"> 
                        <Bell className="notification__icon dark:text-slate-500"/>
                    </div>
                </Dropdown.Trigger>
                <Dropdown.Content align={align}>
                    <div className='notification-content show'>
                        <div className="notification-content__box dropdown-content">
                            <div className="notification-content__title">Notifications</div>
                            <div className="cursor-pointer relative flex items-center ">
                                <div className="w-12 h-12 flex-none image-fit mr-1">
                                    <img alt="Midone - HTML Admin Template" className="rounded-full" src="/dist/images/profile-2.jpg"/>
                                        <div className="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"></div>
                                </div>
                                <div className="ml-2 overflow-hidden">
                                    <div className="flex items-center">
                                        <a href="" className="font-medium truncate mr-5">sssssssssss sssssssss</a>
                                        <div className="text-xs text-slate-400 ml-auto whitespace-nowrap">05:09 AM</div>
                                    </div>
                                    <div className="w-full truncate text-slate-500 mt-0.5">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem </div>
                                </div>
                            </div>
                            <div className="cursor-pointer relative flex items-center mt-5">
                                <div className="w-12 h-12 flex-none image-fit mr-1">
                                    <img alt="Midone - HTML Admin Template" className="rounded-full" src="/dist/images/profile-3.jpg"/>
                                        <div className="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"></div>
                                </div>
                                <div className="ml-2 overflow-hidden">
                                    <div className="flex items-center">
                                        <a href="" className="font-medium truncate mr-5">Angelina Jolie</a>
                                        <div className="text-xs text-slate-400 ml-auto whitespace-nowrap">03:20 PM</div>
                                    </div>
                                    <div className="w-full truncate text-slate-500 mt-0.5">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#039;s standard dummy text ever since the 1500</div>
                                </div>
                            </div>
                            <div className="cursor-pointer relative flex items-center mt-5">
                                <div className="w-12 h-12 flex-none image-fit mr-1">
                                    <img alt="Midone - HTML Admin Template" className="rounded-full" src="/dist/images/profile-13.jpg"/>
                                        <div className="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"></div>
                                </div>
                                <div className="ml-2 overflow-hidden">
                                    <div className="flex items-center">
                                        <a href="" className="font-medium truncate mr-5">Brad Pitt</a>
                                        <div className="text-xs text-slate-400 ml-auto whitespace-nowrap">01:10 PM</div>
                                    </div>
                                    <div className="w-full truncate text-slate-500 mt-0.5">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#039;s standard dummy text ever since the 1500</div>
                                </div>
                            </div>
                            <div className="cursor-pointer relative flex items-center mt-5">
                                <div className="w-12 h-12 flex-none image-fit mr-1">
                                    <img alt="Midone - HTML Admin Template" className="rounded-full" src="/dist/images/profile-4.jpg"/>
                                        <div className="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"></div>
                                </div>
                                <div className="ml-2 overflow-hidden">
                                    <div className="flex items-center">
                                        <a href="" className="font-medium truncate mr-5">John Travolta</a>
                                        <div className="text-xs text-slate-400 ml-auto whitespace-nowrap">06:05 AM</div>
                                    </div>
                                    <div className="w-full truncate text-slate-500 mt-0.5">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem </div>
                                </div>
                            </div>
                            <div className="cursor-pointer relative flex items-center mt-5">
                                <div className="w-12 h-12 flex-none image-fit mr-1">
                                    <img alt="Midone - HTML Admin Template" className="rounded-full" src="/dist/images/profile-15.jpg"/>
                                        <div className="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"></div>
                                </div>
                                <div className="ml-2 overflow-hidden">
                                    <div className="flex items-center">
                                        <a href="" className="font-medium truncate mr-5">Leonardo DiCaprio</a>
                                        <div className="text-xs text-slate-400 ml-auto whitespace-nowrap">05:09 AM</div>
                                    </div>
                                    <div className="w-full truncate text-slate-500 mt-0.5">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomi</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Dropdown.Content>

            </Dropdown>
            
            <div className="absolute right-0 me-6">
            <Dropdown>
                <div className="intro-x w-8 h-8">
                <Dropdown.Trigger>
                    <div className="dropdown-toggle w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in" role="button">
                        <img alt="Profile" src="/dist/images/profile-5.jpg" />
                    </div>

                </Dropdown.Trigger>
                <Dropdown.Content align="right">
                    <div className='dropdown-menu w-56 show'>
                        <ul className="dropdown-content bg-primary text-white">
                            <li className="p-2">
                                <div className="font-medium">{user.name}</div>
                                <div className="text-xs text-white/70 mt-0.5 dark:text-slate-500">{user.role}</div>
                            </li>
                            <li>
                                <hr className="dropdown-divider border-white/[0.08]"/>
                            </li>
                            <li>
                                <Link href={route('profile.edit')} className="dropdown-item hover:bg-white/5"> <UserIcon className="w-4 h-4 mr-2"/> Profile </Link>
                            </li>
                            <li>
                                <a href="" className="dropdown-item hover:bg-white/5"> <Edit className="w-4 h-4 mr-2"/> Add Account </a>
                            </li>
                            <li>
                                <a href="" className="dropdown-item hover:bg-white/5"> <Lock className="w-4 h-4 mr-2"/> Reset Password </a>
                            </li>
                            <li>
                                <a href="" className="dropdown-item hover:bg-white/5"> <HelpCircle className="w-4 h-4 mr-2"/> Help </a>
                            </li>
                            <li>
                                <hr className="dropdown-divider border-white/[0.08]"/>
                            </li>
                            <li>
                                <Link href={route('logout')} method="post" className="dropdown-item hover:bg-white/5"> <ToggleRight className="w-4 h-4 mr-2"/> Logout </Link>
                            </li>
                        </ul>
                    </div>
                </Dropdown.Content>
                </div>
            </Dropdown>
                </div>
        </div>

    );
}
export default Topbar;