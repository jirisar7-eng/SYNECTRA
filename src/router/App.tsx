/** AuditID: RT-001 | Debug verze pro obnovu G-Sync */
import React from 'react';
import { WelcomeScreen } from '../ui/WelcomeScreen';
import { generateGsyncPacket, copySyncToClipboard } from '../logic/SyncController';

const App = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#111', color: '#eee', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1 }}>
        <h1 style={{ color: '#00D4FF', textAlign: 'center', paddingTop: '50px' }}>SYNECTRA DEBUG MODE</h1>
        <WelcomeScreen onStart={() => alert('Systém se restartuje...')} />
      </div>
      
      {/* NOUZOVÝ G-SYNC - VŽDY VIDITELNÝ */}
      <div style={{ padding: '20px', borderTop: '1px solid #333' }}>
        <button 
          onClick={() => copySyncToClipboard(generateGsyncPacket({ debug: true }, ["REPAIR_MODE"]))}
          style={{ width: '100%', padding: '15px', background: '#222', color: '#00D4FF', border: '1px solid #00D4FF' }}
        >
          OBNOVIT G-SYNC DATA (KLIKNI ZDE)
        </button>
      </div>
    </div>
  );
};

export default App;