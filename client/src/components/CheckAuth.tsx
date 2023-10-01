import { Links } from "@/types";
import fetch from "@/utils/fetch";
import { Navigate, Outlet, useLoaderData } from "react-router-dom";

export const loader = async () => {
  try {
    const user = await fetch.get("/users/current-user");
    return user;
  } catch (error) {
    return { error };
  }
};

function CheckAuth() {
  const user = useLoaderData();

  console.log(user);
  return (
    <>{!user ? <Outlet /> : <Navigate to={Links.LOGIN} replace={true} />}</>
  );
}

export default CheckAuth;
