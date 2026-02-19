import { Formik } from 'formik';

import UserForm, { UserFormMode } from '../../../components/UserForm';

import { useUser } from '../../../hooks/useUser';
import { validateUserForm } from '../../../schemas/userSchema';

import type { User } from '../../../types/user';
import type { UserFormValues } from '../../../schemas/userSchema';

interface UpdateUserFormProps {
  id?: string;
  initialValues: User;
  isCreateMode: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  setIsEditing?: (isEditing: boolean) => void;
}

function UpdateUserForm({
  id,
  initialValues,
  isCreateMode,
  fileInputRef,
  setIsEditing,
}: UpdateUserFormProps) {
  const {
    handleUploadImage,
    handleCreateUser,
    handleUpdateUser,
    isCreatingUser,
    isUpdatingUser,
  } = useUser({ id });

  const isSubmitting = isCreatingUser || isUpdatingUser;

  return (
    <Formik<UserFormValues>
      initialValues={initialValues as UserFormValues}
      validate={validateUserForm}
      onSubmit={async (values) => {
        const payload: User = { ...values };

        try {
          if (fileInputRef.current?.files?.[0]) {
            const url = await handleUploadImage(fileInputRef.current.files[0]);
            payload.avatar = url;
          }

          if (!id) {
            return await handleCreateUser(payload);
          }

          return await handleUpdateUser({ id: id!, data: payload });
        } catch (err) {
          console.error(err);
        }
      }}
      enableReinitialize
    >
      {(formik) => (
        <UserForm
          mode={UserFormMode.Edit}
          formik={{
            ...formik,
            isSubmitting: formik.isSubmitting || isSubmitting,
          }}
          fileInputRef={fileInputRef}
          onCancel={isCreateMode ? undefined : () => setIsEditing?.(false)}
          isCreateMode={isCreateMode}
        />
      )}
    </Formik>
  );
}

export default UpdateUserForm;
