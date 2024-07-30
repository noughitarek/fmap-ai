
import React, {useEffect, useState, ChangeEvent} from 'react';
import { Page as PageType, PageProps, ProgramsGroup, Remarketing, TemplatesGroup, RemarketingsCategory } from '@/types';
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

interface GroupFormData {
    name: string;
    description: string;
    category: number;
    programs_group_id: number;
    templates_group_id: number;
    facebook_page_id: number;
}

const EditRemarketingsGroup: React.FC<PageProps<{programsGroup: ProgramsGroup[], categories: RemarketingsCategory[], templatesGroup: TemplatesGroup[], pages: PageType[], remarketing: Remarketing}>> = ({ auth, categories, remarketing, programsGroup, templatesGroup, pages, menu }) => {

    const remarketingsGroupForm = useForm<GroupFormData>({
        name: remarketing.name,
        description: remarketing.description,
        category: remarketing.category.id,
        programs_group_id: remarketing.programs_group.id,
        templates_group_id: remarketing.templates_group.id,
        facebook_page_id: remarketing.facebook_page.id
    });
    const [editing, setEditing] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name in remarketingsGroupForm.data) {
            remarketingsGroupForm.setData(name as keyof GroupFormData, value);
        }
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setEditing(true);
        
        remarketingsGroupForm.post(route('remarketings.update', {remarketing: remarketing}), {
            onSuccess: () => {
                toast.success('Remarketing has been updated successfully');
                router.get(route('remarketings.index'));
            },
            onError: (error) => {
                toast.error('Error updating the remarketing');
                console.error('Error:', error);
            },
            onFinish: () => {
                setEditing(false);
            }
        });
    }
    
    const editButton = (<Button className="btn btn-primary" disabled={editing} onClick={handleSubmit}>{editing?"Editing":"Edit"}</Button>);
    return (<>
        <Head title="Edit a remarketing" />
        <Webmaster
            user={auth.user}
            menu={menu}
            breadcrumb={<>
                <li className="breadcrumb-item" aria-current="page"><Link href={route('remarketings.index')}>Remarketings</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Edit</li>
            </>}
        >
        <Page title="Edit a remarketing" header={<></>}>
            <Grid title="Remarketing information" header={<>{editButton}</>}>
                <CustomTextInput title="Name" value={remarketingsGroupForm.data.name} name='name' description='Enter the name of the remarketing' required={true} handleChange={handleChange} instructions='Minimum 5 caracters'/>
                <CustomSelect title="Category" value={remarketingsGroupForm.data.category} elements={categories} name='category' description='Enter the category you want to affect the remarketing to' required={true} handleChange={handleChange} instructions='Required'/>                
                <CustomTextarea title="Description" value={remarketingsGroupForm.data.description} name='description' description='Enter the description of the remarketing' required={false} handleChange={handleChange} instructions='Not required'/>
            </Grid>
            <Grid title="Remarketing details">
                <CustomSelect title="Programs group" value={remarketingsGroupForm.data.programs_group_id} elements={programsGroup} name='programs_group_id' description='Enter the group of programs you want to use' required={true} handleChange={handleChange} instructions='Required'/>
                <CustomSelect title="Templates group" value={remarketingsGroupForm.data.templates_group_id} elements={templatesGroup} name='templates_group_id' description='Enter the group of templates you want to use' required={true} handleChange={handleChange} instructions='Required'/>
                <CustomSelect title="Page" value={remarketingsGroupForm.data.facebook_page_id} elements={pages} name='facebook_page_id' description='Enter the page you want to use' required={true} handleChange={handleChange} instructions='Required'/>
                {editButton}
            </Grid>
        </Page>

        </Webmaster>
    </>)
}
export default EditRemarketingsGroup;