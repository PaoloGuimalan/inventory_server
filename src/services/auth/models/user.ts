export interface User {
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  email: string;
  password: string;
  dateCreated: number;
  permission: number;
}
