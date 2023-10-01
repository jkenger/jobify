import Wrapper from "@/components/wrappers/Main";
import { Button, Input, toast, TitleLogo } from "@/components/ui";

import { Link, redirect, useNavigation } from "react-router-dom";
import { Form as RouterForm } from "react-router-dom";

import { CatchError, Links } from "@/types";
import fetch from "@/utils/fetch";
import { useUser } from "@/context/UserProvider";

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  try {
    await fetch.post("/auth/register", data);
    toast({
      title: "Success",
      description: "You have been registered",
    });
    return redirect("/login");
  } catch (error) {
    const err = error as CatchError;
    toast({
      title: "Error Occured",
      description: err.response.data.msg,
      variant: "destructive",
    });
    return err;
  }
};

function Register() {
  const navigation = useNavigation();
  const user = useUser();
  if (user) {
    redirect("/");
  }
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <div className="flex h-full ">
        <div className="flex flex-col justify-center items-center space-y-3 p-6 shadow-md border border-t-primary border-t-4  max-w-lg w-lg m-auto basis-full ">
          <TitleLogo />
          <h1 className="font-semibold">Register</h1>

          <RouterForm method="post" className="flex flex-col space-y-3 w-full">
            <Input id="name" name="name" type="text" placeholder="Name" />
            <Input type="text" name="lastName" placeholder="Last Name" />
            <Input type="text" name="location" placeholder="Location" />
            <Input type="text" name="email" placeholder="Email" />
            <Input type="password" name="password" placeholder="Password" />
            <Button type="submit" disabled={isSubmitting}>
              Register
            </Button>
            <div className="flex justify-center items-center space-x-2">
              <span>Already have an account?</span>
              <Link to={Links.LOGIN} className="text-primary">
                Login
              </Link>
            </div>
          </RouterForm>
        </div>
      </div>
    </Wrapper>
  );
}

export default Register;
