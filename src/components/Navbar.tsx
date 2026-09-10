'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Luggage,
  UserRound,
  ChevronDown,
  Menu,
  X,
  Phone,
} from 'lucide-react';
import type { HotelConfig } from '@/config/hotels';
import { useLanguage } from '@/lib/LanguageContext';
import { type LanguageCode } from '@/config/i18n';

interface NavbarProps {
  hotel: HotelConfig;
}

function FlagIcon({ code }: { code: LanguageCode }) {
  switch (code) {
    case 'vi':
      return (
        <svg
          width="16"
          height="11"
          viewBox="0 0 16 11"
          className="size-4 shrink-0 rounded-[1px] shadow-xs"
        >
          <rect width="16" height="11" fill="#DA251D" />
          <polygon
            points="8,2 9.47,6.53 5.61,3.73 10.39,3.73 6.53,6.53"
            fill="#FFFF00"
          />
        </svg>
      );
    case 'en':
      return (
        <svg
          width="16"
          height="11"
          viewBox="0 0 16 11"
          className="size-4 shrink-0 rounded-[1px] shadow-xs"
        >
          <rect width="16" height="11" fill="#012169" />
          <path d="M0,0 L16,11 M16,0 L0,11" stroke="#FFFFFF" strokeWidth="2.4" />
          <path d="M0,0 L16,11 M16,0 L0,11" stroke="#C8102E" strokeWidth="1.2" />
          <path d="M8,0 V11 M0,5.5 H16" stroke="#FFFFFF" strokeWidth="3.6" />
          <path d="M8,0 V11 M0,5.5 H16" stroke="#C8102E" strokeWidth="2" />
        </svg>
      );
    case 'ko':
      return (
        <svg
          width="16"
          height="11"
          viewBox="0 0 16 11"
          className="size-4 shrink-0 rounded-[1px] shadow-xs"
        >
          <rect width="16" height="11" fill="#FFFFFF" />
          <circle cx="8" cy="5.5" r="2.8" fill="#CD2E3A" />
          <path
            d="M5.2,5.5 A2.8,2.8 0 0,0 10.8,5.5 A1.4,1.4 0 0,0 8,5.5 A1.4,1.4 0 0,1 5.2,5.5"
            fill="#0047A0"
          />
        </svg>
      );
    case 'zh':
      return (
        <svg
          width="16"
          height="11"
          viewBox="0 0 16 11"
          className="size-4 shrink-0 rounded-[1px] shadow-xs"
        >
          <rect width="16" height="11" fill="#DE2910" />
          <polygon
            points="2.5,1.5 3.1,3.3 4.9,3.3 3.5,4.3 4,6.1 2.5,5 1,6.1 1.5,4.3 0.1,3.3 1.9,3.3"
            fill="#FFDE00"
          />
        </svg>
      );
    default:
      return null;
  }
}

export function Navbar({ hotel }: NavbarProps) {
  const { language, setLanguage, t } = useLanguage();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target as Node)
      ) {
        setLangMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languageList: { code: LanguageCode; label: string; name: string }[] = [
    { code: 'vi', label: 'VI', name: 'Tiếng Việt' },
    { code: 'en', label: 'EN', name: 'English' },
    { code: 'ko', label: 'KO', name: '한국어' },
    { code: 'zh', label: 'ZH', name: '中文' },
  ];

  const currentLang =
    languageList.find((l) => l.code === language) || languageList[0];

  return (
    <header
      id="header"
      className="sticky top-0 z-50 w-full shrink-0 bg-white text-neutral-900 border-b border-neutral-200/80 shadow-xs pt-[env(safe-area-inset-top,0px)] transform-gpu"
    >
      {/* ========================================================================= */}
      {/* DESKTOP HEADER (110px 2-Tier Architecture matching havilandhouse.com)     */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 hidden h-[110px] lg:block">
        <div className="flex h-full items-center gap-6">
          {/* Official Brand Logo */}
          <a
            className="flex h-full shrink-0 items-center gap-1 focus:outline-none"
            href="https://havilandhouse.com/"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Haviland House"
              className="h-[72px] w-[180px] shrink-0 object-contain"
              src="/logo-haviland-house.png"
              width={180}
              height={72}
            />
            <span className="sr-only">Haviland House</span>
          </a>

          {/* Right Navigation Tiers */}
          <div className="flex flex-1 flex-col justify-center gap-2">
            {/* Top Row: Chuyến đi của tôi + Language Dropdown + User Avatar */}
            <div className="flex items-center justify-end gap-1.5">
              <a
                href="https://havilandhouse.com/dat-phong"
                className="items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold transition-colors text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 hidden lg:flex"
              >
                <Luggage className="size-5" />
                <span>{t.nav.myTrips}</span>
              </a>

              {/* Language Switcher Dropdown */}
              <div className="relative" ref={langDropdownRef}>
                <button
                  type="button"
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  aria-expanded={langMenuOpen}
                  className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none h-8 rounded-full px-3 text-xs gap-1.5 bg-transparent text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 cursor-pointer"
                >
                  <FlagIcon code={currentLang.code} />
                  <span className="text-sm font-semibold">{currentLang.label}</span>
                  <ChevronDown
                    className={`size-4 opacity-50 transition-transform duration-200 ${
                      langMenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {langMenuOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-44 rounded-2xl bg-white p-1.5 shadow-[0_10px_38px_-10px_rgba(22,23,24,0.35),0_10px_20px_-15px_rgba(22,23,24,0.2)] border border-neutral-200 z-50">
                    {languageList.map((item) => (
                      <button
                        key={item.code}
                        type="button"
                        onClick={() => {
                          setLanguage(item.code);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl text-left transition-colors cursor-pointer ${
                          language === item.code
                            ? 'bg-neutral-100 text-neutral-900 font-semibold'
                            : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <FlagIcon code={item.code} />
                          <span>{item.name}</span>
                        </div>
                        <span className="text-[10px] font-bold uppercase opacity-60">
                          {item.label}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* User Profile Avatar */}
              <a
                href="https://havilandhouse.com/dat-phong"
                aria-label="User Account"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors size-9 hover:bg-neutral-100 text-neutral-700 hover:text-neutral-900"
              >
                <UserRound className="size-6" />
              </a>
            </div>

            {/* Bottom Row: Main Navigation Menu */}
            <div className="flex items-center">
              <nav aria-label="Main" className="relative z-10 flex max-w-max flex-1 items-center justify-center">
                <ul className="group flex flex-1 list-none items-center justify-center space-x-1 h-full">
                  <li>
                    <a
                      className="px-4 py-2 text-sm font-semibold hover:text-neutral-900 text-neutral-900 transition-colors"
                      href="https://havilandhouse.com/"
                    >
                      {t.nav.home}
                    </a>
                  </li>
                  <li>
                    <a
                      className="px-4 py-2 text-sm font-semibold hover:text-neutral-900 text-neutral-600 transition-colors"
                      href="https://havilandhouse.com/dat-phong"
                    >
                      {t.nav.booking}
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 text-sm font-semibold hover:text-neutral-900 text-neutral-600 transition-colors"
                      href="https://checkin.havilandhouse.com/"
                    >
                      {t.nav.checkinOnline}
                    </a>
                  </li>
                  <li>
                    <a
                      className="px-4 py-2 text-sm font-semibold hover:text-neutral-900 text-neutral-600 transition-colors"
                      href="https://havilandhouse.com/#brands"
                    >
                      {t.nav.exploreBrands}
                    </a>
                  </li>
                  <li>
                    <a
                      className="px-4 py-2 text-sm font-semibold hover:text-neutral-900 text-neutral-600 transition-colors"
                      href="https://havilandhouse.com/cho-thue-can-ho"
                    >
                      {t.nav.longTermStay}
                    </a>
                  </li>
                  <li>
                    <a
                      className="px-4 py-2 text-sm font-semibold hover:text-neutral-900 text-neutral-600 transition-colors"
                      href="https://havilandhouse.com/blog"
                    >
                      {t.nav.blog}
                    </a>
                  </li>
                  <li>
                    <a
                      className="px-4 py-2 text-sm font-semibold hover:text-neutral-900 text-neutral-600 transition-colors"
                      href="https://havilandhouse.com/gioi-thieu"
                    >
                      {t.nav.aboutUs}
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE HEADER (64px / h-16 matching havilandhouse.com)                    */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:hidden h-16">
        <div className="flex size-full flex-1 items-center justify-between">
          {/* Logo on Left */}
          <a
            className="mr-6 flex h-16 shrink-0 items-center gap-1"
            href="https://havilandhouse.com/"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Haviland House"
              className="h-10 w-[140px] shrink-0 object-contain"
              src="/logo-haviland-house.png"
              width={140}
              height={40}
            />
            <span className="sr-only">Haviland</span>
          </a>

          {/* Right Mobile Actions */}
          <div className="flex items-center gap-2">
            {/* Language Switcher Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors h-8 rounded-full px-2.5 text-xs gap-1.5 bg-neutral-100 text-neutral-800 hover:text-neutral-900 cursor-pointer"
              >
                <FlagIcon code={currentLang.code} />
                <span className="text-xs font-semibold">{currentLang.label}</span>
                <ChevronDown className="size-3.5 opacity-50" />
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-40 rounded-2xl bg-white p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.15)] border border-neutral-200 z-50">
                  {languageList.map((item) => (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() => {
                        setLanguage(item.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl text-left transition-colors cursor-pointer ${
                        language === item.code
                          ? 'bg-neutral-100 text-neutral-900 font-semibold'
                          : 'text-neutral-600 hover:bg-neutral-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <FlagIcon code={item.code} />
                        <span>{item.name}</span>
                      </div>
                      <span className="text-[10px] font-bold uppercase opacity-60">
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Direct Phone Call Button */}
            <a
              href={`tel:${hotel.privateFeedback.conciergePhone.replace(/\s+/g, '')}`}
              aria-label="Call Concierge"
              className="flex size-9 items-center justify-center rounded-full transition-colors text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
            >
              <Phone className="size-4 text-[#D97706]" />
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
              className="flex size-9 items-center justify-center rounded-full text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="size-6" />
              ) : (
                <Menu className="size-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 bg-white px-5 py-4 animate-in slide-in-from-top-2 duration-150">
          <ul className="flex flex-col gap-1">
            <li>
              <a
                href="https://havilandhouse.com/"
                className="flex items-center justify-between py-2.5 text-sm font-semibold text-neutral-900 border-b border-neutral-100"
              >
                <span>{t.nav.home}</span>
              </a>
            </li>
            <li>
              <a
                href="https://havilandhouse.com/dat-phong"
                className="flex items-center justify-between py-2.5 text-sm font-semibold text-neutral-900 border-b border-neutral-100"
              >
                <span>{t.nav.booking}</span>
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://checkin.havilandhouse.com/"
                className="flex items-center justify-between py-2.5 text-sm font-semibold text-neutral-900 border-b border-neutral-100"
              >
                <span>{t.nav.checkinOnline}</span>
              </a>
            </li>
            <li>
              <a
                href="https://havilandhouse.com/#brands"
                className="flex items-center justify-between py-2.5 text-sm font-semibold text-neutral-900 border-b border-neutral-100"
              >
                <span>{t.nav.exploreBrands}</span>
              </a>
            </li>
            <li>
              <a
                href="https://havilandhouse.com/cho-thue-can-ho"
                className="flex items-center justify-between py-2.5 text-sm font-semibold text-neutral-900 border-b border-neutral-100"
              >
                <span>{t.nav.longTermStay}</span>
              </a>
            </li>
            <li>
              <a
                href="https://havilandhouse.com/blog"
                className="flex items-center justify-between py-2.5 text-sm font-semibold text-neutral-900 border-b border-neutral-100"
              >
                <span>{t.nav.blog}</span>
              </a>
            </li>
            <li>
              <a
                href="https://havilandhouse.com/gioi-thieu"
                className="flex items-center justify-between py-2.5 text-sm font-semibold text-neutral-900"
              >
                <span>{t.nav.aboutUs}</span>
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
