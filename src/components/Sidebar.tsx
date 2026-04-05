import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { LayoutDashboard, Receipt, UserCircle, LogOut, Sun, Moon, Database } from 'lucide-react';

interface SidebarProps {
  onNav: (view: 'dashboard' | 'transactions') => void;
  currentView: 'dashboard' | 'transactions';
}

export const Sidebar: React.FC<SidebarProps> = ({ onNav, currentView }) => {
  const { role, setRole, theme, toggleTheme } = useDashboard();

  return (
    <aside className="sidebar">
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem', padding: '0 1rem' }}>
          <div style={{ background: 'var(--accent)', color: 'white', padding: '0.5rem', borderRadius: '8px' }}>
            <Database size={24} />
          </div>
          <h1 style={{ fontSize: '1.25rem', color: 'var(--text-main)', letterSpacing: '-0.025em' }}>Zorvyn</h1>
        </div>

        <nav className="sidebar-nav">
          <a className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`} onClick={() => onNav('dashboard')}>
            <LayoutDashboard size={20} />
            Dashboard
          </a>
          <a className={`nav-item ${currentView === 'transactions' ? 'active' : ''}`} onClick={() => onNav('transactions')}>
            <Receipt size={20} />
            Transactions
          </a>
        </nav>
      </div>

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div className="glass-panel" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Role Simulation</span>
            <UserCircle size={18} color="var(--text-muted)" />
          </div>
          <select 
            value={role} 
            onChange={e => setRole(e.target.value as any)}
            style={{ padding: '0.5rem', fontSize: '0.875rem' }}
          >
            <option value="viewer">Viewer (Read Only)</option>
            <option value="admin">Admin (Add/Edit)</option>
          </select>
        </div>

        <button className="btn btn-outline" onClick={toggleTheme} style={{ justifyContent: 'flex-start', border: 'none', padding: '0.75rem 1rem' }}>
          {theme === 'dark' ? <><Sun size={20} /> Light Mode</> : <><Moon size={20} /> Dark Mode</>}
        </button>

        <button className="btn btn-outline" style={{ justifyContent: 'flex-start', border: 'none', padding: '0.75rem 1rem', color: 'var(--danger)' }}>
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};
