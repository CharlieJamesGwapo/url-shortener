"use client";

import { useEffect, useState } from "react";
import { Link } from "@/app/lib/types";
import { loadLinks, deleteLink } from "@/app/lib/storage";
import { LinkForm } from "./components/LinkForm";
import { LinkList } from "./components/LinkList";
import { QRCodeDisplay } from "./components/QRCodeDisplay";

export default function Home() {
  const [links, setLinks] = useState<Link[]>([]);
  const [selectedLink, setSelectedLink] = useState<Link | null>(null);

  useEffect(() => {
    const loaded = loadLinks();
    setLinks(loaded.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  }, []);

  const handleLinkCreated = (newLink: Link) => {
    const updated = loadLinks().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setLinks(updated);
  };

  const handleDelete = (code: string) => {
    deleteLink(code);
    const updated = loadLinks().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setLinks(updated);
    if (selectedLink?.code === code) {
      setSelectedLink(null);
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          URL Shortener
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Create short, shareable links with QR codes
        </p>

        <LinkForm onLinkCreated={handleLinkCreated} />
        <LinkList links={links} onDelete={handleDelete} onSelectLink={setSelectedLink} />
        <QRCodeDisplay link={selectedLink} onClose={() => setSelectedLink(null)} />
      </div>
    </main>
  );
}
