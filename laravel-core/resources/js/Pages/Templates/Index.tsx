
import React, {useEffect, useState} from 'react';
import { PageProps, TemplatesGroup, Template } from '@/types';
import Page from '@/Base-components/Page';
import Webmaster from '@/Layouts/Webmaster';
import { Blocks, Calendar, CheckSquare, ChevronDown, Contact, Edit2, Film, Hash, Headphones, Image, Layers, LayoutPanelTop, MessageSquare, MessageSquareText, ScrollText, Search, Trash, Trash2, User } from 'lucide-react';
import { Button } from '@headlessui/react';
import DeleteModal from '@/Components/DeleteModal';
import { Head, Link, router, useForm } from '@inertiajs/react';
import ReactLoading from 'react-loading';

import { toast } from 'react-toastify';

const TemplatesIndex: React.FC<PageProps<{ groups: TemplatesGroup[], from:number, to:number, total:number }>> = ({ auth, groups, from, to, total, menu }) => {
    const [showDeleteGroupModal, setShowDeleteGroupModal] = useState(false);
    const [isDeletingGroup, setIsDeletingGroup] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    const [showDeleteTemplateModal, setShowDeleteTemplateModal] = useState(false);
    const [isDeletingTemplate, setIsDeletingTemplate] = useState(false);

    const templateForm = useForm<{ template: number }>({ template: 0 });
    const groupForm = useForm<{ group: number }>({ group: 0 });

    const [activeGroup, setActiveGroup] = useState<TemplatesGroup | null>(groups.length > 0 ? groups[0] : null);
    const [activeTemplates, setActiveTemplates] = useState<Template[]>(groups.length > 0 ? groups[0].templates : []);

    const formatTimeDifference = (timestamp: number) => {
        const now = Date.now();
        const difference = now - timestamp;
      
        const secondsInMs = 1000;
        const minutesInMs = 60 * secondsInMs;
        const hoursInMs = 60 * minutesInMs;
        const daysInMs = 24 * hoursInMs;
      
        if (difference < minutesInMs) {
          const seconds = Math.floor(difference / secondsInMs);
          return "few seconds ago";
        } else if (difference < hoursInMs) {
          const minutes = Math.floor(difference / minutesInMs);
          return `${minutes} minutes ago`;
        } else if (difference < daysInMs) {
          const hours = Math.floor(difference / hoursInMs);
          return `${hours} hours ago`;
        } else {
          const days = Math.floor(difference / daysInMs);
          return `${days} days ago`;
        }
      };
    
    const mostRecentActivity = activeTemplates.length > 0
    ? activeTemplates.reduce((latest, template) => 
        new Date(template.updated_at).getTime() > new Date(latest.updated_at).getTime() ? template : latest
    ) 
    : null;

    const lastActivityBy = mostRecentActivity &&  mostRecentActivity.updated_by? mostRecentActivity.updated_by.name : "";
    const lastActivityAt = mostRecentActivity ? formatTimeDifference(new Date(mostRecentActivity.updated_at).getTime()): "";


    const handleDeleteTemplate = async () => {
        setIsDeletingTemplate(true);
        try {
            await templateForm.delete(route('templates.destroy', { id: templateForm.data.template }));
            toast.success('Template has been deleted successfully');
            router.get(route('templates.index'));
        } catch(error) {
            toast.error('Error deleting the template');
            console.error('Error details:', error);
        } finally {
            setIsDeletingTemplate(false);
            setShowDeleteTemplateModal(false);
        }
    };
    const handleDeleteGroup = async () => {
        setIsDeletingGroup(true);
        try {
            await groupForm.delete(route('templates.groups.destroy', { id: groupForm.data.group }));
            toast.success('Group of templates has been deleted successfully');
            router.get(route('templates.index'));
        } catch(error) {
            toast.error('Error deleting the group of templates');
            console.error('Error details:', error);
        } finally {
            setIsDeletingGroup(false);
            setShowDeleteGroupModal(false);
        }
    };

    const handleDeleteGroupClick = (event: React.MouseEvent<HTMLButtonElement>, group: number) => {
        event.preventDefault();
        groupForm.setData({ group: group });
        setShowDeleteGroupModal(true);
    };

    const handleDeleteTemplateClick = (event: React.MouseEvent<HTMLButtonElement>, template: number) => {
        event.preventDefault();
        templateForm.setData({ template: template });
        setShowDeleteTemplateModal(true);
    };

    const handleDeleteCancel = () => {
        setShowDeleteGroupModal(false);
        setShowDeleteTemplateModal(false);
    };

    useEffect(()=>{
        setActiveTemplates(activeGroup ? activeGroup.templates: [])
    }, [activeGroup])

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsSearching(event.target.value != "")
        const templatesToFilter = activeGroup ? activeGroup.templates : [];
        const searchTerm = event.target.value.toLowerCase();
        const filteredTemplates = templatesToFilter.filter(item => 
            (item.name && item.name.toLowerCase().includes(searchTerm)) ||
            (item.description && item.description.toLowerCase().includes(searchTerm)) ||
            (item.created_by && item.created_by.name.toLowerCase().includes(searchTerm)) ||

            (item.stringphotos && item.stringphotos.toLowerCase().includes(searchTerm)) ||
            (item.stringvideos && item.stringvideos.toLowerCase().includes(searchTerm)) ||
            (item.stringaudios && item.stringaudios.toLowerCase().includes(searchTerm)) ||
            (item.message && item.message.toLowerCase().includes(searchTerm))
        );
        setActiveTemplates(filteredTemplates)
    };
    return (<>
        <Head title="Templates" />
        <Webmaster
            user={auth.user}
            menu={menu}
            breadcrumb={<li className="breadcrumb-item active" aria-current="page">Templates</li>}
        >
        <Page title="Templates" header={<></>}>
            <div className="grid grid-cols-12 gap-6 mt-8">
                <div className="col-span-12 lg:col-span-3 2xl:col-span-2">
                    <h2 className="intro-y text-lg font-medium mr-auto mt-2">Groups</h2>
                    <div className="intro-y box bg-primary p-5 mt-6">
                        <Link href={route('templates.groups.create')} type="button" className="btn text-slate-600 dark:text-slate-300 w-full bg-white dark:bg-darkmode-300 dark:border-darkmode-300 mt-1">
                            <Blocks className="w-4 h-4 mr-2" /> Create a group
                        </Link>
                        { activeGroup && (
                            <Link href={route('templates.groups.edit', activeGroup.id)} className="btn text-slate-600 dark:text-slate-300 w-full bg-white dark:bg-darkmode-300 dark:border-darkmode-300 mt-1">
                                <Edit2 className="w-4 h-4 mr-2 text-danger" /> Edit the group
                            </Link>
                        )}
                        { activeGroup && (
                        <Button 
                          onClick={(event) => handleDeleteGroupClick(event, activeGroup.id)}
                          disabled={isDeletingGroup} 
                          className="btn text-slate-600 dark:text-slate-300 w-full dark:bg-darkmode-300 dark:border-darkmode-300 mt-1 bg-white"
                        >
                          {isDeletingGroup ? (
                            <div className="flex items-center">
                              <ReactLoading type="spin" color="#ff" height={24} width={24} />
                              <span className="ml-2">Deleting...</span>
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <Trash className="w-4 h-4 mr-2 text-red-500" />
                              <span>Delete the group</span>
                            </div>
                          )}
                        </Button>
                        )}
                        <div className="border-t border-white/10 dark:border-darkmode-400 mt-6 pt-6 text-white">
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
                            <input type="text" className="form-control w-full sm:w-64 box px-10" placeholder="Search template" onChange={handleSearchChange}/>
                            <div className="inbox-filter dropdown absolute inset-y-0 mr-3 right-0 flex items-center" data-tw-placement="bottom-start">
                                <ChevronDown className="dropdown-toggle w-4 h-4 cursor-pointer text-slate-500" role="button" aria-expanded="false" data-tw-toggle="dropdown"/>
                            </div>
                        </div>
                        <div className="w-full sm:w-auto flex">
                        <Link href={route('templates.create')} className="btn btn-primary shadow-md mr-2">Create a Template</Link>
                        </div>
                    </div>
                    <div className="intro-y overflow-auto">
                        <table className="table table-report -mt-2">
                            <thead>
                                <tr>
                                    <th className="whitespace-nowrap">#</th>
                                    <th className="whitespace-nowrap">Template</th>
                                    <th className="whitespace-nowrap">Created</th>
                                    <th className="whitespace-nowrap">Messages</th>
                                    <th className="whitespace-nowrap">Rates</th>
                                    <th className="whitespace-nowrap">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {activeTemplates && activeTemplates.map((template, index) => (
                                <tr key={index} className="intro-x">
                                    <td>
                                        <div className="flex items-center">
                                            <Hash className="h-4 w-4 text-gray-500 mr-1" />
                                            <span className="text-sm text-gray-500">{template.id}</span>
                                        </div>
                                        <div className="flex items-center mt-1">
                                            <Contact className="h-4 w-4 text-gray-500 mr-2" />
                                            <span className="text-sm text-gray-500">{template.group.name}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center">
                                            <LayoutPanelTop className="h-4 w-4 text-gray-500 mr-1" />
                                            <span className="text-sm text-gray-500">{template.name}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <ScrollText className="h-4 w-4 text-gray-500 mr-1" />
                                            <span className="text-sm text-gray-500">
                                                {template.description && template.description.length > 10 
                                                    ? template.description.substring(0, 10) + '...' 
                                                    : template.description}
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center">
                                            <User className="h-4 w-4 text-gray-500 mr-1" />
                                            <span className="text-sm text-gray-500">{template.created_by.name}</span>
                                        </div>
                                        <div className="flex items-center mt-1">
                                            <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                                            <span className="text-sm text-gray-500">
                                                {new Date(template.created_at).toLocaleString('en-GB', {
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
                                        {template.photos.map((photo, index)=>(
                                            <div key={index} className="flex items-center">
                                                <Image className="h-4 w-4 text-gray-500 mr-2" />
                                                <span className='text-sm text-gray-500'>
                                                    <a target="_blank" href={photo}>
                                                        {photo.length > 10 ? photo.substring(0, 10) + '...' : photo}
                                                    </a>
                                                </span>
                                            </div>
                                        ))}
                                        {template.videos.map((video, index)=>(
                                            <div key={index} className="flex items-center">
                                                <Film className="h-4 w-4 text-gray-500 mr-2"/>
                                                <span className='text-sm text-gray-500'>
                                                    <a target="_blank" href={video}>
                                                        {video.length > 10 ? video.substring(0, 10) + '...' : video}
                                                    </a>
                                                </span>
                                            </div>
                                        ))}
                                        {template.audios.map((audio, index)=>(
                                            <div key={index} className="flex items-center">
                                                <Headphones className="h-4 w-4 text-gray-500 mr-2"/>
                                                <span className='text-sm text-gray-500'>
                                                    <a target="_blank" href={audio}>
                                                        {audio.length > 10 ? audio.substring(0, 10) + '...' : audio}
                                                    </a>
                                                </span>
                                            </div>
                                        ))}
                                        { template.message && (<div className="flex items-center">
                                            <MessageSquareText className="h-4 w-4 text-gray-500 mr-2"/>
                                            <span className='text-sm text-gray-500'>                                                
                                                {template.message && template.message.length > 10 
                                                    ? template.message.substring(0, 10) + '...' 
                                                    : template.message}
                                            </span>
                                        </div>)}
                                    </td>
                                    <td>
                                        <div className="flex items-center">
                                            <span className='text-primary'>{template.total_used}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className='text-warning'>{template.total_responses}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className='text-success'>{template.total_orders}</span>
                                        </div>
                                    </td>
                                    <td className="table-report__action w-56">
                                        <div className="flex justify-center items-center">
                                            <Link className="flex items-center mr-3" href={route('templates.edit', { template: template.id })}>
                                                <CheckSquare className="w-4 h-4 mr-1"/> Edit
                                            </Link>
                                            <Button className="flex items-center text-danger" onClick={(event) => handleDeleteTemplateClick(event, template.id)}>
                                                <Trash2 className="w-4 h-4 mr-1" /> Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                    <DeleteModal showDeleteModal={showDeleteTemplateModal} handleDeleteCancel={handleDeleteCancel} handleDeleteConfirm={handleDeleteTemplate} deleting={isDeletingTemplate}/>
                    <DeleteModal showDeleteModal={showDeleteGroupModal} handleDeleteCancel={handleDeleteCancel} handleDeleteConfirm={handleDeleteGroup} deleting={isDeletingGroup}/>

                    <div className="p-5 flex flex-col sm:flex-row items-center text-center sm:text-left text-slate-500">
                        {!activeGroup && (<div>No group !</div>)}
                        {activeGroup && activeTemplates.length>0 && (<div>{activeTemplates?.length} of {activeTemplates?.length} in {activeGroup?.name}</div>)}
                        {activeGroup && activeTemplates.length<=0 && !isSearching && (<div>No templates in {activeGroup?.name} !</div>)}
                        {activeGroup && activeTemplates.length<=0 && isSearching && (<div>No results has been found in {activeGroup?.name} !</div>)}
                        { mostRecentActivity && (<div className="sm:ml-auto mt-2 sm:mt-0">
                            Last activity: {lastActivityAt} by {lastActivityBy}
                        </div>)}
                    </div>
                </div>
            </div>
            </Page>
        </Webmaster>            
    </>
        )
}

export default TemplatesIndex;