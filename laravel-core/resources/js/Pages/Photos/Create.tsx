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

interface PhotosGroupForm{
    name: string;
    description: string;
    photos: File[][];
    videos: File[][];
}

const CreatePhoto: React.FC<PageProps> = ({auth, menu}) => {
    const [creating, setCreating] = useState(false)
    const photosGroupForm = useForm<PhotosGroupForm>({
        name: '',
        description: '',
        photos: [],
        videos: [],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, type, value, files } = e.target as HTMLInputElement;
        if (type === 'file' && files) {
            const newFiles = Array.from(files);
            photosGroupForm.setData((prevData: PhotosGroupForm) => {
                const updatedPhotos = [...prevData.photos];
                updatedPhotos[parseInt(name)] = newFiles;
                return { ...prevData, photos: updatedPhotos };
            });
        } else {
            photosGroupForm.setData(name as keyof PhotosGroupForm, value);
        }
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreating(true);
        photosGroupForm.post(route('photos.store'), {
            forceFormData: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onSuccess: () => {
                toast.success('Group of photos has been created successfully');
                router.get(route('photos.index'));
            },
            onError: (error) => {
                toast.error('Error creating the group of photos');
                console.error('Error:', error);
            },
            onFinish: () => {
                setCreating(false);
            }
        });
    };

    const morePhotos: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        photosGroupForm.setData(prevData => ({
            ...prevData,
            photos: [...prevData.photos, []]
        }));
    };
    const removePhotos = (index: number) => {
        photosGroupForm.setData(prevData => ({
            ...prevData,
            photos: prevData.photos.filter((_, i) => i !== index),
        }));
    };
    const handlePhotoChange = (index: number, files: FileList) => {
        const updatedPhotos = [...photosGroupForm.data.photos];
        updatedPhotos[index] = Array.from(files);
        photosGroupForm.setData('photos', updatedPhotos);
    };

    const moreVideos: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        photosGroupForm.setData(prevData => ({
            ...prevData,
            videos: [...prevData.videos, []]
        }));
    };
    const removeVideos = (index: number) => {
        photosGroupForm.setData(prevData => ({
            ...prevData,
            videos: prevData.videos.filter((_, i) => i !== index),
        }));
    };
    const handleVideoChange = (index: number, files: FileList) => {
        const updatedVideos = [...photosGroupForm.data.videos];
        updatedVideos[index] = Array.from(files);
        photosGroupForm.setData('videos', updatedVideos);
    };

    const moreButton = (<Button className="btn btn-primary" onClick={morePhotos}>More</Button>)
    const moreVideosButton = (<Button className="btn btn-primary" onClick={moreVideos}>More</Button>)
    const saveButton = <Button className="btn btn-primary" disabled={creating} onClick={handleSubmit}>{creating?"Creating":"Create"}</Button>
    return (<>
        <Head title="Create a group of photos" />
        <Webmaster
            user={auth.user}
            menu={menu}
            breadcrumb={<>
                <li className="breadcrumb-item" aria-current="page"><Link href={route('photos.index')}>Photos</Link></li>
                <li className="breadcrumb-item" aria-current="page">Groups</li>
                <li className="breadcrumb-item active" aria-current="page">Create</li>
            </>}
        >
        <Page title="Create a group of photos" header={<></>}>
            <Grid title="Groups information">
                <CustomTextInput title="Name" value={photosGroupForm.data.name} name='name' description='Enter the name of the group' required={true} handleChange={handleChange} instructions='Minimum 5 caracters'/>
                <CustomTextarea title="Description" value={photosGroupForm.data.description} name='description' description='Enter the description of the group' required={false} handleChange={handleChange} instructions='Not required'/>
                
            </Grid>
            <Grid title="Groups photos" header={moreButton}>
                {photosGroupForm.data.photos.map((photo, index)=>(
                <div key={index} className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0 pb-4">
                    <div className="form-label xl:w-64 xl:!mr-10">
                        <div className="text-left">
                            <div className="flex items-center">
                                <div className="font-medium">Photo {index + 1}</div>
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
                        <div className="w-full mt-3 xl:mt-2 flex-1">
                            <input
                                type="file"
                                accept="image/*"
                                required
                                className="form-control"
                                onChange={(e) => {
                                    if (e.target.files) {
                                        handlePhotoChange(index, e.target.files);
                                    }
                                }}
                                multiple={true}
                            />
                            <div className="form-help text-right mt-2">Photo</div>
                        </div>
                    </div>
                    <div className="mt-3 xl:mt-0 ms-2">
                        <Button className='btn btn-primary' onClick={() => removePhotos(index)}>-</Button>
                    </div>
                </div>
                ))}
                {moreButton}
            </Grid>
            
            <Grid title="Groups videos" header={moreVideosButton}>
                {photosGroupForm.data.videos.map((video, index)=>(
                <div key={index} className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0 pb-4">
                    <div className="form-label xl:w-64 xl:!mr-10">
                        <div className="text-left">
                            <div className="flex items-center">
                                <div className="font-medium">Video {index + 1}</div>
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
                        <div className="w-full mt-3 xl:mt-2 flex-1">
                            <input
                                type="file"
                                accept="video/*"
                                required
                                className="form-control"
                                onChange={(e) => {
                                    if (e.target.files) {
                                        handleVideoChange(index, e.target.files);
                                    }
                                }}
                                multiple={true}
                            />
                            <div className="form-help text-right mt-2">Video</div>
                        </div>
                    </div>
                    <div className="mt-3 xl:mt-0 ms-2">
                        <Button className='btn btn-primary' onClick={() => removeVideos(index)}>-</Button>
                    </div>
                </div>
                ))}
                {moreVideosButton}
            </Grid>
            <br/>
            {saveButton}
        </Page>

        </Webmaster>
    </>)
}
export default CreatePhoto;