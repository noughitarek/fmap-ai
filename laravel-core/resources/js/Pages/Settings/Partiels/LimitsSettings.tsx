import CustomTextInput from "@/Base-components/Forms/CustomTextInput";
import { DynamicSetting, PageProps } from "@/types";
import { Save } from "lucide-react";
import { useState } from "react";
import { Inertia } from '@inertiajs/inertia';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';

const LimitsSettings: React.FC<{ settings: DynamicSetting }> = ({ settings }) => {
    const [conversations, setConversations] = useState<string>(settings.limits.conversations)
    const [message_per_conversation, setMessage_per_conversation] = useState<string>(settings.limits.message_per_conversation)
    const [max_simultaneous_message, setMax_simultaneous_message] = useState<string>(settings.limits.max_simultaneous_message)
    const [saving, setSaving] = useState<boolean>(false)

    const handleSubmit = async () => {
        setSaving(true)
        
        Inertia.post(route('settings.save'),{
            "settings.limits.conversations": conversations,
            "settings.limits.message_per_conversation": message_per_conversation,
            "settings.limits.max_simultaneous_message": max_simultaneous_message
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
                        Limits
                    </h2>
                    <button onClick={handleSubmit} disabled={saving} className="btn btn-outline-secondary hidden sm:flex">
                        { !saving && (<><Save className="w-4 h-4 mr-2"/> Save</>)}
                        { saving && (<><ReactLoading type="spin" color="green" height={18} width={18} />&nbsp; Saving</>)}
                    </button>
                </div>
                <div className="p-5">
                    <CustomTextInput title="Conversations limit" description="An id for this website" instructions="required" name="settings.id" value={conversations} handleChange={(event)=>{setConversations(event.target.value)}} required={true}/>
                    <CustomTextInput title="Message per conversation limit" description="An id for this website" instructions="required" name="settings.id" value={message_per_conversation} handleChange={(event)=>{setMessage_per_conversation(event.target.value)}} required={true}/>
                    <CustomTextInput title="Max simultaneous message" description="An id for this website" instructions="required" name="settings.id" value={max_simultaneous_message} handleChange={(event)=>{setMax_simultaneous_message(event.target.value)}} required={true}/>
                </div>
            </div>
        </div>
    );
};
export default LimitsSettings;
