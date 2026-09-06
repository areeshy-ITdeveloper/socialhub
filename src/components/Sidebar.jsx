import React from 'react';
import { 
  LayoutDashboard, 
  ClipboardList, 
  Calendar, 
  BarChart3, 
  Settings, 
  HelpCircle, 
  LogOut, 
  UserCircle2, 
  Infinity 
} from 'lucide-react';
import '../styles/sidebar.css';

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="brand-logo">
          <Infinity size={32} color="#581c87" />
          <span>social hub</span>
        </div>

        <div className="nav-section">
          <p className="nav-title">MENU</p>
          <div 
            className={`nav-item ${activeTab === 'Dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('Dashboard')}
          >
            <LayoutDashboard size={20} /> Dashboard
          </div>
          <div 
            className={`nav-item ${activeTab === 'Tasks' ? 'active' : ''}`}
            onClick={() => setActiveTab('Tasks')}
          >
            <ClipboardList size={20} /> Tasks
          </div>
          <div 
            className={`nav-item ${activeTab === 'Calendar' ? 'active' : ''}`}
            onClick={() => setActiveTab('Calendar')}
          >
            <Calendar size={20} /> Calendar
          </div>
          <div 
            className={`nav-item ${activeTab === 'Analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('Analytics')}
          >
            <BarChart3 size={20} /> Analytics
          </div>
        </div>

        <div className="nav-section">
          <p className="nav-title">GENERAL</p>
          <div 
            className={`nav-item ${activeTab === 'Settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('Settings')}
          >
            <Settings size={20} /> Settings
          </div>
          <div 
            className={`nav-item ${activeTab === 'Help' ? 'active' : ''}`}
            onClick={() => setActiveTab('Help')}
          >
            <HelpCircle size={20} /> Help
          </div>
          <div className="nav-item">
            <LogOut size={20} /> Logout
          </div>
        </div>
      </div>

      <div className="sidebar-bottom">
        <UserCircle2 size={36} color="#000000" />
        <span className="user-name-text">User Name</span>
      </div>
    </aside>
  );
}