import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#010114] px-4 py-12">
      <div className="w-full max-w-2xl rounded-[28px] border border-white/10 bg-gradient-to-br from-[#0f0f23] to-[#141423] p-10 shadow-2xl shadow-black/30">
        <div className="text-center">
          <div className="mx-auto mb-8 h-48 w-48 max-w-full overflow-hidden rounded-3xl bg-white/5 p-4 shadow-inner shadow-black/20 sm:h-56 sm:w-56">
            <Image src="/404.svg" alt="404 Not Found" width={320} height={320} className="h-full w-full object-contain" />
          </div>

          <p className="text-sm uppercase tracking-[0.3em] text-blue-300/80">404 • Page not found</p>
          <h1 className="mt-6 text-5xl font-bold leading-tight text-white">Looks like you’re lost.</h1>
          <p className="mt-4 max-w-2xl mx-auto text-sm text-gray-400 sm:text-base">
            The page you’re looking for doesn’t exist or has been moved. Use the buttons below to get back on track.
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10 px-10 py-3 text-sm font-semibold text-blue-200 transition hover:border-blue-400/50 hover:bg-blue-500/15"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
