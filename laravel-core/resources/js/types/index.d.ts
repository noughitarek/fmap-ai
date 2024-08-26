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
    facebook_user_id: string;
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
    old_videos: string[];
    videos: Video[];
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

export interface Video{
    id: number;
    video: string;
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

export interface PostingsCategory{
    id: number;
    name: string;
    description: string;
    total_listings: number;
    total_messages: number;
    total_orders: number;
    postings: Posting[];
    created_at: Date;
    updated_at: Date;
    created_by: User;
    updated_by: User;
}

export interface Posting{
    id: number;
    name: string;
    description: string;
    posting_prices_numbers: number[];
    posting_prices: PostingsPrices[];
    max_per_day: number;
    photo_per_listing: number;
    expire_after: number;
    postings_category: PostingsCategory;
    postings_category_id: number;
    accounts_group: AccountsGroup;
    accounts_group_id: number;
    titles_group: TitlesGroup;
    titles_group_id: number;
    photos_group: PhotosGroup;
    photos_group_id: number;
    descriptions_group: DescriptionsGroup;
    descriptions_group_id : number;

    total_listings: number;
    total_messages: number;
    total_orders: number;

    is_active: number;

    created_at: Date;
    updated_at: Date;
    created_by: User;
    updated_by: User;
}

export interface PostingsPrices{
    id: number;
    price: number;
}
export interface TagsGroup{
    id: number;
    name: string;
    description: string;
    total_listings: number;
    total_messages: number;
    total_orders: number;
    string_tags: string[];
    tags: Tag[];
    created_at: Date;
    updated_at: Date;
    created_by: User;
    updated_by: User;
}

export interface Tag{
    id: number;
    tag: string;
    tags_group_id: number;
    tags_group: TagsGroup;
    total_listings: number;
    total_messages: number;
    total_orders: number;
    created_at: Date;
    updated_at: Date;
}
export interface Wilaya{
    id: number;
    name: string;
    name_ar: string;
    communes: Commune[];
}
export interface Commune{
    id: number;
    name: string;
    name_ar: string;
    wilaya_id: number;
    wilaya: Wilaya;
}
export interface LocationsGroup{
    id: number;
    name: string;
    description: string;
    total_listings: number;
    total_messages: number;
    total_orders: number;
    communes: number[];
    locations: Location[];
    created_at: Date;
    updated_at: Date;
    created_by: User;
    updated_by: User;
}
export interface Location{
    id: number;
    commune_id: number;
    commune: Commune;
    locations_group_id: number;
    locations_group: LocationsGroup;
    total_listings: number;
    total_messages: number;
    total_orders: number;
    created_at: Date;
    updated_at: Date;
}