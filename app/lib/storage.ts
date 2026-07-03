import { Link, LinkStore } from "./types";

const STORAGE_KEY = "url-shortener-links-v1";

function generateCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export function loadLinks(): Link[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const store = JSON.parse(stored) as LinkStore;
    return store.links || [];
  } catch {
    return [];
  }
}

export function saveLinks(links: Link[]): void {
  if (typeof window === "undefined") return;
  try {
    const store: LinkStore = { links, version: 1 };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    console.error("Failed to save links");
  }
}

export function createLink(originalUrl: string): Link {
  let code = generateCode();
  const links = loadLinks();
  while (links.some((l) => l.code === code)) {
    code = generateCode();
  }

  const link: Link = {
    code,
    originalUrl,
    createdAt: new Date().toISOString(),
    clicks: 0,
  };

  links.push(link);
  saveLinks(links);
  return link;
}

export function getLink(code: string): Link | undefined {
  const links = loadLinks();
  return links.find((l) => l.code === code);
}

export function trackClick(code: string): void {
  const links = loadLinks();
  const link = links.find((l) => l.code === code);
  if (link) {
    link.clicks++;
    saveLinks(links);
  }
}

export function deleteLink(code: string): void {
  const links = loadLinks();
  saveLinks(links.filter((l) => l.code !== code));
}

export function getShortUrl(code: string): string {
  return `${typeof window !== "undefined" ? window.location.origin : ""}/` + code;
}
