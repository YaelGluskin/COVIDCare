import { useGetClientsQuery } from "../features/clients/clientsApiSlice"
import { useGetDiseasesQuery } from "../features/disease/diseasesApiSlice"
import { useGetVaccinesQuery } from "../features/vaccine/vaccinesApiSlice"

export const useClientDataQuery = () => {
  const { 
    data: clientsData } = useGetClientsQuery(
    undefined, {
        pollingInterval: 60000, // the interval (in milliseconds) at which the query should poll the server for updates
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });
  const { data: diseasesData } = useGetDiseasesQuery(
    undefined, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });
  const { data: vaccinesData } = useGetVaccinesQuery(
    undefined, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

  return { clientsData, diseasesData, vaccinesData };
}
