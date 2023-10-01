import { Links } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { MdQueryStats } from "react-icons/md";
import { IoBarChartSharp } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const links = [
  {
    text: "Add job",
    path: Links.DASHBOARD,
    icon: <FaWpforms />,
  },
  {
    text: "All jobs",
    path: Links.JOBS,
    icon: <MdQueryStats />,
  },
  {
    text: "Stats",
    path: Links.STATS,
    icon: <IoBarChartSharp />,
  },
  {
    text: "Profile",
    path: Links.PROFILE,
    icon: <ImProfile />,
  },
  {
    text: "Admin",
    path: Links.ADMIN,
    icon: <MdAdminPanelSettings />,
  },
];
