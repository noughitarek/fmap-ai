import { PageProps } from "@/types"
import { Button } from "@headlessui/react";
import { Activity, ArrowUpToLine, Box, Facebook, Lock, MoreHorizontal, Settings } from "lucide-react";

const SettingsSideNav: React.FC<PageProps<{active: string, handleMenuClick: (activeMenu: string)=>void}>> = ({ active, settings, handleMenuClick }) => {
    return (
    <div className="col-span-12 lg:col-span-4 2xl:col-span-3 flex lg:block flex-col-reverse">
        <div className="intro-y box mt-5 lg:mt-0">
            <div className="relative flex items-center p-5">
                <div className="w-12 h-12 image-fit">
                    <img
                        className="rounded-full"
                        src="/dist/images/rtm.png"
                    />
                </div>
                <div className="ml-4 mr-auto">
                    <div className="font-medium text-base">
                        {settings?.id ?? ''}
                    </div>
                    <div className="text-slate-500">
                        {settings?.title ?? ''}
                    </div>
                </div>
            </div>
            <div className="p-5 border-t border-slate-200/60 dark:border-darkmode-400">
                <Button onClick={()=>{handleMenuClick("general")}} className={`flex items-center ${active=="general" ? "text-primary font-medium" : ""}`}>
                    <Activity className="w-4 h-4 mr-2" />General
                </Button>
                <Button onClick={()=>{handleMenuClick("limits")}} className={`flex items-center mt-5 ${active=="limits" ? "text-primary font-medium" : ""}`}>
                    <ArrowUpToLine className="w-4 h-4 mr-2" />Limits
                </Button>
                <Button onClick={()=>{handleMenuClick("facebook")}} className={`flex items-center mt-5 ${active=="facebook" ? "text-primary font-medium" : ""}`}>
                    <Facebook className="w-4 h-4 mr-2" />Facebook
                </Button>
                <Button onClick={()=>{handleMenuClick("cronjobs")}} className={`flex items-center mt-5 ${active=="cronjobs" ? "text-primary font-medium" : ""}`}>
                    <Activity className="w-4 h-4 mr-2" />Cronjobs
                </Button>
            </div>
        </div>
    </div>
    );
}

export default SettingsSideNav;