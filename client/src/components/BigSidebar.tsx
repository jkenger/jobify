import Wrapper from "./../components/wrappers/BigSidebar";
import Navlinks from "./Navlinks";
import TitleLogo from "./ui/titlelogo";

function BigSidebar() {
  return (
    <Wrapper>
      <div className="p-4">
        <div className="space-y-6">
          <header className="w-full mx-auto p-4">
            <TitleLogo position="middle" />
          </header>
          <Navlinks position="middle" />
        </div>
      </div>
    </Wrapper>
  );
}

export default BigSidebar;
