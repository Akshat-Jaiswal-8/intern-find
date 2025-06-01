import { apiCaller } from '@/lib/api-caller';
import type { InternshipData } from '@/types/internship';

export const getInternships = async (): Promise<InternshipData> => {
  const { data } = await apiCaller.get<InternshipData>('hiring/search/');
  console.log(data);

  return data;
};
