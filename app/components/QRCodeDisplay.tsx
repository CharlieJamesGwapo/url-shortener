"use client";

import { Link } from "@/app/lib/types";
import QRCode from "qrcode.react";
import { useRef } from "react";

interface QRCodeDisplayProps {
  link: Link | null;
  onClose: () => void;
}

export function QRCodeDisplay({ link, onClose }: QRCodeDisplayProps) {
  const qrRef = useRef<HTMLDivElement>(null);

  if (!link) return null;

  const shortUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/${link.code}`
      : `/${link.code}`;

  const downloadQR = () => {
    const canvas = qrRef.current?.querySelector("canvas") as HTMLCanvasElement;
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url;
      a.download = `qr-${link.code}.png`;
      a.click();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            QR Code
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4 flex justify-center" ref={qrRef}>
          <QRCode value={shortUrl} size={200} />
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Short URL:
          </p>
          <p className="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded break-all text-gray-900 dark:text-white">
            {shortUrl}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={downloadQR}
            className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold"
          >
            Download
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
