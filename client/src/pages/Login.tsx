import Wrapper from "@/components/wrappers/Main";
import { Button, Input, TitleLogo, toast } from "@/components/ui";

import {
  Link,
  Form,
  useNavigation,
  redirect,
  useActionData,
  useNavigate,
} from "react-router-dom";

import { CatchError, Links, QueryKeys } from "@/types";
import fetch from "@/utils/fetch";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

type Errors = {
  msg: string | undefined;
};

function Login() {
  const navigate = useNavigate();
  const errors = useActionData() as Errors;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const queryClient = useQueryClient();

  const loginTestUser = async () => {
    try {
      await fetch.post("/auth/login", {
        email: "john.doe@example.com",
        password: "securepass123",
      });
      toast({
        title: "Success",
        description: "You have been logged in",
      });
      queryClient.invalidateQueries([QueryKeys.USER]);
      queryClient.invalidateQueries([QueryKeys.JOBS]);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err = error as CatchError;
      errors.msg = err.response.data.msg;
    }
  };

  return (
    <Wrapper>
      <div className="flex h-full ">
        <div className="flex flex-col justify-center items-center space-y-3 p-6 shadow-md border border-t-primary border-t-4  max-w-lg w-lg m-auto basis-full ">
          <TitleLogo />
          <h1 className="font-semibold">Login</h1>
          {errors?.msg && (
            <div className="text-red-500 text-sm">{errors?.msg}</div>
          )}
          <Form method="post" className="flex flex-col space-y-3 w-full">
            <Input type="text" name="email" placeholder="Email" />
            <Input type="password" name="password" placeholder="Password" />
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
            <Button
              type="button"
              disabled={isSubmitting}
              onClick={loginTestUser}
            >
              Explore the app
            </Button>
            <div className="flex justify-center items-center space-x-2">
              <span>Not a member yet?</span>
              <Link
                to={Links.REGISTER}
                aria-disabled={isSubmitting}
                className="text-primary"
              >
                Register
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </Wrapper>
  );
}

export const action =
  (queryClient: QueryClient) =>
  async ({ request }: { request: Request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());
    const errors = { msg: "" };
    if (data.password.length < 3) {
      errors.msg = "Password must be at least 3 characters long";
      return errors;
    }
    try {
      await fetch.post("/auth/login", data);
      toast({
        title: "Success",
        description: "You have been logged in",
      });
      queryClient.invalidateQueries([QueryKeys.USER]);
      queryClient.invalidateQueries([QueryKeys.JOBS]);

      return redirect("/dashboard");
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err = error as any;
      errors.msg = err.response.data.msg;
      return errors;
    }
  };

export default Login;
