
import React, {useEffect, useState, ChangeEvent} from 'react';
import { PageProps, AccountsGroup } from '@/types';
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

const EditAccountsGroup: React.FC<PageProps<{ group: AccountsGroup}>> = ({ auth, group, menu }) => {

    const accountsGroupForm = useForm<GroupFormData>({
        name: group.name,
        description: group.description
    });
    const [editing, setEditing] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name in accountsGroupForm.data) {
            accountsGroupForm.setData(name as keyof GroupFormData, value);
        }
        console.log(accountsGroupForm.data)
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setEditing(true);
        
        accountsGroupForm.put(route('accounts.groups.update', {group: group}), {
            onSuccess: () => {
                toast.success('Group of accounts has been updated successfully');
                router.get(route('accounts.index'));
            },
            onError: (error) => {
                toast.error('Error updating the group of accounts');
                console.error('Error:', error);
            },
            onFinish: () => {
                setEditing(false);
            }
        });
    }
    

    return (<>
        <Head title="Edit a group of accounts" />
        <Webmaster
            user={auth.user}
            menu={menu}
            breadcrumb={<>
                <li className="breadcrumb-item" aria-current="page"><Link href={route('accounts.index')}>Accounts</Link></li>
                <li className="breadcrumb-item" aria-current="page">Groups</li>
                <li className="breadcrumb-item" aria-current="page">{group.name}</li>
                <li className="breadcrumb-item active" aria-current="page">Edit</li>
            </>}
        >
        <Page title="Editing a group of accounts" header={<></>}>
            <Grid title="Groups information">
                <CustomTextInput title="Name" value={accountsGroupForm.data.name} name='name' description='Enter the name of the group' required={true} handleChange={handleChange} instructions='Minimum 5 caracters'/>
                <CustomTextarea title="Description" value={accountsGroupForm.data.description} name='description' description='Enter the description of the group' required={false} handleChange={handleChange} instructions='Not required'/>
                <Button className="btn btn-primary" disabled={editing} onClick={handleSubmit}>{editing?"Editing":"Edit"}</Button>
            </Grid>
        </Page>

        </Webmaster>
    </>)
}
export default EditAccountsGroup;