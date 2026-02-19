import type { FormikProps } from 'formik';
import type { UserFormValues } from '../schemas/userSchema';

export function getError(
  errors: FormikProps<UserFormValues>['errors'],
  name: string
): string | undefined {
  const error = (errors as Record<string, unknown>)[name];
  return typeof error === 'string' ? error : undefined;
}

export function getTouched(
  touched: FormikProps<UserFormValues>['touched'],
  name: string
): boolean {
  return Boolean((touched as Record<string, unknown>)[name]);
}
