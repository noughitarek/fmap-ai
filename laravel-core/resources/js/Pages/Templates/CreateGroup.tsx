
import React, {useEffect, useState, ChangeEvent} from 'react';
import { PageProps, TemplatesGroup } from '@/types';
import { Head, Link } from '@inertiajs/react';
import Page from '@/Base-components/Page';
import Webmaster from '@/Layouts/Webmaster';
import { Button } from '@headlessui/react';
import Grid from '@/Base-components/Grid';
import { toast } from 'react-toastify';
import { router, useForm } from '@inertiajs/react'
import CustomTextInput from '@/Base-components/Forms/CustomTextInput';
import CustomTextarea from '@/Base-components/Forms/CustomTextarea';

interface GroupFormData {
    name: string;
    description: string;
}

const CreateTemplatesGroup: React.FC<PageProps> = ({ auth, menu }) => {

    const templatesGroupForm = useForm<GroupFormData>({
        name: '',
        description: ''
    });
    const [creating, setCreating] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name in templatesGroupForm.data) {
            templatesGroupForm.setData(name as keyof GroupFormData, value);
        }
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreating(true);
        
        templatesGroupForm.post(route('templates.groups.store'), {
            onSuccess: () => {
                toast.success('Group of templates has been created successfully');
                router.get(route('templates.index'));
            },
            onError: (error) => {
                toast.error('Error creating the group of templates');
                console.error('Error:', error);
            },
            onFinish: () => {
                setCreating(false);
            }
        });
    }
    

    return (<>
        <Head title="Create a group of templates" />
        <Webmaster
            user={auth.user}
            menu={menu}
            breadcrumb={<>
                <li className="breadcrumb-item" aria-current="page"><Link href={route('templates.index')}>Templates</Link></li>
                <li className="breadcrumb-item" aria-current="page">Groups</li>
                <li className="breadcrumb-item active" aria-current="page">Create</li>
            </>}
        >
        <Page title="Create a group of templates" header={<></>}>
            <Grid title="Groups information">
                <CustomTextInput title="Name" value={templatesGroupForm.data.name} name='name' description='Enter the name of the group' required={true} handleChange={handleChange} instructions='Minimum 5 caracters'/>
                <CustomTextarea title="Description" value={templatesGroupForm.data.description} name='description' description='Enter the description of the group' required={false} handleChange={handleChange} instructions='Not required'/>
                <Button className="btn btn-primary" disabled={creating} onClick={handleSubmit}>{creating?"Creating":"Create"}</Button>
            </Grid>
        </Page>

        </Webmaster>
    </>)
}
export default CreateTemplatesGroup;