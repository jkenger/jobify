import { FormRowInput } from "@/components";
import {
  Button,
  Description,
  Heading,
  Input,
  Separator,
  SpaceRow,
  toast,
} from "@/components/ui";
import { CatchError, DashboardContextType, IAction, QueryKeys } from "@/types";
import fetch from "@/utils/fetch";
import { QueryClient } from "@tanstack/react-query";

import { Form, useNavigation, useOutletContext } from "react-router-dom";

export const action =
  (queryClient: QueryClient) =>
  async ({ request }: IAction) => {
    const formData = await request.formData();
    const file = formData.get("avatar") as File;
    if (file && file.size > 500000) {
      toast({
        title: "Error",
        description: "File is too large",
      });
      return null;
    }

    try {
      await fetch.patch("/users/update-user", formData);

      toast({
        title: "Success",
        description: "Profile updated",
      });
      queryClient.invalidateQueries([QueryKeys.USER]);
    } catch (err) {
      const error = err as CatchError;
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response.data.msg,
      });
    }

    return null;
  };

function Profile() {
  const { user } = useOutletContext<DashboardContextType>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <SpaceRow>
        <Heading>Profile</Heading>
        <Description>
          Your hub for personalization and control. Customize your preferences
          and access your account details effortlessly from your dedicated
          profile page.
        </Description>
      </SpaceRow>
      <Separator className="my-6" />
      <div className="flex flex-col max-w-2xl">
        <Form method="post" className="space-y-8" encType="multipart/form-data">
          <SpaceRow>
            <label htmlFor="avatar">Select an image file (max 0.5 MB)</label>
            <Input type="file" name="avatar" id="avatar" accept="image/*" />
          </SpaceRow>
          <FormRowInput
            name="name"
            labelText="Name *"
            defaultValue={user.name}
            descriptionText="Enter the name title for this job posting."
          />
          <FormRowInput
            name="lastName"
            labelText="Last Name *"
            defaultValue={user.lastName}
            descriptionText="Enter the lastName name for this job posting."
          />

          <FormRowInput
            name="email"
            labelText="Email"
            defaultValue={user.email}
            descriptionText="Enter the email for this job posting."
          />
          <FormRowInput
            name="location"
            labelText="Location"
            defaultValue={user.location}
            descriptionText="Enter the email for this job posting."
          />

          <Button type="submit" disabled={isSubmitting}>
            Save Profile
          </Button>
        </Form>
      </div>
    </>
  );
}

export default Profile;
