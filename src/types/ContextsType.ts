import { DisplayOffer } from "./DisplayOffer";
import { LoggedUser } from "./LoggedUser";
import { Application } from "./Application";
import { SortType } from "./SortType";

export interface ContextsType {
  jobs: DisplayOffer[];
  overwriteJobs: (value: DisplayOffer[]) => void;
  addJob: (job: any) => void;
  removeJob: (id: string) => void;
  loggedUser: LoggedUser;
  handleLogin: (loginDetails: LoggedUser) => void;
  handleLogout: () => void;
  loggedAsAdmin: boolean;
  applications: Application[];
  overwriteApplications: (value: Application[]) => void;
  addApplication: (application: Application) => void;
  sortJobs: (sortType: SortType) => void;
}
