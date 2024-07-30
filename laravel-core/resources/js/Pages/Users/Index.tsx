import React, {useState} from 'react';
import Webmaster from '@/Layouts/Webmaster';
import { Head, Link } from '@inertiajs/react';
import { PageProps, User } from '@/types';
import Page from '@/Base-components/Page';
import { Search } from 'lucide-react';
import { Input, Select } from '@headlessui/react';
import PaginationInfo from '@/Base-components/PaginationInfo';
import UsersTable from '@/Components/Users/Table';

const Users: React.FC<PageProps<{ users: User[], from:number, to:number, total:number }>> = ({ auth, menu, users, from, to, total }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    };
    return (
        <>
            <Head title="Users" />
            <Webmaster
                user={auth.user}
                menu={menu}
                breadcrumb={<li className="breadcrumb-item active" aria-current="page">Users</li>}
            >
                <Page title="Users" header={<>
                    <Link className="btn btn-primary" href={route('users.create')}>Create a user</Link>
                        <PaginationInfo start={from} end={to} total={total}/>
                        <div className="w-full xl:w-auto flex items-center mt-3 xl:mt-0">
                            <div className="w-56 relative text-slate-500">
                                <Input type="text" className="form-control w-56 box pr-10" placeholder="Search..." value={searchTerm} onChange={handleSearchChange}/>
                                <Search className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"/> 
                            </div>
                        </div>
                </>}>
                    <UsersTable users={users} searchTerm={searchTerm}/>
                </Page>
            </Webmaster>
        </>
    );
};

export default Users;
