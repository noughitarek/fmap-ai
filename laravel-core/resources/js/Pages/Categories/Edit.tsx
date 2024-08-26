import { CategoriesGroup, Category, FacebookCategory, PageProps, Wilaya } from "@/types";
import Webmaster from '@/Layouts/Webmaster';
import { Head, Link, useForm, router } from "@inertiajs/react";
import Page from "@/Base-components/Page";
import { Button } from "@headlessui/react";
import Grid from "@/Base-components/Grid";
import { toast } from 'react-toastify';
import { useState } from "react";
import CustomTextarea from "@/Base-components/Forms/CustomTextarea";
import CustomTextInput from "@/Base-components/Forms/CustomTextInput";

interface CategoriesGroupForm{
    name: string;
    description: string;
    categories: string[];
}

const EditCategory: React.FC<PageProps<{facebookCategories: FacebookCategory[], group: CategoriesGroup}>> = ({auth, menu, facebookCategories, group}) => {
    const [editing, setEditing] = useState(false)
    const categoriesGroupForm = useForm<CategoriesGroupForm>({
        name: group.name,
        description: group.description,
        categories: group.string_categories,
    });

    const handleCategoryChange = (categoryName: string, isChecked: boolean) => {
        const subCategoryNames = facebookCategories.find(c => c.name === categoryName)?.sub_categories || [];

        categoriesGroupForm.setData('categories', isChecked
            ? [...new Set([...categoriesGroupForm.data.categories, ...subCategoryNames])]
            : categoriesGroupForm.data.categories.filter(name => !subCategoryNames.includes(name))
        );
    };

    const handleSubCategoryChange = (subCategoryName: string, isChecked: boolean) => {
        categoriesGroupForm.setData('categories', isChecked
            ? [...categoriesGroupForm.data.categories, subCategoryName]
            : categoriesGroupForm.data.categories.filter(name => name !== subCategoryName)
        );
    };

    const isCategoryChecked = (categoryName: string) => {
        const subCategoryNames = facebookCategories.find(c => c.name === categoryName)?.sub_categories || [];
        return subCategoryNames.every(subCategoryName => categoriesGroupForm.data.categories.includes(subCategoryName));
    };

    const isSubCategoryChecked = (subCategoryName: string) => {
        return categoriesGroupForm.data.categories.includes(subCategoryName);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setEditing(true);
        categoriesGroupForm.post(route('categories.update', {group: group.id}), {
            onSuccess: () => {
                toast.success('Group of categories has been created successfully');
                router.get(route('categories.index'));
            },
            onError: (error) => {
                toast.error('Error creating the group of categories');
                console.error('Error:', error);
            },
            onFinish: () => {
                setEditing(false);
            }
        });
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target as HTMLInputElement;
        categoriesGroupForm.setData(name as keyof CategoriesGroupForm, value);
    }

    const saveButton = <Button className="btn btn-primary" disabled={editing} onClick={handleSubmit}>{editing?"Updating":"Update"}</Button>
    return (<>
        <Head title="Edit a group of categories" />
        <Webmaster
            user={auth.user}
            menu={menu}
            breadcrumb={<>
                <li className="breadcrumb-item" aria-current="page"><Link href={route('categories.index')}>Categories</Link></li>
                <li className="breadcrumb-item" aria-current="page">Groups</li>
                <li className="breadcrumb-item" aria-current="page">{group.name}</li>
                <li className="breadcrumb-item active" aria-current="page">Edit</li>
            </>}
        >
        <Page title="Edit a group of categories" header={<></>}>
            <Grid title="Groups information">
                <CustomTextInput title="Name" value={categoriesGroupForm.data.name} name='name' description='Enter the name of the group' required={true} handleChange={handleChange} instructions='Minimum 5 caracters'/>
                <CustomTextarea title="Description" value={categoriesGroupForm.data.description} name='description' description='Enter the description of the group' required={false} handleChange={handleChange} instructions='Not required'/>
                
            </Grid>
            {facebookCategories.map((category)=>(
                <Grid key={category.name} title={category.name} header={
                    <input
                        type="checkbox"
                        className="form-control"
                        checked={isCategoryChecked(category.name)}
                        onChange={(e) => handleCategoryChange(category.name, e.target.checked)}/>
                }>
                    {category.sub_categories.map((sub_category)=>(
                    <div key={sub_category} className="d-none form-inline items-start flex-col xl:flex-row first:mt-0 first:pt-0 pb-4">
                        <div className="form-label xl:w-64 xl:!mr-10">
                            <div className="text-left">
                                <input
                                    required
                                    type="checkbox"
                                    className="form-control"
                                    checked={isSubCategoryChecked(sub_category)}
                                    onChange={(e) => handleSubCategoryChange(sub_category, e.target.checked)}
                                />&nbsp;
                                {sub_category}
                            </div>
                        </div>
                    </div>
                    ))}
                </Grid>
            ))}
            <br/>
            {saveButton}
        </Page>

        </Webmaster>
    </>)
}
export default EditCategory;