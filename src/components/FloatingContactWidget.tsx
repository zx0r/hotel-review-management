'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { trackReviewHubEvent } from '@/lib/analytics';

export function FloatingContactWidget() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Localized URLs for Haviland House contact page
  const getContactUrl = () => {
    switch (language) {
      case 'en':
        return 'https://havilandhouse.com/en/contact-us';
      case 'ko':
        return 'https://havilandhouse.com/ko/contact-us';
      case 'zh':
        return 'https://havilandhouse.com/zh/contact-us';
      case 'vi':
      default:
        return 'https://havilandhouse.com/lien-he';
    }
  };

  const getContactLabel = () => {
    switch (language) {
      case 'en':
        return 'Contact Us';
      case 'ko':
        return '문의하기';
      case 'zh':
        return '联系我们';
      case 'vi':
      default:
        return 'Liên hệ';
    }
  };

  const getScrollTopLabel = () => {
    switch (language) {
      case 'en':
        return 'Back to top';
      case 'ko':
        return '맨 위로';
      case 'zh':
        return '返回顶部';
      case 'vi':
      default:
        return 'Trở lại đầu trang';
    }
  };

  return (
    <div
      className="fixed right-5 sm:right-[26px] z-50 flex flex-col items-center gap-3.5 bottom-6 sm:bottom-8 transform-gpu"
    >
      <div className="relative">
        <div
          className={`absolute bottom-full left-1/2 mb-3.5 flex -translate-x-1/2 flex-col items-center gap-3.5 transition-all duration-300 ease-in-out ${
            isOpen
              ? 'pointer-events-auto translate-y-0 opacity-100 scale-100'
              : 'pointer-events-none translate-y-3 opacity-0 scale-95'
          }`}
        >
          {/* 1. Official Form Liên hệ / Contact Us */}
          <a
            href={getContactUrl()}
            target="_blank"
            rel="nofollow noopener noreferrer"
            title={getContactLabel()}
            onClick={() => trackReviewHubEvent('floating_widget_contact_click', { language })}
            className="block size-[42px] sm:size-[44px] rounded-full shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95 cursor-pointer shrink-0"
          >
            <svg
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <rect width="60" height="60" rx="30" fill="#38956B" />
              <path
                d="M29.5687 45V43.125H41.9387C42.2503 43.125 42.5201 43.0289 42.7479 42.8367C42.9757 42.6442 43.0896 42.3917 43.0896 42.0792V29.1633C43.0896 25.6514 41.8017 22.7181 39.2259 20.3634C36.6497 18.0091 33.5745 16.8319 30.0002 16.8319C26.4258 16.8319 23.3506 18.0091 20.7745 20.3634C18.1986 22.7181 16.9107 25.6514 16.9107 29.1633V39.8077H15.9758C15.211 39.8077 14.5523 39.5486 13.9997 39.0305C13.4472 38.5127 13.1709 37.8703 13.1709 37.1034V33.5695C13.1709 33.0095 13.3524 32.5127 13.7155 32.0789C14.0789 31.6448 14.5207 31.292 15.0408 31.0205L15.0731 28.7166C15.1307 26.7597 15.5725 24.9472 16.3984 23.2791C17.2243 21.6106 18.3115 20.1586 19.66 18.923C21.0085 17.6873 22.5752 16.7247 24.36 16.035C26.1449 15.345 28.0249 15 30.0002 15C31.9754 15 33.8538 15.345 35.6352 16.035C37.4163 16.7247 38.9829 17.6856 40.3352 18.9178C41.6872 20.1497 42.7744 21.5997 43.5968 23.2678C44.419 24.9363 44.8624 26.7488 44.9273 28.7053L44.9595 30.9628C45.4557 31.1959 45.8914 31.5097 46.2666 31.9041C46.6418 32.2981 46.8294 32.7716 46.8294 33.3244V37.3847C46.8294 37.9375 46.6418 38.4111 46.2666 38.8055C45.8914 39.1995 45.4557 39.5131 44.9595 39.7463V42.0792C44.9595 42.8942 44.6653 43.5847 44.0769 44.1506C43.4882 44.7169 42.7754 45 41.9387 45H29.5687ZM25.1094 32.8847C24.7236 32.8847 24.3874 32.7531 24.101 32.49C23.8146 32.2266 23.6714 31.9014 23.6714 31.5145C23.6714 31.1273 23.8146 30.7962 24.101 30.5212C24.3874 30.2459 24.7236 30.1083 25.1094 30.1083C25.4955 30.1083 25.8318 30.2459 26.1182 30.5212C26.4046 30.7962 26.5478 31.1273 26.5478 31.5145C26.5478 31.9014 26.4046 32.2266 26.1182 32.49C25.8318 32.7531 25.4955 32.8847 25.1094 32.8847ZM34.8909 32.8847C34.5048 32.8847 34.1685 32.7531 33.8821 32.49C33.5957 32.2266 33.4525 31.9014 33.4525 31.5145C33.4525 31.1273 33.5957 30.7962 33.8821 30.5212C34.1685 30.2459 34.5048 30.1083 34.8909 30.1083C35.2768 30.1083 35.6129 30.2459 35.8993 30.5212C36.1857 30.7962 36.3289 31.1273 36.3289 31.5145C36.3289 31.9014 36.1857 32.2266 35.8993 32.49C35.6129 32.7531 35.2768 32.8847 34.8909 32.8847ZM20.1219 29.9063C19.9517 27.0984 20.8531 24.7055 22.8262 22.7273C24.7993 20.7489 27.2218 19.7597 30.0937 19.7597C32.5077 19.7597 34.6468 20.4862 36.5108 21.9394C38.3748 23.3925 39.5129 25.3017 39.9252 27.667C37.4488 27.6358 35.1504 27.0023 33.0299 25.7667C30.9094 24.5311 29.2821 22.8123 28.148 20.6105C27.6974 22.7739 26.7594 24.67 25.3343 26.2987C23.9091 27.9272 22.1716 29.1297 20.1219 29.9063Z"
                fill="white"
              />
            </svg>
          </a>

          {/* 2. Official Zalo (Exact Haviland official asset) */}
          <a
            href="https://zalo.me/3499485966939792994"
            target="_blank"
            rel="nofollow noopener noreferrer"
            title="Zalo: https://zalo.me/3499485966939792994"
            onClick={() => trackReviewHubEvent('floating_widget_zalo_click', {})}
            className="block size-[42px] sm:size-[44px] rounded-full shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95 cursor-pointer shrink-0 overflow-hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/zalo-official.svg"
              alt="Zalo"
              width={60}
              height={60}
              className="w-full h-full object-cover block"
            />
          </a>

          {/* 3. Official Hotline Call */}
          <a
            href="tel:1900232343"
            rel="nofollow noopener noreferrer"
            title="Hotline: 1900 2323 43"
            onClick={() => trackReviewHubEvent('floating_widget_phone_click', { number: '1900232343' })}
            className="block size-[42px] sm:size-[44px] rounded-full shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95 cursor-pointer shrink-0"
          >
            <svg
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <rect width="60" height="60" rx="30" fill="#FF7831" />
              <g clipPath="url(#clip0_1443_11816)">
                <path
                  d="M31.25 16.25C31.25 15.9185 31.3817 15.6006 31.6161 15.3662C31.8505 15.1317 32.1684 15 32.5 15C35.814 15.0037 38.9914 16.3218 41.3348 18.6652C43.6782 21.0086 44.9963 24.186 44.9999 27.5C44.9999 27.8316 44.8682 28.1495 44.6338 28.3839C44.3994 28.6183 44.0815 28.75 43.7499 28.75C43.4184 28.75 43.1005 28.6183 42.8661 28.3839C42.6316 28.1495 42.4999 27.8316 42.4999 27.5C42.497 24.8488 41.4424 22.307 39.5677 20.4323C37.693 18.5575 35.1512 17.503 32.5 17.5C32.1684 17.5 31.8505 17.3683 31.6161 17.1339C31.3817 16.8995 31.25 16.5816 31.25 16.25ZM32.5 22.5C33.826 22.5 35.0978 23.0268 36.0355 23.9645C36.9732 24.9022 37.5 26.174 37.5 27.5C37.5 27.8316 37.6316 28.1495 37.8661 28.3839C38.1005 28.6183 38.4184 28.75 38.75 28.75C39.0815 28.75 39.3994 28.6183 39.6338 28.3839C39.8683 28.1495 40 27.8316 40 27.5C39.998 25.5115 39.2072 23.605 37.8011 22.1989C36.395 20.7928 34.4885 20.002 32.5 20C32.1684 20 31.8505 20.1317 31.6161 20.3662C31.3817 20.6006 31.25 20.9185 31.25 21.25C31.25 21.5816 31.3817 21.8995 31.6161 22.1339C31.8505 22.3683 32.1684 22.5 32.5 22.5ZM43.8662 35.9238C44.5906 36.6502 44.9974 37.6342 44.9974 38.66C44.9974 39.6859 44.5906 40.6699 43.8662 41.3963L42.7287 42.7075C32.4912 52.5088 7.57874 27.6025 17.2287 17.3325L18.6662 16.0825C19.3934 15.3784 20.3686 14.9889 21.3809 14.9982C22.3931 15.0076 23.3609 15.4151 24.075 16.1325C24.1137 16.1713 26.43 19.18 26.43 19.18C27.1173 19.9021 27.4998 20.8612 27.4982 21.858C27.4966 22.8549 27.1109 23.8128 26.4212 24.5325L24.9737 26.3525C25.7748 28.2989 26.9525 30.0679 28.4394 31.5577C29.9262 33.0475 31.6927 34.2288 33.6375 35.0338L35.4687 33.5775C36.1886 32.8884 37.1463 32.5032 38.1428 32.5018C39.1394 32.5004 40.0981 32.883 40.8199 33.57C40.8199 33.57 43.8274 35.885 43.8662 35.9238ZM42.1462 37.7413C42.1462 37.7413 39.1549 35.44 39.1162 35.4013C38.8587 35.146 38.5107 35.0027 38.1481 35.0027C37.7854 35.0027 37.4375 35.146 37.18 35.4013C37.1462 35.4363 34.625 37.445 34.625 37.445C34.4551 37.5803 34.2529 37.6689 34.0383 37.7022C33.8237 37.7356 33.6041 37.7124 33.4012 37.635C30.8818 36.697 28.5934 35.2285 26.691 33.3289C24.7886 31.4293 23.3167 29.1431 22.375 26.625C22.2915 26.4194 22.2642 26.1952 22.2961 25.9755C22.328 25.7558 22.4177 25.5485 22.5562 25.375C22.5562 25.375 24.565 22.8525 24.5987 22.82C24.8541 22.5625 24.9973 22.2146 24.9973 21.8519C24.9973 21.4893 24.8541 21.1413 24.5987 20.8838C24.56 20.8463 22.2587 17.8525 22.2587 17.8525C21.9973 17.6182 21.6562 17.4927 21.3053 17.5017C20.9543 17.5108 20.6202 17.6537 20.3712 17.9013L18.9337 19.1513C11.8812 27.6313 33.47 48.0225 40.9012 41L42.0399 39.6875C42.3068 39.4404 42.4671 39.0991 42.4869 38.7359C42.5067 38.3727 42.3846 38.0161 42.1462 37.7413Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_1443_11816">
                  <rect width="30" height="30" fill="white" transform="translate(15 15)" />
                </clipPath>
              </defs>
            </svg>
          </a>
        </div>

        {/* Main Floating Trigger Button with Pulsing Radar Effect */}
        <span className="relative flex size-[52px] sm:size-[54px]">
          {!isOpen && (
            <>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-[#38956B] opacity-60"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-[#38956B] opacity-40 [animation-delay:0.6s]"
              />
            </>
          )}

          <button
            type="button"
            aria-label={getContactLabel()}
            aria-expanded={isOpen}
            onClick={() => {
              setIsOpen(!isOpen);
              trackReviewHubEvent('floating_widget_toggle', { state: !isOpen });
            }}
            className="relative z-10 flex size-full touch-manipulation items-center justify-center rounded-full bg-[#38956B] text-white shadow-xl transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`lucide lucide-message-circle size-6.5 fill-white transition-transform duration-200 ${
                isOpen ? 'rotate-90' : ''
              }`}
            >
              <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
            </svg>
          </button>
        </span>
      </div>

      {/* Back to Top Smooth Scroll Button */}
      <button
        type="button"
        aria-label={getScrollTopLabel()}
        onClick={scrollToTop}
        className={`flex size-10 sm:size-11 touch-manipulation items-center justify-center rounded-full bg-background text-foreground shadow-md transition-all duration-300 ease-in-out hover:bg-primary hover:text-primary-foreground cursor-pointer ${
          showScrollTop
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-2 opacity-0'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-arrow-up-to-line size-4.5"
        >
          <path d="M5 3h14" />
          <path d="m18 13-6-6-6 6" />
          <path d="M12 7v14" />
        </svg>
      </button>
    </div>
  );
}
