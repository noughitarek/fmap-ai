import Webmaster from "@/Layouts/Webmaster";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Activity, Box, Lock, MoreHorizontal, Settings as SettingsIcon } from "lucide-react";
import Page from "@/Base-components/Page";
import Grid from "@/Base-components/Grid";
import SettingsSideNav from "./Partiels/SettingsSideNav";
import { useState } from "react";
import GeneralSettings from "./Partiels/GeneralSettings";
import LimitsSettings from "./Partiels/LimitsSettings";
import FacebookSettings from "./Partiels/FacebookSettings";
import CronjobsSettings from "./Partiels/CronjobsSettings";

const Settings: React.FC<PageProps> = ({ auth, menu, settings }) => {
    const [activeMenu, setActiveMenu] = useState<string>("general")
    const handleMenuClick = (menu: string)=>{
        setActiveMenu(menu)
    }
    return (
        <>
            <Head title="Settings" />

            <Webmaster
                user={auth.user}
                menu={menu}
                breadcrumb={
                    <li className="breadcrumb-item active" aria-current="page">
                        Settings
                    </li>
                }
            >
            <Page title="Settings" header="">
                <div className="grid grid-cols-12 gap-6 mt-5">
                    <SettingsSideNav settings={settings} auth={auth} menu={menu} active={activeMenu} handleMenuClick={handleMenuClick}/>
                    <div className="col-span-12 lg:col-span-8 2xl:col-span-9">
                        {activeMenu == "general" && settings && (<GeneralSettings settings={settings}/>)}
                        {activeMenu == "limits" && settings && (<LimitsSettings settings={settings}/>)}
                        {activeMenu == "facebook" && settings && (<FacebookSettings settings={settings}/>)}
                        {activeMenu == "cronjobs" && settings && (<CronjobsSettings settings={settings}/>)}
                    </div>
                </div>
            </Page>
            </Webmaster>
        </>
    );
}
export default Settings;