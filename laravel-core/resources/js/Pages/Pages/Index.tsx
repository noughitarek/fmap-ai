import React, {useEffect, useState} from 'react';
import { PageProps, Page as PageType, Program } from '@/types';
import Page from '@/Base-components/Page';
import Webmaster from '@/Layouts/Webmaster';
import { Blocks, Calendar, CheckSquare, ChevronDown, Contact, Edit2, Facebook, Film, Hash, Headphones, Image, Layers, LayoutPanelTop, MessageSquare, MessageSquareText, ScrollText, Search, Trash, Trash2, User, UserCog } from 'lucide-react';
import { Button } from '@headlessui/react';
import DeleteModal from '@/Components/DeleteModal';
import { Head, Link, router, useForm } from '@inertiajs/react';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';

const PagesIndex: React.FC<PageProps<{ pages: PageType[], from:number, to:number, total:number }>> = ({ auth, menu, pages, from, to, total }) => {
    return (<>
        <Head title="Pages" />
        <Webmaster
            user={auth.user}
            menu={menu}
            breadcrumb={<li className="breadcrumb-item active" aria-current="page">Pages</li>}
        >
            <Page title='Pages' header={<></>}>
                <table className="table table-report -mt-2">
                    <thead>
                        <tr>
                            <th className="whitespace-nowrap">
                                <input className="form-check-input" type="checkbox" />
                            </th>
                            <th className="whitespace-nowrap">Page</th>
                            <th className="whitespace-nowrap">Messages</th>
                            <th className="whitespace-nowrap">Orders</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pages.map((page, index)=>(<>
                            <tr className="intro-x" key={index}>
                                <td className="w-10">
                                    <input className="form-check-input" type="checkbox" />
                                </td>
                                <td className="!py-3.5">
                                    <Link href={route('pages.conversations', {page: page})}>
                                        <div className="flex items-center">
                                            <div className="ml-4">
                                                <div className="flex items-center">
                                                    <Hash className="h-4 w-4 text-gray-500 mr-1" />
                                                    <span className="text-gray-500">{page.id}</span>
                                                </div>
                                                <div className="flex items-center mt-1">
                                                    <Blocks className="h-4 w-4 text-gray-500 mr-1" />
                                                    <span className="text-gray-500">{page.name}</span>
                                                </div>
                                                <div className="flex items-center mt-1">
                                                    <Facebook className="h-4 w-4 text-gray-500 mr-1" />
                                                    <span className="text-gray-500">{page.facebook_page_id}</span>
                                                </div>
                                                <div className="flex items-center mt-1">
                                                    <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                                                    <span className="text-gray-500">
                                                    {new Date(page.created_at).toLocaleString('en-GB', {
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        second: '2-digit'
                                                    })}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </td>
                                <td className="!py-3.5">
                                    <div className="flex items-center">
                                        <div className="flex items-center mt-1">
                                            <UserCog className="h-4 w-4 text-gray-500 mr-1" />
                                            <span className="text-gray-500">{page.total_page_messages}</span>
                                        </div>
                                        <div className="flex items-center mt-1">
                                            <User className="h-4 w-4 text-gray-500 mr-1" />
                                            <span className="text-gray-500">{page.total_user_messages}</span>
                                        </div>
                                    </div>
                                </td>
                            </tr></>
                        ))}
                    </tbody>
                </table>
            </Page>

        </Webmaster>
    </>)
}
export default PagesIndex;