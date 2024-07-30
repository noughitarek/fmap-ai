export interface MenuItem {
    type: string;
    content: string;
    permissions: string | string[];
    section?: string;
    route?: string;
    icon?: { type: string; content: string };
    sublinks?: MenuItem[];
    active?: boolean;
}