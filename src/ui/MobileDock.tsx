/** AuditID: UI-008 | Spodní Dock Apple-Style */
import React from 'react';
import { theme } from './GlobalStyles';
import { motion } from 'motion/react';
import { Terminal, Shield, Workflow } from 'lucide-react';

export const MobileDock = ({ onNavigate, currentView, isAdmin }: { onNavigate: (v: string) => void, currentView: string, isAdmin: boolean }) => {
  const items = [
    { id: 'main', label: 'Terminál', icon: Terminal },
    ...(isAdmin ? [{ id: 'admin', label: 'Admin', icon: Shield }] : []),
    { id: 'G-Sync', label: 'G-Sync', icon: Workflow }
  ];

  return (
    <div style={{
      position: 'fixed', bottom: '25px', left: '50%', transform: 'translateX(-50%)',
      width: '85%', maxWidth: '380px', height: '60px',
      background: 'rgba(20, 20, 20, 0.4)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
      border: '1px solid rgba(255,255,255,0.08)', borderRadius: '30px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-around', zIndex: 2000,
      boxShadow: '0 10px 40px rgba(0,0,0,0.5)', padding: '0 10px'
    }}>
      {items.map((item) => {
        const active = (item.id === 'main' && currentView === 'main') || (item.id === 'admin' && currentView === 'admin');
        const Icon = item.icon;
        
        return (
          <button 
            key={item.id} 
            onClick={() => onNavigate(item.id === 'main' ? 'Terminál' : item.id === 'admin' ? 'Admin' : 'G-Sync')} 
            style={{
              background: 'transparent', border: 'none', color: active ? theme.accent : '#888',
              fontSize: '0.7rem', fontWeight: active ? '600' : '400',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
              cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative', flex: 1
            }}
          >
            <motion.div animate={{ scale: active ? 1.1 : 1 }}>
              <Icon size={18} strokeWidth={active ? 2.5 : 2} />
            </motion.div>
            <span style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</span>
            {active && (
              <motion.div 
                layoutId="dock-dot"
                style={{ 
                  position: 'absolute', bottom: '-8px',
                  width: '4px', height: '4px', borderRadius: '50%', 
                  background: theme.accent, boxShadow: "0 0 10px " + theme.accent
                }} 
              />
            )}
          </button>
        );
      })}
    </div>
  );
};