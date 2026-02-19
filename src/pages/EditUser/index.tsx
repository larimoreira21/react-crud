import { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Button from '../../components/ui/Button';
import Loading from '../../components/ui/Loading';
import UpdateUserForm from '../CreateUser/components/UpdateUserForm';

import type { User } from '../../types/user';
import { useUser } from '../../hooks/useUser';

function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { userDetails, isLoadingUserDetails } = useUser({ id });

  if (isLoadingUserDetails) {
    return <Loading fullScreen />;
  }

  if (!userDetails && id) {
    return (
      <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center bg-black text-white gap-4">
        <p>User not found</p>
        <Button variant="default" onClick={() => navigate('/')}>
          Back to list
        </Button>
      </div>
    );
  }

  return (
    <div className="w-[100vw] min-h-[100vh] pt-4 bg-black">
      <div className="flex justify-between items-center border border-gray-600 rounded-md mx-8 mb-2 p-4">
        <p className="text-3xl font-bold">Edit user</p>
        <Button variant="default" onClick={() => navigate(`/user/${id}`)}>
          Back
        </Button>
      </div>

      <UpdateUserForm
        id={id}
        initialValues={userDetails as User}
        isCreateMode={false}
        fileInputRef={fileInputRef}
        setIsEditing={() => navigate(`/user/${id}`)}
      />
    </div>
  );
}

export default EditUser;
