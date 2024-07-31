import { PageProps } from "@/types";
import Webmaster from '@/Layouts/Webmaster';
import { Head, Link, useForm, router } from "@inertiajs/react";
import Page from "@/Base-components/Page";
import { Button } from "@headlessui/react";
import Grid from "@/Base-components/Grid";
import { toast } from 'react-toastify';
import { useState } from "react";
import CustomTextarea from "@/Base-components/Forms/CustomTextarea";
import CustomTextInput from "@/Base-components/Forms/CustomTextInput";

interface DescriptionsGroupForm{
    name: string;
    description: string;
    descriptions: string[];
}

const CreateDescription: React.FC<PageProps> = ({auth, menu}) => {
    const [creating, setCreating] = useState(false)
    const descriptionsGroupForm = useForm<DescriptionsGroupForm>({
        name: '',
        description: '',
        descriptions: [],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target as HTMLInputElement;
        descriptionsGroupForm.setData(name as keyof DescriptionsGroupForm, value);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreating(true);
        descriptionsGroupForm.post(route('descriptions.store'), {
            onSuccess: () => {
                toast.success('Group of descriptions has been created successfully');
                router.get(route('descriptions.index'));
            },
            onError: (error) => {
                toast.error('Error creating the group of descriptions');
                console.error('Error:', error);
            },
            onFinish: () => {
                setCreating(false);
            }
        });
    }
    const moreDescriptions: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        descriptionsGroupForm.setData(prevData => ({
            ...prevData,
            descriptions: [...prevData.descriptions, ""]
        }));
    }
    const removeDescriptions = (index: number) => {
        descriptionsGroupForm.setData(prevData => ({
            ...prevData,
            descriptions: prevData.descriptions.filter((_, i) => i !== index),
        }));
    };
    const handleDescriptionChange = (index: number, value: string) => {
        const updatedDescriptions = [...descriptionsGroupForm.data.descriptions];
        updatedDescriptions[index] = value;
        descriptionsGroupForm.setData('descriptions', updatedDescriptions);
    };
    const moreButton = (<Button className="btn btn-primary" onClick={moreDescriptions}>More</Button>)
    const saveButton = <Button className="btn btn-primary" disabled={creating} onClick={handleSubmit}>{creating?"Creating":"Create"}</Button>
    return (<>
        <Head title="Create a group of descriptions" />
        <Webmaster
            user={auth.user}
            menu={menu}
            breadcrumb={<>
                <li className="breadcrumb-item" aria-current="page"><Link href={route('descriptions.index')}>Descriptions</Link></li>
                <li className="breadcrumb-item" aria-current="page">Groups</li>
                <li className="breadcrumb-item active" aria-current="page">Create</li>
            </>}
        >
        <Page title="Create a group of descriptions" header={<></>}>
            <Grid title="Groups information">
                <CustomTextInput title="Name" value={descriptionsGroupForm.data.name} name='name' description='Enter the name of the group' required={true} handleChange={handleChange} instructions='Minimum 5 caracters'/>
                <CustomTextarea title="Description" value={descriptionsGroupForm.data.description} name='description' description='Enter the description of the group' required={false} handleChange={handleChange} instructions='Not required'/>
                
            </Grid>
            <Grid title="Groups descriptions" header={moreButton}>
                {descriptionsGroupForm.data.descriptions.map((description, index)=>(
                <div key={index} className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0 pb-4">
                    <div className="form-label xl:w-64 xl:!mr-10">
                        <div className="text-left">
                            <div className="flex items-center">
                                <div className="font-medium">Description {index + 1}</div>
                                <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                    Required
                                </div>
                            </div>
                            <div className="leading-relaxed text-slate-500 text-xs mt-3">
                                description
                            </div>
                        </div>
                    </div>
                    <div className="w-full mt-3 xl:mt-0 flex-1">
                        <textarea
                            required
                            className="form-control"
                            onChange={(e) => handleDescriptionChange(index, e.target.value)}
                            value={description || ''}
                        />
                        <div className="form-help text-right mt-2">Description</div>
                    </div>
                    <div className="mt-3 xl:mt-0 ms-2">
                        <Button className='btn btn-primary' onClick={() => removeDescriptions(index)}>-</Button>
                    </div>
                </div>
                ))}
                {moreButton}
            </Grid>
            <br/>
            {saveButton}
        </Page>

        </Webmaster>
    </>)
}
export default CreateDescription;