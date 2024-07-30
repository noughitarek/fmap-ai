import CustomTextInput from "@/Base-components/Forms/CustomTextInput";
import { DynamicSetting, PageProps } from "@/types";
import { Link } from "@inertiajs/react";
import { Facebook, Save } from "lucide-react";
import { useState } from "react";
import { Inertia } from '@inertiajs/inertia';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';

const FacebookSettings: React.FC<{ settings: DynamicSetting }> = ({ settings }) => {
    const [client_id, setClient_id] = useState<string>(settings.facebook.client_id)
    const [client_secret, setClient_secret] = useState<string>(settings.facebook.client_secret)
    const [redirect, setRedirect] = useState<string>(settings.facebook.redirect)
    const [saving, setSaving] = useState<boolean>(false)

    const handleSubmit = async () => {
        setSaving(true)
        
        Inertia.post(route('settings.save'),{
            "services.facebook.client_id": client_id,
            "services.facebook.client_secret": client_secret,
            "services.facebook.redirect": redirect,
            "settings.facebook.client_id": client_id,
            "settings.facebook.client_secret": client_secret,
            "settings.facebook.redirect": redirect
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
                        Facebook settings
                    </h2>
                    <button onClick={handleSubmit} disabled={saving} className="btn btn-outline-secondary hidden sm:flex">
                        { !saving && (<><Save className="w-4 h-4 mr-2"/> Save</>)}
                        { saving && (<><ReactLoading type="spin" color="green" height={18} width={18} />&nbsp; Saving</>)}
                    </button>
                </div>
                <div className="p-5">
                    <a className="btn btn-primary" href={route('facebook_reconnect')}> <Facebook className="w-full"/> Reconnect</a>
                    <CustomTextInput handleChange={(event)=>setClient_id(event.target.value)} title="Client id" description="An id for this website" instructions="required" name="settings.facebook.client_id" value={client_id} required={true}/>
                    <CustomTextInput handleChange={(event)=>setClient_secret(event.target.value)} title="Client secret" description="A title for this website" instructions="required" name="settings.title" value={client_secret} required={true}/>
                    <CustomTextInput handleChange={(event)=>setRedirect(event.target.value)} title="Redirect" description="A title for this website" instructions="required" name="settings.title" value={redirect} required={true}/>
                </div>
            </div>
        </div>
    );
};
export default FacebookSettings;
