import { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import Button from '../../components/ui/Button';
import UpdateUserForm from './components/UpdateUserForm';

import type { User } from '../../types/user';

const initialForm: User = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  avatar: '',
  jobArea: '',
  jobTitle: '',
  jobType: '',
  jobDescription: '',
  country: '',
  city: '',
  streetAdress: '',
  zipCode: '',
  state: '',
};

function CreateUser() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const isCreateMode = !id;

  return (
    <>
      <div className="w-[100vw] h-[100vh] justify-center items-center text-center pt-4 bg-black">
        <div className="flex items-center justify-between mb-10 border rounded-md border-gray-600 mx-8 mb-2 p-4">
          <p className="text-3xl font-bold">
            {isCreateMode ? 'Create user' : 'Edit user'}
          </p>

          <Button variant="default" onClick={() => navigate('/')}>
            Back
          </Button>
        </div>

        <UpdateUserForm
          id={id}
          initialValues={initialForm}
          isCreateMode={isCreateMode}
          fileInputRef={fileInputRef}
        />
      </div>
    </>
  );
}

export default CreateUser;
