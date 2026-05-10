import React from 'react';
import { AppType, OSState } from '../types';
import { 
  Globe, 
  Music, 
  Settings, 
  Package, 
  Play, 
  FileText, 
  FileEdit, 
  Monitor, 
  Volume2, 
  Cpu, 
  HardDrive, 
  Shield, 
  Upload, 
  Layout, 
  Dices,
  Plus
} from 'lucide-react';

interface AppRendererProps {
  type: AppType;
  osState: OSState;
  onUpdateOS: (updates: Partial<OSState>) => void;
}

export default function AppRenderer({ type, osState, onUpdateOS }: AppRendererProps) {
  switch (type) {
    case AppType.BROWSER:
      return (
        <div className="flex flex-col h-full bg-white">
          <div className="p-2 border-b flex items-center gap-2 bg-gray-100">
            <div className="flex gap-1.5 ml-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 max-w-md mx-auto">
              <div className="bg-white px-3 py-1 rounded-full text-xs text-gray-500 border flex items-center gap-2 italic">
                <Globe className="w-3 h-3" />
                https://aura-browser.aura/secure-search
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center text-center p-12 overflow-hidden relative">
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '20px 20px' }} />
             <div className="w-24 h-24 bg-aura-accent/10 rounded-3xl flex items-center justify-center mb-6">
                <Globe className="w-12 h-12 text-aura-accent" />
             </div>
             <h2 className="text-3xl font-black italic tracking-tighter text-slate-800 mb-2">AURA SEARCH</h2>
             <p className="text-slate-400 max-w-sm text-sm">Experience the next generation of decentralized browsing with secure sandboxing and private routing.</p>
          </div>
        </div>
      );

    case AppType.MUSIC:
      return (
        <div className="flex h-full bg-aura-surface overflow-hidden font-mono text-[10px]">
          <div className="w-12 border-r border-white/5 flex flex-col items-center py-4 gap-4 bg-black/40">
            <div className="w-6 h-6 rounded bg-purple-500/80 flex items-center justify-center"><Music className="w-3.5 h-3.5 text-white" /></div>
            <div className="w-6 h-6 rounded border border-white/10 flex items-center justify-center"><Play className="w-3.5 h-3.5 text-white/40" /></div>
          </div>
          <div className="flex-1 p-4">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-purple-400 uppercase tracking-widest font-bold">Aura Studio v2.4</h3>
               <div className="flex gap-2">
                 <div className="px-2 py-1 bg-white/5 rounded text-white/60 border border-white/5">BPM: 128</div>
                 <div className="px-2 py-1 bg-white/5 rounded text-white/60 border border-white/5">KEY: Cm</div>
               </div>
            </div>
            
            <div className="space-y-4">
               {[1, 2, 3, 4].map(i => (
                 <div key={i} className="flex gap-2 h-12 items-center">
                    <div className="w-20 text-white/30 uppercase text-[8px] tracking-widest">Track {i}</div>
                    <div className="flex-1 bg-black/40 rounded-md border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors">
                       <div className="absolute inset-y-0 left-0 bg-purple-500/10 w-1/3" />
                       <div className="absolute inset-y-0 left-[40%] bg-aura-accent/10 w-1/4" />
                       <div className="flex h-full items-center px-4 gap-1">
                          {Array.from({ length: 48 }).map((_, j) => (
                             <div key={j} className={`flex-1 h-4 rounded-[1px] ${Math.random() > 0.7 ? 'bg-white/20' : 'bg-white/5'}`} />
                          ))}
                       </div>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      );

    case AppType.TERMINAL:
      return (
        <div className="h-full bg-black/90 p-4 font-mono text-xs text-aura-accent selection:bg-aura-accent selection:text-black">
          <div className="mb-2 opacity-30 uppercase tracking-widest text-[9px]">Aura Kernel 2.4.0-hardened [2026.05.10]</div>
          <div className="mb-4">LOGGED AS: <span className="text-white">nova-admin</span></div>
          <div className="space-y-1">
            <div className="flex gap-2"><span className="opacity-50">λ</span> <span>aura-sys --check-tpm --enforce</span></div>
            <div className="text-green-400 font-bold">[SUCCESS] TPM 2.0 HARDWARE ATTRIBUTE DETECTED</div>
            <div className="text-green-400 font-bold">[SUCCESS] RSA-4096 KEYS VALIDATED</div>
            <div className="opacity-50 mt-4">$ ls /system/apps</div>
            <div className="grid grid-cols-3 gap-2 py-1 text-white/70">
              {osState.installedApps.map(app => <span key={app}>{app}.app</span>)}
            </div>
            <div className="flex gap-2 mt-4">
              <span className="text-white animate-pulse">$</span>
              <div className="w-1.5 h-4 bg-aura-accent animate-pulse mt-0.5" />
            </div>
          </div>
        </div>
      );

    case AppType.SETTINGS:
      const wallPapers = [
        'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1920',
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1920',
        'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?auto=format&fit=crop&q=80&w=1920'
      ];
      
      const [activeTab, setActiveTab] = React.useState<'appearance' | 'system' | 'hardware' | 'security'>('appearance');

      const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
             onUpdateOS({ wallpaper: reader.result as string });
          };
          reader.readAsDataURL(file);
        }
      };

      return (
        <div className="h-full bg-aura-surface text-white flex overflow-hidden">
          {/* Settings Sidebar */}
          <div className="w-48 border-r border-white/5 bg-black/20 flex flex-col p-4 gap-2">
            <button 
              onClick={() => setActiveTab('appearance')}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-[10px] uppercase font-bold tracking-widest transition-all ${activeTab === 'appearance' ? 'bg-aura-accent/20 text-aura-accent border border-aura-accent/20' : 'hover:bg-white/5 opacity-50 hover:opacity-100'}`}
            >
              <Layout className="w-3.5 h-3.5" /> Appearance
            </button>
            <button 
              onClick={() => setActiveTab('system')}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-[10px] uppercase font-bold tracking-widest transition-all ${activeTab === 'system' ? 'bg-aura-accent/20 text-aura-accent border border-aura-accent/20' : 'hover:bg-white/5 opacity-50 hover:opacity-100'}`}
            >
              <Monitor className="w-3.5 h-3.5" /> System
            </button>
            <button 
              onClick={() => setActiveTab('hardware')}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-[10px] uppercase font-bold tracking-widest transition-all ${activeTab === 'hardware' ? 'bg-aura-accent/20 text-aura-accent border border-aura-accent/20' : 'hover:bg-white/5 opacity-50 hover:opacity-100'}`}
            >
              <Cpu className="w-3.5 h-3.5" /> Hardware
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-[10px] uppercase font-bold tracking-widest transition-all ${activeTab === 'security' ? 'bg-aura-accent/20 text-aura-accent border border-aura-accent/20' : 'hover:bg-white/5 opacity-50 hover:opacity-100'}`}
            >
              <Shield className="w-3.5 h-3.5" /> Security
            </button>
          </div>

          {/* Settings Content */}
          <div className="flex-1 p-8 overflow-auto">
             {activeTab === 'appearance' && (
               <div className="space-y-8 max-w-2xl">
                 <section>
                   <h3 className="text-[10px] font-bold text-white/30 uppercase mb-4 tracking-[0.2em] flex items-center gap-2">
                     <Layout className="w-3 h-3" /> Visual Themes
                   </h3>
                   <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-3">
                       <label className="text-[9px] uppercase text-white/40 tracking-wider">Accent Hue</label>
                       <div className="flex gap-3">
                          {['#38BDF8', '#A855F7', '#F43F5E', '#10B981', '#EAB308', '#6366F1'].map(color => (
                             <div 
                               key={color}
                               onClick={() => onUpdateOS({ accentColor: color })}
                               className={`w-7 h-7 rounded-full cursor-pointer transition-all border-2 ${osState.accentColor === color ? 'border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'border-transparent opacity-40 hover:opacity-100'}`}
                               style={{ backgroundColor: color }}
                             />
                          ))}
                       </div>
                     </div>
                     <div className="space-y-3">
                       <label className="text-[9px] uppercase text-white/40 tracking-wider">Taskbar Alignment</label>
                       <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
                          <button 
                            onClick={() => onUpdateOS({ taskbarPosition: 'bottom' })}
                            className={`flex-1 text-center py-1.5 rounded-lg text-[9px] uppercase font-bold tracking-widest transition-all ${osState.taskbarPosition === 'bottom' ? 'bg-white/10 text-white' : 'opacity-40 hover:opacity-100'}`}
                          >
                            Lower
                          </button>
                          <button 
                            onClick={() => onUpdateOS({ taskbarPosition: 'top' })}
                            className={`flex-1 text-center py-1.5 rounded-lg text-[9px] uppercase font-bold tracking-widest transition-all ${osState.taskbarPosition === 'top' ? 'bg-white/10 text-white' : 'opacity-40 hover:opacity-100'}`}
                          >
                            Upper
                          </button>
                       </div>
                     </div>
                   </div>
                 </section>

                 <section>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Environment Backdrop</h3>
                      <label 
                        htmlFor="wallpaper-upload"
                        className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-[9px] uppercase font-bold tracking-widest hover:bg-white/10 cursor-pointer transition-colors"
                      >
                        <Upload className="w-3 h-3" /> Upload
                        <input id="wallpaper-upload" type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                      </label>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {wallPapers.map((wall, i) => (
                         <div 
                           key={i}
                           onClick={() => onUpdateOS({ wallpaper: wall })}
                           className={`h-24 rounded-2xl bg-cover bg-center cursor-pointer transition-all border-2 ${osState.wallpaper === wall ? 'border-aura-accent scale-[1.02] shadow-xl' : 'border-transparent opacity-60 hover:opacity-100'}`}
                           style={{ backgroundImage: `url(${wall})` }}
                         />
                      ))}
                    </div>
                 </section>
               </div>
             )}

             {activeTab === 'system' && (
               <div className="space-y-8 max-w-2xl">
                 <section className="p-6 bg-white/[0.02] rounded-3xl border border-white/5">
                    <h3 className="text-[10px] uppercase text-white/30 font-bold mb-4 tracking-widest">OS Installation Mode</h3>
                    <div className="flex items-center justify-between">
                       <div className="flex flex-col gap-1">
                          <span className="text-xs font-semibold">{osState.osMode === 'live' ? 'Live Environment (Ephemeral)' : 'Production Environment (Persistent)'}</span>
                          <span className="text-[9px] text-white/30 uppercase">Active running mode for Aura Core</span>
                       </div>
                       <button 
                         onClick={() => onUpdateOS({ osMode: osState.osMode === 'live' ? 'installed' : 'live' })}
                         className={`px-4 py-2 rounded-xl text-[9px] uppercase font-bold border transition-all ${osState.osMode === 'live' ? 'bg-orange-500/20 text-orange-400 border-orange-500/20' : 'bg-green-500/20 text-green-400 border-green-500/20'}`}
                       >
                         {osState.osMode === 'live' ? 'Deploy to Disk' : 'Switch to Live'}
                       </button>
                    </div>
                 </section>

                 <div className="grid grid-cols-2 gap-4">
                    <section className="p-4 bg-white/[0.02] rounded-2xl border border-white/5 space-y-4">
                       <span className="text-[10px] uppercase text-white/30 tracking-widest">Audio Signal</span>
                       <div className="flex items-center gap-4">
                          <Volume2 className="w-4 h-4 text-aura-accent" />
                          <div className="flex-1 h-1 bg-white/10 rounded-full relative overflow-hidden">
                             <div className="absolute inset-y-0 left-0 w-3/4 bg-aura-accent" />
                          </div>
                          <span className="text-[9px] font-mono">75%</span>
                       </div>
                    </section>
                    <section className="p-4 bg-white/[0.02] rounded-2xl border border-white/5 space-y-4">
                       <span className="text-[10px] uppercase text-white/30 tracking-widest">Display Gamma</span>
                       <div className="flex items-center gap-4">
                          <Monitor className="w-4 h-4 text-aura-accent" />
                          <div className="flex-1 h-1 bg-white/10 rounded-full relative overflow-hidden">
                             <div className="absolute inset-y-0 left-0 w-[60%] bg-aura-accent" />
                          </div>
                          <span className="text-[9px] font-mono">60%</span>
                       </div>
                    </section>
                 </div>
               </div>
             )}

             {activeTab === 'hardware' && (
               <div className="space-y-6 max-w-2xl font-mono">
                  <div className="p-6 bg-black/40 rounded-3xl border border-white/5 flex items-center gap-6">
                     <div className="w-16 h-16 rounded-2xl bg-aura-accent/10 flex items-center justify-center border border-aura-accent/20">
                        <Cpu className="w-8 h-8 text-aura-accent" />
                     </div>
                     <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-center text-[10px]">
                           <span className="text-white/60">Processor: Neural Engine 12C/24T</span>
                           <span className="text-green-400">Stable 14%</span>
                        </div>
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                           <div className="h-full bg-green-400 w-[14%]" />
                        </div>
                     </div>
                  </div>

                  <div className="p-6 bg-black/40 rounded-3xl border border-white/5 flex items-center gap-6">
                     <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                        <HardDrive className="w-8 h-8 text-purple-400" />
                     </div>
                     <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-center text-[10px]">
                           <span className="text-white/60">Memory: DDR5-6400 Quantum</span>
                           <span className="text-purple-400">4.2GB / 32GB</span>
                        </div>
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                           <div className="h-full bg-purple-400 w-[13%]" />
                        </div>
                     </div>
                  </div>
               </div>
             )}

             {activeTab === 'security' && (
                <div className="space-y-6 max-w-2xl">
                  <section className="p-6 bg-green-500/5 rounded-3xl border border-green-500/20 space-y-4">
                     <div className="flex items-center gap-3">
                        <Shield className="w-6 h-6 text-green-400" />
                        <h4 className="text-sm font-bold text-green-400">TPM 2.0 Hardened State</h4>
                     </div>
                     <p className="text-[10px] text-white/50 leading-relaxed uppercase tracking-wider">All system calls are cryptographically signed and verified by the hardware root of trust. TPM 2.0 extension is locked to current kernel build.</p>
                     <div className="flex gap-4">
                        <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-[9px] font-bold uppercase">Encrypted</div>
                        <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-[9px] font-bold uppercase">Attested</div>
                     </div>
                  </section>

                  <section className="p-6 bg-white/[0.02] rounded-3xl border border-white/5">
                     <div className="flex items-center justify-between">
                        <div className="space-y-1">
                           <span className="text-xs font-bold">Security Shield Visibility</span>
                           <p className="text-[10px] text-white/30 uppercase">Toggle the floating desktop security widget</p>
                        </div>
                        <button 
                          onClick={() => onUpdateOS({ showSecurityShield: !osState.showSecurityShield })}
                          className={`px-4 py-2 rounded-xl text-[9px] uppercase font-bold border transition-all ${osState.showSecurityShield ? 'bg-aura-accent/20 text-aura-accent border-aura-accent/20' : 'bg-white/5 text-white/40 border-white/10'}`}
                        >
                          {osState.showSecurityShield ? 'Enabled' : 'Disabled'}
                        </button>
                     </div>
                  </section>
                </div>
             )}
          </div>
        </div>
      );

    case AppType.REPOS:
      const apps = [
        { id: AppType.OFFICE, name: 'Aura Office Pro', size: '254MB', desc: 'Secure productivity suite.' },
        { id: AppType.PDF, name: 'Secure PDF Reader', size: '12MB', desc: 'Encrypted document viewer.' },
        { id: AppType.PLAYER, name: 'Nova Player', size: '45MB', desc: 'High-fidelity media engine.' },
        { id: 'gimp', name: 'Neural Pixel AI', size: '182MB', desc: 'Generative image processing.' },
        { id: 'zoom', name: 'Bridge Collab', size: '88MB', desc: 'Private communication bridge.' }
      ];

      return (
        <div className="h-full bg-aura-surface text-white flex flex-col">
          <div className="p-4 border-b border-white/5 flex items-center justify-between bg-black/20">
             <div className="flex items-center gap-3">
               <Package className="w-4 h-4 text-aura-accent" />
               <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Package Registry</span>
             </div>
             <div className="px-3 py-1 bg-white/5 rounded-full border border-white/5 text-[9px] text-white/30 flex items-center gap-2 italic tracking-tighter uppercase">
               Uplink: stable-va-1
             </div>
          </div>
          <div className="flex-1 overflow-auto p-6 grid grid-cols-1 gap-3">
             {apps.map(pkg => {
               const isInstalled = osState.installedApps.includes(pkg.id as AppType);
               const isOnDesktop = osState.desktopIcons.some(icon => icon.id === pkg.id);

               return (
                 <div key={pkg.id} className="p-4 bg-white/[0.02] rounded-2xl border border-white/5 flex items-center justify-between hover:bg-white/[0.05] hover:border-white/10 transition-all group">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-semibold group-hover:text-aura-accent transition-colors">{pkg.name}</span>
                      <span className="text-[9px] text-white/30 uppercase tracking-widest font-mono">{pkg.size} — {pkg.desc}</span>
                    </div>
                    <div className="flex items-center gap-2">
                       {isInstalled && (
                          <button 
                            disabled={isOnDesktop}
                            onClick={() => {
                              const nextX = (osState.desktopIcons.length % 4) * 100;
                              const nextY = Math.floor(osState.desktopIcons.length / 4) * 100;
                              onUpdateOS({ desktopIcons: [...osState.desktopIcons, { id: pkg.id as AppType, x: nextX, y: nextY }] });
                            }}
                            className={`p-2 rounded-xl border transition-all ${
                              isOnDesktop 
                              ? 'bg-white/5 text-white/20 border-white/5 cursor-default' 
                              : 'bg-white/10 text-white hover:bg-white border-white/10 hover:text-black'
                            }`}
                          >
                             {isOnDesktop ? <Shield className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" title="Add to Desktop" />}
                          </button>
                       )}
                       <button 
                        disabled={isInstalled}
                        onClick={() => {
                          if (!isInstalled) {
                            onUpdateOS({ installedApps: [...osState.installedApps, pkg.id as AppType] });
                          }
                        }}
                        className={`px-4 py-2 rounded-xl text-[9px] font-bold uppercase tracking-tighter transition-all ${
                          isInstalled 
                          ? 'bg-green-500/10 text-green-400 border border-green-500/20 opacity-50 cursor-default' 
                          : 'bg-aura-accent/20 text-aura-accent border border-aura-accent/30 hover:bg-aura-accent hover:text-black'
                        }`}
                      >
                        {isInstalled ? 'SECURELY DEPLOYED' : 'Deploy Package'}
                      </button>
                    </div>
                 </div>
               );
             })}
          </div>
        </div>
      );
    case AppType.OFFICE:
      return (
        <div className="h-full bg-slate-50 flex flex-col text-slate-800">
           <div className="h-10 bg-slate-100 border-b flex items-center px-4 gap-4">
              <div className="flex gap-1">
                <div className="w-8 h-8 rounded hover:bg-slate-200 flex items-center justify-center cursor-pointer"><FileText className="w-4 h-4" /></div>
                <div className="w-8 h-8 rounded hover:bg-slate-200 flex items-center justify-center cursor-pointer font-bold">B</div>
                <div className="w-8 h-8 rounded hover:bg-slate-200 flex items-center justify-center cursor-pointer italic">I</div>
              </div>
              <div className="h-4 w-px bg-slate-300" />
              <div className="text-[10px] uppercase font-bold text-slate-400">Untitled Document</div>
           </div>
           <div className="flex-1 p-12 overflow-auto bg-slate-200/50 flex justify-center">
              <div className="w-full max-w-2xl bg-white shadow-lg p-16 min-h-[800px] outline-none" contentEditable spellCheck="false">
                 <h1 className="text-3xl font-bold mb-4">NovaOS Design Spec</h1>
                 <p className="text-slate-600 leading-relaxed mb-4 italic">Draft v1.0.4</p>
                 <p className="text-slate-800 leading-relaxed">The NovaOS architecture leverages a hardened Linux kernel with mandatory TPM 2.0 attestation. User workflows are streamlined through a minimalist desktop environment that prioritizes secure execution and rapid app deployment.</p>
              </div>
           </div>
        </div>
      );

    case AppType.PDF:
      return (
        <div className="h-full bg-slate-800 flex flex-col">
           <div className="h-10 bg-slate-900 border-b border-white/5 flex items-center justify-between px-4">
              <div className="flex items-center gap-3">
                <FileEdit className="w-4 h-4 text-rose-400" />
                <span className="text-[10px] text-white/50 uppercase tracking-widest">Nova PDF Editor</span>
              </div>
              <div className="flex gap-2">
                <div className="px-2 py-1 bg-white/5 rounded text-[8px] text-white/40 uppercase">Page 1 / 1</div>
              </div>
           </div>
           <div className="flex-1 flex items-center justify-center p-8">
              <div className="w-[400px] h-full bg-white rounded-sm shadow-2xl relative p-8">
                 <div className="w-12 h-1 bg-rose-500 mb-6" />
                 <div className="space-y-4">
                    <div className="h-4 bg-slate-100 rounded w-full" />
                    <div className="h-4 bg-slate-100 rounded w-[90%]" />
                    <div className="h-4 bg-slate-100 rounded w-[95%]" />
                    <div className="h-4 bg-slate-100 rounded w-[40%]" />
                 </div>
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/5 cursor-crosshair">
                   <div className="px-3 py-1 bg-rose-500 text-white text-[10px] uppercase font-bold rounded">Edit Block</div>
                 </div>
              </div>
           </div>
        </div>
      );

    case AppType.PLAYER:
      return (
        <div className="h-full bg-black flex flex-col items-center justify-center">
           <div className="w-48 h-48 rounded-full border border-aura-accent/20 flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full border-t border-aura-accent animate-spin" />
              <div className="w-40 h-40 rounded-full bg-aura-accent/5 flex items-center justify-center">
                 <Play className="w-12 h-12 text-aura-accent fill-aura-accent" />
              </div>
           </div>
           <div className="mt-8 text-center">
              <div className="text-xs font-bold text-white uppercase tracking-[0.3em]">Synapse Pulse</div>
              <div className="text-[10px] text-white/30 uppercase mt-2">Experimental Beats v0.4</div>
           </div>
        </div>
      );

    default:
      return null;
  }
}
