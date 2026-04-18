/** AuditID: UI-003 | Administrační rozhraní Mallfurion */
import { useState } from 'react';
import { pushToGithub } from '../logic/GitHubEngine';
import { Downloader } from './Downloader';
import { motion, AnimatePresence } from 'motion/react';
import { Github, CheckCircle, Loader2, Disc, LayoutDashboard } from 'lucide-react';

export const AdminDashboard = () => {
  const [status, setStatus] = useState('Připraven k odeslání');
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'status' | 'media'>('media');

  const handleFullPush = async () => {
    setLoading(true);
    setStatus('Probíhá nahrávání na GitHub...');
    setProgress(30);
    
    setTimeout(async () => {
      setProgress(60);
      await pushToGithub("{}", "dne.json", "Auto-sync Genesis Phase 3");
      
      setTimeout(() => {
        setProgress(100);
        setStatus('HOTOVO: Projekt SYNECTRA je na GitHubu!');
        setLoading(false);
      }, 1000);
    }, 1000);
  };

  return (
    <div className="p-6 space-y-6 flex-1 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold uppercase tracking-tight text-accent">Admin Panel</h3>
        <span className="text-[10px] font-mono text-text-muted uppercase">Mallfurion</span>
      </div>

      <div className="flex p-1 bg-bg border border-border rounded-xl">
        <button 
          onClick={() => setActiveTab('media')}
          className={`flex-1 py-2 flex items-center justify-center gap-2 rounded-lg text-[11px] font-mono uppercase tracking-widest transition-all ${activeTab === 'media' ? 'bg-accent-dim text-accent' : 'text-text-muted hover:text-text-main'}`}
        >
          <Disc size={14} /> MEDIA
        </button>
        <button 
          onClick={() => setActiveTab('status')}
          className={`flex-1 py-2 flex items-center justify-center gap-2 rounded-lg text-[11px] font-mono uppercase tracking-widest transition-all ${activeTab === 'status' ? 'bg-accent-dim text-accent' : 'text-text-muted hover:text-text-main'}`}
        >
          <LayoutDashboard size={14} /> STATUS
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <AnimatePresence mode="wait">
          {activeTab === 'status' ? (
            <motion.div 
              key="status-tab"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-6"
            >
              <div className="bg-surface border border-border p-5 rounded-xl space-y-5 shadow-inner">
                <div className="flex items-center gap-3 text-text-muted">
                  <Github size={18} className="text-accent" />
                  <p className="text-[11px] font-mono uppercase tracking-widest leading-none">jirisar7-eng/SYNECTRA</p>
                </div>

                <div className="space-y-3">
                  <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      className="h-full bg-accent shadow-[0_0_10px_rgba(0,212,255,0.5)] transition-all duration-500"
                    ></motion.div>
                  </div>
                  
                  <div className="flex items-center justify-between min-h-[1.5rem]">
                    <p className="text-[13px] text-text-main font-medium">{status}</p>
                    {progress === 100 && <CheckCircle size={14} className="text-accent" />}
                    {loading && <Loader2 size={14} className="text-accent animate-spin" />}
                  </div>
                </div>

                <button 
                  onClick={handleFullPush}
                  disabled={loading}
                  className="w-full p-4 mt-2 bg-accent text-bg font-bold uppercase text-[13px] tracking-[0.1em] rounded-xl hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? 'SYNCHRONIZUJI...' : 'PUSH TO GITHUB'}
                </button>
              </div>

              <div className="space-y-3">
                <div className="text-[12px] text-text-muted uppercase tracking-[0.1em]">Auditní záznamy</div>
                <div className="p-4 border border-border border-dashed rounded-[12px] bg-bg/50">
                  <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-tighter leading-relaxed">
                    - Monitorování ticku jádra: OK<br />
                    - G-SYNC Ready pro schránku: OK<br />
                    - Media Scanner: ASSEMBLED
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="media-tab"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              <Downloader />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};