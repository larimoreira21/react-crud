import { z } from 'zod';

export const userFormSchema = z.object({
  firstName: z.string().min(3, 'First name is required'),
  lastName: z.string().min(3, 'Last name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  phone: z.string().min(1, 'Phone is required'),
  avatar: z.string(),
  jobArea: z.string().min(1, 'Job area is required'),
  jobTitle: z.string().min(1, 'Job title is required'),
  jobType: z.string().min(1, 'Job type is required'),
  jobDescription: z.string().min(1, 'Job description is required'),
  country: z.string().min(1, 'Country is required'),
  city: z.string().min(1, 'City is required'),
  streetAdress: z.string().min(1, 'Street address is required'),
  zipCode: z.string().min(1, 'Zip code is required'),
  state: z.string().min(1, 'State is required'),
});

export type UserFormValues = z.infer<typeof userFormSchema>;

export function validateUserForm(
  values: UserFormValues
): Record<string, string> {
  const parsed = userFormSchema.safeParse(values);

  if (parsed.success) return {};

  const result: Record<string, string> = {};
  for (const issue of parsed.error.issues) {
    const key = issue.path[0];
    if (key != null && typeof key === 'string' && !(key in result)) {
      result[key] = issue.message;
    }
  }

  return result;
}
