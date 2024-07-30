import React, {useEffect, useState} from 'react';
import { PageProps, Conversation, Program } from '@/types';
import Page from '@/Base-components/Page';
import Webmaster from '@/Layouts/Webmaster';
import { AtSign, Blocks, Calendar, Facebook, Hash, ToggleLeft, ToggleRight, User, UserCog } from 'lucide-react';
import { Head, Link, router, useForm } from '@inertiajs/react';

const PagesIndex: React.FC<PageProps<{ conversations: Conversation[], from:number, to:number, total:number }>> = ({ auth, menu, conversations, from, to, total }) => {
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
                        {conversations.map((conversation, index)=>(<>
                            <tr className="intro-x" key={index}>
                                <td className="w-10">
                                    <input className="form-check-input" type="checkbox" />
                                </td>
                                <td className="!py-3.5">
                                    <Link href={route('pages.assignments', {page: conversation.page.id, conversation: conversation})}>
                                    <div className="flex items-center">
                                        <div className="ml-4">
                                            <div className="flex items-center">
                                                <Hash className="h-4 w-4 text-gray-500 mr-1" />
                                                <span className="text-gray-500">{conversation.id}</span>
                                            </div>
                                            <div className="flex items-center mt-1">
                                                <Facebook className="h-4 w-4 text-gray-500 mr-1" />
                                                <span className="text-gray-500">{conversation.facebook_user_id}</span>
                                            </div>
                                            <div className="flex items-center mt-1">
                                                <Facebook className="h-4 w-4 text-gray-500 mr-1" />
                                                <span className="text-gray-500">{conversation.facebook_conversation_id}</span>
                                            </div>
                                            <div className="flex items-center mt-1">
                                                <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                                                <span className="text-gray-500">
                                                {new Date(conversation.started_at).toLocaleString('en-GB', {
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
                                        <User className="h-4 w-4 text-gray-500 mr-1" />
                                        <span className="text-gray-500">{conversation.name}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <AtSign className="h-4 w-4 text-gray-500 mr-1" />
                                        <span className="text-gray-500">{conversation.email}</span>
                                    </div>
                                    <div className="flex items-center">
                                        {conversation.can_reply && (<>
                                            <ToggleRight className="h-4 w-4 text-gray-500 mr-1" />
                                            <span className="text-gray-500">Can reply</span>
                                        </>)}
                                        {!conversation.can_reply && (<>
                                            <ToggleLeft className="h-4 w-4 text-gray-500 mr-1" />
                                            <span className="text-gray-500">Can't reply</span>
                                        </>)}
                                    </div>
                                </td>
                                <td className="!py-3.5">
                                    <div className="flex items-center">
                                        <div className="flex items-center mt-1">
                                            <UserCog className="h-4 w-4 text-gray-500 mr-1" />
                                            <span className="text-gray-500">{conversation.total_page_messages}</span>
                                        </div>
                                        <div className="flex items-center mt-1">
                                            <User className="h-4 w-4 text-gray-500 mr-1" />
                                            <span className="text-gray-500">{conversation.total_user_messages}</span>
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