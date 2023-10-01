import { links } from "@/lib/utils";
import { useDashboard } from "@/pages/DashboardLayout";
import { Links, UserRole } from "@/types";

import { NavLink } from "react-router-dom";

function Navlinks({
  position = "middle",
  onShowSideBar,
}: {
  position: string;
  onShowSideBar?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const variant: { [key: string]: string } = {
    start: "flex items-center justify-start space-x-4",
    middle: "flex items-center justify-center space-x-4",
    end: "flex items-center justify-end space-x-4",
  };
  const { user } = useDashboard();
  return (
    <div className={variant[position]}>
      <ul className="dark:text-white space-y-2 font-semibold text-md text-muted-foreground">
        {links.map((link) => {
          const { text, path, icon } = link;
          const { role } = user;

          if (path === Links.ADMIN && !role.includes(UserRole.ADMIN)) return;
          return (
            <NavLink
              to={path}
              key={text}
              onClick={() => onShowSideBar?.(false)}
              className="flex items-center justify-start gap-2 "
              end
            >
              {" "}
              {icon} {text}{" "}
            </NavLink>
          );
        })}
      </ul>
    </div>
  );
}

Navlinks.defaultProps = {
  position: "middle",
};

export default Navlinks;
