import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CalendarView from './components/CalendarView';
import GenericView from './components/GenericView';
import './styles/layout.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('Calendar');

  return (
    <div className="app-wrapper">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="main-layout">
        <Header />
        
        <div className="content-container">
          {activeTab === 'Calendar' ? (
            <CalendarView />
          ) : (
            <GenericView title={activeTab} />
          )}
        </div>
      </main>
    </div>
  );
}