
import React, {useEffect, useState} from 'react';
import { PageProps, Data, Account } from '@/types';
import Page from '@/Base-components/Page';
import Webmaster from '@/Layouts/Webmaster';
import { Blocks, Calendar, CheckSquare, ChevronDown, Contact, Database, DollarSign, Edit2, Facebook, Film, Hash, Headphones, Image, KeyRound, Layers, LayoutPanelTop, MapPin, MessageSquare, MessageSquareText, ScrollText, Search, Text, Trash, Trash2, User } from 'lucide-react';
import { Button } from '@headlessui/react';
import DeleteModal from '@/Components/DeleteModal';
import { Head, Link, router, useForm } from '@inertiajs/react';
import ReactLoading from 'react-loading';

import { toast } from 'react-toastify';

const AccountsIndex: React.FC<PageProps<{ data: Data[], account: Account }>> = ({ auth, data, menu, account }) => {
    return (<>
        <Head title="Data" />
        <Webmaster
            user={auth.user}
            menu={menu}
            breadcrumb={<li className="breadcrumb-item active" aria-current="page">Data</li>}
        >
            <Page title={"Data for "+account.name} header={<></>}>
                <div className="col-span-12 lg:col-span-9 2xl:col-span-10">
                    <div className="intro-y overflow-auto">
                        <table className="table table-report -mt-2">
                            <thead>
                                <tr>
                                    <th className="whitespace-nowrap">#</th>
                                    <th className="whitespace-nowrap">Title</th>
                                    <th className="whitespace-nowrap">Location</th>
                                    <th className="whitespace-nowrap">Price</th>
                                    <th className="whitespace-nowrap">Clicks</th>
                                    <th className="whitespace-nowrap">Last update</th>
                                </tr>
                            </thead>
                            <tbody>
                            {data && data.map(dat => (
                                <tr key={dat.id} className="intro-x">
                                    <td>
                                        <div className="flex items-center">
                                            <Hash className="h-4 w-4 text-gray-500 mr-1" />
                                            <span className="text-sm text-gray-500">{dat.id}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center">
                                            <Text className="h-4 w-4 text-gray-500 mr-1" />
                                            <span className="text-sm text-gray-500">{dat.title}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center">
                                            <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                                            <span className="text-sm text-gray-500">{dat.location}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center">
                                            <DollarSign className="h-4 w-4 text-gray-500 mr-1" />
                                            <span className="text-sm text-gray-500">{dat.price}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center">
                                            <span className='text-primary'><strong>{dat.clicks}</strong></span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center">
                                            <span className='text-primary'>
                                                {new Date(dat.updated_at).toLocaleString('en-GB', {
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
                                </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                </div>
            </Page>
        </Webmaster>            
    </>
        )
}

export default AccountsIndex;