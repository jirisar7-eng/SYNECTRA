/** AuditID: UI-006 | Původní uvítací brána Synthesis */
import { motion } from 'motion/react';

export const WelcomeScreen = ({ onStart }: { onStart: () => void }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex flex-col items-center justify-center flex-1 p-8 text-center"
  >
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="mb-10"
    >
      <div className="w-20 h-20 border-2 border-accent rounded-full mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(0,212,255,0.2)] bg-accent-dim">
        <span className="text-accent text-4xl font-bold">S</span>
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="space-y-4"
    >
      <h2 className="text-white text-2xl font-bold uppercase tracking-tight">Vítejte v SYNECTRA</h2>
      <p className="text-text-muted text-[13px] max-w-[280px] leading-relaxed mx-auto font-sans">
        Vlajkový media processor studia Synthesis. Připraven k extrakci obsahu a synchronizaci dat.
      </p>
    </motion.div>

    <motion.button 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6 }}
      onClick={onStart}
      className="mt-12 px-10 py-4 bg-accent text-bg font-bold uppercase tracking-[0.2em] text-[13px] rounded-full hover:brightness-110 active:scale-95 transition-all shadow-[0_8px_25px_rgba(0,212,255,0.25)] cursor-pointer"
    >
      SPUSTIT SYSTÉM
    </motion.button>
    
    <div className="absolute bottom-8 left-0 right-0 flex justify-center opacity-20">
      <div className="h-[1px] w-24 bg-accent"></div>
    </div>
  </motion.div>
);