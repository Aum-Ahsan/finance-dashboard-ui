import React, { useState } from 'react';
import { DashboardProvider } from './context/DashboardContext';
import { Sidebar } from './components/Sidebar';
import { DashboardOverview } from './components/DashboardOverview';
import { Transactions } from './components/Transactions';
import { Sparkles } from 'lucide-react';
import { useDashboard } from './context/DashboardContext';

const MainLayout: React.FC = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'transactions'>('dashboard');
  const { transactions } = useDashboard();
  
  // Calculate a quick insight
  const expenses = transactions.filter(t => t.type === 'expense');
  const topCategory = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {} as Record<string, number>);
  
  const maxCategory = Object.entries(topCategory).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="dashboard-layout">
      <Sidebar onNav={setCurrentView} currentView={currentView} />
      
      <main className="main-content">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>
              {currentView === 'dashboard' ? 'Overview' : 'Transactions'}
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>
              Here's a summary of your financial activity.
            </p>
          </div>
          
          {maxCategory && currentView === 'dashboard' && (
            <div className="glass-panel" style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
              <div style={{ background: 'var(--accent)', padding: '0.5rem', borderRadius: '50%', color: 'white', display: 'flex' }}>
                <Sparkles size={16} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Top Spending Category</div>
                <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{maxCategory[0]}</div>
              </div>
            </div>
          )}
        </header>

        {currentView === 'dashboard' ? <DashboardOverview /> : <Transactions />}
      </main>
    </div>
  );
};

function App() {
  return (
    <DashboardProvider>
      <MainLayout />
    </DashboardProvider>
  );
}

export default App;
