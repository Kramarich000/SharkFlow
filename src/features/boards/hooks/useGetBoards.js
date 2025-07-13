import { useQuery } from '@tanstack/react-query';
import { getBoards } from '..';

export const useBoards = () => {
  return useQuery({ queryKey: ['boards'], queryFn: getBoards });
};
