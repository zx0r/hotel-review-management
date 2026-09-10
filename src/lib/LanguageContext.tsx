'use client';

import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type LanguageCode, TRANSLATIONS, type TranslationDictionary } from '@/config/i18n';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: TranslationDictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>('vi');

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('haviland_lang') as LanguageCode;
      if (savedLang && ['vi', 'en', 'ko', 'zh'].includes(savedLang)) {
        setLanguageState(savedLang);
      } else {
        const browserLang = navigator.language.slice(0, 2).toLowerCase();
        if (browserLang === 'vi') setLanguageState('vi');
        else if (browserLang === 'ko') setLanguageState('ko');
        else if (browserLang === 'zh') setLanguageState('zh');
        else setLanguageState('en');
      }
    } catch {
      // ignore SSR/localStorage exceptions
    }
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('haviland_lang', lang);
    } catch {
      // ignore
    }
  };

  const t = TRANSLATIONS[language] || TRANSLATIONS.vi;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: 'vi' as LanguageCode,
      setLanguage: () => {},
      t: TRANSLATIONS.vi,
    };
  }
  return context;
}
