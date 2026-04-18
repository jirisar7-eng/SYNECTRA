/** AuditID: UI-007 | Styl pro Apple Glass a Ubuntu Accent */
import React from 'react';

export const theme = {
  bg: '#050505',
  ubuntuOrange: '#E95420',
  glass: 'rgba(28, 28, 30, 0.7)',
  glassBorder: 'rgba(255, 255, 255, 0.15)',
  blur: 'saturate(180%) blur(20px)',
  font: '"SF Pro Display", "Inter", sans-serif'
};

export const glassCard: React.CSSProperties = {
  background: theme.glass,
  backdropFilter: theme.blur,
  WebkitBackdropFilter: theme.blur,
  border: `1px solid ${theme.glassBorder}`,
  borderRadius: '24px',
  padding: '20px',
  margin: '10px',
  color: '#eee'
};

export const inputStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '16px',
  padding: '12px 16px',
  color: '#fff',
  outline: 'none',
  fontSize: '14px',
  transition: 'border-color 0.2s',
  fontFamily: theme.font
};

export const buttonStyle: React.CSSProperties = {
  borderRadius: '16px',
  padding: '12px 24px',
  fontWeight: '600',
  transition: 'all 0.2s',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  cursor: 'pointer',
  fontFamily: theme.font
};