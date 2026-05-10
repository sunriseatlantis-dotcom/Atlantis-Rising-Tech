import { 
  Globe, 
  FileText, 
  FileEdit, 
  Music, 
  Play, 
  Settings, 
  Package, 
  Terminal 
} from 'lucide-react';
import { AppType } from './types';

export const APPS = [
  { id: AppType.BROWSER, name: 'Nova Browser', icon: Globe, color: 'text-blue-400' },
  { id: AppType.OFFICE, name: 'Open Office', icon: FileText, color: 'text-emerald-400' },
  { id: AppType.PDF, name: 'Nova PDF', icon: FileEdit, color: 'text-rose-400' },
  { id: AppType.MUSIC, name: 'Nova Studio', icon: Music, color: 'text-purple-400' },
  { id: AppType.PLAYER, name: 'Nova Player', icon: Play, color: 'text-amber-400' },
  { id: AppType.TERMINAL, name: 'Nova Terminal', icon: Terminal, color: 'text-slate-400' },
  { id: AppType.REPOS, name: 'Package Manager', icon: Package, color: 'text-indigo-400' },
  { id: AppType.SETTINGS, name: 'Settings', icon: Settings, color: 'text-gray-400' },
];

export const INITIAL_Z_INDEX = 10;
export const TASKBAR_HEIGHT = 48;
