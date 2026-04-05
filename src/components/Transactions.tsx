import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { formatCurrency, type TransactionType } from '../data/mock';
import { Trash2, Plus, Search, Edit2, Download } from 'lucide-react';

export const Transactions: React.FC = () => {
  const { transactions, role, deleteTransaction, addTransaction, editTransaction } = useDashboard();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<TransactionType | 'all'>('all');
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc'>('date-desc');
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTx, setNewTx] = useState({ description: '', amount: '', date: '', category: '', type: 'expense' as TransactionType });

  let filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || t.type === filterType;
    return matchesSearch && matchesFilter;
  });

  filteredTransactions.sort((a, b) => {
    if (sortBy === 'date-desc') return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sortBy === 'date-asc') return new Date(a.date).getTime() - new Date(b.date).getTime();
    if (sortBy === 'amount-desc') return b.amount - a.amount;
    if (sortBy === 'amount-asc') return a.amount - b.amount;
    return 0;
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTx.description || !newTx.amount || !newTx.date || !newTx.category) return;
    
    const txData = {
      description: newTx.description,
      amount: parseFloat(newTx.amount),
      date: newTx.date,
      category: newTx.category,
      type: newTx.type
    };

    if (editingId) {
      editTransaction(editingId, txData);
    } else {
      addTransaction(txData);
    }
    
    setNewTx({ description: '', amount: '', date: '', category: '', type: 'expense' });
    setEditingId(null);
    setShowAddForm(false);
  };

  const handleEditClick = (t: any) => {
    setEditingId(t.id);
    setNewTx({
      description: t.description,
      amount: t.amount.toString(),
      date: t.date,
      category: t.category,
      type: t.type
    });
    setShowAddForm(true);
  };

  const handleExport = () => {
    const headers = ['ID', 'Date', 'Description', 'Category', 'Type', 'Amount'];
    const rows = filteredTransactions.map(t => 
      [t.id, t.date, `"${t.description}"`, `"${t.category}"`, t.type, t.amount].join(',')
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transactions_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="glass-panel recent-transactions">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 style={{ fontSize: '1.5rem' }}>Transactions</h2>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-outline" onClick={handleExport}>
            <Download size={18} /> Export CSV
          </button>
          {role === 'admin' && (
            <button className="btn btn-primary" onClick={() => {
              setEditingId(null);
              setNewTx({ description: '', amount: '', date: '', category: '', type: 'expense' });
              setShowAddForm(!showAddForm);
            }}>
              <Plus size={18} /> Add Transaction
            </button>
          )}
        </div>
      </div>

      {showAddForm && role === 'admin' && (
        <form onSubmit={handleAdd} className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem', background: 'rgba(255,255,255,0.02)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Description</label>
              <input type="text" value={newTx.description} onChange={e => setNewTx({...newTx, description: e.target.value})} placeholder="e.g. Groceries" required />
            </div>
            <div className="form-group">
              <label className="form-label">Amount</label>
              <input type="number" step="0.01" value={newTx.amount} onChange={e => setNewTx({...newTx, amount: e.target.value})} placeholder="0.00" required />
            </div>
            <div className="form-group">
              <label className="form-label">Date</label>
              <input type="date" value={newTx.date} onChange={e => setNewTx({...newTx, date: e.target.value})} required />
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <input type="text" value={newTx.category} onChange={e => setNewTx({...newTx, category: e.target.value})} placeholder="e.g. Food" required />
            </div>
            <div className="form-group">
              <label className="form-label">Type</label>
              <select value={newTx.type} onChange={e => setNewTx({...newTx, type: e.target.value as TransactionType})}>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
             <button type="button" className="btn btn-outline" onClick={() => {
               setShowAddForm(false);
               setEditingId(null);
             }}>Cancel</button>
             <button type="submit" className="btn btn-primary">{editingId ? 'Update' : 'Save'}</button>
          </div>
        </form>
      )}

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, position: 'relative', minWidth: '200px' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search transactions..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>
        <select 
          value={filterType} 
          onChange={e => setFilterType(e.target.value as any)}
          style={{ width: 'auto', minWidth: '150px' }}
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expenses</option>
        </select>
        <select 
          value={sortBy} 
          onChange={e => setSortBy(e.target.value as any)}
          style={{ width: 'auto', minWidth: '150px' }}
        >
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="amount-desc">Amount: High to Low</option>
          <option value="amount-asc">Amount: Low to High</option>
        </select>
      </div>

      <div className="transaction-list">
        {filteredTransactions.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            No transactions found.
          </div>
        ) : (
          filteredTransactions.map(t => (
            <div key={t.id} className="transaction-item">
              <div className="transaction-info">
                <div>
                  <h4 style={{ margin: 0, fontSize: '1rem' }}>{t.description}</h4>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span>{t.date}</span>
                    <span>•</span>
                    <span className={`badge badge-${t.type}`}>{t.category}</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <span style={{ 
                  fontWeight: 600, 
                  color: t.type === 'income' ? 'var(--success)' : 'var(--danger)' 
                }}>
                  {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                </span>
                
                {role === 'admin' && (
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button 
                      onClick={() => handleEditClick(t)} 
                      style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => deleteTransaction(t.id)} 
                      style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
