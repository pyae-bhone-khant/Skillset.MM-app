import Image from "next/image";

export default function StillDeveloping() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="max-w-md w-full">
        <div className="relative w-full h-96 mb-8">
          <Image
            src="/stillDevelop.svg"
            alt="Under Development"
            fill
            className="object-contain"
            priority
          />
        </div>
        <h1 className="text-3xl font-bold text-center text-app-text-primary mb-4">
          Under Development
        </h1>
        <p className="text-center text-app-text-secondary">
          This page is currently being built. Check back soon for updates!
        </p>
      </div>
    </div>
  );
}
