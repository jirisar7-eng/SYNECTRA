/** AuditID: RT-001 | Finální orchestrace brány a admin přístupu */
import { useState } from 'react';
import { Branding } from './ui/Branding';
import { WelcomeScreen } from './ui/WelcomeScreen';
import { LoginForm } from './ui/LoginForm';
import { PublicView } from './ui/PublicView';
import { AdminDashboard } from './ui/AdminDashboard';
import { generateGsyncPacket, copySyncToClipboard } from './logic/SyncController';
import dneData from '../dne.json';
import manifestData from '../manifest_rules.json';
import { motion, AnimatePresence } from 'motion/react';

const App = () => {
  const [step, setStep] = useState<'welcome' | 'login' | 'main' | 'admin'>('welcome');
  const [currentUser, setCurrentUser] = useState<string>('');

  const handleLogin = (u: string, p: string) => {
    if (u === 'Mallfurion' && p === '1234') {
      setCurrentUser('Mallfurion');
      setStep('main');
      console.log("[AUTH] Admin Mallfurion přihlášen k terminálu.");
    } else {
      setCurrentUser('Host');
      setStep('main');
      console.log("[AUTH] Host vstup povolen k terminálu.");
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

        <main className="flex-1 overflow-hidden flex flex-col relative">
          <AnimatePresence mode="wait">
            {step === 'welcome' && (
              <WelcomeScreen key="welcome" onStart={() => setStep('login')} />
            )}
            
            {step === 'login' && (
              <motion.div
                key="login"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="pt-4"
              >
                <div className="px-6 mb-2">
                  <h3 className="text-accent font-bold uppercase tracking-tight text-lg">Autorizace</h3>
                  <p className="text-text-muted text-[10px] font-mono uppercase">Zadejte přístupové údaje Genesis</p>
                </div>
                <LoginForm onLogin={handleLogin} />
                <button 
                  onClick={() => setStep('welcome')}
                  className="w-full text-[10px] font-mono text-text-muted hover:text-accent uppercase underline py-4"
                >
                  Zpět na úvod
                </button>
              </motion.div>
            )}

            {step === 'main' && (
              <motion.div
                key="main"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="flex-1 overflow-y-auto scrollbar-hide flex flex-col pt-4"
              >
                <PublicView onAdminClick={() => {}} /> 
                
                {currentUser === 'Mallfurion' && (
                  <div className="px-6 pb-8 mt-4">
                    <button 
                      onClick={() => setStep('admin')}
                      className="w-full p-5 bg-bg border-2 border-accent text-accent rounded-xl font-bold uppercase text-xs tracking-[0.2em] shadow-[0_0_15px_rgba(0,212,255,0.1)] hover:bg-accent-dim transition-all active:scale-95"
                    >
                      VSTOUPIT DO ADMINISTRACE
                    </button>
                  </div>
                )}

                <div className="mt-auto p-6">
                  <button 
                    onClick={() => setStep('welcome')}
                    className="w-full text-[10px] font-mono text-text-muted hover:text-accent uppercase underline transition-colors"
                  >
                    Odhlásit se
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'admin' && (
              <motion.div
                key="admin"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 overflow-hidden"
              >
                <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col h-full pt-4">
                  <AdminDashboard />
                  <div className="mt-auto p-6 pt-0">
                    <button 
                      onClick={() => setStep('main')}
                      className="w-full text-[10px] font-mono text-text-muted hover:text-accent uppercase underline transition-colors py-2"
                    >
                      Zpět do terminálu
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
        
        {step !== 'welcome' && (
          <div className="p-6 pt-0 mt-auto">
            <button 
              onClick={gsyncAction}
              className="w-full p-3 bg-transparent text-zinc-900 border border-border border-dashed rounded-lg text-[9px] font-mono uppercase tracking-[0.2em] hover:text-accent hover:border-accent/40 transition-all active:scale-[0.98]"
            >
              GENEROVAT G-SYNC PAKET
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;