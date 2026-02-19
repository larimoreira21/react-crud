import { useNavigate, useParams } from 'react-router-dom';

import Button from '../../components/ui/Button';
import Loading from '../../components/ui/Loading';
import UserForm, { UserFormMode } from '../../components/UserForm';

import { useUser } from '../../hooks/useUser';

function UserDetails() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { userDetails, isLoadingUserDetails } = useUser({ id });

  if (isLoadingUserDetails) {
    return <Loading fullScreen />;
  }

  if (!userDetails) {
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
        <p className="text-3xl font-bold">User details</p>
        <Button variant="default" onClick={() => navigate('/')}>
          Back
        </Button>
      </div>

      <UserForm
        form={userDetails}
        mode={UserFormMode.View}
        onEditClick={() => navigate(`/user/${id}/edit`)}
      />
    </div>
  );
}

export default UserDetails;
