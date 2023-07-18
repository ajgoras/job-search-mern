import { createContext, useState } from "react";
import { DisplayOffer } from "../types/DisplayOffer";
import { LoggedUser, defaultLoggedUserState } from "../types/LoggedUser";
import { Application } from "../types/Application";
import { SortType } from "../types/SortType";
import { getOnlyNumbersFromString } from "../functions/getOnlyNumbersFromString";

export const Contexts = createContext<any>(null);

export function ContextsProvider({ children }: any) {
  //jobsProvider
  const [jobs, setJobs] = useState<DisplayOffer[]>([]);
  //loggedUserProvider
  const [loggedUser, setLoggedUser] = useState<LoggedUser>(() => {
    const sessionStorageValue = sessionStorage.getItem("loggedUser");
    if (sessionStorageValue !== null) {
      return JSON.parse(sessionStorageValue);
    } else {
      return defaultLoggedUserState;
    }
  });

  const [loggedAsAdmin, setLoggedAsAdmin] = useState(() => {
    const sessionStorageValue = sessionStorage.getItem("loggedAsAdmin");
    if (sessionStorageValue !== null) {
      return JSON.parse(sessionStorageValue);
    } else {
      return false;
    }
  });

  //applicationsProvider
  const [applications, setApplications] = useState<Application[]>([]);

  const overwriteJobs = (value: DisplayOffer[]) => {
    setJobs(value);
  };

  //selected sorting state
  const [sortState, setSortState] = useState<SortType>("latest");

  const addJob = (job: DisplayOffer) => {
    if (sortState === "latest") {
      setJobs((prevState) =>
        [...prevState, job].sort(
          (a, b) => Number(b.days_ago) - Number(a.days_ago)
        )
      );
    }
    if (sortState === "oldest") {
      setJobs((prevState) =>
        [...prevState, job].sort(
          (a, b) => Number(a.days_ago) - Number(b.days_ago)
        )
      );
    }
    if (sortState === "highest salary") {
      setJobs((prevState) =>
        [...prevState, job].sort(
          (a, b) =>
            Number(getOnlyNumbersFromString(b.salary)) -
            Number(getOnlyNumbersFromString(a.salary))
        )
      );
    }
    if (sortState === "lowest salary") {
      setJobs((prevState) =>
        [...prevState, job].sort(
          (a, b) =>
            Number(getOnlyNumbersFromString(a.salary)) -
            Number(getOnlyNumbersFromString(b.salary))
        )
      );
    }
  };

  const sortJobs = (sortType: SortType) => {
    setSortState(sortType);
    if (sortType === "latest") {
      setJobs(
        [...jobs].sort((a, b) => Number(b.days_ago) - Number(a.days_ago))
      );
    }
    if (sortType === "oldest") {
      setJobs(
        [...jobs].sort((a, b) => Number(a.days_ago) - Number(b.days_ago))
      );
    }
    if (sortType === "highest salary") {
      setJobs(
        [...jobs].sort(
          (a, b) =>
            Number(getOnlyNumbersFromString(b.salary)) -
            Number(getOnlyNumbersFromString(a.salary))
        )
      );
    }
    if (sortType === "lowest salary") {
      setJobs(
        [...jobs].sort(
          (a, b) =>
            Number(getOnlyNumbersFromString(a.salary)) -
            Number(getOnlyNumbersFromString(b.salary))
        )
      );
    }
  };

  const removeJob = (id: string) => {
    const offerToRemove = jobs.find((item) => item._id === id);
    setJobs(jobs.filter((item) => item !== offerToRemove));
  };

  const handleLogin = (loginDetails: LoggedUser) => {
    setLoggedUser(loginDetails);
    sessionStorage.setItem("loggedUser", JSON.stringify(loginDetails));
    if (loginDetails.email === "admin@admin.com") {
      setLoggedAsAdmin(true);
      sessionStorage.setItem("loggedAsAdmin", JSON.stringify("true"));
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("loggedUser");
    sessionStorage.removeItem("loggedAsAdmin");
  };

  const overwriteApplications = (value: Application[]) => {
    setApplications(value);
  };
  
  const addApplication = (application: Application) => {
    setApplications((prevState) => [...prevState, application]);
  };

  return (
    <Contexts.Provider
      value={{
        jobs,
        overwriteJobs,
        addJob,
        removeJob,
        loggedUser,
        handleLogin,
        handleLogout,
        loggedAsAdmin,
        applications,
        overwriteApplications,
        addApplication,
        sortJobs,
      }}
    >
      {children}
    </Contexts.Provider>
  );
}
