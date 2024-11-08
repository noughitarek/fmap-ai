
import React, {useState} from 'react';
import { PageProps, CategoriesGroup, Category } from '@/types';
import Page from '@/Base-components/Page';
import Webmaster from '@/Layouts/Webmaster';
import {  Calendar, Captions, CheckSquare, ChevronDown, Hash, LayoutList, ScrollText, Search, Trash2, User } from 'lucide-react';
import { Button } from '@headlessui/react';
import DeleteModal from '@/Components/DeleteModal';
import { Head, Link, router, useForm } from '@inertiajs/react';

import { toast } from 'react-toastify';

const CategoriesIndex: React.FC<PageProps<{ groups: CategoriesGroup[], from:number, to:number, total:number }>> = ({ auth, groups, from, to, total, menu }) => {
    const [showDeleteGroupModal, setShowDeleteGroupModal] = useState<boolean>(false);
    const [isDeletingGroup, setIsDeletingGroup] = useState<boolean>(false);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [activeGroups, setActiveGroups] = useState<CategoriesGroup[]>(groups)
    const groupForm = useForm<{ group: number }>({ group: 0 });
    
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
    
    const mostRecentActivity = activeGroups.length > 0
    ? activeGroups.reduce((latest, category) => 
        new Date(category.updated_at).getTime() > new Date(latest.updated_at).getTime() ? category : latest
    ) 
    : null;

    const lastActivityBy = mostRecentActivity &&  mostRecentActivity.updated_by? mostRecentActivity.updated_by.name : "";
    const lastActivityAt = mostRecentActivity ? formatTimeDifference(new Date(mostRecentActivity.updated_at).getTime()): "";


    const handleDeleteGroup = async () => {
        setIsDeletingGroup(true);
        try {
            await groupForm.delete(route('categories.destroy', { id: groupForm.data.group }));
            toast.success('Group of categories has been deleted successfully');
            router.get(route('categories.index'));
        } catch(error) {
            toast.error('Error deleting the group of categories');
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

    const handleDeleteCancel = () => {
        setShowDeleteGroupModal(false);
    };


    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsSearching(event.target.value != "")
        const categoriesToFilter = groups ? groups : [];
        const searchTerm = event.target.value.toLowerCase();
        const filteredCategories = categoriesToFilter.filter(item => 
            (item.name && item.name.toLowerCase().includes(searchTerm)) ||
            (item.description && item.description.toLowerCase().includes(searchTerm)) ||
            (item.created_by && item.created_by.name.toLowerCase().includes(searchTerm))
        );
        setActiveGroups(filteredCategories)
    };
    return (<>
        <Head title="Categories" />
        <Webmaster
            user={auth.user}
            menu={menu}
            breadcrumb={<li className="breadcrumb-item active" aria-current="page">Categories</li>}
        >
        <Page title="Categories" header={<></>}>
            <div className="grid grid-cols-12 gap-6 mt-8">
                <div className="col-span-12">
                    <div className="intro-y flex flex-col-reverse sm:flex-row items-center">
                        <div className="w-full sm:w-auto relative mr-auto mt-3 sm:mt-0">
                            <Search className="w-4 h-4 absolute my-auto inset-y-0 ml-3 left-0 z-10 text-slate-500"/>
                            <input type="text" className="form-control w-full sm:w-64 box px-10" placeholder="Search category" onChange={handleSearchChange}/>
                            <div className="inbox-filter dropdown absolute inset-y-0 mr-3 right-0 flex items-center" data-tw-placement="bottom-start">
                                <ChevronDown className="dropdown-toggle w-4 h-4 cursor-pointer text-slate-500" role="button" aria-expanded="false" data-tw-toggle="dropdown"/>
                            </div>
                        </div>
                        <div className="w-full sm:w-auto flex">
                        <Link href={route('categories.create')} className="btn btn-primary shadow-md mr-2">Create Group of Categories</Link>
                        </div>
                    </div>
                    <div className="intro-y overflow-auto">
                        <table className="table table-report -mt-2">
                            <thead>
                                <tr>
                                    <th className="whitespace-nowrap">#</th>
                                    <th className="whitespace-nowrap">Categories</th>
                                    <th className="whitespace-nowrap">Created</th>
                                    <th className="whitespace-nowrap">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {activeGroups && activeGroups.map((group, index) => (
                                <tr key={index} className="intro-x">
                                    <td>
                                        <div className="flex items-center">
                                            <Hash className="h-4 w-4 text-gray-500 mr-1" />
                                            <span className="text-sm text-gray-500">{group.id}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Captions className="h-4 w-4 text-gray-500 mr-1" />
                                            <span className="text-sm text-gray-500">{group.name}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <ScrollText className="h-4 w-4 text-gray-500 mr-1" />
                                            <span className="text-sm text-gray-500">
                                                {group.description && group.description.length > 10 
                                                    ? group.description.substring(0, 10) + '...' 
                                                    : group.description}
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        {group.categories.map((category, index)=>{ 
                                        if(index < 2){
                                            return (
                                                <div key={index} className="flex items-center">
                                                    <LayoutList className="h-4 w-4 text-gray-500 mr-1" />
                                                    {category.category}
                                                </div>)
                                            }else if(index==2){
                                                return (
                                                <div key={index} className="flex items-center">
                                                    <LayoutList className="h-4 w-4 text-gray-500 mr-1" />
                                                    {group.categories.length - 2} more categories
                                                </div>)
                                            }
                                            return null;
                                        })}
                                    </td>
                                    <td>
                                        <div className="flex items-center">
                                            <User className="h-4 w-4 text-gray-500 mr-1" />
                                            <span className="text-sm text-gray-500">{group.created_by.name}</span>
                                        </div>
                                        <div className="flex items-center mt-1">
                                            <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                                            <span className="text-sm text-gray-500">
                                                {new Date(group.created_at).toLocaleString('en-GB', {
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
                                    <td className="table-report__action w-56">
                                        <div className="flex justify-center items-center">
                                            <Link className="flex items-center mr-3" href={route('categories.edit', { group: group.id })}>
                                                <CheckSquare className="w-4 h-4 mr-1"/> Edit
                                            </Link>
                                            <Button className="flex items-center text-danger" onClick={(event) => handleDeleteGroupClick(event, group.id)}>
                                                <Trash2 className="w-4 h-4 mr-1" /> Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                    <DeleteModal showDeleteModal={showDeleteGroupModal} handleDeleteCancel={handleDeleteCancel} handleDeleteConfirm={handleDeleteGroup} deleting={isDeletingGroup}/>

                    <div className="p-5 flex flex-col sm:flex-row items-center text-center sm:text-left text-slate-500">
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

export default CategoriesIndex;