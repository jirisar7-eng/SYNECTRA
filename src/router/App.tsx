/** AuditID: RT-001 | Finální orchestrace s Dockem */
import { useState } from 'react';
import { Branding } from '../ui/Branding';
import { WelcomeScreen } from '../ui/WelcomeScreen';
import { LoginForm } from '../ui/LoginForm';
import { PublicView } from '../ui/PublicView';
import { AdminDashboard } from '../ui/AdminDashboard';
import { MobileDock } from '../ui/MobileDock';
import { generateGsyncPacket, copySyncToClipboard } from '../logic/SyncController';
import dneData from '../../dne.json';
import manifestData from '../../manifest_rules.json';
import { motion, AnimatePresence } from 'motion/react';

const App = () => {
  const [step, setStep] = useState<'welcome' | 'login' | 'main' | 'admin'>('welcome');
  const [user, setUser] = useState('');

  const handleLogin = (u: string, p: string) => {
    const isMallfurion = (u.toLowerCase() === 'mallfurion' && p === '1234');
    const role = isMallfurion ? 'Mallfurion' : 'Host';
    setUser(role);
    setStep('main');
    console.log("[AUTH] Uživatel " + role + " přihlášen k terminálu.");
  };

  const handleNav = (target: string) => {
    if (target === 'Terminál') setStep('main');
    if (target === 'Admin' && user === 'Mallfurion') setStep('admin');
    if (target === 'G-Sync') {
      const packet = generateGsyncPacket(dneData, manifestData.rules);
      copySyncToClipboard(packet);
      alert("G-SYNC PAKET GENEROVÁN A ULOŽEN DO SCHRÁNKY");
    }
  };

  return (
    <div className="min-h-screen text-text-main font-sans selection:bg-accent selection:text-bg flex items-center justify-center p-4">
      <div className="w-full max-w-[420px] h-[820px] bg-black/40 backdrop-blur-md border border-white/10 rounded-[40px] flex flex-col shadow-[0_40px_100px_rgba(0,0,0,0.6)] overflow-hidden relative pb-24">
        <Branding />

        <main className="flex-1 overflow-hidden flex flex-col relative">
          <AnimatePresence mode="wait">
            {step === 'welcome' && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col"
              >
                <WelcomeScreen onStart={() => setStep('login')} />
              </motion.div>
            )}
            
            {step === 'login' && (
              <motion.div
                key="login"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="pt-4"
              >
                <div className="px-6 mb-8 text-center">
                  <h3 className="text-white font-bold uppercase tracking-[0.2em] text-sm">Genesis Vault</h3>
                  <div className="h-[2px] w-12 bg-accent mx-auto mt-2" />
                </div>
                <LoginForm onLogin={handleLogin} />
                <button 
                  onClick={() => setStep('welcome')}
                  className="w-full text-[10px] font-mono text-zinc-600 hover:text-accent uppercase underline mt-12 mb-4"
                >
                  SYSTEM REBOOT
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
                
                <div className="mt-auto p-6 flex justify-center">
                  <button 
                    onClick={() => setStep('welcome')}
                    className="text-[10px] font-mono text-zinc-700 hover:text-accent uppercase underline transition-colors"
                  >
                    Lock System (Identity: " + user + ")
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
                className="flex-1 overflow-hidden pt-4"
              >
                <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col h-full">
                  <AdminDashboard />
                  <div className="mt-auto p-6 pb-2">
                    <button 
                      onClick={() => setStep('main')}
                      className="w-full text-[10px] font-mono text-zinc-700 hover:text-accent uppercase underline transition-colors py-2"
                    >
                      Exit Admin Mode
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
        
        {(step === 'main' || step === 'admin') && (
          <MobileDock 
            onNavigate={handleNav} 
            currentView={step} 
            isAdmin={user === 'Mallfurion'} 
          />
        )}
      </div>
    </div>
  );
};

export default App;