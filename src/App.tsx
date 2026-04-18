/** AuditID: RT-001 | Finální směrovač veřejné a admin části */
import { useState } from 'react';
import { Branding } from './ui/Branding';
import { LoginForm } from './ui/LoginForm';
import { AdminDashboard } from './ui/AdminDashboard';
import { PublicView } from './ui/PublicView';
import { generateGsyncPacket, copySyncToClipboard } from './logic/SyncController';
import dneData from '../dne.json';
import manifestData from '../manifest_rules.json';
import { motion, AnimatePresence } from 'motion/react';

const App = () => {
  const [view, setView] = useState<'public' | 'login' | 'admin'>('public');

  const handleLogin = (u: string, p: string) => {
    if (u === 'Mallfurion' && p === '1234') {
      setView('admin');
      console.log("[AUTH] Admin Mallfurion přihlášen.");
    } else {
      setView('public');
      console.log("[AUTH] Přihlášení selhalo, návrat do veřejné zóny.");
    }
  };

  const gsyncAction = async () => {
    const packet = generateGsyncPacket(dneData, manifestData.rules);
    await copySyncToClipboard(packet);
    alert("G-SYNC PAKET GENEROVÁN A ULOŽEN DO SCHRÁNKY");
  };

  return (
    <div className="min-h-screen bg-bg text-text-main font-sans selection:bg-accent selection:text-bg flex items-center justify-center p-4">
      <div className="w-full max-w-[420px] h-[720px] bg-surface border border-border rounded-[24px] flex flex-col shadow-[0_40px_100px_rgba(0,0,0,0.5)] overflow-hidden relative">
        <Branding />

        <main className="flex-1 overflow-hidden flex flex-col pt-4">
          <AnimatePresence mode="wait">
            {view === 'public' && (
              <motion.div
                key="public"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex-1 overflow-y-auto scrollbar-hide"
              >
                <PublicView onAdminClick={() => setView('login')} />
              </motion.div>
            )}

            {view === 'login' && (
              <motion.div
                key="login"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="px-6 mb-4 flex items-center justify-between">
                  <h3 className="text-accent font-bold uppercase tracking-tight text-lg">Admin Login</h3>
                  <button 
                    onClick={() => setView('public')}
                    className="text-[10px] font-mono text-text-muted uppercase underline"
                  >
                    Zrušit
                  </button>
                </div>
                <LoginForm onLogin={handleLogin} />
              </motion.div>
            )}

            {view === 'admin' && (
              <motion.div
                key="admin"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="flex-1 overflow-hidden"
              >
                <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col h-full">
                  <AdminDashboard />
                  <div className="mt-auto p-6 pt-0">
                    <button 
                      onClick={() => setView('public')}
                      className="w-full text-[10px] font-mono text-text-muted hover:text-accent uppercase underline transition-colors py-2"
                    >
                      Odhlásit se a přejít do veřejné zóny
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
        
        <div className="p-6 pt-0 mt-auto">
          <button 
            onClick={gsyncAction}
            className="w-full p-3 bg-transparent text-zinc-800 border border-border border-dashed rounded-lg text-[9px] font-mono uppercase tracking-[0.2em] hover:text-accent hover:border-accent/40 transition-all active:scale-[0.98]"
          >
            GENEROVAT G-SYNC PAKET
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;