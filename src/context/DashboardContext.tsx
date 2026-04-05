import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockTransactions, type Transaction } from '../data/mock';

type Role = 'viewer' | 'admin';

interface DashboardContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  editTransaction: (id: string, updatedTransaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  role: Role;
  setRole: (role: Role) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('dashboard_transactions');
    return saved ? JSON.parse(saved) : mockTransactions;
  });
  const [role, setRole] = useState<Role>('viewer');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('dashboard_theme') as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('dashboard_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('dashboard_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: Math.random().toString(36).substr(2, 9),
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter(t => t.id !== id));
  };

  const editTransaction = (id: string, updatedTx: Omit<Transaction, 'id'>) => {
    setTransactions((prev) => prev.map(t => (t.id === id ? { ...updatedTx, id } : t)));
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <DashboardContext.Provider
      value={{
        transactions,
        addTransaction,
        editTransaction,
        deleteTransaction,
        role,
        setRole,
        theme,
        toggleTheme
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
