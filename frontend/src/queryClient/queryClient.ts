import { useQuery } from '@tanstack/react-query';

function useQueryClient() {
  const {isLoading, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('https://api.github.com/repos/tannerlinsley/react-query').then(
        (res) => res.json()
      ),
  });
  console.log(data);
  return { isLoading, error, data };
}

export default useQueryClient;