import Wrapper from "@/components/wrappers/SmallSidebar";
import { Button } from "./ui/button";
import { FaTimes } from "react-icons/fa";
import TitleLogo from "./ui/titlelogo";
import { useDashboard } from "@/pages/DashboardLayout";
import Navlinks from "./Navlinks";

function SmallSidebar() {
  const { toggleSidebar } = useDashboard();
  const { setShowSidebar } = useDashboard();

  return (
    <Wrapper>
      <div className=" p-4 w-full h-full">
        <div className="space-y-8">
          <Button type="button" onClick={toggleSidebar}>
            <FaTimes />
          </Button>
          <header className="w-full mx-auto">
            <TitleLogo position="middle" />
          </header>
          <Navlinks onShowSideBar={setShowSidebar} />
        </div>
      </div>
    </Wrapper>
  );
}

export default SmallSidebar;
