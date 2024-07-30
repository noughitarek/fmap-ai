import React, { useEffect, useState } from 'react';
import { PageProps, Conversation } from '@/types';
import Page from '@/Base-components/Page';
import Webmaster from '@/Layouts/Webmaster';
import { Calendar } from 'lucide-react';
import { Head } from '@inertiajs/react';
import Grid from '@/Base-components/Grid';

const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
};

const PagesIndex: React.FC<PageProps<{ conversation: Conversation }>> = ({ auth, menu, conversation }) => {
    return (
        <>
            <Head title="Pages" />
            <Webmaster
                user={auth.user}
                menu={menu}
                breadcrumb={<li className="breadcrumb-item active" aria-current="page">Pages</li>}
            >
                <Page title="Pages" header={<></>}>
                    <Grid title="Assignments for" header={<>{conversation.name}</>}>
                        {conversation.remarketing_messages?.length==0?"No program is assigned to this conversation":""}
                        {conversation.remarketing_messages?.length!=0?(
                        <table className="table table-report -mt-2">
                            <thead>
                                <tr>
                                    <th className="whitespace-nowrap">
                                        <input className="form-check-input" type="checkbox" />
                                    </th>
                                    <th>Event</th>
                                    <th>Expected sending date</th>
                                    <th>Sent at</th>
                                    <th>Group of Templates</th>
                                    <th>Template</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="w-10">
                                        <input className="form-check-input" type="checkbox" />
                                    </td>
                                    <td>Starting:</td>
                                    <td>
                                        <div className="flex items-center mt-1">
                                            <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                                            <span className="text-gray-500">
                                                {formatDate(conversation.started_at)}
                                            </span>
                                        </div>
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                {conversation.remarketing_messages && conversation.remarketing_messages.map(remarketing_message=>(
                                <tr key={remarketing_message.id}>
                                    <td className="w-10">
                                        <input className="form-check-input" type="checkbox" />
                                    </td>
                                    <td>Remarketing message:</td>
                                    <td>
                                        <div className="flex items-center mt-1">
                                            <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                                            <span className="text-gray-500">
                                                {formatDate(remarketing_message.send_at)}
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center mt-1">
                                            {
                                            remarketing_message.sent_at? (<><Calendar className="h-4 w-4 text-gray-500 mr-1" />
                                            <span className="text-gray-500">
                                                {formatDate(remarketing_message.sent_at)}
                                            </span></>)
                                            :
                                            "Not yet"
                                            }
                                            
                                        </div>
                                    </td>
                                    <td>
                                        {remarketing_message.templates_group&&remarketing_message.templates_group.name}
                                    </td>
                                    <td>
                                        {remarketing_message.template_row&&remarketing_message.template_row.name}
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>):""}
                    </Grid>
                </Page>
            </Webmaster>
        </>
    );
};

export default PagesIndex;
