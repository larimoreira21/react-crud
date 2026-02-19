import { Camera, CircleUserRound } from 'lucide-react';

import Input from '../ui/Input';
import Button from '../ui/Button';
import FieldView from './components/FieldView';
import FieldEdit from './components/FieldEdit';

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

  const formik = props.formik;
  const fileInputRef = props.fileInputRef;

  return (
    <form onSubmit={formik.handleSubmit} className="text-left">
      <div className={`${sectionClass} flex-row gap-6 items-start`}>
        <div
          className="relative shrink-0 cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
          aria-label="Change avatar"
        >
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file)
                formik.setFieldValue('avatar', URL.createObjectURL(file));
            }}
          />

          {form.avatar ? (
            <>
              <img
                src={form.avatar}
                alt=""
                className="w-20 h-20 rounded-full object-cover border border-gray-600"
              />
              <span className="absolute -bottom-2 left-16 -translate-x-1/2 flex justify-center items-center w-6 h-6 rounded-full bg-gray-700 border border-gray-600">
                <Camera className="w-3.5 h-3.5 text-gray-300" />
              </span>
            </>
          ) : (
            <CircleUserRound className="w-20 h-20 text-gray-300" />
          )}
        </div>

        <div className={gridClass}>
          <FieldEdit
            label="First name"
            name="firstName"
            value={form.firstName}
            formik={formik}
          />
          <FieldEdit
            label="Last name"
            name="lastName"
            value={form.lastName}
            formik={formik}
          />
          <FieldEdit
            label="Email address"
            name="email"
            value={form.email}
            formik={formik}
          />
          <FieldEdit
            label="Phone number"
            name="phone"
            value={form.phone}
            formik={formik}
          />
        </div>
      </div>

      <div className={`${sectionClass} flex-col items-start`}>
        <p className="text-lg font-medium mb-4">Address information</p>
        <div className={gridClass}>
          <FieldEdit
            label="Country"
            name="country"
            value={form.country}
            formik={formik}
          />
          <FieldEdit
            label="State"
            name="state"
            value={form.state}
            formik={formik}
          />
          <FieldEdit
            label="City"
            name="city"
            value={form.city}
            formik={formik}
          />
          <FieldEdit
            label="Street address"
            name="streetAdress"
            value={form.streetAdress}
            formik={formik}
          />
          <FieldEdit
            label="Zip code"
            name="zipCode"
            value={form.zipCode}
            formik={formik}
          />
        </div>
      </div>

      <div className={`${sectionClass} flex-col items-start`}>
        <p className="text-lg font-medium mb-4">Curriculum information</p>
        <div className={gridClass}>
          <FieldEdit
            label="Job area"
            name="jobArea"
            value={form.jobArea}
            formik={formik}
          />
          <FieldEdit
            label="Job title"
            name="jobTitle"
            value={form.jobTitle}
            formik={formik}
          />
          <FieldEdit
            label="Job type"
            name="jobType"
            value={form.jobType}
            formik={formik}
          />
          <FieldEdit
            label="Job description"
            name="jobDescription"
            value={form.jobDescription}
            formik={formik}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-6 pb-4 px-8">
        {!props.isCreateMode && props.onCancel && (
          <Button
            type="button"
            variant="default"
            className="px-4 py-2"
            onClick={props.onCancel}
          >
            Cancel
          </Button>
        )}

        <Button
          type="submit"
          variant="primary"
          className="px-4 py-2"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting
            ? 'Saving...'
            : props.isCreateMode
              ? 'Create user'
              : 'Save changes'}
        </Button>
      </div>
    </form>
  );
}

export default UserForm;
