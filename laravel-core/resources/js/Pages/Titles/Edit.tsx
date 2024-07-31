import { PageProps, TitlesGroup } from "@/types";
import Webmaster from '@/Layouts/Webmaster';
import { Head, Link, useForm, router } from "@inertiajs/react";
import Page from "@/Base-components/Page";
import { Button } from "@headlessui/react";
import Grid from "@/Base-components/Grid";
import { toast } from 'react-toastify';
import { useState } from "react";
import CustomTextarea from "@/Base-components/Forms/CustomTextarea";
import CustomTextInput from "@/Base-components/Forms/CustomTextInput";

interface TitlesGroupForm{
    name: string;
    description: string;
    titles: string[];
}

const EditTitle: React.FC<PageProps<{group: TitlesGroup}>> = ({auth, menu, group}) => {
    const [editing, setEditing] = useState(false)
    const titlesGroupForm = useForm<TitlesGroupForm>({
        name: group.name || '',
        description: group.description || '',
        titles: group.string_titles || [],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target as HTMLInputElement;
        titlesGroupForm.setData(name as keyof TitlesGroupForm, value);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setEditing(true);
        titlesGroupForm.post(route('titles.update', {group: group.id}), {
            onSuccess: () => {
                toast.success('Group of titles has been updated successfully');
                router.get(route('titles.index'));
            },
            onError: (error) => {
                toast.error('Error updating the group of titles');
                console.error('Error:', error);
            },
            onFinish: () => {
                setEditing(false);
            }
        });
    }
    const moreTitles: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        titlesGroupForm.setData(prevData => ({
            ...prevData,
            titles: [...prevData.titles, ""]
        }));
    }
    const removeTitles = (index: number) => {
        titlesGroupForm.setData(prevData => ({
            ...prevData,
            titles: prevData.titles.filter((_, i) => i !== index),
        }));
    };
    const handleTitleChange = (index: number, value: string) => {
        const updatedTitles = [...titlesGroupForm.data.titles];
        updatedTitles[index] = value;
        titlesGroupForm.setData('titles', updatedTitles);
    };
    const moreButton = (<Button className="btn btn-primary" onClick={moreTitles}>More</Button>)
    const saveButton = <Button className="btn btn-primary" disabled={editing} onClick={handleSubmit}>{editing?"Editing":"Edit"}</Button>
    return (<>
        <Head title="Edit a group of titles" />
        <Webmaster
            user={auth.user}
            menu={menu}
            breadcrumb={<>
                <li className="breadcrumb-item" aria-current="page"><Link href={route('titles.index')}>Titles</Link></li>
                <li className="breadcrumb-item" aria-current="page">Groups</li>
                <li className="breadcrumb-item" aria-current="page">{group.name}</li>
                <li className="breadcrumb-item active" aria-current="page">Update</li>
            </>}
        >
        <Page title="Edit a group of titles" header={<></>}>
            <Grid title="Groups information">
                <CustomTextInput title="Name" value={titlesGroupForm.data.name} name='name' description='Enter the name of the group' required={true} handleChange={handleChange} instructions='Minimum 5 caracters'/>
                <CustomTextarea title="Description" value={titlesGroupForm.data.description} name='description' description='Enter the description of the group' required={false} handleChange={handleChange} instructions='Not required'/>
                
            </Grid>
            <Grid title="Groups titles" header={moreButton}>
                {titlesGroupForm.data.titles.map((title, index)=>(
                <div key={index} className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0 pb-4">
                    <div className="form-label xl:w-64 xl:!mr-10">
                        <div className="text-left">
                            <div className="flex items-center">
                                <div className="font-medium">Title {index + 1}</div>
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
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={(e) => handleTitleChange(index, e.target.value)}
                            value={title || ''}
                        />
                        <div className="form-help text-right mt-2">Title</div>
                    </div>
                    <div className="mt-3 xl:mt-0 ms-2">
                        <Button className='btn btn-primary' onClick={() => removeTitles(index)}>-</Button>
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
export default EditTitle;