/** AuditID: UI-007 | Ubuntu/Apple Hybrid Palette */
import React from 'react';

export const theme = {
  bgGradient: 'radial-gradient(circle at top, #4D1F3C 0%, #000 100%)', // Ubuntu Aubergine
  accent: '#E95420', // Ubuntu Orange
  glass: 'rgba(255, 255, 255, 0.03)',
  glassBorder: 'rgba(255, 255, 255, 0.08)',
  blur: 'blur(25px) saturate(160%)',
  radius: '22px',
  font: '"SF Pro Display", "Inter", sans-serif'
};

export const glassPanel: React.CSSProperties = {
  background: theme.glass,
  backdropFilter: theme.blur,
  WebkitBackdropFilter: theme.blur,
  border: "1px solid " + theme.glassBorder,
  borderRadius: theme.radius,
  boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
  color: '#fff'
};

export const inputStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '14px',
  padding: '12px 16px',
  color: '#fff',
  outline: 'none',
  fontSize: '14px',
  transition: 'border-color 0.2s',
  fontFamily: theme.font
};

export const buttonStyle: React.CSSProperties = {
  borderRadius: '14px',
  padding: '12px 24px',
  fontWeight: '600',
  transition: 'all 0.2s',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  cursor: 'pointer',
  fontFamily: theme.font
};