import React from 'react';
import { Search, Mic, Mail, Bell, UserCircle2 } from 'lucide-react';
import '../styles/header.css';

export default function Header() {
  return (
    <header className="top-header">
      <div className="search-box">
        <Search size={18} color="#64748b" />
        <input type="text" placeholder="" />
        <Mic size={18} color="#64748b" />
      </div>

      <div className="header-actions">
        <button className="icon-btn"><Mail size={22} /></button>
        <button className="icon-btn"><Bell size={22} /></button>
        <div className="profile-pill">
          <UserCircle2 size={32} color="#000000" />
          <div className="profile-info">
            <span className="profile-name">User Name</span>
            <span className="profile-email">email@gmail.com</span>
          </div>
        </div>
      </div>
    </header>
  );
}