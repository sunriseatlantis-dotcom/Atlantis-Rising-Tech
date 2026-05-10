import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Cpu, Lock } from 'lucide-react';

interface BootScreenProps {
  onComplete: () => void;
}

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [stages, setStages] = useState<{ label: string; status: 'pending' | 'success' }[]>([
    { label: 'Initializing Nova Kernel 6.8.0...', status: 'pending' },
    { label: 'Checking Hardware TPM 2.0...', status: 'pending' },
    { label: 'Verifying Secure Boot Keys...', status: 'pending' },
    { label: 'Attaching Filesystems...', status: 'pending' },
    { label: 'Launching Desktop Environment...', status: 'pending' },
  ]);
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    if (currentStage < stages.length) {
      const timer = setTimeout(() => {
        setStages(prev => prev.map((s, i) => i === currentStage ? { ...s, status: 'success' } : s));
        setCurrentStage(prev => prev + 1);
      }, 800 + Math.random() * 1000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(onComplete, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentStage, onComplete]);

  return (
    <div className="fixed inset-0 bg-black text-white flex flex-col items-center justify-center font-mono z-[1000]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <ShieldCheck className="w-12 h-12 text-[#38BDF8]" />
          <h1 className="text-4xl font-bold tracking-tighter uppercase italic">NovaOS <span className="text-[#38BDF8]">Aura</span></h1>
        </div>
        <p className="text-gray-500 uppercase tracking-widest text-xs">Futuristic Hardened Distribution</p>
      </motion.div>

      <div className="w-full max-w-md space-y-3 px-6">
        {stages.map((stage, i) => (
          <div key={i} className="flex items-center justify-between">
            <span className={`text-[10px] tracking-widest uppercase ${i === currentStage ? 'text-[#38BDF8]' : i < currentStage ? 'text-gray-500' : 'text-gray-800'}`}>
              {i < currentStage ? 'SECURE' : i === currentStage ? 'VERIFY' : 'WAIT'} {stage.label}
            </span>
            {i < currentStage && <ShieldCheck className="w-4 h-4 text-emerald-500" />}
          </div>
        ))}
      </div>

      <div className="absolute bottom-12 flex items-center gap-4 text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4" />
          <span>TPM 2.0 ACTIVE</span>
        </div>
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4" />
          <span>AES-256 ENCRYPTED</span>
        </div>
      </div>
      
      {currentStage === stages.length && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-white"
          transition={{ duration: 0.5, ease: "easeIn" }}
        />
      )}
    </div>
  );
}
