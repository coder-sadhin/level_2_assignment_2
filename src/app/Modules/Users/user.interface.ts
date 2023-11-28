import { Model } from 'mongoose';

export interface TOrder {
  productName: string;
  price: number;
  quantity: number;
}

export interface TName {
  firstName: string;
  lastName: string;
}

export interface TAddress {
  street: string;
  city: string;
  country: string;
}

export interface TUser {
  userId: number;
  username: string;
  password: string;
  fullName: TName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders?: TOrder[];
}

export interface StudentModel extends Model<TUser> {
  isUserExits(userId: number): Promise<TUser | null>;
}
