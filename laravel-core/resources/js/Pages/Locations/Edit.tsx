import { LocationsGroup, PageProps, Wilaya } from "@/types";
import Webmaster from '@/Layouts/Webmaster';
import { Head, Link, useForm, router } from "@inertiajs/react";
import Page from "@/Base-components/Page";
import { Button } from "@headlessui/react";
import Grid from "@/Base-components/Grid";
import { toast } from 'react-toastify';
import { useState } from "react";
import CustomTextarea from "@/Base-components/Forms/CustomTextarea";
import CustomTextInput from "@/Base-components/Forms/CustomTextInput";

interface LocationsGroupForm{
    name: string;
    description: string;
    communes: number[];
}

const EditLocation: React.FC<PageProps<{wilayas: Wilaya[], group: LocationsGroup}>> = ({auth, menu, wilayas, group}) => {
    const [editing, setEditing] = useState(false)
    const locationsGroupForm = useForm<LocationsGroupForm>({
        name: group.name || '',
        description: group.description || '',
        communes: group.communes || [],
    });

    const handleWilayaChange = (wilayaId: number, isChecked: boolean) => {
        const wilaya = wilayas.find(w => w.id === wilayaId);
        const communeIds = wilaya?.communes.map(c => c.id) || [];

        locationsGroupForm.setData('communes', isChecked
            ? [...new Set([...locationsGroupForm.data.communes, ...communeIds])]
            : locationsGroupForm.data.communes.filter(id => !communeIds.includes(id))
        );
    };

    
    const handleCommuneChange = (communeId: number, isChecked: boolean) => {
        locationsGroupForm.setData('communes', isChecked
            ? [...locationsGroupForm.data.communes, communeId]
            : locationsGroupForm.data.communes.filter(id => id !== communeId)
        );
    };

    const isWilayaChecked = (wilayaId: number) => {
        const wilaya = wilayas.find(w => w.id === wilayaId);
        return wilaya && wilaya.communes.some(commune => locationsGroupForm.data.communes.includes(commune.id));
    };

    const isCommuneChecked = (communeId: number) => {
        return locationsGroupForm.data.communes.includes(communeId);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setEditing(true);
        locationsGroupForm.post(route('locations.update', {group: group.id}), {
            onSuccess: () => {
                toast.success('Group of locations has been updated successfully');
                router.get(route('locations.index'));
            },
            onError: (error) => {
                toast.error('Error updating the group of locations');
                console.error('Error:', error);
            },
            onFinish: () => {
                setEditing(false);
            }
        });
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target as HTMLInputElement;
        locationsGroupForm.setData(name as keyof LocationsGroupForm, value);
    }

    const saveButton = <Button className="btn btn-primary" disabled={editing} onClick={handleSubmit}>{editing?"Editing":"Edit"}</Button>
    return (<>
        <Head title="Edit a group of locations" />
        <Webmaster
            user={auth.user}
            menu={menu}
            breadcrumb={<>
                <li className="breadcrumb-item" aria-current="page"><Link href={route('locations.index')}>Locations</Link></li>
                <li className="breadcrumb-item" aria-current="page">Groups</li>
                <li className="breadcrumb-item" aria-current="page">{group.name}</li>
                <li className="breadcrumb-item active" aria-current="page">Edit</li>
            </>}
        >
        <Page title="Edit a group of locations" header={<></>}>
            <Grid title="Groups information">
                <CustomTextInput title="Name" value={locationsGroupForm.data.name} name='name' description='Enter the name of the group' required={true} handleChange={handleChange} instructions='Minimum 5 caracters'/>
                <CustomTextarea title="Description" value={locationsGroupForm.data.description} name='description' description='Enter the description of the group' required={false} handleChange={handleChange} instructions='Not required'/>
                
            </Grid>
            {wilayas.map((wilaya)=>(
                <Grid key={wilaya.id} title={"Wilaya of "+wilaya.name} header={
                    <input
                        type="checkbox"
                        checked={isWilayaChecked(wilaya.id)}
                        onChange={(e) => handleWilayaChange(wilaya.id, e.target.checked)}
                        className="form-control"/>}>
                {isWilayaChecked(wilaya.id) && ( wilaya.communes.map((commune)=>(
                <div key={commune.id} className="d-none form-inline items-start flex-col xl:flex-row first:mt-0 first:pt-0 pb-4">
                    <div className="form-label xl:w-64 xl:!mr-10">
                        <div className="text-left">
                            <input
                                required
                                type="checkbox"
                                className="form-control"
                                checked={isCommuneChecked(commune.id)}
                                onChange={(e) => handleCommuneChange(commune.id, e.target.checked)}
                            />&nbsp;
                            {commune.name}
                        </div>
                    </div>
                </div>
                )))}
                </Grid>
            ))}
            <br/>
            {saveButton}
        </Page>

        </Webmaster>
    </>)
}
export default EditLocation;