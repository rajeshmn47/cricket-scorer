import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createMatch as createMatchAPI } from "@/services/match";

export function useCreateMatch() {
  const queryClient = useQueryClient();

  const { mutate: createMatch, isPending } = useMutation({
    mutationFn: createMatchAPI,
    onSuccess: () => {
      toast.success("Match successfully created");
      queryClient.invalidateQueries({ queryKey: ["allMatches"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createMatch, isPending };
}
