/** AuditID: UI-004 | Hlavní rozhraní stahovače */
import { useState } from 'react';
import { KVALITY } from '../data/MediaTypes';
import { detectPlatform } from '../logic/StreamScanner';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Info, Download, AlertCircle } from 'lucide-react';

export const Downloader = () => {
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    if (!url) return;
    setIsScanning(true);
    setTimeout(() => {
      setPlatform(detectPlatform(url));
      setIsScanning(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Vložte odkaz (URL)..." 
            value={url} 
            onChange={e => setUrl(e.target.value)}
            className="w-full p-4 pr-12 rounded-xl border border-border bg-bg text-text-main placeholder:text-zinc-600 focus:border-accent focus:outline-none transition-all font-mono text-[13px]"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600">
            <Search size={18} />
          </div>
        </div>
        
        <button 
          onClick={handleScan}
          disabled={!url || isScanning}
          className="w-full p-4 bg-accent text-bg font-bold uppercase text-[13px] tracking-[0.1em] rounded-xl hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isScanning ? 'ANALYZUJI...' : 'ANALYZOVAT ODKAZ'}
        </button>
      </div>

      <AnimatePresence>
        {platform !== '' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between p-3 bg-accent-dim border border-accent rounded-lg">
              <div className="flex items-center gap-2">
                <Info size={14} className="text-accent" />
                <span className="text-[11px] font-mono uppercase text-accent">Detekovaná Platforma</span>
              </div>
              <span className="text-[11px] font-mono font-bold text-accent">{platform}</span>
            </div>

            <div className="space-y-2">
              <div className="text-[12px] text-text-muted uppercase tracking-[0.1em] mb-1">Dostupné Kvality</div>
              {KVALITY.map(q => (
                <button 
                  key={q.id} 
                  className="w-full p-4 bg-surface border border-border rounded-xl flex items-center justify-between group hover:border-text-muted transition-all text-left"
                >
                  <div className="flex flex-col">
                    <span className="text-[14px] font-semibold text-text-main">{q.label}</span>
                    <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">{q.kvalita} • .{q.ext}</span>
                  </div>
                  <div className="p-2 bg-border group-hover:bg-accent-dim group-hover:text-accent transition-colors rounded-lg">
                    <Download size={16} />
                  </div>
                </button>
              ))}
            </div>

            {platform === 'UNKNOWN' && (
              <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
                <AlertCircle size={18} className="shrink-0" />
                <p className="text-[11px] leading-relaxed">
                  Platforma nebyla automaticky rozpoznána. Některé funkce mohou být omezeny.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};