import { useInfiniteQuery } from "@tanstack/react-query";

type IUsePaginatedQueryProps<T> = {
  limit: number;
  getResourceFn: (pageParam: number) => Promise<T>; // Ajout de Promise<T> car getResourceFn est asynchrone
  queryKey: Array<string | number>;
};

export const usePaginatedQuery = <T>({
  getResourceFn,
  limit,
  queryKey,
}: IUsePaginatedQueryProps<T>) => {
  const {
    data,
    isError,
    isLoading,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: async ({ pageParam }: { pageParam: number }) =>
      await getResourceFn(pageParam), // pageParam === pageNumber}
    getNextPageParam: (lastPage: any, allPages: any) => {
      const nextPage =
        lastPage.length === limit ? allPages.length + 1 : undefined;
      return nextPage;
    },
    initialPageParam: 1,
  });

  return {
    data,
    isError,
    isLoading,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch
  };
};
