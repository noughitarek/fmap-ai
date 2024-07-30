import CustomTextInput from "@/Base-components/Forms/CustomTextInput";
import { DynamicSetting, PageProps } from "@/types";
import { Save } from "lucide-react";
import { useState } from "react";
import { Inertia } from '@inertiajs/inertia';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';
import CustomNumber from "@/Base-components/Forms/CustomNumber";

const GeneralSettings: React.FC<{ settings: DynamicSetting }> = ({ settings }) => {
    const [id, setId] = useState<string>(settings.id)
    const [title, setTitle] = useState<string>(settings.title)
    const [minimum_pourcentage, setMinimum_pourcentage] = useState<string>(settings.minimum_pourcentage)
    const [max_per_minute, setMax_per_minute] = useState<string>(settings.max_per_minute)
    const [saving, setSaving] = useState<boolean>(false)

    const handleSubmit = async () => {
        setSaving(true)
        
        Inertia.post(route('settings.save'),{
            "settings.id": id,
            "settings.title": title,
            "settings.minimum_pourcentage": minimum_pourcentage,
            "settings.max_per_minute": max_per_minute
        }, {
            onSuccess: () => {
                toast.success('Settings saved successfully');
                setSaving(false)
            },
            onError: (errors) => {
                toast.error('Failed to save settings', errors);
                setSaving(false)
            }
        });
    }

    return (
        <div className="grid grid-cols-12 gap-6">
            <div className="intro-y box col-span-12 2xl:col-span-6">
                <div className="flex items-center px-5 py-5 sm:py-3 border-b border-slate-200/60 dark:border-darkmode-400">
                    <h2 className="font-medium text-base mr-auto">
                        General settings
                    </h2>
                    <button onClick={handleSubmit} disabled={saving} className="btn btn-outline-secondary hidden sm:flex">
                        { !saving && (<><Save className="w-4 h-4 mr-2"/> Save</>)}
                        { saving && (<><ReactLoading type="spin" color="green" height={18} width={18} />&nbsp; Saving</>)}
                    </button>
                </div>
                <div className="p-5">
                    <CustomTextInput title="Id" description="An id for this website" instructions="required" name="settings.id" value={id} handleChange={(event)=>setId(event.target.value)} required={true}/>
                    <CustomTextInput title="Title" description="A title for this website" instructions="required" name="settings.title" value={title} handleChange={(event)=>setTitle(event.target.value)} required={true}/>
                    <CustomNumber title="Minimum pourcentage" description="A title for this website" instructions="required" name="settings.minimum_pourcentage" value={Number(minimum_pourcentage)} handleChange={(event)=>setMinimum_pourcentage(event.target.value)} required={true}/>
                    <CustomNumber title="Max messages per minute" description="A title for this website" instructions="required" name="settings.max_per_minute" value={Number(max_per_minute)} handleChange={(event)=>setMax_per_minute(event.target.value)} required={true}/>
                </div>
            </div>
        </div>
    );
};
export default GeneralSettings;
