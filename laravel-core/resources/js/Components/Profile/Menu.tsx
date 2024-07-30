
import { PageProps, User } from '@/types';
import { Activity, Box, Lock, MoreHorizontal, Settings } from 'lucide-react';

const ProfileMenu: React.FC<PageProps> = ({ auth }) => {
    return (<div className="col-span-12 lg:col-span-4 2xl:col-span-3 flex lg:block flex-col-reverse">
        <div className="intro-y box mt-5 lg:mt-0">
            <div className="relative flex items-center p-5">
                <div className="w-12 h-12 image-fit">
                    <img className="rounded-full" src="/dist/images/profile-15.jpg"/>
                </div>
                <div className="ml-4 mr-auto">
                    <div className="font-medium text-base">{auth.user.name}</div>
                    <div className="text-slate-500">{auth.user.role}</div>
                </div>
                <div className="dropdown">
                    <a className="dropdown-toggle w-5 h-5 block" href="#" aria-expanded="false" data-tw-toggle="dropdown">
                        <MoreHorizontal className="w-5 h-5 text-slate-500" />
                    </a>
                </div>
            </div>
            <div className="p-5 border-t border-slate-200/60 dark:border-darkmode-400">
                <a className="flex items-center text-primary font-medium" href="">

                    <Activity className="w-4 h-4 mr-2" /> Personal
                    Information
                </a>
                <a className="flex items-center mt-5" href="">

                    <Box className="w-4 h-4 mr-2" /> Account Settings
                </a>
                <a className="flex items-center mt-5" href="">

                    <Lock className="w-4 h-4 mr-2" /> Change Password
                </a>
                <a className="flex items-center mt-5" href="">

                    <Settings className="w-4 h-4 mr-2" /> User Settings
                </a>
            </div>
            <div className="p-5 border-t border-slate-200/60 dark:border-darkmode-400">
                <a className="flex items-center" href="">

                    <Activity className="w-4 h-4 mr-2" /> Email Settings
                </a>
                <a className="flex items-center mt-5" href="">

                    <Box className="w-4 h-4 mr-2" /> Saved Credit Cards
                </a>
                <a className="flex items-center mt-5" href="">

                    <Lock className="w-4 h-4 mr-2" /> Social Networks
                </a>
                <a className="flex items-center mt-5" href="">

                    <Settings className="w-4 h-4 mr-2" /> Tax Information
                </a>
            </div>
            <div className="p-5 border-t border-slate-200/60 dark:border-darkmode-400 flex">
                <button type="button" className="btn btn-primary py-1 px-2">
                    New Group
                </button>
                <button type="button" className="btn btn-outline-secondary py-1 px-2 ml-auto">
                    New Quick Link
                </button>
            </div>
        </div>
    </div>
    )
}
export default ProfileMenu;