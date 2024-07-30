
import React, {useEffect, useState} from 'react';
import { PageProps, RemarketingsCategory, Remarketing } from '@/types';
import Page from '@/Base-components/Page';
import Webmaster from '@/Layouts/Webmaster';
import { Blocks, Calendar, CheckSquare, ChevronDown, Contact, Edit2, Film, Hash, Headphones, Image, Layers, LayoutPanelTop, MessageSquare, MessageSquareText, ScrollText, Search, Trash, Trash2, User, XSquare } from 'lucide-react';
import { Button } from '@headlessui/react';
import DeleteModal from '@/Components/DeleteModal';
import { Head, Link, router, useForm } from '@inertiajs/react';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';

const RemarketingsIndex: React.FC<PageProps<{ categories: RemarketingsCategory[], from:number, to:number, total:number }>> = ({ auth, categories, from, to, total, menu }) => {
    const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);
    const [isDeletingCategory, setIsDeletingCategory] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    const [showDeleteRemarketingModal, setShowDeleteRemarketingModal] = useState(false);
    const [isDeletingRemarketing, setIsDeletingRemarketing] = useState(false);

    const remarketingForm = useForm<{ remarketing: number }>({ remarketing: 0 });
    const categoryForm = useForm<{ category: number }>({ category: 0 });

    const [activeCategory, setActiveCategory] = useState<RemarketingsCategory | null>(categories.length > 0 ? categories[0] : null);
    const [activeRemarketings, setActiveRemarketings] = useState<Remarketing[]>(categories.length > 0 ? categories[0].remarketings : []);

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
    
    const mostRecentActivity = activeRemarketings.length > 0
    ? activeRemarketings.reduce((latest, remarketing) => 
        new Date(remarketing.updated_at).getTime() > new Date(latest.updated_at).getTime() ? remarketing : latest
    ) 
    : null;

    const lastActivityBy = mostRecentActivity ? mostRecentActivity.updated_by.name : "";
    const lastActivityAt = mostRecentActivity ? formatTimeDifference(new Date(mostRecentActivity.updated_at).getTime()): "";


    const handleDeleteRemarketing = async () => {
        setIsDeletingRemarketing(true);
        try {
            await remarketingForm.delete(route('remarketings.destroy', { id: remarketingForm.data.remarketing }));
            toast.success('Remarketing has been deleted successfully');
            router.get(route('remarketings.index'));
        } catch(error) {
            toast.error('Error deleting the remarketing');
            console.error('Error details:', error);
        } finally {
            setIsDeletingRemarketing(false);
            setShowDeleteRemarketingModal(false);
        }
    };
    const handleDeleteCategory = async () => {
        setIsDeletingCategory(true);
        try {
            await categoryForm.delete(route('remarketings.categories.destroy', { id: categoryForm.data.category }));
            toast.success('Category of remarketings has been deleted successfully');
            router.get(route('remarketings.index'));
        } catch(error) {
            toast.error('Error deleting the category of remarketings');
            console.error('Error details:', error);
        } finally {
            setIsDeletingCategory(false);
            setShowDeleteCategoryModal(false);
        }
    };

    const handleDeleteCategoryClick = (event: React.MouseEvent<HTMLButtonElement>, category: number) => {
        event.preventDefault();
        categoryForm.setData({ category: category });
        setShowDeleteCategoryModal(true);
    };

    const handleDeleteRemarketingClick = (event: React.MouseEvent<HTMLButtonElement>, remarketing: number) => {
        event.preventDefault();
        remarketingForm.setData({ remarketing: remarketing });
        setShowDeleteRemarketingModal(true);
    };

    const handleDeleteCancel = () => {
        setShowDeleteCategoryModal(false);
        setShowDeleteRemarketingModal(false);
    };

    useEffect(()=>{
        setActiveRemarketings(activeCategory ? activeCategory.remarketings: [])
    }, [activeCategory])

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsSearching(event.target.value != "")
        const remarketingsToFilter = activeCategory ? activeCategory.remarketings : [];
        const searchTerm = event.target.value.toLowerCase();
        const filteredRemarketings = remarketingsToFilter.filter(item => 
            (item.name && item.name.toLowerCase().includes(searchTerm)) ||
            (item.description && item.description.toLowerCase().includes(searchTerm)) ||
            (item.created_by && item.created_by.name.toLowerCase().includes(searchTerm))
        );
        setActiveRemarketings(filteredRemarketings)
    };

    const toggleRemarketingStatus = async (event: React.MouseEvent<HTMLDivElement>, remarketingId: number)  => {
        event.preventDefault();
        
        try {
            await remarketingForm.post(route('remarketings.toggle.status', { remarketing: remarketingId }));
            toast.success('Remarketing has been toggled successfully');
            router.get(route('remarketings.index'));
        } catch(error) {
            toast.error('Error toggling the remarketing');
            console.error('Error details:', error);
        }
    }
    return (<>
        <Head title="Remarketings" />
        <Webmaster
            user={auth.user}
            menu={menu}
            breadcrumb={<li className="breadcrumb-item active" aria-current="page">Remarketings</li>}
        >
        <Page title="Remarketings" header={<></>}>
            <div className="grid grid-cols-12 gap-6 mt-8">
                <div className="col-span-12 lg:col-span-3 2xl:col-span-2">
                    <h2 className="intro-y text-lg font-medium mr-auto mt-2">Categories</h2>
                    <div className="intro-y box bg-primary p-5 mt-6">
                        <Link href={route('remarketings.categories.create')} type="button" className="btn text-slate-600 dark:text-slate-300 w-full bg-white dark:bg-darkmode-300 dark:border-darkmode-300 mt-1">
                            <Blocks className="w-4 h-4 mr-2" /> Create a category
                        </Link>
                        { activeCategory && (
                            <Link href={route('remarketings.categories.edit', activeCategory.id)} className="btn text-slate-600 dark:text-slate-300 w-full bg-white dark:bg-darkmode-300 dark:border-darkmode-300 mt-1">
                                <Edit2 className="w-4 h-4 mr-2 text-danger" /> Edit the category
                            </Link>
                        )}
                        { activeCategory && (
                        <Button 
                          onClick={(event) => handleDeleteCategoryClick(event, activeCategory.id)}
                          disabled={isDeletingCategory} 
                          className="btn text-slate-600 dark:text-slate-300 w-full dark:bg-darkmode-300 dark:border-darkmode-300 mt-1 bg-white"
                        >
                          {isDeletingCategory ? (
                            <div className="flex items-center">
                              <ReactLoading type="spin" color="#ff" height={24} width={24} />
                              <span className="ml-2">Deleting...</span>
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <Trash className="w-4 h-4 mr-2 text-red-500" />
                              <span>Delete the category</span>
                            </div>
                          )}
                        </Button>
                        )}
                        <div className="border-t border-white/10 dark:border-darkmode-400 mt-6 pt-6 text-white">
                            {categories.map(category=>{
                                const isActive = activeCategory && category.id === activeCategory.id;
                                return (
                                    <Button
                                        key={category.name}
                                        onClick={() => setActiveCategory(category)}
                                        className={`flex items-center px-3 py-2 rounded-md mt-2 ${isActive ? 'bg-white/10 dark:bg-darkmode-700 font-medium' : ''}`}
                                    >
                                        <Blocks className='w-4 h-4 mr-2' />
                                        {category.name}
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
                            <input type="text" className="form-control w-full sm:w-64 box px-10" placeholder="Search remarketing" onChange={handleSearchChange}/>
                            <div className="inbox-filter dropdown absolute inset-y-0 mr-3 right-0 flex items-center" data-tw-placement="bottom-start">
                                <ChevronDown className="dropdown-toggle w-4 h-4 cursor-pointer text-slate-500" role="button" aria-expanded="false" data-tw-toggle="dropdown"/>
                            </div>
                        </div>
                        <div className="w-full sm:w-auto flex">
                        <Link href={route('remarketings.create')} className="btn btn-primary shadow-md mr-2">Create a Remarketing</Link>
                        </div>
                    </div>
                    <div className="intro-y overflow-auto">
                        <table className="table table-report -mt-2">
                            <thead>
                                <tr>
                                    <th className="whitespace-nowrap">#</th>
                                    <th className="whitespace-nowrap">Remarketing</th>
                                    <th className="whitespace-nowrap">Created</th>
                                    <th className="whitespace-nowrap">Rates</th>
                                    <th className="whitespace-nowrap">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {activeRemarketings && activeRemarketings.map((remarketing, index) => (
                                <tr key={index} className="intro-x">
                                    <td>
                                        <div className="flex items-center">
                                            <Hash className="h-4 w-4 text-gray-500 mr-1" />
                                            <span className="text-sm text-gray-500">{remarketing.id}</span>
                                        </div>
                                        <div className="flex items-center mt-1">
                                            <Contact className="h-4 w-4 text-gray-500 mr-2" />
                                            <span className="text-sm text-gray-500">{remarketing.category.name}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center">
                                            <LayoutPanelTop className="h-4 w-4 text-gray-500 mr-1" />
                                            <span className="text-sm text-gray-500">{remarketing.name}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <ScrollText className="h-4 w-4 text-gray-500 mr-1" />
                                            <span className="text-sm text-gray-500">
                                                {remarketing.description && remarketing.description.length > 10 
                                                    ? remarketing.description.substring(0, 10) + '...' 
                                                    : remarketing.description}
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center">
                                            <User className="h-4 w-4 text-gray-500 mr-1" />
                                            <span className="text-sm text-gray-500">{remarketing.created_by.name}</span>
                                        </div>
                                        <div className="flex items-center mt-1">
                                            <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                                            <span className="text-sm text-gray-500">
                                                {new Date(remarketing.created_at).toLocaleString('en-GB', {
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
                                    <td className="w-40">
                                    { !remarketing.is_active ? (
                                        <div className="flex items-center justify-center text-danger" onClick={(event)=>toggleRemarketingStatus(event, remarketing.id)}>
                                            <XSquare className="w-4 h-4 mr-2" /> Inactive
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center text-success" onClick={(event)=>toggleRemarketingStatus(event, remarketing.id)}>
                                            <CheckSquare className="w-4 h-4 mr-2" /> Active
                                        </div>
                                    )}
                                    </td>
                                    <td className="table-report__action w-56">
                                        <div className="flex justify-center items-center">
                                            <Link className="flex items-center mr-3" href={route('remarketings.edit', { remarketing: remarketing.id })}>
                                                <CheckSquare className="w-4 h-4 mr-1"/> Edit
                                            </Link>
                                            <Button className="flex items-center text-danger" onClick={(event) => handleDeleteRemarketingClick(event, remarketing.id)}>
                                                <Trash2 className="w-4 h-4 mr-1" /> Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                    <DeleteModal showDeleteModal={showDeleteRemarketingModal} handleDeleteCancel={handleDeleteCancel} handleDeleteConfirm={handleDeleteRemarketing} deleting={isDeletingRemarketing}/>
                    <DeleteModal showDeleteModal={showDeleteCategoryModal} handleDeleteCancel={handleDeleteCancel} handleDeleteConfirm={handleDeleteCategory} deleting={isDeletingCategory}/>

                    <div className="p-5 flex flex-col sm:flex-row items-center text-center sm:text-left text-slate-500">
                        {!activeCategory && (<div>No category !</div>)}
                        {activeCategory && activeRemarketings.length>0 && (<div>{activeRemarketings?.length} of {activeRemarketings?.length} in {activeCategory?.name}</div>)}
                        {activeCategory && activeRemarketings.length<=0 && !isSearching && (<div>No remarketings in {activeCategory?.name} !</div>)}
                        {activeCategory && activeRemarketings.length<=0 && isSearching && (<div>No results has been found in {activeCategory?.name} !</div>)}
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

export default RemarketingsIndex;