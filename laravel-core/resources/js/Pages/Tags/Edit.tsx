import { PageProps, TagsGroup } from "@/types";
import Webmaster from '@/Layouts/Webmaster';
import { Head, Link, useForm, router } from "@inertiajs/react";
import Page from "@/Base-components/Page";
import { Button } from "@headlessui/react";
import Grid from "@/Base-components/Grid";
import { toast } from 'react-toastify';
import { useState } from "react";
import CustomTextarea from "@/Base-components/Forms/CustomTextarea";
import CustomTextInput from "@/Base-components/Forms/CustomTextInput";

interface TagsGroupForm{
    name: string;
    description: string;
    tags: string[];
}

const EditTag: React.FC<PageProps<{group: TagsGroup}>> = ({auth, menu, group}) => {
    const [editing, setEditing] = useState(false)
    const tagsGroupForm = useForm<TagsGroupForm>({
        name: group.name || '',
        description: group.description || '',
        tags: group.string_tags || [],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target as HTMLInputElement;
        tagsGroupForm.setData(name as keyof TagsGroupForm, value);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setEditing(true);
        tagsGroupForm.post(route('tags.update', {group: group.id}), {
            onSuccess: () => {
                toast.success('Group of tags has been updated successfully');
                router.get(route('tags.index'));
            },
            onError: (error) => {
                toast.error('Error updating the group of tags');
                console.error('Error:', error);
            },
            onFinish: () => {
                setEditing(false);
            }
        });
    }
    const moreTags: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        tagsGroupForm.setData(prevData => ({
            ...prevData,
            tags: [...prevData.tags, ""]
        }));
    }
    const removeTags = (index: number) => {
        tagsGroupForm.setData(prevData => ({
            ...prevData,
            tags: prevData.tags.filter((_, i) => i !== index),
        }));
    };
    const handleTagChange = (index: number, value: string) => {
        const updatedTags = [...tagsGroupForm.data.tags];
        updatedTags[index] = value;
        tagsGroupForm.setData('tags', updatedTags);
    };
    const moreButton = (<Button className="btn btn-primary" onClick={moreTags}>More</Button>)
    const saveButton = <Button className="btn btn-primary" disabled={editing} onClick={handleSubmit}>{editing?"Editing":"Edit"}</Button>
    return (<>
        <Head title="Edit a group of tags" />
        <Webmaster
            user={auth.user}
            menu={menu}
            breadcrumb={<>
                <li className="breadcrumb-item" aria-current="page"><Link href={route('tags.index')}>Tags</Link></li>
                <li className="breadcrumb-item" aria-current="page">Groups</li>
                <li className="breadcrumb-item" aria-current="page">{group.name}</li>
                <li className="breadcrumb-item active" aria-current="page">Update</li>
            </>}
        >
        <Page title="Edit a group of tags" header={<></>}>
            <Grid title="Groups information">
                <CustomTextInput title="Name" value={tagsGroupForm.data.name} name='name' description='Enter the name of the group' required={true} handleChange={handleChange} instructions='Minimum 5 caracters'/>
                <CustomTextarea title="Tag" value={tagsGroupForm.data.description} name='description' description='Enter the description of the group' required={false} handleChange={handleChange} instructions='Not required'/>
                
            </Grid>
            <Grid title="Groups tags" header={moreButton}>
                {tagsGroupForm.data.tags.map((tag, index)=>(
                <div key={index} className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0 pb-4">
                    <div className="form-label xl:w-64 xl:!mr-10">
                        <div className="text-left">
                            <div className="flex items-center">
                                <div className="font-medium">Tag {index + 1}</div>
                                <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                    Required
                                </div>
                            </div>
                            <div className="leading-relaxed text-slate-500 text-xs mt-3">
                                tag
                            </div>
                        </div>
                    </div>
                    <div className="w-full mt-3 xl:mt-0 flex-1">
                        <textarea
                            required
                            className="form-control"
                            onChange={(e) => handleTagChange(index, e.target.value)}
                            value={tag || ''}
                        />
                        <div className="form-help text-right mt-2">Tag</div>
                    </div>
                    <div className="mt-3 xl:mt-0 ms-2">
                        <Button className='btn btn-primary' onClick={() => removeTags(index)}>-</Button>
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
export default EditTag;