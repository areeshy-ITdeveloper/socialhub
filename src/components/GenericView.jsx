import React from 'react';

export default function GenericView({ title }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#64748b' }}>
      <h1>{title} View (Content Here)</h1>
    </div>
  );
}