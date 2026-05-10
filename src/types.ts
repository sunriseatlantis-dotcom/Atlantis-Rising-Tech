/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum AppType {
  BROWSER = 'browser',
  OFFICE = 'office',
  PDF = 'pdf',
  MUSIC = 'music',
  PLAYER = 'player',
  SETTINGS = 'settings',
  REPOS = 'repos',
  TERMINAL = 'terminal'
}

export interface WindowState {
  id: string;
  type: AppType;
  title: string;
  isMaximized: boolean;
  isMinimized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number | string; height: number | string };
}

export interface OSState {
  isBooted: boolean;
  isSecure: boolean;
  wallpaper: string;
  theme: 'dark' | 'light';
  accentColor: string;
  showSecurityShield: boolean;
  taskbarPosition: 'bottom' | 'top';
  isTaskbarMinimized: boolean;
  installedApps: AppType[];
  desktopIcons: { id: AppType; x: number; y: number }[];
  osMode: 'live' | 'installed';
}
