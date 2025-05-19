import type {Dispatch, SetStateAction} from "react";

export interface SingleExpense {
  name: string;
  amount: number;
}

export interface PersonExpenses {
  personName: string;
  expenses: SingleExpense[];
  limit: number;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface Expense {
  name: string;
  amount: number;
}

export interface PieChartProps {
  data: Expense[];
}

export interface ProfileImageProps {
  name: string;
  size?: number;
}

export interface AuthenticationProps {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  logout: () => void;
}

export interface GoogleUser {
  email: string;
  name: string;
  picture: string;
  sub: string;
}

export interface Features {
  title: string;
  description: string;
  img: string;
}