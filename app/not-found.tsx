import Link from 'next/link';
import { FaceFrownIcon } from '@heroicons/react/24/outline';
import AcmeLogo from '@/app/ui/acme-logo';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <AcmeLogo />
      </div>
      <div className="mt-4 flex h-full grow flex-col items-center justify-center gap-2">
        <FaceFrownIcon className="w-10 text-gray-400" />
        <h2 className="text-xl font-semibold">404 Not Found</h2>
        <p>404 - Could not find the requested page.</p>
        <Link
          href="/"
          className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        >
          Go Back
        </Link>
      </div>
    </main>
  );
}
