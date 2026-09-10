import type { Metadata } from 'next';
import Script from 'next/script';
import { QRStudioClient } from './QRStudioClient';

export const metadata: Metadata = {
  title: 'Haviland QR Studio | Sujet Marina Hotel Da Nang',
  description:
    'Generate, customize, animate, and export ultra-high-resolution vector SVG and print-ready QR codes for Sujet Marina Hotel Da Nang By Haviland.',
};

export default function QRStudioPage() {
  return (
    <>
      {/* Load @bitjson/qr-code Web Component from local vendor assets */}
      <Script src="/vendor/qr-code.js" strategy="afterInteractive" />
      <QRStudioClient />
    </>
  );
}
