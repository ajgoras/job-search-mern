export interface LoggedUser {
  email: string;
  password: string;
  company_name: string;
  logo: string;
}

export const defaultLoggedUserState: LoggedUser = {
  email: "",
  password: "",
  company_name: "",
  logo: "",
};
