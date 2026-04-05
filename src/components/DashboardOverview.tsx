import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { formatCurrency } from '../data/mock';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Wallet, TrendingUp, TrendingDown, Lightbulb } from 'lucide-react';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export const DashboardOverview: React.FC = () => {
  const { transactions } = useDashboard();

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalIncome - totalExpense;

  // Process data for line chart (Income vs Expense over time)
  const sortedTransactions = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  // Aggregate by date
  const chartDataMap = new Map();
  sortedTransactions.forEach(t => {
    if (!chartDataMap.has(t.date)) {
      chartDataMap.set(t.date, { date: t.date, income: 0, expense: 0 });
    }
    const dayData = chartDataMap.get(t.date);
    if (t.type === 'income') dayData.income += t.amount;
    else dayData.expense += t.amount;
  });
  
  const lineChartData = Array.from(chartDataMap.values());

  // Aggregate by category for expenses
  const categoryMap = new Map();
  transactions.filter(t => t.type === 'expense').forEach(t => {
    categoryMap.set(t.category, (categoryMap.get(t.category) || 0) + t.amount);
  });
  const pieChartData = Array.from(categoryMap.entries()).map(([name, value]) => ({ name, value }));

  // Insights Calculations
  let topCategory = { name: 'N/A', value: 0 };
  if (pieChartData.length > 0) {
    topCategory = pieChartData.reduce((prev, current) => (prev.value > current.value) ? prev : current);
  }

  const largestExpense = transactions.filter(t => t.type === 'expense').sort((a, b) => b.amount - a.amount)[0];
  const savingsRate = totalIncome > 0 ? (((totalIncome - totalExpense) / totalIncome) * 100).toFixed(1) : '0.0';

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const currentMonthExpenses = transactions.filter(t => {
    const d = new Date(t.date);
    return t.type === 'expense' && d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  }).reduce((acc, curr) => acc + curr.amount, 0);

  const prevMonthExpenses = transactions.filter(t => {
    const d = new Date(t.date);
    // Handle Jan -> Dec transition loosely
    const isPrevMonth = currentMonth === 0 ? d.getMonth() === 11 && d.getFullYear() === currentYear - 1 : d.getMonth() === currentMonth - 1 && d.getFullYear() === currentYear;
    return t.type === 'expense' && isPrevMonth;
  }).reduce((acc, curr) => acc + curr.amount, 0);

  let monthlyTrend = '';
  if (prevMonthExpenses === 0 && currentMonthExpenses > 0) monthlyTrend = '+100% vs last month';
  else if (prevMonthExpenses === 0 && currentMonthExpenses === 0) monthlyTrend = '0% vs last month';
  else {
    const diff = ((currentMonthExpenses - prevMonthExpenses) / prevMonthExpenses) * 100;
    monthlyTrend = `${diff > 0 ? '+' : ''}${diff.toFixed(1)}% vs last month`;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      <div className="summary-grid">
        <div className="glass-panel summary-card">
          <div className="summary-header">
            <span>Total Balance</span>
            <Wallet className="icon-wrapper" />
          </div>
          <div className="summary-value">{formatCurrency(balance)}</div>
        </div>

        <div className="glass-panel summary-card">
          <div className="summary-header">
            <span>Total Income</span>
            <TrendingUp className="icon-wrapper" style={{color: 'var(--success)', background: 'rgba(16, 185, 129, 0.1)'}} />
          </div>
          <div className="summary-value" style={{color: 'var(--success)'}}>{formatCurrency(totalIncome)}</div>
        </div>

        <div className="glass-panel summary-card">
          <div className="summary-header">
            <span>Total Expenses</span>
            <TrendingDown className="icon-wrapper" style={{color: 'var(--danger)', background: 'rgba(239, 68, 68, 0.1)'}} />
          </div>
          <div className="summary-value" style={{color: 'var(--danger)'}}>{formatCurrency(totalExpense)}</div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="glass-panel chart-container">
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>Cash Flow</h3>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={lineChartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <XAxis dataKey="date" stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)' }} />
              <YAxis stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)' }} tickFormatter={(value) => `$${value}`} />
              <Tooltip 
                formatter={(value: any) => [formatCurrency(value || 0), 'Amount']}
                contentStyle={{ background: 'var(--panel-bg)', borderColor: 'var(--panel-border)', borderRadius: '8px', color: 'var(--text-main)' }} 
                itemStyle={{ color: 'var(--text-main)' }}
              />
              <CartesianGrid stroke="var(--panel-border)" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="income" stroke="var(--success)" strokeWidth={3} dot={{r: 4}} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="expense" stroke="var(--danger)" strokeWidth={3} dot={{r: 4}} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-panel chart-container">
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>Expenses by Category</h3>
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={65}
                paddingAngle={5}
                dataKey="value"
                label={({ percent }) => `${((percent || 0) * 100).toFixed(0)}%`}
                labelLine={{ stroke: 'var(--text-muted)', strokeWidth: 1 }}
              >
                {pieChartData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: any) => formatCurrency(value || 0)}
                contentStyle={{ background: 'var(--panel-bg)', borderColor: 'var(--panel-border)', borderRadius: '8px', color: 'var(--text-main)' }} 
                itemStyle={{ color: 'var(--text-main)' }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ color: 'var(--text-main)', fontSize: '0.875rem' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Lightbulb size={20} color="var(--warning)" /> Key Insights
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          <div className="glass-panel" style={{ padding: '1.25rem', borderLeft: '4px solid var(--danger)' }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Highest Spending Category</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '0.25rem' }}>{topCategory.name} ({formatCurrency(topCategory.value)})</div>
          </div>
          <div className="glass-panel" style={{ padding: '1.25rem', borderLeft: '4px solid var(--accent)' }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Largest Single Expense</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '0.25rem' }}>
              {largestExpense ? `${largestExpense.description} (${formatCurrency(largestExpense.amount)})` : 'None'}
            </div>
          </div>
          <div className="glass-panel" style={{ padding: '1.25rem', borderLeft: '4px solid var(--warning)' }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Monthly Expenses Trend</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '0.25rem' }}>{monthlyTrend}</div>
          </div>
          <div className="glass-panel" style={{ padding: '1.25rem', borderLeft: '4px solid var(--success)' }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Estimated Savings Rate</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '0.25rem' }}>{savingsRate}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};
