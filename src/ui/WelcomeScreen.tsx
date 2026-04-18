/** AuditID: UI-006 | Elegantní vstup v Ubuntu barvách */
import React from 'react';
import { glassPanel, theme } from './GlobalStyles';
import { motion } from 'motion/react';

export const WelcomeScreen = ({ onStart }: { onStart: () => void }) => (
  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ ...glassPanel, padding: '40px 20px', width: '100%', maxWidth: '320px', textAlign: 'center' }}
    >
      <div style={{ 
        width: '64px', height: '64px', background: theme.accent, 
        borderRadius: '18px', margin: '0 auto 25px', display: 'flex', 
        alignItems: 'center', justifyContent: 'center', boxShadow: "0 0 30px " + theme.accent + "44"
      }}>
        <span style={{ color: '#fff', fontSize: '2rem', fontWeight: 'bold' }}>S</span>
      </div>
      <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '10px', letterSpacing: '-0.02em' }}>SYNECTRA</h2>
      <p style={{ color: '#aaa', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '30px' }}>
        Studio Synthesis: Ambientní media procesor.
      </p>
      <button onClick={onStart} style={{
        width: '100%', padding: '16px', borderRadius: '14px', border: 'none',
        background: '#fff', color: '#000', fontWeight: 'bold', fontSize: '1rem',
        cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 15px rgba(255,255,255,0.1)'
      }}>
        Vstoupit do systému
      </button>
    </motion.div>
  </div>
);