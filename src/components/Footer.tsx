'use client';

import React from 'react';
import Link from 'next/link';
import { PhoneCall, Mail } from 'lucide-react';
import type { HotelConfig } from '@/config/hotels';
import { useLanguage } from '@/lib/LanguageContext';

interface FooterProps {
  hotel: HotelConfig;
}

export function Footer({ hotel }: FooterProps) {
  const { t } = useLanguage();

  return (
    <footer id="site-footer" className="w-full shrink-0 bg-white text-neutral-900 mt-auto pb-[env(safe-area-inset-bottom,0px)]">
      {/* ========================================================================= */}
      {/* MAIN FOOTER CONTAINER (py-12 md:py-16 matching official site)             */}
      {/* ========================================================================= */}
      <div className="w-full bg-white py-12 md:py-16 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-12 lg:gap-6">
          {/* Left Column: Brand, Company info, Tax ID, Hotline, Email, Social Badges */}
          <div className="space-y-5 lg:col-span-5 lg:pr-8 text-left min-w-0">
            <a className="inline-flex focus:outline-none" href="https://havilandhouse.com/">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={t.footer.companyName}
                className="h-12 w-[180px] shrink-0 object-contain block"
                src="/haviland-logo-horizontal.png"
                width={180}
                height={48}
              />
            </a>

            <p className="text-[20px] sm:text-[22px] font-medium uppercase leading-snug text-neutral-900">
              {t.footer.companyName}
            </p>

            <div className="text-xs text-neutral-600 space-y-1">
              <p>{t.footer.headquarters}</p>
            </div>

            <div className="text-xs text-neutral-600 space-y-0.5">
              <p>{t.footer.taxId}</p>
              <p>{t.footer.issuedBy}</p>
            </div>

            {/* Hotline & Email Contact */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1">
              <a
                href="tel:1900232343"
                rel="nofollow"
                className="inline-flex items-center gap-2 text-xs font-medium text-neutral-900 hover:text-[#38956B] transition-colors"
              >
                <PhoneCall className="size-4 text-neutral-900" />
                <span className="underline">{t.footer.hotline}</span>
              </a>
              <a
                href="mailto:info@havilandhouse.com"
                rel="nofollow"
                className="inline-flex items-center gap-2 text-xs font-medium text-neutral-900 hover:text-[#38956B] transition-colors"
              >
                <Mail className="size-4 text-neutral-900" />
                <span className="underline">{t.footer.email}</span>
              </a>
            </div>

            {/* Social Media & App Badges */}
            <div className="flex flex-wrap items-center gap-5 pt-2">
              {/* Facebook & YouTube 48px round icons */}
              <div className="flex items-center gap-3">
                <a
                  href="https://www.facebook.com/havilandhouse/"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  aria-label="Facebook"
                  className="text-neutral-900 transition-transform hover:scale-105"
                >
                  <svg
                    width="40px"
                    height="40px"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="24" cy="24" r="20" fill="#3B5998" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M29.315 16.9578C28.6917 16.8331 27.8498 16.74 27.3204 16.74C25.8867 16.74 25.7936 17.3633 25.7936 18.3607V20.1361H29.3774L29.065 23.8137H25.7936V35H21.3063V23.8137H19V20.1361H21.3063V17.8613C21.3063 14.7453 22.7708 13 26.4477 13C27.7252 13 28.6602 13.187 29.8753 13.4363L29.315 16.9578Z"
                      fill="white"
                    />
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@havilandofficial1363"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  aria-label="YouTube"
                  className="text-neutral-900 transition-transform hover:scale-105"
                >
                  <svg
                    width="40px"
                    height="40px"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="24" cy="24" r="20" fill="#FF0000" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M35.3005 16.3781C35.6996 16.7772 35.9872 17.2739 36.1346 17.8187C36.9835 21.2357 36.7873 26.6324 36.1511 30.1813C36.0037 30.7261 35.7161 31.2228 35.317 31.6219C34.9179 32.021 34.4212 32.3086 33.8764 32.456C31.8819 33 23.8544 33 23.8544 33C23.8544 33 15.8269 33 13.8324 32.456C13.2876 32.3086 12.7909 32.021 12.3918 31.6219C11.9927 31.2228 11.7051 30.7261 11.5577 30.1813C10.7038 26.7791 10.9379 21.3791 11.5412 17.8352C11.6886 17.2903 11.9762 16.7936 12.3753 16.3945C12.7744 15.9954 13.2711 15.7079 13.8159 15.5604C15.8104 15.0165 23.8379 15 23.8379 15C23.8379 15 31.8654 15 33.8599 15.544C34.4047 15.6914 34.9014 15.979 35.3005 16.3781ZM27.9423 24L21.283 27.8571V20.1428L27.9423 24Z"
                      fill="white"
                    />
                  </svg>
                </a>
              </div>

              {/* Google Play & App Store Buttons */}
              <div className="flex items-center gap-3">
                <a
                  href="https://havilandhouse.com/"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-lg border border-neutral-900 px-3 py-1.5 text-xs font-medium text-neutral-900 transition-colors hover:border-[#38956B] hover:text-[#38956B]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 50"
                    className="size-4 fill-current"
                  >
                    <path d="M 7.125 2 L 28.78125 23.5 L 34.71875 17.5625 L 8.46875 2.40625 C 8.03125 2.152344 7.5625 2.011719 7.125 2 Z M 5.3125 3 C 5.117188 3.347656 5 3.757813 5 4.21875 L 5 46 C 5 46.335938 5.070313 46.636719 5.1875 46.90625 L 27.34375 24.90625 Z M 36.53125 18.59375 L 30.1875 24.90625 L 36.53125 31.1875 L 44.28125 26.75 C 45.382813 26.113281 45.539063 25.304688 45.53125 24.875 C 45.519531 24.164063 45.070313 23.5 44.3125 23.09375 C 43.652344 22.738281 38.75 19.882813 36.53125 18.59375 Z M 28.78125 26.3125 L 6.9375 47.96875 C 7.300781 47.949219 7.695313 47.871094 8.0625 47.65625 C 8.917969 47.160156 26.21875 37.15625 26.21875 37.15625 L 34.75 32.25 Z" />
                  </svg>
                  <span>Google Play</span>
                </a>
                <a
                  href="https://havilandhouse.com/"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-lg border border-neutral-900 px-3 py-1.5 text-xs font-medium text-neutral-900 transition-colors hover:border-[#38956B] hover:text-[#38956B]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 50"
                    className="size-4 fill-current"
                  >
                    <path d="M 44.527344 34.75 C 43.449219 37.144531 42.929688 38.214844 41.542969 40.328125 C 39.601563 43.28125 36.863281 46.96875 33.480469 46.992188 C 30.46875 47.019531 29.691406 45.027344 25.601563 45.0625 C 21.515625 45.082031 20.664063 47.03125 17.648438 47 C 14.261719 46.96875 11.671875 43.648438 9.730469 40.699219 C 4.300781 32.429688 3.726563 22.734375 7.082031 17.578125 C 9.457031 13.921875 13.210938 11.773438 16.738281 11.773438 C 20.332031 11.773438 22.589844 13.746094 25.558594 13.746094 C 28.441406 13.746094 30.195313 11.769531 34.351563 11.769531 C 37.492188 11.769531 40.8125 13.480469 43.1875 16.433594 C 35.421875 20.691406 36.683594 31.78125 44.527344 34.75 Z M 31.195313 8.46875 C 32.707031 6.527344 33.855469 3.789063 33.4375 1 C 30.972656 1.167969 28.089844 2.742188 26.40625 4.78125 C 24.878906 6.640625 23.613281 9.398438 24.105469 12.066406 C 26.796875 12.152344 29.582031 10.546875 31.195313 8.46875 Z" />
                  </svg>
                  <span>App Store</span>
                </a>
              </div>
            </div>
          </div>

          {/* Center Column Divider on Desktop */}
          <div className="hidden lg:col-span-1 lg:flex lg:justify-center lg:items-stretch py-2">
            <span className="w-px bg-neutral-200 self-stretch block"></span>
          </div>

          {/* Right Column: 3 Navigation Sections + MOIT Badge */}
          <div className="lg:col-span-6 text-left min-w-0">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 min-w-0">
              {/* Category 1: Giới thiệu */}
              <div className="flex flex-col gap-3 min-w-0">
                <p className="text-lg font-medium text-neutral-500">
                  {t.footer.col1Title}
                </p>
                <ul className="flex flex-col gap-2.5">
                  <li>
                    <a
                      className="text-xs text-neutral-700 transition-colors hover:text-[#38956B] hover:underline"
                      href="https://havilandhouse.com/gioi-thieu"
                    >
                      {t.footer.brandOverview}
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-xs text-neutral-700 transition-colors hover:text-[#38956B] hover:underline"
                      href="https://havilandhouse.com/dat-phong"
                    >
                      {t.footer.hotelSystem}
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-xs text-neutral-700 transition-colors hover:text-[#38956B] hover:underline"
                      href="https://havilandhouse.com/hoat-dong-cong-ty"
                    >
                      {t.footer.companyActivities}
                    </a>
                  </li>
                </ul>
              </div>

              {/* Category 2: Haviland */}
              <div className="flex flex-col gap-3 min-w-0">
                <p className="text-lg font-medium text-neutral-500">
                  {t.footer.col2Title}
                </p>
                <ul className="flex flex-col gap-2.5">
                  <li>
                    <a
                      className="text-xs text-neutral-700 transition-colors hover:text-[#38956B] hover:underline"
                      href="https://havilandhouse.com/tuyen-dung"
                    >
                      {t.footer.careers}
                    </a>
                  </li>
                  <li>
                    <a
                      rel="nofollow"
                      className="text-xs text-neutral-700 transition-colors hover:text-[#38956B] hover:underline"
                      href="https://havilandhouse.com/lien-he"
                    >
                      {t.footer.contact}
                    </a>
                  </li>
                </ul>
              </div>

              {/* Category 3: Chính sách */}
              <div className="flex flex-col gap-3 min-w-0">
                <p className="text-lg font-medium text-neutral-500">
                  {t.footer.col3Title}
                </p>
                <ul className="flex flex-col gap-2.5">
                  <li>
                    <a
                      className="text-xs text-neutral-700 transition-colors hover:text-[#38956B] hover:underline"
                      href="https://havilandhouse.com/chinh-sach-dieu-khoan"
                    >
                      {t.footer.terms}
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-xs text-neutral-700 transition-colors hover:text-[#38956B] hover:underline"
                      href="https://havilandhouse.com/quy-che-hoat-dong"
                    >
                      {t.footer.regulations}
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-xs text-neutral-700 transition-colors hover:text-[#38956B] hover:underline"
                      href="https://havilandhouse.com/chinh-sach-bao-mat-thong-tin"
                    >
                      {t.footer.privacy}
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-xs text-neutral-700 transition-colors hover:text-[#38956B] hover:underline"
                      href="https://havilandhouse.com/co-che-giai-quyet-tranh-chap"
                    >
                      {t.footer.dispute}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Ministry of Industry and Trade (Bo Cong Thuong) Certified Logo */}
            <a
              href="http://online.gov.vn/Website/chi-tiet-134829"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="mt-10 block w-fit max-w-[160px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Bộ Công Thương"
                className="h-auto w-[160px] shrink-0 object-contain block aspect-[160/60]"
                src="/logo-bct.png"
                width={160}
                height={60}
              />
            </a>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM COPYRIGHT ROW (matching havilandhouse.com)                         */}
      {/* ========================================================================= */}
      <div className="w-full border-t border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <p className="text-xs font-medium text-neutral-900">
            © Copyright 2026 Haviland House.
          </p>
          <Link
            href="/qr"
            className="text-xs font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            QR Studio
          </Link>
        </div>
      </div>
    </footer>
  );
}
