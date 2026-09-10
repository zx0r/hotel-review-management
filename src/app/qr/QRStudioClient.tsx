'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Download,
  Copy,
  Check,
  Play,
  Printer,
  Sparkles,
  Sliders,
  Palette,
  Eye,
  QrCode as QrIcon,
  RefreshCw,
  FileCode,
  Image as ImageIcon,
  ExternalLink,
  ShieldCheck,
  Layers,
  Star,
  Activity,
  Code2,
  ArrowLeft,
  Nfc,
} from 'lucide-react';
import {
  GoogleLogo,
  TripAdvisorLogo,
  BookingLogo,
  AgodaLogo,
  TripComLogo,
} from '@/components/BrandIcons';

// Custom element tag reference for React 19
const QRCodeElement = 'qr-code' as any;

interface ColorThemePreset {
  id: string;
  name: string;
  moduleColor: string;
  ringColor: string;
  centerColor: string;
  bgColor: string;
  description: string;
}

const PRESET_THEMES: ColorThemePreset[] = [
  {
    id: 'haviland-luxury',
    name: 'Haviland Obsidian & Gold',
    moduleColor: '#141413',
    ringColor: '#C5A880',
    centerColor: '#C5A880',
    bgColor: '#FFFFFF',
    description: 'Boutique hospitality signature with warm champagne accents',
  },
  {
    id: 'sujet-navy',
    name: 'Sujet Marina Blue',
    moduleColor: '#0F294D',
    ringColor: '#2662F6',
    centerColor: '#2662F6',
    bgColor: '#FFFFFF',
    description: 'Deep maritime navy with royal ocean blue indicators',
  },
  {
    id: 'classic-scannable',
    name: 'Classic 100% Scannable',
    moduleColor: '#000000',
    ringColor: '#000000',
    centerColor: '#000000',
    bgColor: '#FFFFFF',
    description: 'Maximum contrast, guaranteed readability on any device and lighting',
  },
  {
    id: 'emerald-boutique',
    name: 'Emerald Luxe',
    moduleColor: '#064E3B',
    ringColor: '#059669',
    centerColor: '#10B981',
    bgColor: '#FFFFFF',
    description: 'Refined emerald green with jade accents for eco/nature luxury',
  },
];

const ANIMATION_PRESETS = [
  { id: 'RadialRipple', label: 'Harmonic Ripple (Video)' },
  { id: 'RadialRippleIn', label: 'Vortex Ripple' },
  { id: 'MaterializeIn', label: 'Materialize' },
  { id: 'FadeInCenterOut', label: 'Center Pulse' },
  { id: 'FadeInTopDown', label: 'Top Down' },
] as const;

const TOUCHPOINT_SHORTCUTS = [
  { label: 'Review Hub (Main)', url: 'https://havilandhouse-reviews.vercel.app' },
  {
    label: 'Google Reviews Direct',
    url: 'https://www.google.com/maps/place/Sujet+Marina+Hotel+Da+Nang+By+Haviland/@16.0793157,108.2230923,19z/data=!4m11!3m10!1s0x314219389f667657:0x84d56c065e4f42ab!5m2!4m1!1i2!8m2!3d16.0793158!4d108.2235571!9m1!1b1!16s%2Fg%2F11z3mp45j9?entry=ttu',
  },
  {
    label: 'Tripadvisor Direct',
    url: 'https://www.tripadvisor.com/UserReviewEdit-g25231262-d34369075-Sujet_Marina_Da_Nang_Hotel_by_Haviland-Hai_Chau_Da_Nang.html',
  },
  {
    label: 'Booking.com',
    url: 'https://www.booking.com/hotel/vn/sujet-marina-da-nang-by-haviland.html#tab-reviews',
  },
  {
    label: 'Agoda',
    url: 'https://www.agoda.com/sujet-marina-da-nang-hotel-by-haviland/hotel/da-nang-vn.html#reviews',
  },
  {
    label: 'Trip.com',
    url: 'https://www.trip.com/hotels/da-nang-hotel-detail-134108126/sujet-marina-hotel-da-nang-by-haviland/',
  },
  {
    label: 'Official Zalo (Haviland OA)',
    url: 'https://zalo.me/3499485966939792994',
  },
  {
    label: 'Official Hotel Website',
    url: 'https://havilandhouse.com/sujet-marina-da-nang-hotel-by-haviland-smd',
  },
];

const LOGO_OPTIONS = [
  { id: 'haviland-crest', label: 'Haviland Crest', path: '/logo-haviland-house.png' },
  { id: 'sujet-marina', label: 'Sujet Marina Icon', path: '/apple-touch-icon.png' },
  { id: 'haviland-horizontal', label: 'Haviland Text', path: '/haviland-logo-horizontal.png' },
  { id: 'none', label: 'No Logo (Pure QR)', path: '' },
];

export function QRStudioClient() {
  // Config state
  const [url, setUrl] = useState('https://havilandhouse-reviews.vercel.app');
  const [selectedThemeId, setSelectedThemeId] = useState('haviland-luxury');
  const [moduleColor, setModuleColor] = useState('#141413');
  const [ringColor, setRingColor] = useState('#C5A880');
  const [centerColor, setCenterColor] = useState('#C5A880');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [selectedLogo, setSelectedLogo] = useState('/logo-haviland-house.png');
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(null);
  const [maskRatio, setMaskRatio] = useState('1.0');
  const [activeAnimation, setActiveAnimation] = useState<string>('RadialRipple');
  const [isAutoLoop, setIsAutoLoop] = useState<boolean>(true);
  const [loopIntervalMs, setLoopIntervalMs] = useState<number>(2400);
  const [previewMode, setPreviewMode] = useState<'qr-only' | 'stand-mockup'>('stand-mockup');
  const [exportTarget, setExportTarget] = useState<'stand' | 'qr'>('stand');
  const [exportRes, setExportRes] = useState<'1024' | '2048' | '4096'>('2048');

  // UI state
  const [isCopied, setIsCopied] = useState(false);
  const [isSvgCopied, setIsSvgCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [qrLoaded, setQrLoaded] = useState(false);

  const qrRef = useRef<HTMLElement | null>(null);
  const standQrRef = useRef<HTMLElement | null>(null);

  // Robust resolver for whichever <qr-code> element is mounted
  const getActiveQrElement = (): HTMLElement | null => {
    if (typeof document === 'undefined') return null;
    if (previewMode === 'stand-mockup' && standQrRef.current?.shadowRoot?.querySelector('svg')) {
      return standQrRef.current;
    }
    if (qrRef.current?.shadowRoot?.querySelector('svg')) {
      return qrRef.current;
    }
    if (standQrRef.current?.shadowRoot?.querySelector('svg')) {
      return standQrRef.current;
    }
    const all = document.querySelectorAll('qr-code');
    for (const el of Array.from(all)) {
      if ((el as HTMLElement).shadowRoot?.querySelector('svg')) {
        return el as HTMLElement;
      }
    }
    return null;
  };

  // Trigger web component animation across all active QR elements
  const triggerAnimation = (presetName?: string) => {
    const anim = presetName || activeAnimation;
    if (typeof document === 'undefined') return;
    const all = document.querySelectorAll('qr-code');
    all.forEach((el) => {
      try {
        (el as any)?.animateQRCode?.(anim);
      } catch (err) {
        console.warn('Animation trigger error:', err);
      }
    });
  };

  // Auto-looping continuous animation (like in the bitjson video)
  useEffect(() => {
    if (!isAutoLoop) return;
    const interval = setInterval(() => {
      triggerAnimation();
    }, loopIntervalMs);
    return () => clearInterval(interval);
  }, [isAutoLoop, loopIntervalMs, activeAnimation]);

  // Apply theme preset
  const handleApplyTheme = (preset: ColorThemePreset) => {
    setSelectedThemeId(preset.id);
    setModuleColor(preset.moduleColor);
    setRingColor(preset.ringColor);
    setCenterColor(preset.centerColor);
    setBgColor(preset.bgColor);
  };

  // Hook into codeRendered event
  useEffect(() => {
    const checkDefined = () => {
      if (typeof window !== 'undefined' && customElements.get('qr-code')) {
        setQrLoaded(true);
      } else {
        setTimeout(checkDefined, 150);
      }
    };
    checkDefined();
  }, []);

  useEffect(() => {
    const all = typeof document !== 'undefined' ? document.querySelectorAll('qr-code') : [];
    const onRendered = () => {
      setQrLoaded(true);
      triggerAnimation();
    };

    all.forEach((el) => el.addEventListener('codeRendered', onRendered));
    return () => {
      all.forEach((el) => el.removeEventListener('codeRendered', onRendered));
    };
  }, [url, moduleColor, ringColor, centerColor, maskRatio, selectedLogo, customLogoUrl, previewMode]);

  // Handle custom image upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const dataUrl = event.target.result as string;
          setCustomLogoUrl(dataUrl);
          setSelectedLogo(dataUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const activeIconPath = customLogoUrl && selectedLogo === customLogoUrl ? customLogoUrl : selectedLogo;

  // Extract pure standalone SVG from active shadowRoot
  const getCleanSVGString = async (): Promise<string | null> => {
    const el = getActiveQrElement();
    if (!el || !el.shadowRoot) return null;

    const innerSvg = el.shadowRoot.querySelector('svg');
    if (!innerSvg) return null;

    const clone = innerSvg.cloneNode(true) as SVGSVGElement;
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    clone.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
    const viewBox = clone.getAttribute('viewBox') || '-22.5 -22.5 45 45';
    const [vbX, vbY, vbWidth, vbHeight] = viewBox.split(' ').map(Number);

    // Insert background rect if non-transparent
    if (bgColor && bgColor !== 'transparent') {
      const bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      bgRect.setAttribute('x', String(vbX));
      bgRect.setAttribute('y', String(vbY));
      bgRect.setAttribute('width', String(vbWidth));
      bgRect.setAttribute('height', String(vbHeight));
      bgRect.setAttribute('fill', bgColor);
      clone.insertBefore(bgRect, clone.firstChild);
    }

    // Embed center logo if selected
    if (activeIconPath) {
      try {
        let base64Icon = activeIconPath;
        if (!activeIconPath.startsWith('data:')) {
          const res = await fetch(activeIconPath);
          const blob = await res.blob();
          base64Icon = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
          });
        }

        const iconSize = vbWidth * 0.22;
        const iconX = -iconSize / 2;
        const iconY = -iconSize / 2;

        const imageEl = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        imageEl.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', base64Icon);
        imageEl.setAttribute('href', base64Icon);
        imageEl.setAttribute('x', String(iconX));
        imageEl.setAttribute('y', String(iconY));
        imageEl.setAttribute('width', String(iconSize));
        imageEl.setAttribute('height', String(iconSize));
        imageEl.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        clone.appendChild(imageEl);
      } catch (e) {
        console.warn('Could not embed logo in SVG export:', e);
      }
    }

    return new XMLSerializer().serializeToString(clone);
  };

  // Extract full A5/A6 Acrylic Desk Stand Mockup Vector SVG
  const getCleanStandMockupSVGString = async (): Promise<string | null> => {
    let qrSvg = await getCleanSVGString();
    if (!qrSvg) {
      await new Promise((r) => setTimeout(r, 200));
      qrSvg = await getCleanSVGString();
    }
    if (!qrSvg) return null;

    const vbMatch = qrSvg.match(/viewBox="([^"]+)"/);
    const qrViewBox = vbMatch ? vbMatch[1] : '-22.5 -22.5 45 45';

    const innerContentMatch = qrSvg.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
    const qrInner = innerContentMatch ? innerContentMatch[1] : '';

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 400 580" width="400" height="580">
  <defs>
    <linearGradient id="standCardBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="60%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#F9F9F8"/>
    </linearGradient>
    <linearGradient id="clipGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#DCDCDC"/>
      <stop offset="50%" stop-color="#EFEFEF"/>
      <stop offset="100%" stop-color="#DCDCDC"/>
    </linearGradient>
    <filter id="cardShadow" x="-10%" y="-5%" width="120%" height="115%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#000000" flood-opacity="0.14"/>
    </filter>
  </defs>

  <!-- Background Base Acrylic Card -->
  <rect x="10" y="8" width="380" height="564" rx="32" fill="url(#standCardBg)" stroke="#C5A880" stroke-width="2" stroke-opacity="0.45" filter="url(#cardShadow)"/>

  <!-- Top Acrylic Metallic Clip Header -->
  <rect x="176" y="24" width="48" height="6" rx="3" fill="url(#clipGrad)"/>

  <!-- Haviland House Super-title -->
  <text x="200" y="52" text-anchor="middle" fill="#B89668" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" letter-spacing="0.25em">HAVILAND HOUSE</text>

  <!-- Property Name -->
  <text x="200" y="78" text-anchor="middle" fill="#171717" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="700" letter-spacing="-0.02em">Sujet Marina Hotel</text>

  <!-- 5 Gold Stars -->
  <g transform="translate(142, 88)">
    <path fill="#FBBF24" transform="translate(0, 0) scale(0.68)" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    <path fill="#FBBF24" transform="translate(24, 0) scale(0.68)" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    <path fill="#FBBF24" transform="translate(48, 0) scale(0.68)" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    <path fill="#FBBF24" transform="translate(72, 0) scale(0.68)" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    <path fill="#FBBF24" transform="translate(96, 0) scale(0.68)" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </g>

  <!-- Enlarged White QR Container Box -->
  <rect x="85" y="112" width="230" height="230" rx="24" fill="#FFFFFF" stroke="#E5E5E5" stroke-width="1"/>

  <!-- Embedded Dynamic Vector QR Code -->
  <svg x="90" y="117" width="220" height="220" viewBox="${qrViewBox}">
    ${qrInner}
  </svg>

  <!-- Tap Your Phone + NFC Premium Pill Badge (Compact Luxury) -->
  <g transform="translate(137, 354)">
    <rect width="126" height="22" rx="11" fill="#171717"/>
    <!-- Official Lucide NFC Waves Icon -->
    <g transform="translate(11, 3) scale(0.67)" fill="none" stroke="#C5A880" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M6 8.32a7.43 7.43 0 0 1 0 7.36"/>
      <path d="M9.46 6.21a11.76 11.76 0 0 1 0 11.58"/>
      <path d="M12.91 4.1a15.91 15.91 0 0 1 .01 15.8"/>
      <path d="M16.37 2a20.16 20.16 0 0 1 0 20"/>
    </g>
    <text x="31" y="15" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9.5" font-weight="600" letter-spacing="0.02em">Tap Your Phone</text>
  </g>
  <text x="200" y="390" text-anchor="middle" fill="#737373" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="400">or scan QR code with camera</text>

  <!-- Divider 1 -->
  <line x1="36" y1="416" x2="364" y2="416" stroke="#EAEAEA" stroke-width="1"/>

  <!-- 5 Brand Logos Row -->
  <!-- 1. Google -->
  <g transform="translate(42, 426)">
    <rect width="40" height="40" rx="12" fill="#FFFFFF" stroke="#E5E5E5" stroke-width="1"/>
    <g transform="translate(8, 8) scale(1)">
      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.27 21.41 7.35 24 12 24z"/>
      <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.27 2.59 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
    </g>
    <text x="20" y="52" text-anchor="middle" fill="#737373" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="8.5" font-weight="400">Google</text>
  </g>

  <!-- 2. Tripadvisor -->
  <g transform="translate(110, 426)">
    <rect width="40" height="40" rx="12" fill="#FFFFFF" stroke="#E5E5E5" stroke-width="1"/>
    <g transform="translate(8, 8) scale(1)">
      <path fill="#34E0A1" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
      <path fill="#000000" d="M12.006 4.295c-2.67 0-5.338.784-7.645 2.353H0l1.963 2.135a5.997 5.997 0 0 0 4.04 10.43 5.976 5.976 0 0 0 4.075-1.6L12 19.705l1.922-2.09a5.972 5.972 0 0 0 4.072 1.598 6 6 0 0 0 6-5.998 5.982 5.982 0 0 0-1.957-4.432L24 6.648h-4.35a13.573 13.573 0 0 0-7.644-2.353zM12 6.255c1.531 0 3.063.303 4.504.903C13.943 8.138 12 10.43 12 13.1c0-2.671-1.942-4.962-4.504-5.942A11.72 11.72 0 0 1 12 6.256zM6.002 9.157a4.059 4.059 0 1 1 0 8.118 4.059 4.059 0 0 1 0-8.118zm11.992.002a4.057 4.057 0 1 1 .003 8.115 4.057 4.057 0 0 1-.003-8.115zm-11.992 1.93a2.128 2.128 0 0 0 0 4.256 2.128 2.128 0 0 0 0-4.256zm11.992 0a2.128 2.128 0 0 0 0 4.256 2.128 2.128 0 0 0 0-4.256z"/>
    </g>
    <text x="20" y="52" text-anchor="middle" fill="#737373" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="8.5" font-weight="400">Tripadvisor</text>
  </g>

  <!-- 3. Booking.com -->
  <g transform="translate(178, 426)">
    <rect width="40" height="40" rx="12" fill="#FFFFFF" stroke="#E5E5E5" stroke-width="1"/>
    <g transform="translate(8, 8) scale(0.75)">
      <rect width="32" height="32" rx="8" fill="#003580"/>
      <path fill="#FFFFFF" d="M8 8h6.4c2.8 0 4.6 1.4 4.6 3.6 0 1.6-1.1 2.8-2.4 3.2 1.8.4 3 1.8 3 3.6 0 2.4-2 4.2-5 4.2H8V8zm3.2 5.8h2.8c1.1 0 1.8-.6 1.8-1.5s-.7-1.5-1.8-1.5h-2.8v3zm0 6h3.2c1.2 0 2-.7 2-1.6s-.8-1.6-2-1.6h-3.2v3.2z"/>
      <circle cx="23.5" cy="20.8" r="2.1" fill="#006CE4"/>
    </g>
    <text x="20" y="52" text-anchor="middle" fill="#737373" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="8.5" font-weight="400">Booking</text>
  </g>

  <!-- 4. Agoda -->
  <g transform="translate(246, 426)">
    <rect width="40" height="40" rx="12" fill="#FFFFFF" stroke="#E5E5E5" stroke-width="1"/>
    <g transform="translate(6, 12) scale(0.2)">
      <path fill="#E12D2D" d="M11.9155261,50.3726635 C6.20803791,50.3726635 1.56547867,55.0152227 1.56547867,60.7227109 C1.56547867,66.4295355 6.20803791,71.0727583 11.9155261,71.0727583 C17.6223507,71.0727583 22.266237,66.4295355 22.266237,60.7227109 C22.266237,55.0152227 17.6223507,50.3726635 11.9155261,50.3726635"/>
      <path fill="#FFC72C" d="M40.8395924,50.3726635 C35.1321043,50.3726635 30.4888815,55.0152227 30.4888815,60.7227109 C30.4888815,66.4295355 35.1321043,71.0727583 40.8395924,71.0727583 C46.5470806,71.0727583 51.1896398,66.4295355 51.1896398,60.7227109 C51.1896398,55.0152227 46.5470806,50.3726635 40.8395924,50.3726635"/>
      <path fill="#34A853" d="M69.7637251,50.3726635 C64.0555735,50.3726635 59.4130142,55.0152227 59.4130142,60.7227109 C59.4130142,66.4295355 64.0555735,71.0727583 69.7637251,71.0727583 C75.4705498,71.0727583 80.1137725,66.4295355 80.1137725,60.7227109 C80.1137725,55.0152227 75.4705498,50.3726635 69.7637251,50.3726635"/>
      <path fill="#9C27B0" d="M98.6871943,50.373327 C92.9797062,50.373327 88.3358199,55.0158863 88.3358199,60.7227109 C88.3358199,66.4301991 92.9790427,71.0720948 98.6865308,71.0720948 C104.394019,71.0720948 109.036578,66.4301991 109.036578,60.7227109 C109.036578,55.0158863 104.394682,50.373327 98.6871943,50.373327"/>
      <path fill="#2662F6" d="M127.61,50.3726635 C121.902512,50.3726635 117.259953,55.0152227 117.259953,60.7227109 C117.259953,66.4295355 121.902512,71.0727583 127.61,71.0727583 C133.317488,71.0727583 137.960047,66.4295355 137.960047,60.7227109 C137.960047,55.0152227 133.317488,50.3726635 127.61,50.3726635"/>
      <path fill="#222222" d="M.000265402844 21.0451848C.000265402844 14.3338104 5.38727962 9.26727014 12.0522085 9.26727014 18.7622559 9.26727014 24.1034882 14.2886919 24.1034882 20.9994028L24.1034882 31.3162749C24.1034882 32.3659431 23.3736303 33.0964645 22.2775166 33.0964645 21.1362844 33.0964645 20.451545 32.3659431 20.451545 31.3162749L20.451545 28.3032891 20.2690806 28.3032891C18.8538199 30.722436 16.0232986 32.822436 11.8232986 32.822436 5.34149763 32.822436.000265402844 27.8010142.000265402844 21.0451848M20.543109 21.0451848C20.543109 16.2062275 16.8905024 12.5542844 12.0522085 12.5542844 7.21258768 12.5542844 3.56064455 16.2062275 3.56064455 21.0451848 3.56064455 25.8834787 7.21258768 29.5360853 12.0522085 29.5360853 16.8905024 29.5360853 20.543109 25.8834787 20.543109 21.0451848M33.5092986 40.4465972C32.5505308 39.9901043 32.0933744 39.168019 32.4589668 38.2099147 32.8245592 37.2047014 33.737545 36.794654 34.6956493 37.2511469 36.3398199 38.0267867 38.3933744 38.5748436 40.5842749 38.5748436 46.0177346 38.5748436 49.3040853 35.3336114 49.3040853 29.8099147L49.3040853 28.30309 49.1209573 28.30309C47.7056967 30.7229005 44.8765024 32.822237 40.6758389 32.822237 34.1933744 32.822237 28.8521422 27.8008152 28.8521422 21.0449858 28.8521422 14.3342749 34.2391564 9.26707109 40.9047488 9.26707109 47.6154597 9.26707109 52.9566919 14.2891564 52.9566919 20.9992038L52.9566919 29.5816682C52.9566919 36.9771185 48.2079716 41.9527583 40.4475924 41.9527583 38.0742275 41.9527583 35.7001991 41.4962654 33.5092986 40.4465972M49.3949858 21.0449858C49.3949858 16.2060284 45.7430427 12.5534218 40.9047488 12.5534218 36.0657915 12.5534218 32.4138483 16.2060284 32.4138483 21.0449858 32.4138483 25.8839431 36.0657915 29.5358863 40.9047488 29.5358863 45.7430427 29.5358863 49.3949858 25.8839431 49.3949858 21.0449858M57.7046161 21.0451848C57.7046161 14.3338104 63.0465118 9.26727014 69.7572227 9.26727014 76.4672701 9.26727014 81.8085024 14.3338104 81.8085024 21.0451848 81.8085024 27.7552322 76.4672701 32.822436 69.7572227 32.822436 63.0465118 32.822436 57.7046161 27.7552322 57.7046161 21.0451848M78.2481232 21.0451848C78.2481232 16.2062275 74.5955166 12.5542844 69.7572227 12.5542844 64.9176019 12.5542844 61.2656588 16.2062275 61.2656588 21.0451848 61.2656588 25.8834787 64.9176019 29.5360853 69.7572227 29.5360853 74.5955166 29.5360853 78.2481232 25.8834787 78.2481232 21.0451848M86.5574882 21.0451848C86.5574882 14.3338104 91.8522749 9.26727014 98.3805213 9.26727014 102.580521 9.26727014 105.411043 11.3672701 106.826303 13.7864171L107.008768 13.7864171 107.008768 1.78025592C107.008768.730587678 107.739289.0000663507109 108.834739.0000663507109 109.976635.0000663507109 110.660711.730587678 110.660711 1.78025592L110.660711 21.0903033C110.660711 27.8010142 105.319479 32.822436 98.6094313 32.822436 91.9445024 32.822436 86.5574882 27.7552322 86.5574882 21.0451848M107.100332 21.0451848C107.100332 16.2062275 103.447725 12.5542844 98.6094313 12.5542844 93.7698104 12.5542844 90.1178673 16.2062275 90.1178673 21.0451848 90.1178673 25.8834787 93.7698104 29.5360853 98.6094313 29.5360853 103.447725 29.5360853 107.100332 25.8834787 107.100332 21.0451848M115.40963 21.0451848C115.40963 14.3338104 120.796645 9.26727014 127.461573 9.26727014 134.172284 9.26727014 139.513517 14.2886919 139.513517 20.9994028L139.513517 31.3162749C139.513517 32.3659431 138.782995 33.0964645 137.687545 33.0964645 136.545649 33.0964645 135.86091 32.3659431 135.86091 31.3162749L135.86091 28.3032891 135.678445 28.3032891C134.263185 30.722436 131.433327 32.822436 127.233327 32.822436 120.750863 32.822436 115.40963 27.8010142 115.40963 21.0451848M135.952474 21.0451848C135.952474 16.2062275 132.300531 12.5542844 127.461573 12.5542844 122.622616 12.5542844 118.970673 16.2062275 118.970673 21.0451848 118.970673 25.8834787 122.622616 29.5360853 127.461573 29.5360853 132.300531 29.5360853 135.952474 25.8834787 135.952474 21.0451848"/>
    </g>
    <text x="20" y="52" text-anchor="middle" fill="#737373" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="8.5" font-weight="400">Agoda</text>
  </g>

  <!-- 5. Trip.com -->
  <g transform="translate(314, 426)">
    <rect width="40" height="40" rx="12" fill="#FFFFFF" stroke="#E5E5E5" stroke-width="1"/>
    <g transform="translate(8, 8) scale(0.75)">
      <rect width="32" height="32" rx="7.5" fill="#2662F6"/>
      <g transform="translate(4.00, 3.75) scale(1.05)">
        <path fill="#FFFFFF" d="M6.83 8.225H4.364v6.754H2.466V8.225H0V6.63h6.83v1.594z M9.486 9.258c.13 0 .255.012.38.03v1.74a1.55 1.55 0 0 0-.297-.031c-.88 0-1.594.612-1.594 1.593v2.389H6.451V9.287h1.707v.9c.363-.558.991-.93 1.707-.93z M13.205 7.428a1.062 1.062 0 1 1-2.125 0 1.062 1.062 0 0 1 2.125 0zm-2.011 1.859h1.897v5.692h-1.897V9.287z M17.834 9.002c-.68 0-1.29.31-1.707.799v-.514h-1.708v8.348h1.897v-2.923c.416.344.943.551 1.518.551 1.677 0 3.036-1.401 3.036-3.13s-1.36-3.13-3.036-3.13zm-.19 4.516c-.733 0-1.328-.62-1.328-1.385s.595-1.385 1.328-1.385c.734 0 1.328.62 1.328 1.385s-.594 1.385-1.328 1.385z"/>
        <path fill="#FFA000" d="M22.862 14.125a1.138 1.138 0 1 1-2.277 0 1.138 1.138 0 0 1 2.277 0z"/>
      </g>
    </g>
    <text x="20" y="52" text-anchor="middle" fill="#737373" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="8.5" font-weight="400">Trip.com</text>
  </g>

  <!-- Divider 2 -->
  <line x1="36" y1="504" x2="364" y2="504" stroke="#EAEAEA" stroke-width="1"/>

  <!-- Powered by ZX0R -->
  <text x="200" y="528" text-anchor="middle" fill="#A3A3A3" font-family="monospace, Courier, monospace" font-size="7.5" font-weight="400" letter-spacing="0.14em">Powered by ZX0R</text>
</svg>`;
  };

  // Download Vector SVG (Full Stand Mockup or Pure QR depending on mode)
  const handleDownloadSVG = async (targetOverride?: 'stand' | 'qr') => {
    const mode = targetOverride || exportTarget;
    setIsDownloading(true);
    try {
      let svgString: string | null = null;
      let filename = 'haviland-qr.svg';

      if (mode === 'stand') {
        svgString = await getCleanStandMockupSVGString();
        filename = 'haviland-stand-mockup-sujet-marina.svg';
      } else {
        svgString = await getCleanSVGString();
        if (!svgString) {
          await new Promise((r) => setTimeout(r, 200));
          svgString = await getCleanSVGString();
        }
        let hostName = 'haviland';
        try {
          hostName = new URL(url).hostname;
        } catch {}
        filename = `haviland-qr-${hostName}.svg`;
      }

      if (!svgString) {
        alert('Design asset is still initializing. Please wait a moment.');
        return;
      }

      const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = downloadUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(downloadUrl), 2000);
    } catch (err) {
      console.error('Download SVG error:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  // Download High-Resolution PNG (Canvas rasterizer supporting both Stand Mockup Card and Pure QR)
  const handleDownloadPNG = async (targetOverride?: 'stand' | 'qr') => {
    const mode = targetOverride || exportTarget;
    setIsDownloading(true);
    try {
      let svgString: string | null = null;
      let filename = 'haviland-asset.png';

      if (mode === 'stand') {
        svgString = await getCleanStandMockupSVGString();
        filename = `haviland-stand-mockup-sujet-marina-${exportRes}w.png`;
      } else {
        svgString = await getCleanSVGString();
        if (!svgString) {
          await new Promise((r) => setTimeout(r, 200));
          svgString = await getCleanSVGString();
        }
        filename = `haviland-qr-${exportRes}x${exportRes}.png`;
      }

      if (!svgString) {
        alert('Design asset is still initializing. Please wait a moment.');
        return;
      }

      const baseWidth = parseInt(exportRes, 10) || 2048;
      let targetW = baseWidth;
      let targetH = baseWidth;

      if (mode === 'stand') {
        // Proportion 400:580 (Standard A5 Desk Tent)
        targetW = baseWidth;
        targetH = Math.round(baseWidth * (580 / 400));
      }

      const canvas = document.createElement('canvas');
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      if (mode === 'qr') {
        ctx.fillStyle = bgColor || '#ffffff';
        ctx.fillRect(0, 0, targetW, targetH);
      }

      const loadImg = (imgUrl: string): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          if (imgUrl.startsWith('http://') || imgUrl.startsWith('https://')) {
            img.crossOrigin = 'anonymous';
          }
          img.onload = () => resolve(img);
          img.onerror = (e) => reject(e);
          img.src = imgUrl;
        });
      };

      let svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      let blobUrl = URL.createObjectURL(svgBlob);

      let drawnSuccessfully = false;
      try {
        const renderedSvg = await loadImg(blobUrl);
        ctx.drawImage(renderedSvg, 0, 0, targetW, targetH);
        drawnSuccessfully = true;
      } catch (canvasErr) {
        console.warn('Canvas SVG load with embedded image failed, applying fallback...', canvasErr);
        if (mode === 'qr') {
          const cleanSvgWithoutImage = svgString.replace(/<image[\s\S]*?\/>/gi, '');
          URL.revokeObjectURL(blobUrl);
          svgBlob = new Blob([cleanSvgWithoutImage], { type: 'image/svg+xml;charset=utf-8' });
          blobUrl = URL.createObjectURL(svgBlob);
          const fallbackSvgImg = await loadImg(blobUrl);
          ctx.drawImage(fallbackSvgImg, 0, 0, targetW, targetH);

          if (activeIconPath) {
            try {
              const logoImg = await loadImg(activeIconPath);
              const iconSize = targetW * 0.22;
              const iconPos = (targetW - iconSize) / 2;
              ctx.drawImage(logoImg, iconPos, iconPos, iconSize, iconSize);
            } catch (logoErr) {
              console.warn('Could not draw center logo on canvas fallback:', logoErr);
            }
          }
          drawnSuccessfully = true;
        }
      } finally {
        URL.revokeObjectURL(blobUrl);
      }

      if (!drawnSuccessfully) return;

      canvas.toBlob((pngBlob) => {
        if (!pngBlob) return;
        const pngUrl = URL.createObjectURL(pngBlob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = pngUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(pngUrl), 2000);
      }, 'image/png');
    } catch (err) {
      console.error('Download PNG error:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  // Copy SVG Code
  const handleCopySVG = async () => {
    const svgString = exportTarget === 'stand' ? await getCleanStandMockupSVGString() : await getCleanSVGString();
    if (svgString) {
      await navigator.clipboard.writeText(svgString);
      setIsSvgCopied(true);
      setTimeout(() => setIsSvgCopied(false), 2000);
    }
  };

  // Copy URL
  const handleCopyUrl = async () => {
    await navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0E1117] text-neutral-100 selection:bg-[#C5A880]/30 selection:text-white pb-20">
      {/* Studio Navigation & Breadcrumb */}
      <header className="border-b border-neutral-800/80 bg-[#12161F]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-400 hover:text-white transition-colors py-1.5 px-3 rounded-xl hover:bg-neutral-800/60"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Review Hub</span>
            </Link>
            <div className="h-4 w-px bg-neutral-800 hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-neutral-200">
                Haviland QR Studio
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-800/80 hover:bg-neutral-700/80 border border-neutral-700/60 px-3 py-1.5 rounded-xl transition-all shadow-xs"
            >
              <Printer className="w-3.5 h-3.5 text-[#C5A880]" />
              <span className="hidden sm:inline">Print Stand Card</span>
            </button>
            <a
              href="https://havilandhouse-reviews.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-neutral-200 bg-neutral-900/60 border border-neutral-800 px-3 py-1.5 rounded-xl transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Live Site</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Studio Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        {/* Title & Badge */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 text-[#E5D0B5] text-[11px] font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3 h-3 text-[#C5A880]" />
            Luxury Hospitality Brand Asset Generator
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white">
            Sujet Marina QR Code Studio
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 mt-1.5 max-w-2xl">
            Configure, animate, and export ultra-high-definition vector QR codes for guest room table tents, reception counters, and keycard sleeves.
          </p>
        </div>

        {/* Studio Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Live Canvas Preview & Controls (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5 sticky top-24">
            {/* Preview Card */}
            <div className="bg-[#151923] border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex flex-col items-center relative overflow-hidden">
              {/* Subtle background glow */}
              <div className="absolute -top-24 -left-24 w-60 h-60 bg-[#2662F6]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />

              {/* View Switcher: Stand Mockup vs Pure QR */}
              <div className="w-full flex items-center justify-between mb-6 z-10">
                <div className="flex bg-neutral-900/90 p-1 rounded-2xl border border-neutral-800 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewMode('qr-only');
                      setExportTarget('qr');
                    }}
                    className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                      previewMode === 'qr-only'
                        ? 'bg-neutral-800 text-white shadow-xs'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    Pure QR
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewMode('stand-mockup');
                      setExportTarget('stand');
                    }}
                    className={`px-3 py-1.5 rounded-xl font-medium transition-all flex items-center gap-1.5 ${
                      previewMode === 'stand-mockup'
                        ? 'bg-neutral-800 text-white shadow-xs'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Stand Mockup</span>
                  </button>
                </div>

                <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-400 bg-emerald-950/50 border border-emerald-800/40 px-2.5 py-1 rounded-full">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Level H (30% Redundancy)</span>
                </div>
              </div>

              {/* Canvas Area */}
              {previewMode === 'qr-only' ? (
                <div
                  onClick={() => triggerAnimation('RadialRipple')}
                  onMouseEnter={() => triggerAnimation('RadialRipple')}
                  title="Click or hover to trigger harmonic ripple"
                  className="p-6 sm:p-8 rounded-3xl shadow-2xl transition-all duration-300 border border-neutral-200/20 relative group cursor-pointer select-none"
                  style={{ backgroundColor: bgColor }}
                >
                  <QRCodeElement
                    ref={qrRef}
                    contents={url}
                    module-color={moduleColor}
                    position-ring-color={ringColor}
                    position-center-color={centerColor}
                    mask-x-to-y-ratio={maskRatio}
                    style={{
                      width: '240px',
                      height: '240px',
                      backgroundColor: bgColor,
                      display: 'block',
                    }}
                  >
                    {activeIconPath && (
                      <img
                        src={activeIconPath}
                        slot="icon"
                        alt="Brand Icon"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          borderRadius: '6px',
                        }}
                      />
                    )}
                  </QRCodeElement>
                </div>
              ) : (
                /* Acrylic Stand Mockup */
                <div
                  onClick={() => triggerAnimation('RadialRipple')}
                  className="w-full max-w-[360px] sm:max-w-[380px] bg-gradient-to-b from-white via-white to-neutral-50/80 text-neutral-900 rounded-[32px] p-6 sm:p-7 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] border-2 border-[#C5A880]/40 ring-1 ring-neutral-900/5 flex flex-col items-center text-center relative cursor-pointer select-none transition-all hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.4)]"
                >
                  {/* Top Acrylic Metallic Clip Header */}
                  <div className="w-12 h-1.5 rounded-full bg-neutral-200/90 mb-3.5" />
                  <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#B89668] mb-1 font-sans">
                    HAVILAND HOUSE
                  </p>
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-900 tracking-tight leading-tight">
                    Sujet Marina Hotel
                  </h3>
                  <div className="flex items-center gap-1 text-amber-400 my-2.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current drop-shadow-2xs" />
                    ))}
                  </div>

                  {/* Enlarged QR Code Canvas */}
                  <div className="p-3.5 sm:p-4 bg-white rounded-3xl border border-neutral-150 shadow-[0_4px_24px_rgba(0,0,0,0.06)] mb-3">
                    <QRCodeElement
                      ref={standQrRef}
                      contents={url}
                      module-color={moduleColor}
                      position-ring-color={ringColor}
                      position-center-color={centerColor}
                      mask-x-to-y-ratio={maskRatio}
                      style={{
                        width: '230px',
                        height: '230px',
                        backgroundColor: bgColor,
                        display: 'block',
                      }}
                    >
                      {activeIconPath && (
                        <img
                          src={activeIconPath}
                          slot="icon"
                          alt="Brand Icon"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            borderRadius: '5px',
                          }}
                        />
                      )}
                    </QRCodeElement>
                  </div>

                  {/* Tap Your Phone + NFC Premium Pill Badge */}
                  <div className="flex flex-col items-center gap-1 my-0.5">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 text-white shadow-xs border border-neutral-800 hover:bg-neutral-800 transition-all">
                      <Nfc className="w-3.5 h-3.5 text-[#C5A880] animate-pulse" />
                      <span className="text-[10.5px] font-semibold tracking-wide">Tap Your Phone</span>
                    </div>
                    <p className="text-[10px] text-neutral-500 font-normal mt-0.5">
                      or scan QR code with camera
                    </p>
                  </div>

                  {/* 5 Official Brand Logos with Names Underneath */}
                  <div className="mt-3 pt-3 border-t border-neutral-200/80 w-full flex flex-col items-center">
                    <div className="grid grid-cols-5 gap-2 w-full max-w-[340px]">
                      {/* 1. Google */}
                      <div className="flex flex-col items-center gap-1 group/logo">
                        <div className="w-10 h-10 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs flex items-center justify-center p-1.5 group-hover/logo:scale-105 transition-transform" title="Google 4.9 ★">
                          <GoogleLogo className="w-6 h-6" />
                        </div>
                        <span className="text-[8.5px] font-normal text-neutral-500 tracking-normal truncate">
                          Google
                        </span>
                      </div>

                      {/* 2. Tripadvisor */}
                      <div className="flex flex-col items-center gap-1 group/logo">
                        <div className="w-10 h-10 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs flex items-center justify-center p-1.5 group-hover/logo:scale-105 transition-transform" title="Tripadvisor 5.0 ★">
                          <TripAdvisorLogo className="w-6 h-6" />
                        </div>
                        <span className="text-[8.5px] font-normal text-neutral-500 tracking-normal truncate">
                          Tripadvisor
                        </span>
                      </div>

                      {/* 3. Booking.com */}
                      <div className="flex flex-col items-center gap-1 group/logo">
                        <div className="w-10 h-10 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs flex items-center justify-center p-1.5 group-hover/logo:scale-105 transition-transform" title="Booking.com 9.6">
                          <BookingLogo className="w-6 h-6" />
                        </div>
                        <span className="text-[8.5px] font-normal text-neutral-500 tracking-normal truncate">
                          Booking
                        </span>
                      </div>

                      {/* 4. Agoda */}
                      <div className="flex flex-col items-center gap-1 group/logo">
                        <div className="w-10 h-10 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs flex items-center justify-center p-1.5 group-hover/logo:scale-105 transition-transform" title="Agoda 9.2">
                          <AgodaLogo className="w-7 h-7" />
                        </div>
                        <span className="text-[8.5px] font-normal text-neutral-500 tracking-normal truncate">
                          Agoda
                        </span>
                      </div>

                      {/* 5. Trip.com */}
                      <div className="flex flex-col items-center gap-1 group/logo">
                        <div className="w-10 h-10 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs flex items-center justify-center p-1.5 group-hover/logo:scale-105 transition-transform" title="Trip.com 9.7">
                          <TripComLogo className="w-6 h-6" />
                        </div>
                        <span className="text-[8.5px] font-normal text-neutral-500 tracking-normal truncate">
                          Trip.com
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Powered by ZX0R signature */}
                  <div className="mt-5 pt-2.5 border-t border-neutral-150 w-full flex items-center justify-center">
                    <span className="text-[7.5px] font-normal tracking-[0.14em] text-neutral-400 font-mono select-none">
                      Powered by ZX0R
                    </span>
                  </div>
                </div>
              )}

              {/* Animation Control Bar */}
              <div className="w-full mt-6 pt-5 border-t border-neutral-800/80 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-neutral-400 flex items-center gap-1.5">
                    <Play className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Interactive SVG Animations</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => triggerAnimation()}
                    className="text-xs font-semibold text-[#E5D0B5] hover:text-white inline-flex items-center gap-1 transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Replay</span>
                  </button>
                </div>

                {/* Auto Loop Switch */}
                <div className="flex items-center justify-between bg-neutral-900/90 border border-neutral-800 px-3.5 py-2 rounded-2xl">
                  <div className="flex items-center gap-2">
                    <Activity className={`w-3.5 h-3.5 ${isAutoLoop ? 'text-emerald-400 animate-pulse' : 'text-neutral-500'}`} />
                    <span className="text-xs text-neutral-300 font-medium">
                      Auto-Loop Animation (Continuous Ripple)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsAutoLoop(!isAutoLoop)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      isAutoLoop ? 'bg-emerald-500' : 'bg-neutral-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                        isAutoLoop ? 'translate-x-4' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {ANIMATION_PRESETS.map((preset) => (
                    <button
                      type="button"
                      key={preset.id}
                      onClick={() => {
                        setActiveAnimation(preset.id);
                        triggerAnimation(preset.id);
                      }}
                      className={`text-[11px] py-1.5 px-2 rounded-xl border text-center transition-all ${
                        activeAnimation === preset.id
                          ? 'bg-[#C5A880]/20 border-[#C5A880] text-[#E5D0B5] font-semibold'
                          : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Export Panel */}
            <div className="bg-[#151923] border border-neutral-800 rounded-3xl p-5 sm:p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Download className="w-4 h-4 text-[#C5A880]" />
                  <span>Download & Export</span>
                </h3>
                <span className="text-[11px] text-neutral-400 font-mono">
                  {exportTarget === 'stand'
                    ? `${exportRes}×${Math.round(parseInt(exportRes, 10) * 1.45)}px A5`
                    : `${exportRes}×${exportRes}px`}
                </span>
              </div>

              {/* Asset Mode Switcher: Full Stand Mockup vs Pure QR Code */}
              <div className="flex bg-neutral-900/90 p-1 rounded-2xl border border-neutral-800 text-xs">
                <button
                  type="button"
                  onClick={() => setExportTarget('stand')}
                  className={`flex-1 py-1.5 px-3 rounded-xl font-medium transition-all flex items-center justify-center gap-1.5 ${
                    exportTarget === 'stand'
                      ? 'bg-[#C5A880] text-neutral-950 font-semibold shadow-xs'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Full Stand Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setExportTarget('qr')}
                  className={`flex-1 py-1.5 px-3 rounded-xl font-medium transition-all flex items-center justify-center gap-1.5 ${
                    exportTarget === 'qr'
                      ? 'bg-[#C5A880] text-neutral-950 font-semibold shadow-xs'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <QrIcon className="w-3.5 h-3.5" />
                  <span>QR Code Only</span>
                </button>
              </div>

              {/* Resolution Switcher for PNG */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-neutral-400 text-xs shrink-0">PNG Res:</span>
                <div className="grid grid-cols-3 gap-1.5 flex-1">
                  {(['1024', '2048', '4096'] as const).map((res) => (
                    <button
                      type="button"
                      key={res}
                      onClick={() => setExportRes(res)}
                      className={`py-1 rounded-lg border text-center font-medium transition-all ${
                        exportRes === res
                          ? 'bg-[#2662F6]/20 border-[#2662F6] text-[#70A5FF]'
                          : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {res === '4096' ? '4K Ultra' : res === '2048' ? '2K Print' : '1K Web'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleDownloadSVG()}
                  disabled={isDownloading}
                  className="w-full flex items-center justify-center gap-2 bg-[#C5A880] hover:bg-[#D4BC98] text-neutral-950 font-semibold py-3 px-4 rounded-2xl transition-all active:scale-[0.98] shadow-lg shadow-[#C5A880]/10 text-xs sm:text-sm"
                >
                  <FileCode className="w-4 h-4 shrink-0" />
                  <span>{exportTarget === 'stand' ? 'Download Stand SVG' : 'Download SVG'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDownloadPNG()}
                  disabled={isDownloading}
                  className="w-full flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white font-medium py-3 px-4 rounded-2xl transition-all active:scale-[0.98] border border-neutral-700/80 text-xs sm:text-sm"
                >
                  <ImageIcon className="w-4 h-4 shrink-0 text-[#2662F6]" />
                  <span>{exportTarget === 'stand' ? 'Download Stand PNG' : 'Download PNG'}</span>
                </button>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-neutral-800/80">
                <button
                  type="button"
                  onClick={handleCopySVG}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs text-neutral-300 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 py-2 rounded-xl transition-colors"
                >
                  {isSvgCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isSvgCopied ? 'SVG Copied!' : exportTarget === 'stand' ? 'Copy Stand SVG' : 'Copy SVG Code'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs text-neutral-300 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 py-2 rounded-xl transition-colors"
                >
                  <Printer className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Print Stand (A5)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Customization Controls (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Section 1: Target Destination (URL) */}
            <div className="bg-[#151923] border border-neutral-800 rounded-3xl p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-white flex items-center gap-2">
                  <QrIcon className="w-4 h-4 text-[#C5A880]" />
                  <span>Target Destination (Encoded URL)</span>
                </label>
                <button
                  type="button"
                  onClick={handleCopyUrl}
                  className="text-xs text-neutral-400 hover:text-white inline-flex items-center gap-1 transition-colors"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                  }
                }}
                placeholder="https://havilandhouse-reviews.vercel.app"
                className="w-full bg-neutral-900/90 border border-neutral-700/80 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] font-mono transition-all"
              />

              {/* Touchpoint Shortcuts */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                  Destination Presets (Clean URLs):
                </span>
                <div className="flex flex-wrap gap-2">
                  {TOUCHPOINT_SHORTCUTS.map((chip) => (
                    <button
                      type="button"
                      key={chip.label}
                      onClick={() => setUrl(chip.url)}
                      className={`text-xs py-1.5 px-3 rounded-xl border transition-all ${
                        url === chip.url
                          ? 'bg-[#C5A880]/20 border-[#C5A880] text-[#E5D0B5] font-semibold'
                          : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700 hover:text-white'
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 2: Color Themes & Custom Colors */}
            <div className="bg-[#151923] border border-neutral-800 rounded-3xl p-6 flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Palette className="w-4 h-4 text-[#C5A880]" />
                  <span>Boutique Palette Presets</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PRESET_THEMES.map((theme) => (
                  <button
                    type="button"
                    key={theme.id}
                    onClick={() => handleApplyTheme(theme)}
                    className={`p-4 rounded-2xl border text-left transition-all relative flex flex-col gap-2 ${
                      selectedThemeId === theme.id
                        ? 'bg-neutral-800/80 border-[#C5A880] ring-1 ring-[#C5A880]/30 shadow-md'
                        : 'bg-neutral-900/50 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white">{theme.name}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: theme.moduleColor }} />
                        <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: theme.ringColor }} />
                        <span className="w-3.5 h-3.5 rounded-full border border-neutral-300" style={{ backgroundColor: theme.bgColor }} />
                      </div>
                    </div>
                    <p className="text-[11px] text-neutral-400 leading-snug">{theme.description}</p>
                  </button>
                ))}
              </div>

              {/* Custom Color Pickers */}
              <div className="pt-4 border-t border-neutral-800/80">
                <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-3">
                  Fine-Tune Custom Hex Colors:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[11px] text-neutral-400">QR Modules</span>
                    <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-xl p-1.5">
                      <input
                        type="color"
                        value={moduleColor}
                        onChange={(e) => {
                          setModuleColor(e.target.value);
                          setSelectedThemeId('custom');
                        }}
                        className="w-7 h-7 rounded-lg border-0 cursor-pointer bg-transparent"
                      />
                      <input
                        type="text"
                        value={moduleColor}
                        onChange={(e) => {
                          setModuleColor(e.target.value);
                          setSelectedThemeId('custom');
                        }}
                        className="w-full bg-transparent text-xs text-white font-mono uppercase focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <span className="text-[11px] text-neutral-400">Corner Rings</span>
                    <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-xl p-1.5">
                      <input
                        type="color"
                        value={ringColor}
                        onChange={(e) => {
                          setRingColor(e.target.value);
                          setSelectedThemeId('custom');
                        }}
                        className="w-7 h-7 rounded-lg border-0 cursor-pointer bg-transparent"
                      />
                      <input
                        type="text"
                        value={ringColor}
                        onChange={(e) => {
                          setRingColor(e.target.value);
                          setSelectedThemeId('custom');
                        }}
                        className="w-full bg-transparent text-xs text-white font-mono uppercase focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <span className="text-[11px] text-neutral-400">Center Dots</span>
                    <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-xl p-1.5">
                      <input
                        type="color"
                        value={centerColor}
                        onChange={(e) => {
                          setCenterColor(e.target.value);
                          setSelectedThemeId('custom');
                        }}
                        className="w-7 h-7 rounded-lg border-0 cursor-pointer bg-transparent"
                      />
                      <input
                        type="text"
                        value={centerColor}
                        onChange={(e) => {
                          setCenterColor(e.target.value);
                          setSelectedThemeId('custom');
                        }}
                        className="w-full bg-transparent text-xs text-white font-mono uppercase focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <span className="text-[11px] text-neutral-400">Background</span>
                    <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-xl p-1.5">
                      <input
                        type="color"
                        value={bgColor === 'transparent' ? '#ffffff' : bgColor}
                        onChange={(e) => {
                          setBgColor(e.target.value);
                          setSelectedThemeId('custom');
                        }}
                        className="w-7 h-7 rounded-lg border-0 cursor-pointer bg-transparent"
                      />
                      <input
                        type="text"
                        value={bgColor}
                        onChange={(e) => {
                          setBgColor(e.target.value);
                          setSelectedThemeId('custom');
                        }}
                        className="w-full bg-transparent text-xs text-white font-mono uppercase focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Center Brand Icon & Mask Ratio */}
            <div className="bg-[#151923] border border-neutral-800 rounded-3xl p-6 flex flex-col gap-5">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#C5A880]" />
                <span>Center Brandmark & Mask Size</span>
              </h3>

              {/* Logo Selectors */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {LOGO_OPTIONS.map((opt) => (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => {
                      setSelectedLogo(opt.path);
                      if (opt.id !== 'custom') setCustomLogoUrl(null);
                    }}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${
                      selectedLogo === opt.path && !customLogoUrl
                        ? 'bg-[#C5A880]/15 border-[#C5A880] text-white'
                        : 'bg-neutral-900/50 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center p-1.5 overflow-hidden">
                      {opt.path ? (
                        <img src={opt.path} alt={opt.label} className="w-full h-full object-contain" />
                      ) : (
                        <span className="text-xs font-bold text-neutral-500">None</span>
                      )}
                    </div>
                    <span className="text-xs font-medium">{opt.label}</span>
                  </button>
                ))}
              </div>

              {/* Custom Upload */}
              <div className="flex items-center gap-3 pt-2">
                <label className="cursor-pointer inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 px-4 py-2.5 rounded-xl text-xs font-medium text-neutral-200 transition-colors">
                  <ImageIcon className="w-4 h-4 text-[#C5A880]" />
                  <span>Upload Custom Logo PNG/SVG</span>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
                {customLogoUrl && (
                  <span className="text-xs text-emerald-400 font-medium">Custom logo active</span>
                )}
              </div>

              {/* Mask Ratio Slider */}
              <div className="pt-4 border-t border-neutral-800/80 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-400">Icon Cutout Mask Ratio (X to Y):</span>
                  <span className="font-mono text-white font-semibold">{maskRatio}</span>
                </div>
                <input
                  type="range"
                  min="0.8"
                  max="1.4"
                  step="0.05"
                  value={maskRatio}
                  onChange={(e) => setMaskRatio(e.target.value)}
                  className="w-full accent-[#C5A880] cursor-pointer"
                />
                <span className="text-[11px] text-neutral-500">
                  Use 1.0 for square icons, or 1.2–1.4 for wider horizontal logos.
                </span>
              </div>
            </div>

            {/* Section 4: Production Web & Digital Signage Embedding Snippet */}
            <div className="bg-[#151923] border border-neutral-800 rounded-3xl p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-[#C5A880]" />
                  <span>Embed Animated QR (HTML / JS)</span>
                </h3>
                <span className="text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full font-medium">
                  60 FPS Vector
                </span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                To display the live animated QR on digital totems, in-room Smart TVs, or landing pages, use the snippet below:
              </p>
              <div className="relative bg-neutral-950 rounded-2xl p-4 border border-neutral-800 font-mono text-xs text-neutral-300 overflow-x-auto">
                <pre>{`<!-- 1. Load Standalone Web Component Script -->
<script src="https://unpkg.com/@bitjson/qr-code@1.0.2/dist/qr-code.js"></script>

<!-- 2. Animated QR Code Custom Element -->
<qr-code
  id="live-qr"
  contents="${url}"
  module-color="${moduleColor}"
  position-ring-color="${ringColor}"
  position-center-color="${centerColor}"
  style="width: 260px; height: 260px;"
>
  <img src="${activeIconPath || '/logo-haviland-house.png'}" slot="icon" />
</qr-code>

<!-- 3. Initialize Harmonic Wave Animation -->
<script>
  const qr = document.getElementById('live-qr');
  qr.addEventListener('codeRendered', () => {
    // Continuous harmonic ripple every 2.5s (as shown in demo)
    setInterval(() => qr.animateQRCode('RadialRipple'), 2500);
  });
  // Trigger ripple wave on hover
  qr.addEventListener('mouseenter', () => qr.animateQRCode('RadialRipple'));
</script>`}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print-only CSS stylesheet injection for A5/A6 Acrylic Desk Tent Card */}
      <style jsx global>{`
        @media print {
          body {
            background: #ffffff !important;
            color: #000000 !important;
          }
          header,
          .lg\\:col-span-7,
          .lg\\:col-span-5 > div:last-child,
          button,
          a {
            display: none !important;
          }
          .lg\\:col-span-5 {
            width: 100% !important;
            max-width: 100% !important;
            position: static !important;
          }
          .bg-\\[\\#151923\\] {
            background: #ffffff !important;
            border: 2px solid #e5e5e5 !important;
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
}
