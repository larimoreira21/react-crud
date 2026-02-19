import { useQuery } from '@tanstack/react-query';

import { getUsers, getPaginatedUsers, getUser } from '../services/user';
import queryKeys from '../helpers/queryKeys';

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

  return {
    userDetails,
    isLoadingUserDetails: isLoadingUserDetails,
    items,
    totalItems,
    isLoading: isLoadingItems || isLoadingTotal,
    refetch,
    refetchTotal,
  };
}
