import { MenuItem } from './MenuItem'

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}
type DynamicSetting = {
    [key: string]: any;
};
export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    menu: MenuItem[];
    settings?: DynamicSetting;
};

export interface User{
    id: number;
    name: string;
    role: string;
    permissions: string;
    created_at: Date;
    updated_at: Date;
    created_by: User;
    updated_by: User;
}

export interface AccountsGroup{
    id: number;
    name: string;
    description: string;
    total_listings: number;
    total_messages: number;
    total_orders: number;
    accounts: Account[];
    created_at: Date;
    updated_at: Date;
    created_by: User;
    updated_by: User;
}

export interface Account{
    id: number;
    name: string;
    description: string;
    accounts_group_id: number;
    accounts_group: AccountsGroup;
    username: string;
    password: string;
    total_listings: number;
    total_messages: number;
    total_orders: number;
    created_at: Date;
    updated_at: Date;
    created_by: User;
    updated_by: User;
}

export interface TitlesGroup{
    id: number;
    name: string;
    description: string;
    total_listings: number;
    total_messages: number;
    total_orders: number;
    string_titles: string[];
    titles: Title[];
    created_at: Date;
    updated_at: Date;
    created_by: User;
    updated_by: User;
}

export interface Title{
    id: number;
    title: string;
    titles_group_id: number;
    titles_group: TitlesGroup;
    total_listings: number;
    total_messages: number;
    total_orders: number;
    created_at: Date;
    updated_at: Date;
}
export interface PhotosGroup{
    id: number;
    name: string;
    description: string;
    total_listings: number;
    total_messages: number;
    total_orders: number;
    old_photos: string[];
    photos: Photo[];
    created_at: Date;
    updated_at: Date;
    created_by: User;
    updated_by: User;
}

export interface Photo{
    id: number;
    photo: string;
    photos_group_id: number;
    photos_group: PhotosGroup;
    total_listings: number;
    total_messages: number;
    total_orders: number;
    created_at: Date;
    updated_at: Date;
}

export interface DescriptionsGroup{
    id: number;
    name: string;
    description: string;
    total_listings: number;
    total_messages: number;
    total_orders: number;
    string_descriptions: string[];
    descriptions: Description[];
    created_at: Date;
    updated_at: Date;
    created_by: User;
    updated_by: User;
}

export interface Description{
    id: number;
    description: string;
    descriptions_group_id: number;
    descriptions_group: DescriptionsGroup;
    total_listings: number;
    total_messages: number;
    total_orders: number;
    created_at: Date;
    updated_at: Date;
}