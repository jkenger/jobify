import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { BiChevronDown } from "react-icons/bi";
import { RxAvatar } from "react-icons/rx";
import { Button, buttonVariants } from "./ui/button";
import { useDashboard } from "@/pages/DashboardLayout";
import { useNavigate } from "react-router-dom";
import fetch from "@/utils/fetch";
import { Links } from "@/types";

function Logout() {
  const { user } = useDashboard();
  const navigate = useNavigate();
  async function logoutHandler() {
    await fetch.get("/auth/logout");
    navigate(Links.LOGIN, { replace: true });
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={
          buttonVariants({
            variant: "default",
          }) + " space-x-2"
        }
      >
        <span className="text-lg font-semibold">
          {user?.avatar ? (
            <Avatar>
              <AvatarImage src={user.avatar} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          ) : (
            <RxAvatar />
          )}
        </span>{" "}
        <span>{user?.name}</span> <BiChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button variant="ghost" onClick={logoutHandler}>
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Logout;
