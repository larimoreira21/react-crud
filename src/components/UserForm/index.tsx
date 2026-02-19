import { CircleUserRound } from 'lucide-react';

import Button from '../ui/Button';
import FieldView from './components/FieldView';

import type { FormikProps } from 'formik';
import type { User } from '../../types/user';
import type { UserFormValues } from '../../schemas/userSchema';

export enum UserFormMode {
  View = 'view',
  Edit = 'edit',
}

export type UserFormProps =
  | { form: User; mode: UserFormMode.View; onEditClick?: () => void }
  | {
      mode: UserFormMode.Edit;
      formik: FormikProps<UserFormValues>;
      fileInputRef: React.RefObject<HTMLInputElement | null>;
      onCancel?: () => void;
      isCreateMode: boolean;
    };

function UserForm(props: UserFormProps) {
  const isView = props.mode === UserFormMode.View;
  const form = isView ? props.form : (props.formik.values as User);

  const sectionClass = 'flex border border-gray-600 rounded-md p-8 mt-6 mx-8';
  const gridClass = 'grid grid-cols-4 gap-6 w-full';

  if (isView) {
    return (
      <>
        <div
          className={`${sectionClass} flex-row gap-6 items-start justify-between`}
        >
          <div className="flex items-center gap-3 flex-1">
            {form.avatar ? (
              <img
                src={form.avatar}
                alt=""
                className="w-20 h-20 rounded-full object-cover border border-gray-600"
              />
            ) : (
              <CircleUserRound className="w-20 h-20 text-gray-300" />
            )}

            <div>
              <p className="text-white">
                {[form.firstName, form.lastName].filter(Boolean).join(' ') ||
                  '—'}
              </p>
              <p className="text-gray-400 text-sm">
                {form.email} – {form.phone}
              </p>
            </div>
          </div>

          {props.onEditClick && (
            <Button
              variant="default"
              className="px-4 py-2 shrink-0"
              onClick={props.onEditClick}
            >
              Edit
            </Button>
          )}
        </div>

        <div className={`${sectionClass} flex-col items-start`}>
          <p className="text-lg font-medium mb-4">Address information</p>
          <div className={gridClass}>
            <FieldView label="Country" value={form.country} />
            <FieldView label="State" value={form.state} />
            <FieldView label="City" value={form.city} />
            <FieldView label="Street address" value={form.streetAdress} />
            <FieldView label="Zip code" value={form.zipCode} />
          </div>
        </div>

        <div className={`${sectionClass} flex-col items-start`}>
          <p className="text-lg font-medium mb-4">Curriculum information</p>
          <div className={gridClass}>
            <FieldView label="Job area" value={form.jobArea} />
            <FieldView label="Job title" value={form.jobTitle} />
            <FieldView label="Job type" value={form.jobType} />
            <FieldView label="Job description" value={form.jobDescription} />
          </div>
        </div>
      </>
    );
  }

  return <></>;
}

export default UserForm;
