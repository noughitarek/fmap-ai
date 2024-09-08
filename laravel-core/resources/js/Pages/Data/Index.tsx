
import React, {useEffect, useState} from 'react';
import { PageProps, AccountsGroup, Account } from '@/types';
import Page from '@/Base-components/Page';
import Webmaster from '@/Layouts/Webmaster';
import { Blocks, Calendar, CheckSquare, ChevronDown, Contact, Database, Edit2, Facebook, Film, Hash, Headphones, Image, KeyRound, Layers, LayoutPanelTop, MessageSquare, MessageSquareText, ScrollText, Search, Trash, Trash2, User } from 'lucide-react';
import { Button } from '@headlessui/react';
import DeleteModal from '@/Components/DeleteModal';
import { Head, Link, router, useForm } from '@inertiajs/react';
import ReactLoading from 'react-loading';

import { toast } from 'react-toastify';

const AccountsIndex: React.FC<PageProps<{ groups: AccountsGroup[], from:number, to:number, total:number }>> = ({ auth, groups, from, to, total, menu }) => {
    const [isSearching, setIsSearching] = useState(false);

    const accountForm = useForm<{ account: number }>({ account: 0 });
    const groupForm = useForm<{ group: number }>({ group: 0 });

    const [activeGroup, setActiveGroup] = useState<AccountsGroup | null>(groups.length > 0 ? groups[0] : null);
    const [activeAccounts, setActiveAccounts] = useState<Account[]>(groups.length > 0 ? groups[0].accounts : []);

    useEffect(()=>{
        setActiveAccounts(activeGroup ? activeGroup.accounts: [])
    }, [activeGroup])

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsSearching(event.target.value != "")
        const accountsToFilter = activeGroup ? activeGroup.accounts : [];
        const searchTerm = event.target.value.toLowerCase();
        const filteredAccounts = accountsToFilter.filter(item => 
            (item.name && item.name.toLowerCase().includes(searchTerm)) ||
            (item.description && item.description.toLowerCase().includes(searchTerm)) ||
            (item.created_by && item.created_by.name.toLowerCase().includes(searchTerm)) ||
            (item.username && item.username.toLowerCase().includes(searchTerm))
        );
        setActiveAccounts(filteredAccounts)
    };
    
    return (<>
        <Head title="Accounts" />
        <Webmaster
            user={auth.user}
            menu={menu}
            breadcrumb={<li className="breadcrumb-item active" aria-current="page">Accounts</li>}
        >
        <Page title="Accounts" header={<></>}>
            <div className="grid grid-cols-12 gap-6 mt-8">
                <div className="col-span-12 lg:col-span-3 2xl:col-span-2">
                    <h2 className="intro-y text-lg font-medium mr-auto mt-2">Groups</h2>
                    <div className="intro-y box bg-primary p-5 mt-6">
                        <div className="text-white">
                            {groups.map(group=>{
                                const isActive = activeGroup && group.id === activeGroup.id;
                                return (
                                    <Button
                                        key={group.name}
                                        onClick={() => setActiveGroup(group)}
                                        className={`flex items-center px-3 py-2 rounded-md mt-2 ${isActive ? 'bg-white/10 dark:bg-darkmode-700 font-medium' : ''}`}
                                    >
                                        <Blocks className='w-4 h-4 mr-2' />
                                        {group.name}
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-9 2xl:col-span-10">
                    <div className="intro-y flex flex-col-reverse sm:flex-row items-center">
                        <div className="w-full sm:w-auto relative mr-auto mt-3 sm:mt-0">
                            <Search className="w-4 h-4 absolute my-auto inset-y-0 ml-3 left-0 z-10 text-slate-500"/>
                            <input type="text" className="form-control w-full sm:w-64 box px-10" placeholder="Search account" onChange={handleSearchChange}/>
                            <div className="inbox-filter dropdown absolute inset-y-0 mr-3 right-0 flex items-center" data-tw-placement="bottom-start">
                                <ChevronDown className="dropdown-toggle w-4 h-4 cursor-pointer text-slate-500" role="button" aria-expanded="false" data-tw-toggle="dropdown"/>
                            </div>
                        </div>
                    </div>
                    <div className="intro-y overflow-auto">
                        <table className="table table-report -mt-2">
                            <thead>
                                <tr>
                                    <th className="whitespace-nowrap">#</th>
                                    <th className="whitespace-nowrap">Account</th>
                                    <th className="whitespace-nowrap">Created</th>
                                    <th className="whitespace-nowrap">Credentials</th>
                                    <th className="whitespace-nowrap">Rates</th>
                                    <th className="whitespace-nowrap">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {activeAccounts && activeAccounts.map((account, index) => (
                                <tr key={index} className="intro-x">
                                    <td>
                                        <div className="flex items-center">
                                            <Hash className="h-4 w-4 text-gray-500 mr-1" />
                                            <span className="text-sm text-gray-500">{account.id}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Hash className="h-4 w-4 text-gray-500 mr-1" />
                                            <span className="text-sm text-gray-500">{account.facebook_user_id}</span>
                                        </div>
                                        <div className="flex items-center mt-1">
                                            <Contact className="h-4 w-4 text-gray-500 mr-2" />
                                            <span className="text-sm text-gray-500">{account.accounts_group.name}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center">
                                            <Facebook className="h-4 w-4 text-gray-500 mr-1" />
                                            <span className="text-sm text-gray-500">{account.name}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <ScrollText className="h-4 w-4 text-gray-500 mr-1" />
                                            <span className="text-sm text-gray-500">
                                                {account.description && account.description.length > 10 
                                                    ? account.description.substring(0, 10) + '...' 
                                                    : account.description}
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center">
                                            <User className="h-4 w-4 text-gray-500 mr-1" />
                                            <span className="text-sm text-gray-500">{account.created_by.name}</span>
                                        </div>
                                        <div className="flex items-center mt-1">
                                            <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                                            <span className="text-sm text-gray-500">
                                                {new Date(account.created_at).toLocaleString('en-GB', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    second: '2-digit'
                                                })}
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center">
                                            <User className="h-4 w-4 text-gray-500 mr-1" />
                                            <span className="text-sm text-gray-500">{account.username}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <KeyRound className="h-4 w-4 text-gray-500 mr-1" />
                                            <span className="text-sm text-gray-500">{account.password}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center">
                                            <span className='text-primary'>{account.total_listings}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className='text-warning'>{account.total_messages}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className='text-success'>{account.total_orders}</span>
                                        </div>
                                    </td>
                                    <td className="table-report__action w-56">
                                        
                                        <Link className="flex items-center mr-3" href={route('data.account', { account: account.id })}>
                                            <Database className="w-4 h-4 mr-1"/> Show data
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                    <div className="p-5 flex flex-col sm:flex-row items-center text-center sm:text-left text-slate-500">
                        {!activeGroup && (<div>No group !</div>)}
                        {activeGroup && activeAccounts.length>0 && (<div>{activeAccounts?.length} of {activeAccounts?.length} in {activeGroup?.name}</div>)}
                        {activeGroup && activeAccounts.length<=0 && !isSearching && (<div>No accounts in {activeGroup?.name} !</div>)}
                        {activeGroup && activeAccounts.length<=0 && isSearching && (<div>No results has been found in {activeGroup?.name} !</div>)}

                    </div>
                </div>
            </div>
            </Page>
        </Webmaster>            
    </>
        )
}

export default AccountsIndex;