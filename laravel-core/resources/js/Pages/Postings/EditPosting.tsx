
import React, {useEffect, useState, ChangeEvent} from 'react';
import { AccountsGroup, DescriptionsGroup, PageProps, PhotosGroup, Posting, PostingsCategory, PostingsPrices, TitlesGroup } from '@/types';
import { Head, Link } from '@inertiajs/react';
import Page from '@/Base-components/Page';
import Webmaster from '@/Layouts/Webmaster';
import { Button } from '@headlessui/react';
import Grid from '@/Base-components/Grid';
import { toast } from 'react-toastify';
import { router, useForm } from '@inertiajs/react'
import CustomTextInput from '@/Base-components/Forms/CustomTextInput';
import CustomTextarea from '@/Base-components/Forms/CustomTextarea';
import CustomSelect from '@/Base-components/Forms/CustomSelect';
import CustomFileInput from '@/Base-components/Forms/CustomFileInput';

interface PostingFormData {
    name: string;
    description: string;
    postings_category_id: number;
    accounts_group_id: number;
    titles_group_id: number;
    photos_group_id: number;
    descriptions_group_id?: number;
    posting_prices: number[];
}

const EditPosting: React.FC<PageProps<{
    posting: Posting;
    categories: PostingsCategory[],
    accounts: AccountsGroup[],
    titles: TitlesGroup[],
    photos: PhotosGroup[],
    descriptions: DescriptionsGroup[],
}>> = ({ auth, posting, accounts, categories, titles, photos, descriptions, menu }) => {
    const postingForm = useForm<PostingFormData>({
        name: posting.name,
        description: posting.description,
        postings_category_id: posting.postings_category_id,
        accounts_group_id: posting.accounts_group_id,
        titles_group_id: posting.titles_group_id,
        photos_group_id: posting.photos_group_id,
        descriptions_group_id: posting.descriptions_group_id,
        posting_prices: posting.posting_prices_numbers,
    });
    const [editing, setEditing] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target as HTMLInputElement;
        postingForm.setData(name as keyof PostingFormData, value);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setEditing(true);
        
        postingForm.post(route('postings.update', {posting: posting.id}), {
            forceFormData: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onSuccess: () => {
                toast.success('Posting has been updated successfully');
                router.get(route('postings.index'));
            },
            onError: (error) => {
                toast.error('Error updating the posting');
                console.error('Error:', error);
            },
            onFinish: () => {
                setEditing(false);
            }
        });
    }
    const morePrices: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        postingForm.setData(prevData => ({
            ...prevData,
            posting_prices: [...prevData.posting_prices, 0]
        }));
    }
    const removePrices = (index: number) => {
        postingForm.setData(prevData => ({
            ...prevData,
            posting_prices: prevData.posting_prices.filter((_, i) => i !== index),
        }));
    };
    const handlePriceChange = (index: number, value: number) => {
        const updatedPrices = [...postingForm.data.posting_prices];
        updatedPrices[index] = value;
        postingForm.setData('posting_prices', updatedPrices);
    };
    const moreButton = (<Button className="btn btn-primary" onClick={morePrices}>More</Button>)
    const saveButton = (<Button className="btn btn-primary mt-4" disabled={editing} onClick={handleSubmit}>{editing?"Editing":"Edit"}</Button>)
    return (<>
        <Head title="Edit a posting" />
        <Webmaster
            user={auth.user}
            menu={menu}
            breadcrumb={<>
                <li className="breadcrumb-item" aria-current="page"><Link href={route('postings.index')}>Postings</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Edit</li>
            </>}
        >
        <Page title="Edit a posting" header={<></>}>
            <Grid title="Posting's information" header={saveButton}>
                <CustomTextInput title="Name" value={postingForm.data.name} name='name' description='Enter the name of the account' required={true} handleChange={handleChange} instructions='Minimum 5 caracters'/>
                <CustomTextarea title="Description" value={postingForm.data.description} name='description' description='Enter the description of the account' required={false} handleChange={handleChange} instructions='Not required'/>
                <CustomSelect title="Postings category" elements={categories} value={postingForm.data.postings_category_id} name='postings_category_id' description='Enter the category you want to assing the account to' required={true} handleChange={handleChange} instructions='Required'/>
            </Grid>

            <Grid title="Posting assets">
                <CustomSelect title="Accounts group" elements={accounts} value={postingForm.data.accounts_group_id} name='accounts_group_id' description='Enter the group of accounts you want to use' required={true} handleChange={handleChange} instructions='Required'/>
                <CustomSelect title="Titles group" elements={titles} value={postingForm.data.titles_group_id} name='titles_group_id' description='Enter the group of titles you want to use' required={true} handleChange={handleChange} instructions='Required'/>
                <CustomSelect title="Photos group" elements={photos} value={postingForm.data.photos_group_id} name='photos_group_id' description='Enter the group of photos you want to use' required={true} handleChange={handleChange} instructions='Required'/>
                <CustomSelect title="Descriptions group" elements={descriptions} value={postingForm.data.descriptions_group_id} name='descriptions_group_id' description='Enter the group of descriptions you want to use' required={false} handleChange={handleChange} instructions='Not required'/>
            </Grid>
            <Grid title="Posting prices" header={moreButton}>
                {postingForm.data.posting_prices.map((price, index)=>(
                <div key={index} className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0 pb-4">
                    <div className="form-label xl:w-64 xl:!mr-10">
                        <div className="text-left">
                            <div className="flex items-center">
                                <div className="font-medium">Price {index + 1}</div>
                                <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                    Required
                                </div>
                            </div>
                            <div className="leading-relaxed text-slate-500 text-xs mt-3">
                                price
                            </div>
                        </div>
                    </div>
                    <div className="w-full mt-3 xl:mt-0 flex-1">
                        <div className="w-full mt-3 xl:mt-2 flex-1">
                            <input
                                type="number"
                                value={price}
                                required
                                onChange={(e) => handlePriceChange(index, Number(e.target.value))}
                                className="form-control"
                            />
                            <div className="form-help text-right mt-2">Price</div>
                        </div>
                    </div>
                    <div className="mt-3 xl:mt-0 ms-2">
                        <Button className='btn btn-primary' onClick={() => removePrices(index)}>-</Button>
                    </div>
                </div>
                ))}
                {moreButton}
            </Grid><br/>
            {saveButton}
        </Page>

        </Webmaster>
    </>)
}

export default EditPosting;