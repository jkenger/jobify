import Wrapper from "@/components/wrappers/Navbar";
import { FaAlignLeft } from "react-icons/fa";
import TitleLogo from "./ui/titlelogo";
import { Button } from "./ui/button";
import { useDashboard } from "@/pages/DashboardLayout";
import Logout from "./Logout";

function Navbar() {
  const { toggleSidebar } = useDashboard();
  return (
    <Wrapper>
      <div className="dark:text-white flex justify-between items-center w-full gap-2">
        <Button type="button" onClick={toggleSidebar}>
          <FaAlignLeft />
        </Button>
        <div className="md:hidden">
          <TitleLogo position="middle" />
        </div>
        <div className="hidden md:block">
          <h1 className="text-primary font-bold text-lg dark:text-white">
            Dashboard
          </h1>
        </div>
        <div className="flex items-center justify-center space-x-2">
          {/* <ModeToggle /> */}
          <Logout />
        </div>
      </div>
    </Wrapper>
  );
}

export default Navbar;
