/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronUp, ChevronDown } from 'lucide-react';
import { AppType, WindowState, OSState } from './types';
import { APPS, INITIAL_Z_INDEX } from './constants';
import BootScreen from './components/BootScreen';
import Taskbar from './components/Taskbar';
import Window from './components/Window';
import AppRenderer from './components/AppRenderer';

export default function App() {
  const [osState, setOsState] = useState<OSState>({
    isBooted: false,
    isSecure: true,
    wallpaper: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1920',
    theme: 'dark',
    accentColor: '#38BDF8',
    showSecurityShield: true,
    taskbarPosition: 'bottom',
    isTaskbarMinimized: false,
    installedApps: [AppType.BROWSER, AppType.MUSIC, AppType.TERMINAL, AppType.SETTINGS, AppType.REPOS],
    desktopIcons: [
      { id: AppType.BROWSER, x: 0, y: 0 },
      { id: AppType.TERMINAL, x: 0, y: 100 },
      { id: AppType.SETTINGS, x: 0, y: 200 },
      { id: AppType.REPOS, x: 0, y: 300 },
    ],
    osMode: 'live',
  });

  const updateOS = (updates: Partial<OSState>) => {
    setOsState(prev => ({ ...prev, ...updates }));
  };

  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [nextZIndex, setNextZIndex] = useState(INITIAL_Z_INDEX);

  const openApp = useCallback((type: AppType) => {
    const existing = windows.find(w => w.id === type);
    
    if (existing) {
      if (existing.isMinimized) {
        setWindows(prev => prev.map(w => w.id === type ? { ...w, isMinimized: false, zIndex: nextZIndex } : w));
      } else {
        setWindows(prev => prev.map(w => w.id === type ? { ...w, zIndex: nextZIndex } : w));
      }
      setActiveWindowId(type);
      setNextZIndex(prev => prev + 1);
      return;
    }

    const appData = APPS.find(a => a.id === type);
    const newWindow: WindowState = {
      id: type,
      type,
      title: appData?.name || 'Application',
      isMaximized: false,
      isMinimized: false,
      zIndex: nextZIndex,
      position: { x: 150 + windows.length * 40, y: 100 + windows.length * 40 },
      size: { width: 840, height: 520 },
    };

    setWindows(prev => [...prev, newWindow]);
    setActiveWindowId(type);
    setNextZIndex(prev => prev + 1);
  }, [windows, nextZIndex]);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    if (activeWindowId === id) setActiveWindowId(null);
  }, [activeWindowId]);

  const focusWindow = useCallback((id: string) => {
    setActiveWindowId(id);
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: nextZIndex } : w));
    setNextZIndex(prev => prev + 1);
  }, [nextZIndex]);

  const toggleMaximize = useCallback((id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
  }, []);

  const toggleMinimize = useCallback((id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: !w.isMinimized } : w));
    if (activeWindowId === id) setActiveWindowId(null);
  }, [activeWindowId]);

  const updateWindow = useCallback((id: string, updates: Partial<WindowState>) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, ...updates } : w));
  }, []);

  if (!osState.isBooted) {
    return <BootScreen onComplete={() => setOsState(prev => ({ ...prev, isBooted: true }))} />;
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-aura-bg text-aura-text flex flex-col select-none">
      {/* Top System Bar */}
      <header className="h-8 bg-[#0F1115]/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 text-[11px] font-medium tracking-wide z-[600]">
        <div className="flex items-center gap-4">
          <span className="text-aura-accent font-bold uppercase tracking-tighter italic">Nova OS v2.4</span>
          <div className="flex items-center gap-2 px-2 py-0.5 bg-green-500/10 border border-green-500/20 rounded-full">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-[9px] uppercase tracking-tighter">TPM 2.0 ACTIVE : SECURE</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 opacity-60 font-mono text-[9px]">
            <span>LATENCY: 1.2ms</span>
            <span>CPU: 14%</span>
            <span>RAM: 4.2GB / 32GB</span>
          </div>
          <div className="flex items-center gap-4 border-l border-white/10 pl-6 text-white/60">
            <span>{new Date().toLocaleDateString([], { month: 'short', day: 'numeric' }).toUpperCase()} {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      </header>

      {/* Main Desktop Area */}
      <main 
        className={`flex-1 relative p-8 flex flex-col gap-6 overflow-hidden ${osState.taskbarPosition === 'top' ? 'mt-0' : ''} bg-cover bg-center transition-all duration-1000`}
        style={{ backgroundImage: `url(${osState.wallpaper})` }}
      >
        {/* Futuristic Wallpaper Effect Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] aura-glow-blue rounded-full blur-[120px]" style={{ opacity: osState.accentColor === '#38BDF8' ? 0.6 : 0.2 }}></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] aura-glow-purple rounded-full blur-[100px]" style={{ opacity: 0.3 }}></div>
          {/* Custom Accent Glow */}
          <div 
            className="absolute inset-0 blur-[150px] opacity-20 pointer-events-none transition-all duration-1000" 
            style={{ background: `radial-gradient(circle at 70% 30%, ${osState.accentColor}, transparent)` }} 
          />
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          {osState.osMode === 'live' && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
              <div className="px-4 py-1.5 bg-orange-500/20 backdrop-blur-xl border border-orange-500/30 rounded-full flex items-center gap-3 shadow-2xl">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest">Running in Live Mode — thumb_drive_active</span>
              </div>
            </div>
          )}
        </div>

        {/* Desktop Icons */}
        <div className="relative z-10 w-full h-full pointer-events-none">
          {osState.desktopIcons.map((iconData) => {
            const app = APPS.find(a => a.id === iconData.id);
            if (!app) return null;
            return (
              <motion.div
                key={app.id}
                drag
                dragMomentum={false}
                onDragEnd={(_, info) => {
                  const newIcons = osState.desktopIcons.map(icon => 
                    icon.id === app.id 
                    ? { ...icon, x: icon.x + info.offset.x, y: icon.y + info.offset.y } 
                    : icon
                  );
                  updateOS({ desktopIcons: newIcons });
                }}
                initial={{ x: iconData.x, y: iconData.y }}
                animate={{ x: iconData.x, y: iconData.y }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute w-20 flex flex-col items-center gap-2 group cursor-pointer pointer-events-auto"
                onDoubleClick={() => openApp(app.id)}
              >
                <div 
                  className="w-16 h-16 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all shadow-xl"
                  style={{ borderColor: activeWindowId === app.id ? `${osState.accentColor}44` : undefined }}
                >
                  <app.icon 
                    className={`w-8 h-8 transition-colors`} 
                    style={{ color: osState.accentColor }} 
                  />
                </div>
                <span className="text-[10px] text-white/90 font-medium text-center uppercase tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] group-hover:text-white">
                  {app.name}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Security Overlay Widget */}
        <AnimatePresence>
          {osState.showSecurityShield && (
            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              className="absolute right-8 top-16 z-20 w-48 bg-black/60 border border-white/10 p-3 rounded-xl backdrop-blur-xl group/shield"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Security Shield</div>
                <button 
                  onClick={() => updateOS({ showSecurityShield: false })}
                  className="opacity-0 group-hover/shield:opacity-100 transition-opacity p-1 hover:bg-white/10 rounded"
                >
                  <X className="w-3 h-3 text-white/40" />
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] opacity-60">TPM State</span>
                  <span className="text-[9px] text-green-400">v2.0 Locked</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] opacity-60">Remote Access</span>
                  <span className="text-[9px] text-red-400">Disabled</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] opacity-60">Kernel Mode</span>
                  <span className="text-[9px]" style={{ color: osState.accentColor }}>Hardened</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[88%] bg-green-500"></div>
                </div>
                <div className="text-[8px] text-center opacity-30 uppercase tracking-tighter">88% Resilient</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Windows Area */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <AnimatePresence>
            {windows.map((window) => !window.isMinimized && (
              <div key={window.id} className="pointer-events-auto">
                <Window
                  window={window}
                  isActive={activeWindowId === window.id}
                  onClose={closeWindow}
                  onFocus={focusWindow}
                  onMaximize={toggleMaximize}
                  onMinimize={toggleMinimize}
                  onUpdate={updateWindow}
                >
                  <AppRenderer 
                    type={window.type} 
                    osState={osState} 
                    onUpdateOS={updateOS} 
                  />
                </Window>
              </div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* Taskbar Section */}
      <div 
        className={`relative z-[500] transition-all duration-500 overflow-hidden ${
          osState.isTaskbarMinimized ? 'h-2' : 'h-20'
        } ${osState.taskbarPosition === 'top' ? 'order-first mb-0 mt-2' : 'order-last mt-0 mb-2'}`}
      >
        <div 
          className="flex items-center justify-center h-full px-4 group/taskbar"
          onMouseEnter={() => osState.isTaskbarMinimized && updateOS({ isTaskbarMinimized: false })}
        >
          <div className="relative">
             <Taskbar 
              openApps={windows.map(w => w.id)} 
              activeAppId={activeWindowId} 
              osState={osState}
              onUpdateOS={updateOS}
              onOpenApp={(type) => {
                const win = windows.find(w => w.id === type);
                if (win && !win.isMinimized && activeWindowId === type) {
                  toggleMinimize(type);
                } else {
                  openApp(type);
                }
              }} 
            />
            {/* Taskbar Minimize Trigger (Floating Handle) */}
            <button 
              onClick={() => updateOS({ isTaskbarMinimized: !osState.isTaskbarMinimized })}
              className={`absolute left-1/2 -translate-x-1/2 p-1 bg-white/10 rounded-full hover:bg-white/20 transition-all opacity-0 group-hover/taskbar:opacity-100 ${
                osState.taskbarPosition === 'top' ? '-bottom-6' : '-top-6'
              }`}
            >
              {osState.isTaskbarMinimized ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
