
import React, {useEffect, useState, ChangeEvent} from 'react';
import { PageProps, PostingsCategory } from '@/types';
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

const EditPostingsCategory: React.FC<PageProps<{ category: PostingsCategory}>> = ({ auth, category, menu }) => {

    const postingsCategoryForm = useForm<CategoryFormData>({
        name: category.name,
        description: category.description
    });
    const [editing, setEditing] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name in postingsCategoryForm.data) {
            postingsCategoryForm.setData(name as keyof CategoryFormData, value);
        }
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setEditing(true);
        
        postingsCategoryForm.put(route('postings.categories.update', {category: category}), {
            onSuccess: () => {
                toast.success('Category of postings has been updated successfully');
                router.get(route('postings.index'));
            },
            onError: (error) => {
                toast.error('Error updating the category of postings');
                console.error('Error:', error);
            },
            onFinish: () => {
                setEditing(false);
            }
        });
    }
    

    return (<>
        <Head title="Edit a category of postings" />
        <Webmaster
            user={auth.user}
            menu={menu}
            breadcrumb={<>
                <li className="breadcrumb-item" aria-current="page"><Link href={route('postings.index')}>Postings</Link></li>
                <li className="breadcrumb-item" aria-current="page">Categories</li>
                <li className="breadcrumb-item" aria-current="page">{category.name}</li>
                <li className="breadcrumb-item active" aria-current="page">Edit</li>
            </>}
        >
        <Page title="Editing a category of postings" header={<></>}>
            <Grid title="Categories information">
                <CustomTextInput title="Name" value={postingsCategoryForm.data.name} name='name' description='Enter the name of the category' required={true} handleChange={handleChange} instructions='Minimum 5 caracters'/>
                <CustomTextarea title="Description" value={postingsCategoryForm.data.description} name='description' description='Enter the description of the category' required={false} handleChange={handleChange} instructions='Not required'/>
                <Button className="btn btn-primary" disabled={editing} onClick={handleSubmit}>{editing?"Editing":"Edit"}</Button>
            </Grid>
        </Page>

        </Webmaster>
    </>)
}
export default EditPostingsCategory;