/** AuditID: UI-008 | Spodní Apple-style Dock s Ubuntu barvami */
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
    <motion.div 
      initial={{ y: 100, x: '-50%' }}
      animate={{ y: 0, x: '-50%' }}
      style={{
        position: 'fixed', bottom: '20px', left: '50%',
        width: '90%', maxWidth: '400px', height: '75px',
        background: 'rgba(30, 30, 30, 0.75)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
        border: '1px solid rgba(255,255,255,0.08)', borderRadius: '35px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-around',
        zIndex: 1000, boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
        padding: '0 15px'
      }}
    >
      {items.map((item) => {
        const isActive = (item.id === 'main' && currentView === 'main') || (item.id === 'admin' && currentView === 'admin');
        const Icon = item.icon;
        
        return (
          <button 
            key={item.id}
            onClick={() => onNavigate(item.id === 'main' ? 'Terminál' : item.id === 'admin' ? 'Admin' : 'G-Sync')}
            style={{
              background: 'transparent', border: 'none', color: isActive ? '#fff' : 'rgba(255,255,255,0.4)', 
              fontSize: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
              cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative', flex: 1
            }}
          >
            <motion.div
              animate={{ scale: isActive ? 1.1 : 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            </motion.div>
            
            <span style={{ fontWeight: isActive ? '700' : '400', letterSpacing: '0.05em' }}>{item.label}</span>
            
            {isActive && (
              <motion.div 
                layoutId="dock-dot"
                style={{ 
                  position: 'absolute', bottom: '-8px',
                  width: '4px', height: '4px', borderRadius: '50%', 
                  background: theme.ubuntuOrange,
                  boxShadow: `0 0 10px ${theme.ubuntuOrange}`
                }}
              />
            )}
          </button>
        );
      })}
    </motion.div>
  );
};