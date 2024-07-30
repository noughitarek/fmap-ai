
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

const EditRemarketingsCategory: React.FC<PageProps<{ category: RemarketingsCategory}>> = ({ auth, category, menu }) => {
    const remarketing = useForm<CategoryFormData>({
        name: category.name,
        description: category.description
    });
    const [editing, setEditing] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name in remarketing.data) {
            remarketing.setData(name as keyof CategoryFormData, value);
        }
        console.log(remarketing.data)
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setEditing(true);
        
        remarketing.put(route('remarketings.categories.update', {category: category}), {
            onSuccess: () => {
                toast.success('Category of remarketings has been updated successfully');
                router.get(route('remarketings.index'));
            },
            onError: (error) => {
                toast.error('Error updating the category of remarketings');
                console.error('Error:', error);
            },
            onFinish: () => {
                setEditing(false);
            }
        });
    }
    

    return (<>
        <Head title="Edit a category of remarketings" />
        <Webmaster
            user={auth.user}
            menu={menu}
            breadcrumb={<>
                <li className="breadcrumb-item" aria-current="page"><Link href={route('remarketings.index')}>Remarketings</Link></li>
                <li className="breadcrumb-item" aria-current="page">categories</li>
                <li className="breadcrumb-item" aria-current="page">{category.name}</li>
                <li className="breadcrumb-item active" aria-current="page">Edit</li>
            </>}
        >
        <Page title="Editing a category of remarketings" header={<></>}>
            <Grid title="categories information">
                <CustomTextInput title="Name" value={remarketing.data.name} name='name' description='Enter the name of the category' required={true} handleChange={handleChange} instructions='Minimum 5 caracters'/>
                <CustomTextarea title="Description" value={remarketing.data.description} name='description' description='Enter the description of the category' required={false} handleChange={handleChange} instructions='Not required'/>
                <Button className="btn btn-primary" disabled={editing} onClick={handleSubmit}>{editing?"Editing":"Edit"}</Button>
            </Grid>
        </Page>

        </Webmaster>
    </>)
}
export default EditRemarketingsCategory;