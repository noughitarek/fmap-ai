
import React, {useEffect, useState, ChangeEvent} from 'react';
import { PageProps, Account, AccountsGroup } from '@/types';
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
import CustomCheckBox from '@/Base-components/Forms/CustomCheckbox';

interface AccountFormData {
    name: string;
    description: string;
    accounts_group_id: number;
    facebook_user_id: string;
    username: string;
    password: string;
}

const EditAccount: React.FC<PageProps<{groups: AccountsGroup[], account: Account}>> = ({ auth, groups, account, menu }) => {
    const accountForm = useForm<AccountFormData>({
        name: account.name,
        description: account.description || '',
        facebook_user_id: account.facebook_user_id || '',
        accounts_group_id: account.accounts_group.id || 0,
        username: account.username || '',
        password: account.password || '',
    });
    const [editing, setEditing] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target as HTMLInputElement;
        accountForm.setData(name as keyof AccountFormData, value);
        console.log(accountForm.data)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setEditing(true);

        accountForm.post(route('accounts.update', { account: account.id}), {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onSuccess: () => {
                toast.success('Account has been edited successfully');
                router.get(route('accounts.index'));
            },
            onError: (error) => {
                toast.error('Error editing the account');
                console.error('Error:', error);
            },
            onFinish: () => {
                setEditing(false);
            }
        });
    }
    const saveButton = (<Button className="btn btn-primary mt-4" disabled={editing} onClick={handleSubmit}>{ editing ? "Editing" : "Edit" }</Button>)
    return (<>
        <Head title="Edit a account" />
        <Webmaster
            user={auth.user}
            menu={menu}
            breadcrumb={<>
                <li className="breadcrumb-item" aria-current="page"><Link href={route('accounts.index')}>Accounts</Link></li>
                <li className="breadcrumb-item" aria-current="page">{account.accounts_group.name}</li>
                <li className="breadcrumb-item" aria-current="page">{account.name}</li>
                <li className="breadcrumb-item active" aria-current="page">Edit</li>
            </>}
        >
        <Page title="Edit a account" header={<></>}>
            <Grid title="Account's information" header={saveButton}>
                <CustomTextInput title="Name" value={accountForm.data.name} name='name' description='Enter the name of the account' required={true} handleChange={handleChange} instructions='Minimum 5 caracters'/>
                <CustomTextarea title="Description" value={accountForm.data.description} name='description' description='Enter the description of the account' required={false} handleChange={handleChange} instructions='Not required'/>
                <CustomSelect title="Accounts group" elements={groups} value={accountForm.data.accounts_group_id} name='accounts_group_id' description='Enter the group you want to assing the account to' required={true} handleChange={handleChange} instructions='Required'/>
            </Grid>

            <Grid title="Account credentials">
                <CustomTextInput title="ID" value={accountForm.data.facebook_user_id} name='facebook_user_id' description='Enter the id of the account' required={true} handleChange={handleChange} instructions='Minimum 5 caracters'/>
                <CustomTextInput title="Username" value={accountForm.data.username} name='username' description='Enter the username of the account' required={true} handleChange={handleChange} instructions='Minimum 5 caracters'/>
                <CustomTextInput title="Password" value={accountForm.data.password} name='password' description='Enter the password of the account' required={true} handleChange={handleChange} instructions='Minimum 5 caracters'/>
                {saveButton}
            </Grid>
        </Page>

        </Webmaster>
    </>)
}

export default EditAccount;