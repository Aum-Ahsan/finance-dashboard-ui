export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  date: string; // YYYY-MM-DD
  amount: number;
  category: string;
  type: TransactionType;
  description: string;
}

export const mockTransactions: Transaction[] = [
  { id: '1', date: '2023-11-01', amount: 4500, category: 'Salary', type: 'income', description: 'Monthly Salary' },
  { id: '2', date: '2023-11-02', amount: 120, category: 'Groceries', type: 'expense', description: 'Whole Foods Market' },
  { id: '3', date: '2023-11-05', amount: 50, category: 'Transport', type: 'expense', description: 'Uber Rides' },
  { id: '4', date: '2023-11-08', amount: 1500, category: 'Freelance', type: 'income', description: 'Web Design Project' },
  { id: '5', date: '2023-11-10', amount: 200, category: 'Utilities', type: 'expense', description: 'Electricity & Water' },
  { id: '6', date: '2023-11-12', amount: 80, category: 'Entertainment', type: 'expense', description: 'Netflix & Spotify' },
  { id: '7', date: '2023-11-15', amount: 300, category: 'Groceries', type: 'expense', description: 'Trader Joe\'s' },
  { id: '8', date: '2023-11-20', amount: 250, category: 'Shopping', type: 'expense', description: 'Amazon Purchases' },
  { id: '9', date: '2023-11-25', amount: 800, category: 'Investment', type: 'expense', description: 'Vanguard ETF' },
  { id: '10', date: '2023-11-28', amount: 150, category: 'Dining', type: 'expense', description: 'Dinner with friends' },
];

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};
