import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import {
  getUsers,
  getPaginatedUsers,
  getUser,
  deleteUser,
  createUser,
  updateUser,
  uploadImage,
} from '../services/user';
import queryKeys from '../helpers/queryKeys';
import type { User } from '../types/user';
import { useNavigate } from 'react-router-dom';

export function useUser({
  id,
  page,
  limit,
  search,
}: {
  id?: string;
  page?: number;
  limit?: number;
  search?: string;
}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: userDetails, isLoading: isLoadingUserDetails } = useQuery({
    queryKey: [queryKeys.UserDetails, id ?? ''],
    queryFn: () => getUser(id!),
    enabled: !!id,
  });

  const {
    data: totalItems,
    refetch: refetchTotal,
    isLoading: isLoadingTotal,
  } = useQuery({
    queryKey: [queryKeys.usersTotal],
    queryFn: getUsers,
    select: (data) => {
      return data.length ?? 0;
    },
  });

  const {
    data: items,
    refetch,
    isLoading: isLoadingItems,
  } = useQuery({
    queryKey: [queryKeys.users, page, limit, search],
    queryFn: () => getPaginatedUsers(page, limit, search),
    select: (data) => data ?? [],
  });

  const { mutateAsync: handleDeleteUser, isPending: isDeleting } = useMutation(
    async (id: string): Promise<void> => {
      await deleteUser(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [queryKeys.users] });
        queryClient.invalidateQueries({ queryKey: [queryKeys.usersTotal] });

        toast.success('User deleted successfully');
      },
      onError: () => {
        toast.error('Failed to delete user');
      },
    }
  );

  const { mutateAsync: handleCreateUser, isPending: isCreatingUser } =
    useMutation(
      async (data: User) => {
        await createUser(data);
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [queryKeys.users] });
          queryClient.invalidateQueries({ queryKey: [queryKeys.usersTotal] });

          toast.success('User created successfully');
          navigate('/');
        },
        onError: () => {
          toast.error('Failed to create user');
        },
      }
    );

  const { mutateAsync: handleUpdateUser, isPending: isUpdatingUser } =
    useMutation(
      async ({ id, data }: { id: string; data: User }) => {
        await updateUser(id, data);
      },
      {
        onSuccess: (_, variables) => {
          queryClient.invalidateQueries({ queryKey: [queryKeys.users] });
          queryClient.invalidateQueries({
            queryKey: [queryKeys.UserDetails, variables.id],
          });

          toast.success('User updated successfully');
          navigate('/');
        },
        onError: () => {
          toast.error('Failed to update user');
        },
      }
    );

  const { mutateAsync: handleUploadImage, isPending: isUploadingImage } =
    useMutation(
      async (file: File) => {
        return uploadImage(file);
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [queryKeys.users] });
          queryClient.invalidateQueries({ queryKey: [queryKeys.usersTotal] });
        },
        onError: () => {
          toast.error('Failed to upload image');
        },
      }
    );

  return {
    userDetails,
    isLoadingUserDetails: isLoadingUserDetails,
    items,
    totalItems,
    isLoading: isLoadingItems || isLoadingTotal,
    refetch,
    refetchTotal,
    handleDeleteUser,
    isDeleting,
    handleCreateUser,
    isCreatingUser,
    handleUpdateUser,
    isUpdatingUser,
    handleUploadImage,
    isUploadingImage,
  };
}
