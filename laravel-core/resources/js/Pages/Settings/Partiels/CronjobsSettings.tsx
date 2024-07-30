import CustomCheckBox from "@/Base-components/Forms/CustomCheckbox";
import CustomTextInput from "@/Base-components/Forms/CustomTextInput";
import { DynamicSetting, PageProps } from "@/types";
import { Save } from "lucide-react";
import { useState } from "react";
import { Inertia } from '@inertiajs/inertia';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';

const CronjobsSettings: React.FC<{ settings: DynamicSetting }> = ({ settings }) => {
    const [tokens_validity_check, setTokens_validity_check] = useState<number>(settings.scheduler.tokens_validity_check)
    const [update_conversations, setUpdate_conversations] = useState<number>(settings.scheduler.update_conversations)
    const [send_remarketing_messages, setSend_remarketing_messages] = useState<number>(settings.scheduler.send_remarketing_messages)
    const [saving, setSaving] = useState<boolean>(false)
    console.log(tokens_validity_check, update_conversations, send_remarketing_messages);
    
    const handleSubmit = async () => {
        setSaving(true)
        
        Inertia.post(route('settings.save'),{
            "settings.scheduler.tokens_validity_check": tokens_validity_check,
            "settings.scheduler.update_conversations": update_conversations,
            "settings.scheduler.send_remarketing_messages": send_remarketing_messages,
        }, {
            onSuccess: () => {
                toast.success('Settings saved successfully');
                setSaving(false);
            },
            onError: (errors) => {
                toast.error('Failed to save settings', errors);
                setSaving(false);
            }
        });
    }
    return (
        <div className="grid grid-cols-12 gap-6">
            <div className="intro-y box col-span-12 2xl:col-span-6">
                <div className="flex items-center px-5 py-5 sm:py-3 border-b border-slate-200/60 dark:border-darkmode-400">
                    <h2 className="font-medium text-base mr-auto">
                        Cronjobs settings
                    </h2>
                    <button onClick={handleSubmit} disabled={saving} className="btn btn-outline-secondary hidden sm:flex">
                        { !saving && (<><Save className="w-4 h-4 mr-2"/> Save</>)}
                        { saving && (<><ReactLoading type="spin" color="green" height={18} width={18} />&nbsp; Saving</>)}
                    </button>
                </div>
                <div className="p-5">
                    <div>
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" onChange={(event)=>{setTokens_validity_check(event.target.checked?1:0)}} checked={tokens_validity_check==1}/>
                            <label className="form-check-label">Tokens validity check</label>
                        </div>
                    </div>
                    <div className="mt-5">
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" onChange={(event)=>{setUpdate_conversations(event.target.checked?1:0)}} checked={update_conversations==1}/>
                            <label className="form-check-label">Update conversations</label>
                        </div>
                    </div>
                    <div className="mt-5">
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" onChange={(event)=>{setSend_remarketing_messages(event.target.checked?1:0)}} checked={send_remarketing_messages==1}/>
                            <label className="form-check-label">Send remarketing messages</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CronjobsSettings;
