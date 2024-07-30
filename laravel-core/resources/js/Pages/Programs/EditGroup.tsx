
import React, {useEffect, useState, ChangeEvent} from 'react';
import { PageProps, ProgramsGroup } from '@/types';
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

const EditProgramsGroup: React.FC<PageProps<{ group: ProgramsGroup}>> = ({ auth, group, menu }) => {

    const programsGroupForm = useForm<GroupFormData>({
        name: group.name,
        description: group.description
    });
    const [editing, setEditing] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name in programsGroupForm.data) {
            programsGroupForm.setData(name as keyof GroupFormData, value);
        }
        console.log(programsGroupForm.data)
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setEditing(true);
        
        programsGroupForm.put(route('programs.groups.update', {group: group}), {
            onSuccess: () => {
                toast.success('Group of programs has been updated successfully');
                router.get(route('programs.index'));
            },
            onError: (error) => {
                toast.error('Error updating the group of programs');
                console.error('Error:', error);
            },
            onFinish: () => {
                setEditing(false);
            }
        });
    }
    

    return (<>
        <Head title="Edit a group of programs" />
        <Webmaster
            user={auth.user}
            menu={menu}
            breadcrumb={<>
                <li className="breadcrumb-item" aria-current="page"><Link href={route('programs.index')}>Programs</Link></li>
                <li className="breadcrumb-item" aria-current="page">Groups</li>
                <li className="breadcrumb-item" aria-current="page">{group.name}</li>
                <li className="breadcrumb-item active" aria-current="page">Edit</li>
            </>}
        >
        <Page title="Editing a group of programs" header={<></>}>
            <Grid title="Groups information">
                <CustomTextInput title="Name" value={programsGroupForm.data.name} name='name' description='Enter the name of the group' required={true} handleChange={handleChange} instructions='Minimum 5 caracters'/>
                <CustomTextarea title="Description" value={programsGroupForm.data.description} name='description' description='Enter the description of the group' required={false} handleChange={handleChange} instructions='Not required'/>
                <Button className="btn btn-primary" disabled={editing} onClick={handleSubmit}>{editing?"Editing":"Edit"}</Button>
            </Grid>
        </Page>

        </Webmaster>
    </>)
}
export default EditProgramsGroup;