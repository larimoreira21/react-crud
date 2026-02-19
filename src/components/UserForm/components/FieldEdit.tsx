import type { FormikProps } from 'formik';

import Input from '../../ui/Input';

import { getError, getTouched } from '../../../helpers/formik';
import type { UserFormValues } from '../../../schemas/userSchema';

const inputClass =
  'w-full px-4 py-2 rounded-md border border-gray-600 bg-[#0d0d0d] focus:bg-[#4a4a4a] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500';

function FieldEdit({
  label,
  name,
  value,
  formik,
}: {
  label: string;
  name: string;
  value: string;
  formik: FormikProps<UserFormValues>;
}) {
  const error = getError(formik.errors, name);
  const showError = error && getTouched(formik.touched, name);

  return (
    <div className="flex flex-col items-start">
      <label htmlFor={name} className="text-sm font-medium text-gray-400 mb-1">
        {label}
      </label>

      <Input
        id={name}
        name={name}
        type="text"
        value={value}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        variant="outline"
        className={inputClass}
        placeholder={label}
        aria-invalid={showError ? true : undefined}
      />

      {showError && (
        <p className="text-red-400 text-sm mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default FieldEdit;
