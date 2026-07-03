"use client";

import { Link } from "@/app/lib/types";
import { useState } from "react";

interface LinkListProps {
  links: Link[];
  onDelete: (code: string) => void;
  onSelectLink: (link: Link) => void;
}

export function LinkList({ links, onDelete, onSelectLink }: LinkListProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, code: string) => {
    navigator.clipboard.writeText(text);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  if (links.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        No links yet. Create your first short link above!
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {links.map((link) => (
        <div
          key={link.code}
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <div className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400">
                /{link.code}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 truncate mt-1">
                {link.originalUrl}
              </div>
            </div>
            <button
              onClick={() => onDelete(link.code)}
              className="px-2 py-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded text-xs"
            >
              Delete
            </button>
          </div>

          <div className="flex gap-2 items-center">
            <button
              onClick={() =>
                copyToClipboard(
                  `${typeof window !== "undefined" ? window.location.origin : ""}/` +
                    link.code,
                  link.code
                )
              }
              className="flex-1 px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded text-sm hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              {copied === link.code ? "✓ Copied" : "Copy Link"}
            </button>
            <button
              onClick={() => onSelectLink(link)}
              className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded text-sm"
            >
              QR Code
            </button>
          </div>

          <div className="mt-3 text-xs text-gray-600 dark:text-gray-400">
            <span className="font-semibold">{link.clicks}</span> clicks •{" "}
            {new Date(link.createdAt).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
}
