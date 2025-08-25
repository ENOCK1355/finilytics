export interface ExpensesByCategory {
  salaries: number;
  supplies: number;
  services: number;
}

export interface Month {
  month: string;
  revenue: number;
  expenses: number;
  nonOperationalExpenses: number;
  operationalExpenses: number;
}
export interface Day {
  date: string;
  revenue: number;
  expenses: number;
}

export interface GetKPIsResponse {
  id: string;
  _id: string;
  __v: number;
  totalProfit: number;
  totalRevenue: number;
  totalExpenses: number;
  expensesByCategory: ExpensesByCategory;
  monthlyData: Month[];
  dailyData: Day[];
  createdAt: string;
  updatedAt: string;
}

export interface GetProductsResponse {
  map(
    arg0: ({ price, expense }: { price: any; expense: any }) => {
      price: any;
      expense: any;
    }
  ): any;
  id: string;
  _id: string;
  __v: number;
  price: number;
  expense: number;
  transactions: string[];
  createdAt: string;
  updatedAt: string;
}

export interface GetTransactionsResponse {
  id: string;
  _id: string;
  __v: number;
  amount: number;
  buyer: string;
  productIds: string[];
  createdAt: string;
  updatedAt: string;
}
