import React, { useRef } from 'react';
import { motion, useDragControls } from 'motion/react';
import { X, Minus, Maximize2 } from 'lucide-react';
import { WindowState } from '../types';

interface WindowProps {
  window: WindowState;
  isActive: boolean;
  onClose: (id: string) => void;
  onFocus: (id: string) => void;
  onMaximize: (id: string) => void;
  onMinimize: (id: string) => void;
  onUpdate: (id: string, updates: Partial<WindowState>) => void;
  children: React.ReactNode;
}

export default function Window({
  window,
  isActive,
  onClose,
  onFocus,
  onMaximize,
  onMinimize,
  onUpdate,
  children
}: WindowProps) {
  const dragControls = useDragControls();
  const windowRef = useRef<HTMLDivElement>(null);

  const handleResize = (e: React.MouseEvent) => {
    if (window.isMaximized) return;
    e.preventDefault();
    e.stopPropagation();

    const startX = e.pageX;
    const startY = e.pageY;
    const startWidth = typeof window.size.width === 'number' ? window.size.width : 840;
    const startHeight = typeof window.size.height === 'number' ? window.size.height : 520;

    const onMouseMove = (moveE: MouseEvent) => {
      const newWidth = Math.max(400, startWidth + (moveE.pageX - startX));
      const newHeight = Math.max(300, startHeight + (moveE.pageY - startY));
      onUpdate(window.id, { size: { width: newWidth, height: newHeight } });
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <motion.div
      ref={windowRef}
      drag={!window.isMaximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      onDragEnd={(_, info) => {
        onUpdate(window.id, { 
          position: { 
            x: window.position.x + info.offset.x, 
            y: window.position.y + info.offset.y 
          } 
        });
      }}
      initial={false}
      animate={{ 
        scale: 1, 
        opacity: 1,
        width: window.isMaximized ? '100vw' : window.size.width,
        height: window.isMaximized ? 'calc(100vh - 32px)' : window.size.height,
        x: window.isMaximized ? 0 : window.position.x,
        y: window.isMaximized ? 0 : window.position.y,
        zIndex: window.zIndex
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 300, mass: 0.5 }}
      className={`absolute flex flex-col bg-aura-surface/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl ${isActive ? 'ring-1 ring-aura-accent/50 selection:bg-aura-accent/30' : ''}`}
      onPointerDown={() => onFocus(window.id)}
    >
      {/* Title Bar */}
      <div 
        className="h-10 border-b border-white/5 flex items-center justify-between px-4 cursor-default select-none group"
        onPointerDown={(e) => dragControls.start(e)}
      >
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
          </div>
          <span className="text-[10px] font-semibold text-white/50 uppercase tracking-[0.2em] ml-4">{window.title}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={(e) => { e.stopPropagation(); onMinimize(window.id); }}
            className="p-1.5 hover:bg-white/10 rounded-md transition-colors"
          >
            <Minus className="w-3.5 h-3.5 text-white/30" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onMaximize(window.id); }}
            className="p-1.5 hover:bg-white/10 rounded-md transition-colors"
          >
            <Maximize2 className="w-3.5 h-3.5 text-white/30" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onClose(window.id); }}
            className="p-1.5 hover:bg-rose-500/80 rounded-md transition-colors group/close"
          >
            <X className="w-3.5 h-3.5 text-white/30 group-hover/close:text-white" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-black/20 pointer-events-auto">
        {children}
      </div>

      {/* Resize Handle */}
      {!window.isMaximized && (
        <div 
          className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize flex items-end justify-end p-0.5 opacity-0 hover:opacity-100 transition-opacity"
          onMouseDown={handleResize}
        >
          <div className="w-1.5 h-1.5 border-r border-b border-white/40 rounded-[1px]" />
        </div>
      )}
    </motion.div>
  );
}
