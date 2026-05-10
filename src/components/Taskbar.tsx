import React from 'react';
import { motion } from 'motion/react';
import { APPS } from '../constants';
import { AppType } from '../types';
import { Menu, Wifi, Battery, Volume2 } from 'lucide-react';

interface TaskbarProps {
  openApps: string[];
  activeAppId: string | null;
  osState: OSState;
  onUpdateOS: (updates: Partial<OSState>) => void;
  onOpenApp: (type: AppType) => void;
}

export default function Taskbar({ openApps, activeAppId, osState, onUpdateOS, onOpenApp }: TaskbarProps) {
  return (
    <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl h-16 flex items-center px-3 gap-1 shadow-2xl relative">
      <div className="flex items-center gap-1">
        {/* Menu Button */}
        <button className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/10 hover:bg-white/20 transition-all mr-2 group">
          <div className="grid grid-cols-2 gap-1 group-hover:rotate-90 transition-transform">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: osState.accentColor }}></div>
            <div className="w-1.5 h-1.5 bg-white/40 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-white/40 rounded-full"></div>
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: osState.accentColor }}></div>
          </div>
        </button>

        <div className="w-[1px] h-8 bg-white/10 mx-1" />

        {/* App Icons */}
        <div className="flex items-center gap-2 px-2">
          {osState.installedApps.map((appId) => {
            const app = APPS.find(a => a.id === appId);
            if (!app) return null;
            
            const isOpen = openApps.includes(app.id);
            const isActive = activeAppId === app.id;
            
            return (
              <button
                key={app.id}
                onClick={() => onOpenApp(app.id as AppType)}
                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all relative group ${
                  isActive ? 'bg-white/15 border border-white/20 shadow-lg' : 'bg-white/5 hover:bg-white/10 border border-white/5'
                }`}
              >
                <app.icon 
                  className={`w-5 h-5 group-hover:scale-110 transition-transform`} 
                  style={{ color: isActive ? osState.accentColor : '#94a3b8' }}
                />
                
                {isOpen && (
                  <motion.div 
                    layoutId="app-indicator"
                    className="absolute bottom-1 w-1 h-1 rounded-full"
                    style={{ backgroundColor: osState.accentColor }}
                  />
                )}

                {/* Tooltip */}
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-aura-surface border border-white/10 rounded-lg text-[10px] text-white/70 uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-2xl">
                  {app.name}
                </div>
              </button>
            );
          })}
        </div>

        <div className="w-[1px] h-8 bg-white/10 mx-1" />

        {/* Tray Stats */}
        <div className="flex items-center gap-6 px-4 font-mono">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold" style={{ color: osState.accentColor }}>52.4 Gb/s</span>
            <span className="text-[8px] opacity-40 uppercase tracking-tighter">Network Peak</span>
          </div>
          
          <div className="flex items-center gap-3 text-white/30">
            <Volume2 className="w-4 h-4 cursor-pointer hover:text-white/70 transition-colors" />
            <Wifi className="w-4 h-4 cursor-pointer hover:text-white/70 transition-colors" />
            <Battery className="w-4 h-4 cursor-pointer hover:text-white/70 transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
}
