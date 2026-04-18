/** AuditID: UI-005 | Veřejná část pro hosty */
import { Downloader } from './Downloader';
import { motion } from 'motion/react';
import { Terminal } from 'lucide-react';

export const PublicView = ({ onAdminClick }: { onAdminClick: () => void }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col gap-6"
  >
    <div className="px-6 space-y-1">
      <div className="flex items-center gap-2">
        <Terminal size={18} className="text-accent" />
        <h3 className="text-accent font-bold uppercase tracking-tight text-lg">SYNECTRA TERMINÁL</h3>
      </div>
      <p className="text-text-muted text-[11px] leading-relaxed font-mono uppercase tracking-wide">
        Vložte odkaz a vyberte kvalitu pro zpracování.
      </p>
    </div>
    
    <div className="px-6">
      <Downloader />
    </div>

    <div className="mt-8 px-6 pt-6 border-t border-border flex justify-center">
      <button 
        onClick={onAdminClick}
        className="bg-transparent text-zinc-700 hover:text-accent border-none text-[9px] font-mono uppercase tracking-[0.2em] transition-colors cursor-pointer"
      >
        Správa Studia Synthesis (Mallfurion Login)
      </button>
    </div>
  </motion.div>
);