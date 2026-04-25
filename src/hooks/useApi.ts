import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import client from '../api/client';

export const useApiQuery = <T>(
  key: string[],
  url: string,
  options?: Omit<UseQueryOptions<T, Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<T, Error>({
    queryKey: key,
    queryFn: async () => {
      try {
        const { data } = await client.get<T>(url);
        return data;
      } catch (error) {
        throw error;
      }
    },
    ...options,
  });
};

export const useApiMutation = <T, TVariables>(
  url: string,
  method: 'post' | 'put' | 'delete' = 'post',
  options?: UseMutationOptions<T, Error, TVariables>
) => {
  return useMutation<T, Error, TVariables>({
    mutationFn: async (variables) => {
      try {
        const { data } = await client[method]<T>(url, variables);
        return data;
      } catch (error) {
        throw error;
      }
    },
    ...options,
  });
};
