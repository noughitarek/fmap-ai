
import React, {useEffect, useState, ChangeEvent} from 'react';
import { PageProps, Template, TemplatesGroup } from '@/types';
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

interface TemplateFormData {
    name: string;
    description: string;
    group_id: number;
    photos: File[];
    videos: File[];
    audios: File[];
    message: string;
}

const CreateTemplate: React.FC<PageProps<{groups: TemplatesGroup[]}>> = ({ auth, groups, menu }) => {
    const templateForm = useForm<TemplateFormData>({
        name: '',
        description: '',
        group_id: 0,
        photos: [],
        videos: [],
        audios: [],
        message: '',
    });
    const [creating, setCreating] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, type, value, files } = e.target as HTMLInputElement;
        if (type === 'file') {
            if(files){
                const newFiles = Array.from(files);
                if (name === 'photos') {
                    templateForm.setData('photos', newFiles);
                } else if (name === 'videos') {
                    templateForm.setData('videos', newFiles);
                } else if (name === 'audios') {
                    templateForm.setData('audios', newFiles);
                }
                console.log(templateForm.data);
            }
        } else {
            templateForm.setData(name as keyof TemplateFormData, value);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreating(true);
        
        templateForm.post(route('templates.store'), {
            forceFormData: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onSuccess: () => {
                toast.success('Template has been created successfully');
                router.get(route('templates.index'));
            },
            onError: (error) => {
                toast.error('Error creating the template');
                console.error('Error:', error);
            },
            onFinish: () => {
                setCreating(false);
            }
        });
    }
    const saveButton = (<Button className="btn btn-primary mt-4" disabled={creating} onClick={handleSubmit}>{creating?"Creating":"Create"}</Button>)
    return (<>
        <Head title="Create a template" />
        <Webmaster
            user={auth.user}
            menu={menu}
            breadcrumb={<>
                <li className="breadcrumb-item" aria-current="page"><Link href={route('templates.index')}>Templates</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Create</li>
            </>}
        >
        <Page title="Create a template" header={<></>}>
            <Grid title="Template's information" header={saveButton}>
                <CustomTextInput title="Name" value={templateForm.data.name} name='name' description='Enter the name of the template' required={true} handleChange={handleChange} instructions='Minimum 5 caracters'/>
                <CustomTextarea title="Description" value={templateForm.data.description} name='description' description='Enter the description of the template' required={false} handleChange={handleChange} instructions='Not required'/>
                <CustomSelect title="Templates group" elements={groups} value={templateForm.data.group_id} name='group_id' description='Enter the group you want to assing the template to' required={true} handleChange={handleChange} instructions='Required'/>
            </Grid>

            <Grid title="Template's elements">
                <CustomFileInput accept="image/*" title="Photos" name="photos" required={false} multiple={true} description="Enter the photos of the template" instructions="Not required" handleChange={handleChange}/>
                <CustomFileInput accept="video/*" title="Videos" name="videos" required={false} multiple={true} description="Enter the videos of the template" instructions="Not required" handleChange={handleChange}/>
                <CustomFileInput accept="audio/*" title="Audios" name="audios" required={false} multiple={true} description="Enter the audios of the template" instructions="Not required" handleChange={handleChange}/>
                <CustomTextarea value={templateForm.data.message} title="Message" name='message' description='Enter the message of the template' required={false} handleChange={handleChange} instructions='Not required'/>
                {saveButton}
            </Grid>
        </Page>

        </Webmaster>
    </>)
}

export default CreateTemplate;