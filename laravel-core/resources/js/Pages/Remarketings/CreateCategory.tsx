
import React, {useEffect, useState, ChangeEvent} from 'react';
import { PageProps, RemarketingsCategory } from '@/types';
import { Head, Link } from '@inertiajs/react';
import Page from '@/Base-components/Page';
import Webmaster from '@/Layouts/Webmaster';
import { Button } from '@headlessui/react';
import Grid from '@/Base-components/Grid';
import { toast } from 'react-toastify';
import { router, useForm } from '@inertiajs/react'
import CustomTextInput from '@/Base-components/Forms/CustomTextInput';
import CustomTextarea from '@/Base-components/Forms/CustomTextarea';

interface CategoryFormData {
    name: string;
    description: string;
}

const CreateRemarketingsCategory: React.FC<PageProps> = ({ auth, menu }) => {

    const remarketingsCategoryForm = useForm<CategoryFormData>({
        name: '',
        description: ''
    });
    const [creating, setCreating] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name in remarketingsCategoryForm.data) {
            remarketingsCategoryForm.setData(name as keyof CategoryFormData, value);
        }
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreating(true);
        
        remarketingsCategoryForm.post(route('remarketings.categories.store'), {
            onSuccess: () => {
                toast.success('Category of remarketings has been created successfully');
                router.get(route('remarketings.index'));
            },
            onError: (error) => {
                toast.error('Error creating the category of remarketings');
                console.error('Error:', error);
            },
            onFinish: () => {
                setCreating(false);
            }
        });
    }
    

    return (<>
        <Head title="Create a category of remarketings" />
        <Webmaster
            user={auth.user}
            menu={menu}
            breadcrumb={<>
                <li className="breadcrumb-item" aria-current="page"><Link href={route('remarketings.index')}>Remarketings</Link></li>
                <li className="breadcrumb-item" aria-current="page">Categories</li>
                <li className="breadcrumb-item active" aria-current="page">Create</li>
            </>}
        >
        <Page title="Create a category of remarketings" header={<></>}>
            <Grid title="Categories information">
                <CustomTextInput title="Name" value={remarketingsCategoryForm.data.name} name='name' description='Enter the name of the category' required={true} handleChange={handleChange} instructions='Minimum 5 caracters'/>
                <CustomTextarea title="Description" value={remarketingsCategoryForm.data.description} name='description' description='Enter the description of the category' required={false} handleChange={handleChange} instructions='Not required'/>
                <Button className="btn btn-primary" disabled={creating} onClick={handleSubmit}>{creating?"Creating":"Create"}</Button>
            </Grid>
        </Page>

        </Webmaster>
    </>)
}
export default CreateRemarketingsCategory;