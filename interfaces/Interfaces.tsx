export interface IUser {
  _id: string;
  address: string;
  dateOfBirth: string;
  email: string;
  fullname: string;
  mobile: string;
  password: string;
  photo: string;
  role: string;
  status: boolean;
}

export interface IDashboardData {
  students: [];
  totalCount: number;
}

export interface HomeScreenProps {
  navigation?: any;
}
