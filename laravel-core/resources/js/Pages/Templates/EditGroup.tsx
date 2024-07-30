
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

const EditTemplatesGroup: React.FC<PageProps<{ group: TemplatesGroup}>> = ({ auth, group, menu }) => {

    const templatesGroupForm = useForm<GroupFormData>({
        name: group.name,
        description: group.description
    });
    const [editing, setEditing] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name in templatesGroupForm.data) {
            templatesGroupForm.setData(name as keyof GroupFormData, value);
        }
        console.log(templatesGroupForm.data)
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setEditing(true);
        
        templatesGroupForm.put(route('templates.groups.update', {group: group}), {
            onSuccess: () => {
                toast.success('Group of templates has been updated successfully');
                router.get(route('templates.index'));
            },
            onError: (error) => {
                toast.error('Error updating the group of templates');
                console.error('Error:', error);
            },
            onFinish: () => {
                setEditing(false);
            }
        });
    }
    

    return (<>
        <Head title="Edit a group of templates" />
        <Webmaster
            user={auth.user}
            menu={menu}
            breadcrumb={<>
                <li className="breadcrumb-item" aria-current="page"><Link href={route('templates.index')}>Templates</Link></li>
                <li className="breadcrumb-item" aria-current="page">Groups</li>
                <li className="breadcrumb-item" aria-current="page">{group.name}</li>
                <li className="breadcrumb-item active" aria-current="page">Edit</li>
            </>}
        >
        <Page title="Editing a group of templates" header={<></>}>
            <Grid title="Groups information">
                <CustomTextInput title="Name" value={templatesGroupForm.data.name} name='name' description='Enter the name of the group' required={true} handleChange={handleChange} instructions='Minimum 5 caracters'/>
                <CustomTextarea title="Description" value={templatesGroupForm.data.description} name='description' description='Enter the description of the group' required={false} handleChange={handleChange} instructions='Not required'/>
                <Button className="btn btn-primary" disabled={editing} onClick={handleSubmit}>{editing?"Editing":"Edit"}</Button>
            </Grid>
        </Page>

        </Webmaster>
    </>)
}
export default EditTemplatesGroup;