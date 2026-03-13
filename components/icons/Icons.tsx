
import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

export const FileIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
);

export const SaveIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
);

export const PlayIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
);

export const SquareIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
);

export const ShareIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
);

export const BotIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 8V4H8"></path><rect x="4" y="12" width="16" height="8" rx="2"></rect><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M12 18v-2"></path><path d="M12 12V8"></path></svg>
);

export const ViewIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m21.18 13.1-4.22-9.62a.45.45 0 0 0-.82.32l2.36 4.72-6.1-3.48a.45.45 0 0 0-.54.12L2.82 20.3a.45.45 0 0 0 .6.6l10.26-6.52 4.14 8.28a.45.45 0 0 0 .82-.32L21.88 13.5a.45.45 0 0 0-.7-.4Z"></path></svg>
);

export const XIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);


// Component Icons
export const ResistorIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 60 20" fill="none" stroke="currentColor" strokeWidth="1" {...props}>
    <path d="M0 10 H10 L15 5 L20 15 L25 5 L30 15 L35 5 L40 15 L45 10 H60" />
  </svg>
);

export const LedIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 20 40" fill="none" stroke="currentColor" strokeWidth="1" {...props}>
    <path d="M10 0 V15" />
    <path d="M10 40 V25" />
    <rect x="2" y="15" width="16" height="10" rx="2" />
    <path d="M6 10 l-4 -4" />
    <path d="M14 10 l4 -4" />
  </svg>
);

export const ArduinoIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 140 120" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <rect x="1" y="1" width="138" height="118" rx="5" fill="#00979C" stroke="none" />
    <rect x="10" y="20" width="120" height="80" fill="#333" stroke="none" />
    <circle cx="120" cy="100" r="5" fill="#aaa" stroke="none" />
    <rect x="50" y="50" width="40" height="20" fill="#777" stroke="none" />
    <line x1="0" y1="10" x2="140" y2="10" stroke="#fff" strokeWidth="10" />
    <line x1="0" y1="90" x2="40" y2="90" stroke="#fff" strokeWidth="10" />
    <line x1="0" y1="110" x2="60" y2="110" stroke="#fff" strokeWidth="10" />
  </svg>
);

export const BreadboardIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 340 120" fill="none" stroke="currentColor" strokeWidth="1" {...props}>
        <rect x="1" y="1" width="338" height="118" rx="5" fill="#f0f0f0" stroke="#ccc" />
        <line x1="10" y1="10" x2="330" y2="10" stroke="#d9534f" />
        <line x1="10" y1="20" x2="330" y2="20" stroke="#5bc0de" />
        <line x1="10" y1="100" x2="330" y2="100" stroke="#d9534f" />
        <line x1="10" y1="110" x2="330" y2="110" stroke="#5bc0de" />
        {Array.from({ length: 50 }).map((_, i) => (
             <g key={i}>
                <circle cx={20 + i * 6} cy="40" r="1" fill="#777" stroke="none"/>
                <circle cx={20 + i * 6} cy="50" r="1" fill="#777" stroke="none"/>
                <circle cx={20 + i * 6} cy="70" r="1" fill="#777" stroke="none"/>
                <circle cx={20 + i * 6} cy="80" r="1" fill="#777" stroke="none"/>
            </g>
        ))}
    </svg>
);

export const SwitchIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 20 40" fill="none" stroke="currentColor" strokeWidth="1" {...props}>
        <circle cx="10" cy="5" r="3" />
        <circle cx="10" cy="35" r="3" />
        <line x1="10" y1="5" x2="10" y2="35" />
        <line x1="10" y1="15" x2="18" y2="20" strokeWidth="2" />
    </svg>
);

export const PowerSupplyIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" {...props}>
        <circle cx="20" cy="20" r="18" strokeWidth="2" />
        <line x1="10" y1="20" x2="30" y2="20" />
        <line x1="20" y1="10" x2="20" y2="16" />
        <line x1="20" y1="24" x2="20" y2="30" />
        <text x="5" y="15" fontSize="10px" fill="currentColor">+</text>
        <text x="5" y="32" fontSize="12px" fill="currentColor">-</text>
    </svg>
);
   