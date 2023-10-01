import Wrapper from "@/components/wrappers/Main";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import TitleLogo from "@/components/ui/titlelogo";
import { Links } from "@/types";
import { FieldValues, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function Register() {
  const form = useForm();

  function onSubmit(data: FieldValues) {
    console.log(data);
  }
  return (
    <Wrapper>
      <div className="flex h-full ">
        <div className="flex flex-col justify-center items-center space-y-3 p-6 shadow-md border border-t-primary border-t-4  max-w-lg w-lg m-auto basis-full ">
          <TitleLogo />
          <h1 className="font-semibold">Register</h1>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-3 w-full"
            >
              <FormField
                control={form.control}
                name="name"
                defaultValue=""
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        id="name"
                        type="text"
                        placeholder="Name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                defaultValue=""
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Last Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                defaultValue=""
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Location" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                defaultValue=""
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                defaultValue=""
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Register</Button>
              <div className="flex justify-center items-center space-x-2">
                <span>Already have an account?</span>
                <Link to={Links.LOGIN} className="text-primary">
                  Login
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Wrapper>
  );
}

export default Register;
