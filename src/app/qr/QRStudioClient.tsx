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
  { label: 'Root Hub', url: 'https://havilandhouse-reviews.vercel.app' },
  { label: 'Reception Desk', url: 'https://havilandhouse-reviews.vercel.app/?touchpoint=reception' },
  { label: 'Room Table Stand', url: 'https://havilandhouse-reviews.vercel.app/?touchpoint=room' },
  { label: 'Keycard Sleeve', url: 'https://havilandhouse-reviews.vercel.app/?touchpoint=keycard' },
  { label: 'Breakfast / Restaurant', url: 'https://havilandhouse-reviews.vercel.app/?touchpoint=restaurant' },
  { label: 'Direct Zalo Concierge', url: 'https://zalo.me/0935515180' },
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
  const [previewMode, setPreviewMode] = useState<'qr-only' | 'stand-mockup'>('qr-only');
  const [exportRes, setExportRes] = useState<'1024' | '2048' | '4096'>('2048');

  // UI state
  const [isCopied, setIsCopied] = useState(false);
  const [isSvgCopied, setIsSvgCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [qrLoaded, setQrLoaded] = useState(false);

  const qrRef = useRef<HTMLElement | null>(null);

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

  // Trigger web component animation
  const triggerAnimation = (presetName?: string) => {
    const anim = presetName || activeAnimation;
    if (qrRef.current && (qrRef.current as any).animateQRCode) {
      try {
        (qrRef.current as any).animateQRCode(anim);
      } catch (err) {
        console.warn('Animation trigger error:', err);
      }
    }
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
    const el = qrRef.current;
    if (!el) return;

    const onRendered = () => {
      setQrLoaded(true);
      triggerAnimation();
    };

    el.addEventListener('codeRendered', onRendered);
    return () => {
      el.removeEventListener('codeRendered', onRendered);
    };
  }, [url, moduleColor, ringColor, centerColor, maskRatio, selectedLogo, customLogoUrl]);

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

  // Extract pure standalone SVG from shadowRoot
  const getCleanSVGString = async (): Promise<string | null> => {
    const el = qrRef.current;
    if (!el || !el.shadowRoot) return null;

    const innerSvg = el.shadowRoot.querySelector('svg');
    if (!innerSvg) return null;

    const clone = innerSvg.cloneNode(true) as SVGSVGElement;
    const viewBox = clone.getAttribute('viewBox') || '-22.5 -22.5 45 45';
    const [, , vbWidth, vbHeight] = viewBox.split(' ').map(Number);

    // Insert background rect if non-transparent
    if (bgColor && bgColor !== 'transparent') {
      const bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      const [vbX, vbY] = viewBox.split(' ').map(Number);
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

  // Download Vector SVG
  const handleDownloadSVG = async () => {
    setIsDownloading(true);
    try {
      const svgString = await getCleanSVGString();
      if (!svgString) {
        alert('QR code is still initializing. Please wait a moment.');
        return;
      }

      const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `haviland-qr-${new URL(url).hostname || 'sujet-marina'}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);
    } finally {
      setIsDownloading(false);
    }
  };

  // Download High-Resolution PNG (Canvas rasterizer)
  const handleDownloadPNG = async () => {
    setIsDownloading(true);
    try {
      const svgString = await getCleanSVGString();
      if (!svgString) return;

      const size = parseInt(exportRes, 10) || 2048;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Draw background
      ctx.fillStyle = bgColor || '#ffffff';
      ctx.fillRect(0, 0, size, size);

      const img = new Image();
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const blobUrl = URL.createObjectURL(svgBlob);

      await new Promise<void>((resolve, reject) => {
        img.onload = () => {
          ctx.drawImage(img, 0, 0, size, size);
          URL.revokeObjectURL(blobUrl);
          resolve();
        };
        img.onerror = reject;
        img.src = blobUrl;
      });

      canvas.toBlob((pngBlob) => {
        if (!pngBlob) return;
        const pngUrl = URL.createObjectURL(pngBlob);
        const a = document.createElement('a');
        a.href = pngUrl;
        a.download = `haviland-qr-${exportRes}x${exportRes}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(pngUrl);
      }, 'image/png');
    } finally {
      setIsDownloading(false);
    }
  };

  // Copy SVG Code
  const handleCopySVG = async () => {
    const svgString = await getCleanSVGString();
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
                    onClick={() => setPreviewMode('qr-only')}
                    className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                      previewMode === 'qr-only'
                        ? 'bg-neutral-800 text-white shadow-xs'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    Pure QR
                  </button>
                  <button
                    onClick={() => setPreviewMode('stand-mockup')}
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
                  <div className="flex flex-col items-center gap-1 my-1">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900 text-white shadow-md border border-neutral-800 hover:bg-neutral-800 transition-all">
                      <Nfc className="w-4 h-4 text-[#C5A880] animate-pulse" />
                      <span className="text-xs font-bold tracking-wide">Tap Your Phone</span>
                    </div>
                    <p className="text-[11px] text-neutral-500 font-medium mt-0.5">
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
                        <span className="text-[10px] font-semibold text-neutral-700 tracking-tight truncate">
                          Google
                        </span>
                      </div>

                      {/* 2. Tripadvisor */}
                      <div className="flex flex-col items-center gap-1 group/logo">
                        <div className="w-10 h-10 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs flex items-center justify-center p-1.5 group-hover/logo:scale-105 transition-transform" title="Tripadvisor 5.0 ★">
                          <TripAdvisorLogo className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-semibold text-neutral-700 tracking-tight truncate">
                          Tripadvisor
                        </span>
                      </div>

                      {/* 3. Booking.com */}
                      <div className="flex flex-col items-center gap-1 group/logo">
                        <div className="w-10 h-10 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs flex items-center justify-center p-1.5 group-hover/logo:scale-105 transition-transform" title="Booking.com 9.6">
                          <BookingLogo className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-semibold text-neutral-700 tracking-tight truncate">
                          Booking
                        </span>
                      </div>

                      {/* 4. Agoda */}
                      <div className="flex flex-col items-center gap-1 group/logo">
                        <div className="w-10 h-10 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs flex items-center justify-center p-1.5 group-hover/logo:scale-105 transition-transform" title="Agoda 9.2">
                          <AgodaLogo className="w-7 h-7" />
                        </div>
                        <span className="text-[10px] font-semibold text-neutral-700 tracking-tight truncate">
                          Agoda
                        </span>
                      </div>

                      {/* 5. Trip.com */}
                      <div className="flex flex-col items-center gap-1 group/logo">
                        <div className="w-10 h-10 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs flex items-center justify-center p-1.5 group-hover/logo:scale-105 transition-transform" title="Trip.com 9.7">
                          <TripComLogo className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-semibold text-neutral-700 tracking-tight truncate">
                          Trip.com
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Powered by ZX0R signature */}
                  <div className="mt-6 pt-3 border-t border-neutral-150 w-full flex items-center justify-center">
                    <span className="text-[8.5px] font-medium tracking-[0.22em] text-neutral-400 uppercase font-mono select-none">
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
                <span className="text-[11px] text-neutral-500 font-mono">
                  {exportRes}×{exportRes}px
                </span>
              </div>

              {/* Resolution Switcher for PNG */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-neutral-400 text-xs shrink-0">PNG Res:</span>
                <div className="grid grid-cols-3 gap-1.5 flex-1">
                  {(['1024', '2048', '4096'] as const).map((res) => (
                    <button
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
                  onClick={handleDownloadSVG}
                  disabled={isDownloading}
                  className="w-full flex items-center justify-center gap-2 bg-[#C5A880] hover:bg-[#D4BC98] text-neutral-950 font-semibold py-3 px-4 rounded-2xl transition-all active:scale-[0.98] shadow-lg shadow-[#C5A880]/10 text-xs sm:text-sm"
                >
                  <FileCode className="w-4 h-4 shrink-0" />
                  <span>Download SVG</span>
                </button>

                <button
                  onClick={handleDownloadPNG}
                  disabled={isDownloading}
                  className="w-full flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white font-medium py-3 px-4 rounded-2xl transition-all active:scale-[0.98] border border-neutral-700/80 text-xs sm:text-sm"
                >
                  <ImageIcon className="w-4 h-4 shrink-0 text-[#2662F6]" />
                  <span>Download PNG</span>
                </button>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-neutral-800/80">
                <button
                  onClick={handleCopySVG}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs text-neutral-300 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 py-2 rounded-xl transition-colors"
                >
                  {isSvgCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isSvgCopied ? 'SVG Copied!' : 'Copy SVG Code'}</span>
                </button>
                <button
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
                placeholder="https://havilandhouse-reviews.vercel.app"
                className="w-full bg-neutral-900/90 border border-neutral-700/80 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] font-mono transition-all"
              />

              {/* Touchpoint Shortcuts */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                  Hotel Touchpoint Presets:
                </span>
                <div className="flex flex-wrap gap-2">
                  {TOUCHPOINT_SHORTCUTS.map((chip) => (
                    <button
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
