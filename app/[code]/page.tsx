import { getLink, trackClick } from "@/app/lib/storage";
import { redirect } from "next/navigation";

export default function RedirectPage({
  params,
}: {
  params: { code: string };
}) {
  const link = getLink(params.code);

  if (!link) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Link not found</h1>
          <p className="mt-2 text-gray-600">
            This short link doesn't exist or has been deleted.
          </p>
          <a
            href="/"
            className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded"
          >
            Create a new link
          </a>
        </div>
      </div>
    );
  }

  trackClick(params.code);
  redirect(link.originalUrl);
}
