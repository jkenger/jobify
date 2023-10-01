export interface IAction {
  request: Request;
}

export interface IStats {
  defaultStats: IDefaultStats;

  monthlyApplications: IMonthlyApplications[];
}

export interface IMonthlyApplications {
  date: string;
  count: number;
}

export interface IDefaultStats {
  [key: string]: number;
}

export interface IAdminLoader {
  users: number;
  jobs: number;
}

export interface CurrentUser {
  _id: string;
  name: string;
  email: string;
  lastName: string;
  location: string;
  role: string[];
  avatar: string;
  avatarPublicId: string;
}

export interface IJobs {
  jobs: IJob[];
  totalJobs: number;
  totalPages: number;
  numOfPages: number;
  currentPage: number;
  limit: number;
}

export interface IJob {
  _id: string;
  company: string;
  position: string;
  jobStatus: string;
  jobType: string;
  jobLocation: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ILoader<T> {
  data: {
    success: boolean;
    message: T;
  };
}

export interface DashboardContextType {
  user: CurrentUser;
  showSidebar: boolean;
  toggleSidebar: () => void;
  logoutUser: () => void;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface Response {
  response: {
    data: {
      message?: string;
      msg?: string;
    };
  };
}
export interface CatchError extends Response {}

export interface Exception {
  error: Response;
}

// Enums
export enum Links {
  HOME = "/",
  LOGIN = "/login",
  REGISTER = "/register",
  DASHBOARD = "/dashboard",

  JOBS = "/dashboard/jobs",
  JOB = "/job",
  CREATE_JOB = "/create-job",
  EDIT_JOB = "/dashboard/edit-job",
  DELETE_JOB = "/dashboard/delete-job",
  STATS = "/dashboard/stats",
  PROFILE = "/dashboard/profile",
  ADMIN = "/dashboard/admin",

  EDIT_PROFILE = "/edit-profile",

  NOT_FOUND = "/not-found",
}

export enum JobStatus {
  INTERVIEW = "interview",
  PENDING = "pending",
  REJECTED = "rejected",
}

export enum JobType {
  FULL_TIME = "full-time",
  PART_TIME = "part-time",
  INTERNSHIP = "internship",
}

export enum JobSort {
  NEWEST = "newest",
  OLDEST = "oldest",
  AZ = "a-z",
  ZA = "z-a",
}

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}
