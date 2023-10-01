import { toast } from "@/components/ui";
import { CatchError, Links } from "@/types";
import fetch from "@/utils/fetch";
import { Params, redirect } from "react-router-dom";

export async function action({ params }: { params: Params }) {
  const id = params.id;
  try {
    await fetch.delete(`/jobs/${id}`);
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
}
