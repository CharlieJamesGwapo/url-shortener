"use client";

import { useState } from "react";
import { Link } from "@/app/lib/types";

interface LinkFormProps {
  onLinkCreated: (link: Link) => void;
}

export function LinkForm({ onLinkCreated }: LinkFormProps) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Failed to shorten URL");
        return;
      }

      const data = await response.json();
      onLinkCreated(data.link);
      setUrl("");
    } catch (err) {
      setError("Failed to shorten URL");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
          Long URL
        </label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/very/long/url"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          required
        />
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-lg font-semibold"
      >
        {loading ? "Shortening..." : "Create Short Link"}
      </button>
    </form>
  );
}
