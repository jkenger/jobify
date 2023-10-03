import { toast } from "@/components/ui";
import { CatchError, Links, QueryKeys } from "@/types";
import fetch from "@/utils/fetch";
import { QueryClient } from "@tanstack/react-query";
import { Params, redirect } from "react-router-dom";

export const action =
  (queryClient: QueryClient) =>
  async ({ params }: { params: Params }) => {
    const id = params.id;
    try {
      await fetch.delete(`/jobs/${id}`);
      queryClient.invalidateQueries([QueryKeys.JOBS]);
      toast({
        title: "Success",
        description: "Job deleted successfully",
      });
    } catch (err) {
      const error = err as CatchError;
      toast({
        title: "Error",
        variant: "destructive",
        description: error.response.data.msg,
      });
    }
    return redirect(Links.JOBS);
  };
