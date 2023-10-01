import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "./button";
import { Form } from "react-router-dom";
import { Links } from "@/types";

type Props = {
  children: React.ReactNode;
  id: string;
};

function DeleteDialog({ children, id }: Props) {
  return (
    <Dialog>
      <DialogTrigger
        className={buttonVariants({
          variant: "default",
          size: "sm",
        })}
      >
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Form method="delete" action={`${Links.DELETE_JOB}/${id}`}>
            <Button type="submit" variant="destructive">
              Delete
            </Button>
          </Form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteDialog;
