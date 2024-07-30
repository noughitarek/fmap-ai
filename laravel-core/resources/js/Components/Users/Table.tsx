import React, { ReactNode, useState, useEffect } from 'react';
import { User } from '@/types';
import Pagination from '@/Base-components/Pagination';
import { AtSign, Blocks, Calendar, CheckSquare, Hash, MapPin, Phone, Trash2, UserCog, User as UserIcon} from 'lucide-react';
import { Link, router, useForm } from '@inertiajs/react';
import { Button } from '@headlessui/react';
import DeleteModal from '@/Components/DeleteModal';
import { toast } from 'react-toastify';

interface PageProps {
    users: User[];
    searchTerm?: string;
}

const UsersTable: React.FC<PageProps> = ({ users, searchTerm }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const { data, setData, delete: deleteEntry } = useForm<{ user: number }>({ user: 0 });

    const [shownUsers, setShownUsers] = useState(users)
    useEffect(() => {
        if (searchTerm) {
          const filteredUsers = users.filter(
            (item) =>
                (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.role && item.role.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.created_by && item.created_by.name.toLowerCase().includes(searchTerm.toLowerCase()))
          );
          setShownUsers(filteredUsers);
        } else {
          setShownUsers(users);
        }
      }, [users, searchTerm]);
      const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>, userID: number) => {
        event.preventDefault();
        setData({ user: userID });
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = () => {
        setDeleting(true);

        deleteEntry(route('users.destroy', {user: data.user}), {
            data: {user: data.user},
            onSuccess: () => {
                toast.success('Utilisateur supprimé avec succès');
                router.get(route('users.index'));
            },
            onError: (error) => {
                toast.error('Erreur lors de la suppression de l\'utilisateur');
                setDeleting(false);
                console.error('Error:', error);
            },
        });
        setShowDeleteModal(false);
    };

    const handleDeleteCancel = () => {
        setShowDeleteModal(false);
    };
    return (<>
        <div className="intro-y col-span-12 overflow-auto 2xl:overflow-visible">
            <table className="table table-report -mt-2">
                <thead>
                    <tr>
                        <th className="whitespace-nowrap">
                            <input className="form-check-input" type="checkbox" />
                        </th>
                        <th className="whitespace-nowrap">#</th>
                        <th className="text-center whitespace-nowrap">Information</th>
                        <th className="text-center whitespace-nowrap">Permissions</th>
                        <th className="text-center whitespace-nowrap">Created</th>
                        <th className="text-center whitespace-nowrap">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        shownUsers.map((user)=>{
                            return (<tr className="intro-x" key={user.id}>
                                <td className="w-10">
                                    <input className="form-check-input" type="checkbox" />
                                </td>
                                <td className="!py-3.5">
                                    <div className="flex items-center">
                                        <div className="ml-4">
                                            <div className="flex items-center">
                                                <Hash className="h-4 w-4 text-gray-500 mr-1" />
                                                <span className="text-gray-500">{user.id}</span>
                                            </div>
                                            <div className="flex items-center mt-1">
                                                <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                                                <span className="text-gray-500">
                                                {new Date(user.updated_at).toLocaleString('en-GB', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    second: '2-digit'
                                                })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-3.5">
                                    <div className="flex items-center">
                                        <div className="ml-4">
                                            <div className="flex items-center mt-1">
                                                <Blocks className="h-4 w-4 text-gray-500 mr-1" />
                                                <span className="text-gray-500">{user.name}</span>
                                            </div>
                                            <div className="flex items-center mt-1">
                                                <AtSign className="h-4 w-4 text-gray-500 mr-1" />
                                                <span className="text-gray-500">{user.email}</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="!py-3.5">
                                    <div className="flex items-center">
                                        <div className="ml-4">
                                            <div className="flex items-center mt-1">
                                                <UserCog className="h-4 w-4 text-gray-500 mr-1" />
                                                <span className="text-gray-500">{user.role}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <UserCog className="h-4 w-4 text-gray-500 mr-1" />
                                                <span className="text-gray-500">{user.permissions}</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-3.5">
                                    <div className="flex items-center">
                                        <div className="ml-4">
                                            <div className="flex items-center mt-1">
                                                <UserIcon className="h-4 w-4 text-gray-500 mr-1" />
                                                <span className="text-gray-500">{user.created_by ? user.created_by.name : 'System'}</span>
                                            </div>
                                            <div className="flex items-center mt-1">
                                                <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                                                <span className="text-gray-500">
                                                {new Date(user.created_at).toLocaleString('en-GB', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    second: '2-digit'
                                                })}</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="table-report__action w-56">
                                    <div className="flex justify-center items-center">
                                        <Link className="flex items-center mr-3" href={route('users.edit', { user: user.id })}>
                                            <CheckSquare className="w-4 h-4 mr-1"/> Modifier
                                        </Link>
                                        <Button className="flex items-center text-danger" onClick={(event) => handleDeleteClick(event, user.id)}>
                                            <Trash2 className="w-4 h-4 mr-1" /> Supprimer
                                        </Button>
                                    </div>
                                </td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>
            <DeleteModal showDeleteModal={showDeleteModal} handleDeleteCancel={handleDeleteCancel} handleDeleteConfirm={handleDeleteConfirm} deleting={deleting}/>
        </div>
    </>

    );
};

export default UsersTable;
