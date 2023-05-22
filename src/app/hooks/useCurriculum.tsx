import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import fetcher from "../services/fetchers";
import { IExperience } from "@/models/IExperience.model";
import { analizeDescription } from "../services/check/analizeDescription";
import { ICheckDescription } from "@/models/CheckDescription.model";
export default function useCurriculum(): {
  curriculums: {
    experience: IExperience[];
  } | undefined;
  isLoading: boolean;
  isError: any;
  trigger: (body: ICheckDescription) => any;
  isMutating: boolean;
} {
  const { data, isLoading, error } = useSWR<{
    dataExperience: {
      experience: IExperience[];
    };
  }>("api/curriculum", fetcher);
  const { trigger, isMutating } = useSWRMutation(
    "api/check",
    analizeDescription
  );
  return {
    curriculums: data?.dataExperience,
    isLoading,
    isError: error,
    trigger,
    isMutating,
  };
}
